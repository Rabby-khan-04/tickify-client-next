"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/lib/firebase/firebase.config";
import axiosPublic from "@/lib/axios/axiosPublic";
import axiosSecure from "@/lib/axios/axiosSecure";
import useAuthStore from "@/store/authStore";

const AuthProvider = ({ children }) => {
  const { setAuthUser, setUserInfo, setLoading, setUserLoading, setAdmin } =
    useAuthStore();

  useEffect(() => {
    setLoading(true);
    setUserLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setAuthUser(null);
          setUserInfo(null);
          setLoading(false);
          setUserLoading(false);
          return;
        }

        setAuthUser(user);

        await axiosPublic.post("/auth/jwt", { email: user.email });

        const res = await axiosSecure.get("/users/me");

        setUserInfo(res.data.data);
        setAdmin(res.data.data.role === "admin");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setAuthUser, setUserInfo, setLoading, setUserLoading, setAdmin]);

  return children;
};

export default AuthProvider;
