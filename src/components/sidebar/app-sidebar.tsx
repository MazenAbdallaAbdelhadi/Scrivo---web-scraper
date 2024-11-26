"use client";

import {
  ShieldCheck,
  Home,
  Workflow,
  DollarSign,
  Settings,
  LucideIcon,
} from "lucide-react";
import { Logo } from "../logo";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useActiveLink } from "@/routes/hooks";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Workflows",
    url: "/workflows",
    icon: Workflow,
  },
  {
    title: "Credentials",
    url: "/creadentials",
    icon: ShieldCheck,
  },
  {
    title: "Billings",
    url: "/billings",
    icon: DollarSign,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full flex justify-start items-center py-2 px-2">
          <Logo labeled />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <CustomSidebarMenuItem
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function CustomSidebarMenuItem({
  icon: Icon,
  title,
  url,
}: {
  title: string;
  url: string;
  icon: LucideIcon;
}) {
  const isActive = useActiveLink(url);

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton asChild variant={isActive ? "outline" : "default"}>
        <Link href={url}>
          <Icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
