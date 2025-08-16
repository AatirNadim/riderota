import { create } from "zustand";
import { components } from "@riderota/utils";
import { persist } from "zustand/middleware";

type SignupData = components["schemas"]["SuperadminCreatePayload"];

interface SignupState {
  signupData: Partial<SignupData>;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignupData: () => void;
}

const initialState: Partial<SignupData> = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  age: undefined,
  profileImgUrl: undefined,
};

export const useSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      signupData: initialState,
      updateSignupData: (data) =>
        set((state) => ({
          signupData: { ...state.signupData, ...data },
        })),
      resetSignupData: () => set({ signupData: initialState }),
    }),
    {
      name: "signup-storage", // unique name
    }
  )
);
