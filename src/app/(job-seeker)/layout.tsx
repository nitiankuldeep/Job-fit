import { BrainCircuitIcon, ClipboardListIcon, LayoutDashboard, LogInIcon } from "lucide-react";
import { SidebarUserButton } from "@/features/users/component/SidebarUserButton";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarNavMenuGroup } from "@/components/sidebar/SidebarNavMenuGroup";



export default function JobSeekerLayout({children}:{children:ReactNode}){
    return <AppSidebar content={ <SidebarNavMenuGroup className="mt-auto" items={[
        {href:"/",icon:<ClipboardListIcon/>,label:"Job Board"},
        {href:"/ai-search",icon:<BrainCircuitIcon/>,label:"Ai Search"},
        {href:"/employer",icon:<LayoutDashboard/>,label:"Employer Dashboard",authStatus:"signedIn"},
         {href:"/sign-in",icon:<LogInIcon/>,label:"Login",authStatus:"signedOut"}


    ]}/>} footerButton={<SidebarUserButton/>}>
            {children}
        </AppSidebar>
}