"use client";

import {
  Car,
  BarChart3,
  UserPlus,
  Users,
  MessageSquareWarning,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { DashboardView } from "./dashboard/superadmin.dashboard";

const menuItems = [
  {
    title: "Dashboard Overview",
    icon: BarChart3,
    view: "overview" as DashboardView,
  },
  {
    title: "Invite Users",
    icon: UserPlus,
    view: "invite" as DashboardView,
  },
  {
    title: "User Management",
    icon: Users,
    view: "users" as DashboardView,
  },
  {
    title: "Complaints",
    icon: MessageSquareWarning,
    view: "complaints" as DashboardView,
  },
  {
    title: "Profile Settings",
    icon: Settings,
    view: "profile" as DashboardView,
  },
];

interface AppSidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-neutral-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary-gradient rounded-lg">
            <Car className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-primary-gradient">
              RideRota
            </span>
            <p className="text-xs text-neutral-500">SuperAdmin Console</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.view)}
                    isActive={currentView === item.view}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-600 hover:text-error-600 hover:bg-error-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
