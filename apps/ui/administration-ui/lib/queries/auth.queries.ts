"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { components, paths } from "@riderota/utils";
import axiosClient from "@/lib/axios";

type SuperAdminCreatePayload = components["schemas"]["SuperadminCreatePayload"];

const superAdminSignup = async (payload: SuperAdminCreatePayload) => {
  const pathHolder: keyof paths = "/api/auth/signup/superadmin";

  const { data, status } = await axiosClient.post(pathHolder, payload);
  console.log("Superadmin created:", data);
  return data as components["schemas"]["UserDetails"];
};

const administrationLogin = async (
  payload: components["schemas"]["LoginPayload"]
) => {
  const pathHolder: keyof paths = "/api/auth/login/administration";

  const { data } = await axiosClient.post(pathHolder, payload);
  console.log("Superadmin logged in:", data);
  return data as components["schemas"]["UserDetails"];
};

const whoAmI = async () => {
  const pathHolder: keyof paths = "/api/auth/whoami";

  const { data } = await axiosClient.get(pathHolder);
  console.log("User information retrieved:", data);
  return data;
};

const logout = async () => {
  const pathHolder: keyof paths = "/api/auth/clearSession";

  const { data } = await axiosClient.post(pathHolder);
  // console.log("User logged out:", data);
  return data;
};

const useWhoAmI = () => {
  return useQuery({
    queryKey: ["whoAmI"],
    queryFn: whoAmI,
    staleTime: 0,
    gcTime: 0,
  });
};

const useSuperAdminSignup = () => {
  return useMutation({
    mutationFn: superAdminSignup,
  });
};

const useAdministrationLogin = () => {
  return useMutation({
    mutationFn: administrationLogin,
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export { useWhoAmI, useSuperAdminSignup, useAdministrationLogin, useLogout };
