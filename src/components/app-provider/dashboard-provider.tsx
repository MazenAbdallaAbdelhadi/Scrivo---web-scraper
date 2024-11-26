"use client";
import { SidebarProvider } from "@/components/ui/sidebar";

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
