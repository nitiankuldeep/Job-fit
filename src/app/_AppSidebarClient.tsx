"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

export function AppSidebarClient({children}:{children:ReactNode}){
    const isMoble =useIsMobile();
    if(isMoble){
        return <div className="flex flex-col w-full">
            <div className="p-2 border-b flex item-center gap-1">
                <SidebarTrigger />
                <span className=" text-xl font-bold text-nowrap">Job-Fit</span>
            </div>
            <div className=" flex-1 flex ">{children}</div>
        </div>

    }
    return children;
}