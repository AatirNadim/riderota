// "use client";

// import { useUserStore } from "@/store/user.store";
// import { useWhoAmI } from "@/lib/queries/auth.queries";
// import { useEffect } from "react";

// export const useUser = () => {
//   const { userData, updateUserData } = useUserStore();

//   // Conditionally fetch user data only if it doesn't exist in the store
//   const {
//     data: fetchedUserDetails,
//     isLoading,
//     isError,
//   } = useWhoAmI({
//     enabled: !userData.id,
//   });

//   // When data is fetched successfully, update the Zustand store
//   useEffect(() => {
//     if (fetchedUserDetails) {
//       updateUserData(fetchedUserDetails);
//     }
//   }, [fetchedUserDetails, updateUserData]);

//   // Return data from the store if it exists, otherwise return the fetched data
//   const userDetails = userData.id ? userData : fetchedUserDetails;

//   return { userDetails, isLoading, isError };
// };