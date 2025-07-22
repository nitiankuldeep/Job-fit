import { db } from "@/drizzle/db"
import { inngest } from "../client"
import { eq } from "drizzle-orm"
import { UserResumeTable } from "@/drizzle/schema"
import { env } from "@/data/env/server"
import { updateUserResume } from "@/features/users/db/userResumes"
import { Buffer } from "buffer"

export const createAiSummaryOfUploadedResume = inngest.createFunction(

  {
    id: "create-ai-summary-of-uploaded-resume",
    name: "Create AI Summary of Uploaded Resume",
  },

  {
    event: "app/resume.uploaded",
  },

  async ({ step, event }) => {
    const { id: userId } = event.user

    const userResume = await step.run("get-user-resume", async () => {
      return await db.query.UserResumeTable.findFirst({
        where: eq(UserResumeTable.userId, userId),
        columns: { resumeFileUrl: true },
      })
    })

    if (userResume == null || !userResume.resumeFileUrl) {
        console.log(`No resume URL found for user ${userId}. Skipping summary.`);
        return;
    }

    const base64Data = await step.run("fetch-and-encode-resume", async () => {
        const response = await fetch(userResume.resumeFileUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch resume from URL: ${userResume.resumeFileUrl}. Status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer.toString('base64');
    });

    const result = await step.ai.infer("create-ai-summary", {
      model: step.ai.models.gemini({
        model: "gemini-1.5-flash-latest",
        defaultParameters: {
          generationConfig: {
            maxOutputTokens: 2048,
          },
        },
        apiKey: env.GOOGLE_API_KEY,
      }),
      
      body: {
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: base64Data,
                },
              },
              {
                text: "Summarize the following resume and extract all key skills, experience, and qualifications. The summary should include all the information that a hiring manager would need to know about the candidate in order to determine if they are a good fit for a job. This summary should be formatted as markdown. Do not return any other text. If the file does not look like a resume return the text 'N/A'.",
              },
            ],
          },
        ],
      },
    })

    await step.run("save-ai-summary", async () => {
      const firstPart = result.candidates?.[0]?.content?.parts?.[0];

      if (firstPart && 'text' in firstPart) {
        const summaryText = firstPart.text;
        if (summaryText) {
          await updateUserResume(userId, { aiSummary: summaryText });
        }
      }
    })
  }
)
