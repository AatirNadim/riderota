"use client"

import { motion } from "framer-motion"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { AdminView } from "./admin-dashboard"

const viewTitles: Record<AdminView, string> = {
  overview: "Dashboard Overview",
  requests: "Employee Requests",
  drivers: "Driver Management",
  allocation: "Ride Allocation",
  queue: "Allocation Queue",
  complaints: "File Complaints",
  profile: "Profile Settings",
}

interface AdminHeaderProps {
  currentView: AdminView
}

export function AdminHeader({ currentView }: AdminHeaderProps) {
  return (
    <motion.header
      className="flex h-16 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white/80 backdrop-blur-md px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex-1">
        <h1 className="text-lg font-semibold" style={{ color: "var(--neutral-900)" }}>
          {viewTitles[currentView]}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Quick Stats */}
        <div className="hidden lg:flex items-center gap-4 mr-4">
          <div className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4 text-warning-600" />
            <span style={{ color: "var(--neutral-600)" }}>8 Pending</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="w-2 h-2 bg-success-500 rounded-full"></span>
            <span style={{ color: "var(--neutral-600)" }}>15 Active Rides</span>
          </div>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder="Search..." className="w-64 pl-9 h-9 bg-white border-neutral-300" />
        </div>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 bg-error-500 text-white text-xs px-1 py-0 min-w-[16px] h-4 flex items-center justify-center">
            3
          </Badge>
        </Button>

        <div className="flex items-center space-x-2 ml-4">
          <div className="w-8 h-8 rounded-full bg-secondary-gradient flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JS</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium" style={{ color: "var(--neutral-900)" }}>
              John Smith
            </p>
            <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
              Operations Admin
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
