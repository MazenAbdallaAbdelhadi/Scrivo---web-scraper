import { DashboardProvider } from "@/components/app-provider";
import { AppSidebar } from "@/components/sidebar";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@/features/auth/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <AppSidebar />
      <main className="w-full min-h-screen flex flex-col">
        {/* should be header */}
        <div className="w-full flex justify-between p-4">
          <SidebarTrigger />
          <UserButton />
        </div>

        <div className="flex-1 px-4">{children}</div>
      </main>
    </DashboardProvider>
  );
}
