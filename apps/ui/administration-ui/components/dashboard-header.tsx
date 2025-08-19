"use client"

import { motion } from "framer-motion"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import type { DashboardView } from "./super-admin-dashboard"

const viewTitles: Record<DashboardView, string> = {
  overview: "Dashboard Overview",
  invite: "Invite Users",
  users: "User Management",
  complaints: "Complaints Dashboard",
  profile: "Profile Settings",
}

interface DashboardHeaderProps {
  currentView: DashboardView
}

export function DashboardHeader({ currentView }: DashboardHeaderProps) {
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
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder="Search..." className="w-64 pl-9 h-9 bg-white border-neutral-300" />
        </div>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full text-xs"></span>
        </Button>

        <div className="flex items-center space-x-2 ml-4">
          <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center">
            <span className="text-white text-sm font-semibold">SA</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium" style={{ color: "var(--neutral-900)" }}>
              Super Admin
            </p>
            <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
              admin@riderota.com
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
