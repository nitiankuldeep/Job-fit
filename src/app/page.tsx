import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Children } from "react";
import { AppSidebarClient } from "./_AppSidebarClient";

export default function HomePage(){
  return <SidebarProvider className=" overflow-y-hidden">
    <AppSidebarClient>
    <Sidebar collapsible="icon" className="overflow-y-hidden">
      <SidebarHeader className="flex-row">
        <SidebarTrigger />
        <span className=" text-xl font-bold text-nowrap">Job-Fit</span>
        
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>button</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    <main className="flex-1">hellow
    </main>
    </AppSidebarClient> 

  </SidebarProvider>
}