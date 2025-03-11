import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "../ui/sidebar";
import { Send } from "lucide-react";

const AppSidebar = () => {
  return (
    <Sidebar
      className="bg-[#1E1E1E] text-white flex flex-col justify-center"
      collapsible="icon"
    >
      <SidebarTrigger />

      <SidebarHeader>
        <h4>Who ai am?</h4>
      </SidebarHeader>
      <SidebarContent className="bg-[#1E1E1E]">
        <SidebarGroup>Content</SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
