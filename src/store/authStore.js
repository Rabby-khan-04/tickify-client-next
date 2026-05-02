import { create } from "zustand";

const useAuthStore = create((set) => ({
  authUser: null,
  userInfo: null,
  isAuthLoading: true,
  isUserInfoLoading: true,
  isAdmin: false,

  setAuthState: (data) => set(data),
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useAuthStore;
