import { env } from "@/data/env/server"
import { inngest } from "../client"
import {Webhook} from "svix"
import { NonRetriableError } from "inngest"
import { deleteUser, insertUser, updateUser } from "@/features/users/db/users"
import { insertUserNotificationSettings } from "@/features/users/db/userNotificationSettings"

function verifyWebhooks({raw,headers}:{
    raw:string,
    headers:Record<string,string>
}){
    return new Webhook(env.CLERK_WEBHOOK_SECRET).verify(raw,headers)
}

export const clerkCreateUser = inngest.createFunction(
  { id: "clerk/create-db-user", name: "clerk-create-db-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    await step.run("verify-webhook", async () => {
      try {
        verifyWebhooks({
          raw: event.data.raw,
          headers: event.data.headers,
        });
      } catch {
        throw new NonRetriableError("INVALID webhook");
      }
    });

    const userId = await step.run("create-user", async () => {
      const userData = event.data.data;
      const email = userData.email_addresses.find(
        email => email.id === userData.primary_email_address_id
      );
      if (!email) {
        throw new NonRetriableError("No email id is found");
      }

      await insertUser({
        id: userData.id,
        name:
          userData.first_name || userData.last_name
            ? `${userData.first_name || ""} ${userData.last_name || ""}`.trim()
            : email.email_address.split("@")[0],
        imageUrl: userData.image_url,
        email: email.email_address,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at),
      });

      return userData.id;
    });

    await step.run("create-user-notification-settings", async () => {
      await insertUserNotificationSettings({ userId });
    });
  }
);

export const clerkUpdateUser=inngest.createFunction({
    id:"clerk/update-db-user",name:"clerk - Update DB user"},{
        event:"clerk/user.updated"
    }, async({event,step})=>{
       await step.run("verify-webhook",async ()=>{
        try{
            verifyWebhooks({raw: event.data.raw,
          headers: event.data.headers});
        }catch{
            throw new NonRetriableError("INVALID webhook");
        }
    })
    
    await step.run("update-user",async ()=>{
        const userData=event.data.data;
        const email = userData.email_addresses.find(email => email.id === userData.primary_email_address_id);
        if (!email) {
            throw new NonRetriableError("No email id is found");
        }

        await updateUser(userData.id,{
            
            name: `${userData.first_name} ${userData.last_name}`,
            imageUrl: userData.image_url,
            email: email.email_address,
            updatedAt:new Date(userData.updated_at),
        })
        
    })
    
})

export const clerkDeleteUser=inngest.createFunction({
    id:"clerk/delete-db-user",name:"clerk - Delete DB user"},{
        event:"clerk/user.deleted"
    }, async({event,step})=>{
       await step.run("verify-webhook",async ()=>{
        try{
            verifyWebhooks({raw: event.data.raw,
          headers: event.data.headers,});
        }catch{
            throw new NonRetriableError("INVALID webhook");
        }
    })
    
    await step.run("delete-user",async ()=>{
        const {id}=event.data.data;
        if(id==null){
            throw new NonRetriableError("No primary id found to get unique user");
        }
        await deleteUser(id);
        
    })
    
})