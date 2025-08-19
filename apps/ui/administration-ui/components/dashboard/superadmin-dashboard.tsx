"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppSidebar } from "../app-sidebar"
import { DashboardHeader } from "../dashboard-header"
import { DashboardStats } from "./dashboard-stats"
import { InviteUsers } from "./invite-users"
import { UserManagement } from "./user-management"
import { ComplaintsDashboard } from "./complaints-dashboard"
import { ProfileSettings } from "./profile-settings"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

export type DashboardView = "overview" | "invite" | "users" | "complaints" | "profile"

export function SuperAdminDashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>("overview")

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardStats />
      case "invite":
        return <InviteUsers />
      case "users":
        return <UserManagement />
      case "complaints":
        return <ComplaintsDashboard />
      case "profile":
        return <ProfileSettings />
      default:
        return <DashboardStats />
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <SidebarProvider>
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        <SidebarInset>
          <DashboardHeader currentView={currentView} />
          <motion.main
            className="flex-1 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </div>
  )
}
