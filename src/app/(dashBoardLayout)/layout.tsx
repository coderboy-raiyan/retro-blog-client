import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Role } from "@/constants/roles";
import { userService } from "@/services/user/user.service";
import React from "react";

async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const userInfo = data?.user;
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>{userInfo?.role === Role.user ? user : admin}</SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
