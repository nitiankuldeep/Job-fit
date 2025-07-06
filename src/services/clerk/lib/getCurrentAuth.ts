import { db } from "@/drizzle/db";
import { OrganizationTable, UserTable } from "@/drizzle/schema";
import { getOrganizationIdTag } from "@/features/organization/db/cache/organizations";
import { getUserIdTag } from "@/features/users/db/cache/users";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getCurrentUser({allData=false}={}) {
    const {userId}=await auth();
    return{
        userId,
        user:(allData&&userId!=null)?await getUser(userId):undefined
    }
}
async function getUser(userId:string) {
    "use cache"
    cacheTag(getUserIdTag(userId))
    return db.query.UserTable.findFirst({
        where:eq(UserTable.id,userId)
    })
}

export async function getCurrentOrganization({allData=false}={}) {
    const {orgId}=await auth();
    return{
        orgId,
        organization:(allData&&orgId!=null)?await getOrganization(orgId):undefined
    }
}
async function getOrganization(orgId:string) {
    "use cache"
    cacheTag(getOrganizationIdTag(orgId))
    return db.query.UserTable.findFirst({
        where:eq(OrganizationTable.id,orgId)
    })
}