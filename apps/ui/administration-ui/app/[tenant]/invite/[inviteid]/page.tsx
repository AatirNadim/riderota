"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { AdminRegistrationForm } from "@/components/invite/admin-registration-form"
import { DriverRegistrationForm } from "@/components/invite/driver-registration-form"
import { EmployeeRegistrationForm } from "@/components/invite/employee-registration-form"
import { ExpiredInvitePage } from "@/components/invite/expired-invite-page"
import { WrongTenantPage } from "@/components/invite/wrong-tenant-page"
import { RegistrationSuccess } from "@/components/invite/registration-success"
import { Toaster } from "@/components/ui/sonner"

interface InviteValidation {
  isValid: boolean
  isExpired: boolean
  isTenantMismatch: boolean
  userType: "admin" | "driver" | "employee" | null
  inviteData: {
    email: string
    tenantName: string
    tenantSlug: string
    invitedBy: string
    expiresAt: string
  } | null
}

export default function InvitePage() {
  const params = useParams()
  const inviteId = params.inviteId as string
  const [validation, setValidation] = useState<InviteValidation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [registeredUserData, setRegisteredUserData] = useState<any>(null)

  useEffect(() => {
    validateInvite()
  }, [inviteId])

  const validateInvite = async () => {
    try {
      setIsLoading(true)

      // Simulate API call to validate invite
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Get current tenant from URL (in real app, this would be from subdomain)
      const currentTenant = window.location.hostname.split(".")[0] || "demo"

      // Mock validation logic - replace with actual API call
      const mockValidation: InviteValidation = {
        isValid: true,
        isExpired: Math.random() > 0.8, // 20% chance of expired for demo
        isTenantMismatch: Math.random() > 0.9, // 10% chance of tenant mismatch for demo
        userType: ["admin", "driver", "employee"][Math.floor(Math.random() * 3)] as any,
        inviteData: {
          email: "john.doe@example.com",
          tenantName: "Acme Corporation",
          tenantSlug: currentTenant,
          invitedBy: "Sarah Johnson",
          expiresAt: "2024-12-31T23:59:59Z",
        },
      }

      setValidation(mockValidation)
    } catch (error) {
      console.error("Failed to validate invite:", error)
      setValidation({
        isValid: false,
        isExpired: true,
        isTenantMismatch: false,
        userType: null,
        inviteData: null,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegistrationSuccess = (userData: any) => {
    setRegisteredUserData(userData)
    setRegistrationComplete(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">Validating Invitation</h2>
            <p className="text-white/80">Please wait while we verify your invitation...</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!validation) {
    return <ExpiredInvitePage />
  }

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-hero-gradient">
        <RegistrationSuccess
          userData={registeredUserData}
          userType={validation.userType!}
          tenantData={validation.inviteData!}
        />
        <Toaster />
      </div>
    )
  }

  if (validation.isExpired) {
    return <ExpiredInvitePage inviteData={validation.inviteData} />
  }

  if (validation.isTenantMismatch) {
    return <WrongTenantPage inviteData={validation.inviteData} />
  }

  if (!validation.isValid || !validation.userType || !validation.inviteData) {
    return <ExpiredInvitePage />
  }

  const renderRegistrationForm = () => {
    const commonProps = {
      inviteData: validation.inviteData!,
      onSuccess: handleRegistrationSuccess,
    }

    switch (validation.userType) {
      case "admin":
        return <AdminRegistrationForm {...commonProps} />
      case "driver":
        return <DriverRegistrationForm {...commonProps} />
      case "employee":
        return <EmployeeRegistrationForm {...commonProps} />
      default:
        return <ExpiredInvitePage />
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      {renderRegistrationForm()}
      <Toaster />
    </div>
  )
}
