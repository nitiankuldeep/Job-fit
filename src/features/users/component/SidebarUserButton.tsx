import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { SidebarUserButtonClient } from "./_SidebarUserSuspence";

export function SidebarUserButton(){
    return (
        <Suspense>
             <SidebarUserSuspense/>
        </Suspense>
    )
}
async function  SidebarUserSuspense() {
    const{userId}= await auth();
    return <SidebarUserButtonClient user={{email:"kuldeepsinghrathore190@gmail.com",name:"kuldeep",imageUrl:""}}/>
}
