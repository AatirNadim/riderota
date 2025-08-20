"use client";

import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { userData } = useUserStore();
  const router = useRouter();

  console.log("userData", userData);

  if (userData.tenantSlug) {
    if (userData.role === "SUPERADMIN") {
      router.push(`/${userData.tenantSlug}/superadmin/console`);
    } else {
      router.push(`/${userData.tenantSlug}/admin/console`);
    }
  } else if (userData.id && !userData.tenantSlug) {
    router.push("/register-tenant");
  }

  return <div>page</div>;
};

export default Page;
