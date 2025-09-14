"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Clock, Mail, RefreshCw } from "lucide-react"

interface ExpiredInvitePageProps {
  inviteData?: {
    email: string
    tenantName: string
    tenantSlug: string
    invitedBy: string
    expiresAt: string
  } | null
}

export function ExpiredInvitePage({ inviteData }: ExpiredInvitePageProps) {
  const handleContactSupport = () => {
    if (inviteData?.email) {
      window.location.href = `mailto:${inviteData.invitedBy}?subject=Invitation Expired - ${inviteData.tenantName}&body=Hi,\n\nMy invitation link has expired. Could you please send me a new invitation?\n\nEmail: ${inviteData.email}\n\nThank you!`
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
              className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto"
            >
              <AlertTriangle className="w-8 h-8 text-warning-600" />
            </motion.div>

            <div>
              <CardTitle className="text-2xl font-bold" style={{ color: "var(--neutral-900)" }}>
                Invitation Expired
              </CardTitle>
              <CardDescription className="text-base mt-2">This invitation link is no longer valid</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-warning-50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-warning-600" />
                <span className="font-medium" style={{ color: "var(--warning-700)" }}>
                  What happened?
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                Invitation links expire for security reasons. This link may have been used already or has passed its
                expiration date.
              </p>
            </motion.div>

            {inviteData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-neutral-50 rounded-lg p-4 space-y-2"
              >
                <h4 className="font-medium" style={{ color: "var(--neutral-900)" }}>
                  Invitation Details
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span style={{ color: "var(--neutral-600)" }}>Email: {inviteData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                    </span>
                    <span style={{ color: "var(--neutral-600)" }}>Organization: {inviteData.tenantName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full" />
                    </span>
                    <span style={{ color: "var(--neutral-600)" }}>Invited by: {inviteData.invitedBy}</span>
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
                {inviteData && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleContactSupport}
                      className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Request New Invitation
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="w-full h-11 border-neutral-200 hover:bg-neutral-50 transition-all duration-300 bg-transparent"
                  >
                    Go to Homepage
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                Need help? Contact your administrator or visit our support page.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
