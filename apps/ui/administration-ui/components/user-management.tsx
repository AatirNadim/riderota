"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, AlertTriangle, Ban, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "driver" | "employee"
  status: "active" | "suspended" | "pending"
  warnings: number
  joinedDate: string
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    status: "active",
    warnings: 0,
    joinedDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "driver",
    status: "active",
    warnings: 1,
    joinedDate: "2024-02-20",
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike.davis@company.com",
    role: "employee",
    status: "active",
    warnings: 0,
    joinedDate: "2024-03-10",
  },
  {
    id: "4",
    name: "Lisa Wilson",
    email: "lisa.wilson@company.com",
    role: "driver",
    status: "suspended",
    warnings: 2,
    joinedDate: "2024-01-05",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleWarnUser = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, warnings: user.warnings + 1 } : user)))
    toast.success("Warning issued to user")
  }

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "suspended" as const } : user)))
    toast.success("User suspended successfully")
  }

  const handleReactivateUser = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: "active" as const } : user)))
    toast.success("User reactivated successfully")
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-primary-100 text-primary-700"
      case "driver":
        return "bg-accent-100 text-accent-700"
      case "employee":
        return "bg-secondary-100 text-secondary-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-100 text-success-700"
      case "suspended":
        return "bg-error-100 text-error-700"
      case "pending":
        return "bg-warning-100 text-warning-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--neutral-900)" }}>
          User Management
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Manage all users, issue warnings, and handle suspensions
        </p>
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>{filteredUsers.length} users found</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="driver">Driver</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold" style={{ color: "var(--neutral-900)" }}>
                      {user.name}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                      {user.email}
                    </p>
                    <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                      Joined {new Date(user.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  {user.warnings > 0 && (
                    <div className="flex items-center space-x-1 text-warning-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm font-medium">{user.warnings}</span>
                    </div>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleWarnUser(user.id)}>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Issue Warning
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status === "active" ? (
                        <DropdownMenuItem onClick={() => handleSuspendUser(user.id)} className="text-error-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleReactivateUser(user.id)} className="text-success-600">
                          Reactivate User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
