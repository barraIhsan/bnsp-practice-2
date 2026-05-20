import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="overflow-y-auto p-4 space-y-4 ">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
