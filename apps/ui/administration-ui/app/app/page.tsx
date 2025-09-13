"use client";

import Logout from "@/components/logout.button";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { userData } = useUserStore();
  const router = useRouter();

  console.log("userData", userData);

  if (userData.tenantSlug) {
    const newBasePath = `${window.location.protocol}//${userData.tenantSlug}.${
      process.env.NEXT_PUBLIC_BASE_DOMAIN || "localhost:3001"
    }/`;
    if (userData.role === "SUPERADMIN") {
      window.location.replace(`${newBasePath}/superadmin/console`);
    } else {
      window.location.replace(`${newBasePath}/admin/console`);
    }
  } else if (userData.id && !userData.tenantSlug) {
    router.push("/register-tenant");
  } else if (!userData.id) {
    router.push("/login");
  }

  return (
    <div>
      page hello
      <Logout />
    </div>
  );
};

export default Page;
