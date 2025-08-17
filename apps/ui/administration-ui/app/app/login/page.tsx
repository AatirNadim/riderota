"use client"

import { LoginForm } from "@/components/form/login-form"
import { Toaster } from "@/components/ui/sonner"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <LoginForm />
      <Toaster />
    </div>
  )
}
