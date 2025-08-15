"use client";

import { useMutation } from "@tanstack/react-query";
import { components, paths } from "@riderota/utils";
import axios from "axios";

type SuperAdminCreatePayload = components["schemas"]["SuperadminCreatePayload"];

const superAdminSignup = async (payload: SuperAdminCreatePayload) => {
  const pathHolder: keyof paths = "/api/auth/signup/superadmin";

  const { data } = await axios.post(pathHolder, payload);
  console.log("Superadmin created:", data);
  return data;
};

export const useSuperAdminSignup = () => {
  return useMutation({
    mutationFn: superAdminSignup,
  });
};
