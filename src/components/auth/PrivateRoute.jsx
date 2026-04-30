"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loader from "../shared/loader/Loader";

const PrivateRoute = ({ children }) => {
  const { authUser, isAuthLoading, isUserInfoLoading, userInfo } =
    useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = isAuthLoading || isUserInfoLoading;

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [authUser, isLoading, router, pathname]);

  if (isLoading) {
    return <Loader />;
  }

  if (!authUser) {
    return null;
  }

  return children;
};

export default PrivateRoute;
