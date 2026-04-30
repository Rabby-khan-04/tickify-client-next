"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const AdminGuard = ({ children }) => {
  const { isAdmin, isAuthLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, isAuthLoading, router]);

  if (!isAdmin) return null;

  return children;
};

export default AdminGuard;
