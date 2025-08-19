"use client";

import {
  Car,
  BarChart3,
  UserCheck,
  Users,
  Route,
  Clock,
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
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Dashboard Overview",
    icon: BarChart3,
    view: "overview" as AdminView,
  },
  {
    title: "Employee Requests",
    icon: UserCheck,
    view: "requests" as AdminView,
    badge: 12, // Pending requests
  },
  {
    title: "Driver Management",
    icon: Users,
    view: "drivers" as AdminView,
  },
  {
    title: "Ride Allocation",
    icon: Route,
    view: "allocation" as AdminView,
  },
  {
    title: "Allocation Queue",
    icon: Clock,
    view: "queue" as AdminView,
    badge: 8, // Queued allocations
  },
  {
    title: "File Complaints",
    icon: MessageSquareWarning,
    view: "complaints" as AdminView,
  },
  {
    title: "Profile Settings",
    icon: Settings,
    view: "profile" as AdminView,
  },
];

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
}

export function AdminSidebar({ currentView, onViewChange }: AdminSidebarProps) {
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
            <p className="text-xs text-neutral-500">Admin Console</p>
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
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge className="bg-error-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="mb-3 p-3 bg-primary-50 rounded-lg">
          <p className="text-xs font-medium text-primary-700">Logged in as</p>
          <p className="text-sm font-semibold text-primary-900">John Smith</p>
          <p className="text-xs text-primary-600">Operations Admin</p>
        </div>
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
