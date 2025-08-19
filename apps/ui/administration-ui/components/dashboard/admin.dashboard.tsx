"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AdminSidebar } from "../admin.sidebar"
import { AdminHeader } from "../admin.header"
import { AdminStats } from "../admin.stats"
import { EmployeeRequests } from "../employee.requests"
import { DriverManagement } from "../driver.management"
import { RideAllocation } from "../ride-allocation"
import { AllocationQueue } from "./allocation-queue"
import { AdminComplaints } from "./admin-complaints"
import { AdminProfile } from "./admin-profile"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

export type AdminView = "overview" | "requests" | "drivers" | "allocation" | "queue" | "complaints" | "profile"

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("overview")

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <AdminStats />
      case "requests":
        return <EmployeeRequests />
      case "drivers":
        return <DriverManagement />
      case "allocation":
        return <RideAllocation />
      case "queue":
        return <AllocationQueue />
      case "complaints":
        return <AdminComplaints />
      case "profile":
        return <AdminProfile />
      default:
        return <AdminStats />
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <SidebarProvider>
        <AdminSidebar currentView={currentView} onViewChange={setCurrentView} />
        <SidebarInset>
          <AdminHeader currentView={currentView} />
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
