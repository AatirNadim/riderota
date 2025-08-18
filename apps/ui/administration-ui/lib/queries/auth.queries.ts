"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { components, paths } from "@riderota/utils";
import axiosClient from "@/lib/axios";

type SuperAdminCreatePayload = components["schemas"]["SuperadminCreatePayload"];

const superAdminSignup = async (payload: SuperAdminCreatePayload) => {
  const pathHolder: keyof paths = "/api/auth/signup/superadmin";

  const { data } = await axiosClient.post(pathHolder, payload);
  console.log("Superadmin created:", data);
  return data;
};

const superAdminLogin = async (
  payload: components["schemas"]["LoginPayload"]
) => {
  const pathHolder: keyof paths = "/api/auth/login";

  const { data } = await axiosClient.post(pathHolder, payload);
  console.log("Superadmin logged in:", data);
  return data;
};

const whoAmI = async () => {
  const pathHolder: keyof paths = "/api/auth/whoami";

  const { data } = await axiosClient.get(pathHolder);
  console.log("User information retrieved:", data);
  return data;
};

const useWhoAmI = () => {
  return useQuery({
    queryKey: ["whoAmI"],
    queryFn: whoAmI,
  });
};

const useSuperAdminSignup = () => {
  return useMutation({
    mutationFn: superAdminSignup,
  });
};

const useSuperAdminLogin = () => {
  return useMutation({
    mutationFn: superAdminLogin,
  });
};

export { useWhoAmI, useSuperAdminSignup, useSuperAdminLogin };
