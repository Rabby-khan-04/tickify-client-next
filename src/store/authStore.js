import { create } from "zustand";

const useAuthStore = create((set) => ({
  authUser: null,
  userInfo: null,
  isAuthLoading: true,
  isUserInfoLoading: true,
  isAdmin: false,

  setAuthUser: (user) => set({ authUser: user }),
  setUserInfo: (info) => set({ userInfo: info }),
  setLoading: (value) => set({ isAuthLoading: value }),
  setUserLoading: (value) => set({ isUserInfoLoading: value }),
  setAdmin: (value) => set({ isAdmin: value }),
}));

export default useAuthStore;
