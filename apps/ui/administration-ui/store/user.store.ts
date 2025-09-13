import { create } from "zustand";
import { components } from "@riderota/utils";
import { persist } from "zustand/middleware";

type UserData = components["schemas"]["UserDetails"];

interface UserState {
  userData: Partial<UserData>;
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
}

const initialState: Partial<UserData> = {
  name: "",
  email: "",
  phoneNo: "",
  age: null,
  profileImgUrl: null,
  id: undefined,
  role: undefined,
  status: undefined,
  tenantSlug: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: initialState,
      updateUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),
      resetUserData: () => set({ userData: initialState }),
    }),
    {
      name: "signup-storage", // unique name
    }
  )
);
