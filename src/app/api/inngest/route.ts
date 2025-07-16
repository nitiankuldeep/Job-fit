import {serve} from "inngest/next";
import { inngest } from "@/services/inngest/client";
import { clerkCreateOrganization, clerkCreateOrgMembership, clerkCreateUser, clerkDeleteOrgMembership, clerkDeleteUser, clerkUpdateOrganization, clerkUpdateUser } from "@/services/inngest/functions/clerk";



export const {GET,POST,PUT} =serve({
    client:inngest,
    functions:[
        clerkCreateUser,
        clerkUpdateUser,
        clerkDeleteUser,
        clerkCreateOrganization,
        clerkDeleteOrgMembership,
        clerkUpdateOrganization,
        
    ]
})