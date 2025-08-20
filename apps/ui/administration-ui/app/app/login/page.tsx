"use client";

import { LoginForm } from "@/components/form/login-form";
import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { userData } = useUserStore();
  const router = useRouter();

  if (userData.tenantSlug) {
    const newBasePath = `${window.location.protocol}//${userData.tenantSlug}.${
      process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost"
    }.com/`;

    if (userData.role === "SUPERADMIN") {
      window.location.replace(`${newBasePath}superadmin/console`);
    } else {
      window.location.replace(`${newBasePath}admin/console`);
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
