"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Building, ExternalLink, Home } from "lucide-react"

interface WrongTenantPageProps {
  inviteData?: {
    email: string
    tenantName: string
    tenantSlug: string
    invitedBy: string
    expiresAt: string
  } | null
}

export function WrongTenantPage({ inviteData }: WrongTenantPageProps) {
  const correctUrl = inviteData ? `https://${inviteData.tenantSlug}.riderota.com` : null

  const handleGoToCorrectTenant = () => {
    if (correctUrl) {
      window.location.href = correctUrl
    }
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-custom border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto"
            >
              <AlertCircle className="w-8 h-8 text-error-600" />
            </motion.div>

            <div>
              <CardTitle className="text-2xl font-bold" style={{ color: "var(--neutral-900)" }}>
                Wrong Organization
              </CardTitle>
              <CardDescription className="text-base mt-2">
                This invitation is for a different organization
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-error-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-error-600" />
                <span className="font-medium" style={{ color: "var(--error-700)" }}>
                  Organization Mismatch
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                You're trying to access an invitation that belongs to a different organization. Please make sure you're
                using the correct link.
              </p>
            </motion.div>

            {inviteData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-neutral-50 rounded-lg p-4 space-y-3"
              >
                <h4 className="font-medium" style={{ color: "var(--neutral-900)" }}>
                  Invitation Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--neutral-500)" }}>Organization:</span>
                    <span className="font-medium" style={{ color: "var(--neutral-700)" }}>
                      {inviteData.tenantName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--neutral-500)" }}>Email:</span>
                    <span className="font-medium" style={{ color: "var(--neutral-700)" }}>
                      {inviteData.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--neutral-500)" }}>Invited by:</span>
                    <span className="font-medium" style={{ color: "var(--neutral-700)" }}>
                      {inviteData.invitedBy}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-3"
            >
              <h4 className="font-medium" style={{ color: "var(--neutral-900)" }}>
                What can you do?
              </h4>
              <div className="space-y-3">
                {correctUrl && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleGoToCorrectTenant}
                      className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to {inviteData?.tenantName}
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="w-full h-11 border-neutral-200 hover:bg-neutral-50 transition-all duration-300 bg-transparent"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go to Homepage
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {correctUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-primary-50 rounded-lg p-3"
              >
                <p className="text-xs font-medium mb-1" style={{ color: "var(--primary-700)" }}>
                  Correct URL:
                </p>
                <p
                  className="text-xs font-mono bg-white px-2 py-1 rounded border break-all"
                  style={{ color: "var(--primary-600)" }}
                >
                  {correctUrl}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                If you continue to have issues, please contact the person who sent you the invitation.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
