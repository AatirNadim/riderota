"use client";

import { LoginForm } from "@/components/form/login-form";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { userData } = useUserStore();
  const router = useRouter();

  if (userData.tenantSlug) {
    if (userData.role === "SUPERADMIN") {
      router.push(`/${userData.tenantSlug}/superadmin/console`);
    } else {
      router.push(`/${userData.tenantSlug}/admin/console`);
    }
  } else if (userData.id && !userData.tenantSlug) {
    router.push("/register-tenant");
  }
  
  return (
    <div className="min-h-screen bg-hero-gradient">
      <LoginForm />
      <Toaster />
    </div>
  );
}
