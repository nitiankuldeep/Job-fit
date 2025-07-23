Job-fit: AI-Powered Job Board
Job-fit is a modern, full-stack job board application designed to streamline the hiring process for both employers and job seekers. It leverages AI to provide personalized job recommendations and automated notifications, creating a more efficient and intelligent job search experience.

✨ Features
For Job Seekers
AI Resume Analysis: Upload your resume and get an instant, AI-generated summary that highlights your key skills and qualifications.

Personalized Job Matching: Provide a custom AI prompt (e.g., "Senior frontend developer with experience in Next.js") to receive a daily email digest of jobs that perfectly match your profile.

Automated Email Notifications: Never miss an opportunity. Get daily emails with the latest job listings tailored just for you.

Simple Application Process: Easily view detailed job descriptions and apply directly through the platform.

For Employers
Effortless Job Posting: Create, manage, and publish job listings for your organization with a simple and intuitive interface.

Intelligent Applicant Filtering: Receive daily email summaries of new applications. Set a minimum rating threshold to automatically filter and prioritize the most qualified candidates.

Application Tracking System (ATS): Review applicant details, see their AI-generated resume summary, and manage their progress through your hiring pipeline (e.g., "Screening," "Interview," "Hired").

Candidate Rating: Rate applicants on a 5-star scale to easily organize and identify top talent.

🚀 Tech Stack
This project is built with a modern, scalable, and type-safe technology stack.

Framework: Next.js (App Router)

Background Jobs & Cron: Inngest

Database: Supabase (PostgreSQL)

ORM: Drizzle ORM

Authentication: Clerk

Email: Resend

AI: Google Gemini

File Uploads: UploadThing

Styling: Tailwind CSS & shadcn/ui

🏁 Getting Started
Follow these instructions to set up the project locally for development and testing.

1. Clone the Repository
git clone [https://github.com/nitiankuldeep/Job-fit.git](https://github.com/nitiankuldeep/Job-fit.git)
cd Job-fit

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a .env.local file in the root of your project and add the following environment variables. You will need to get these keys from their respective service dashboards (Supabase, Clerk, UploadThing, Google AI, Resend).

# Database (from Supabase)
DB_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="..."
CLERK_SECRET_KEY="..."
CLERK_WEBHOOK_SECRET="..."

# File Uploads
UPLOADTHING_TOKEN="..."

# Google AI
GOOGLE_API_KEY="..."

# Resend Email
RESEND_API_KEY="..."

# Server URL for local development
SERVER_URL="http://localhost:3000"

4. Push Database Schema
This command will connect to your Supabase database and create all the necessary tables based on your Drizzle schema files.

npm run db:push

5. Run the Development Servers
You need to run two separate processes in two different terminals.

Terminal 1: Start the Next.js App

npm run dev

Terminal 2: Start the Inngest Dev Server

npm run inngest

Your application should now be running at http://localhost:3000, and the Inngest Dev Server will be at http://localhost:8288.

6. Configure Webhooks
For Clerk events (like new user sign-ups) to work locally, you need to set up a webhook.

Copy the public URL from the terminal where you ran npm run inngest (it will look like https://inn.gs/t/...).

Go to your Clerk dashboard -> Webhooks -> Add Endpoint.

Paste the URL and subscribe to the user.created event.

👤 Contact
Kuldeep Singh Rathore

GitHub: @nitiankuldeep

Email: contact.kuldeepsinghrathore@gmail.com
