import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebarClient } from "./_AppSidebarClient";
import { SignedIn } from "@clerk/nextjs";
import { ReactNode } from "react";

export function AppSidebar({content,footerButton,children}:{children:ReactNode,content:ReactNode ,footerButton:ReactNode}){
    return(
        <SidebarProvider className=" overflow-y-hidden">
            <AppSidebarClient>
                <Sidebar collapsible="icon" className="overflow-y-hidden">
                    <SidebarHeader className="flex-row">
                        <SidebarTrigger />
                        <span className=" text-xl font-bold text-nowrap">Job-Fit</span>
                     </SidebarHeader>
                    
                    <SidebarContent>
                        {content}
                    </SidebarContent>

                    <SignedIn>        
                        <SidebarFooter>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        {footerButton}
                                    </SidebarMenuItem>
                                </SidebarMenu>
                        </SidebarFooter>
                    </SignedIn>
                </Sidebar>
                <main className="flex-1">
                    {children}
                </main>
            </AppSidebarClient> 

        </SidebarProvider>
    )
}