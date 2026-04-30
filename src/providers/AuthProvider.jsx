"use client";

import { useEffect } from "react";
import { subscribeAuth } from "@/services/Auth.service";
import useAuthStore from "@/store/authStore";

const AuthProvider = ({ children }) => {
  const setAuthState = useAuthStore((state) => state.setAuthState);

  useEffect(() => {
    const unsubscribe = subscribeAuth(setAuthState);
    return () => unsubscribe();
  }, [setAuthState]);

  return children;
};

export default AuthProvider;
