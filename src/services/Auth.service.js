import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import auth from "@/lib/firebase/firebase.config";
import axiosPublic from "@/lib/axios/axiosPublic";
import axiosSecure from "@/lib/axios/axiosSecure";

// -------------------- AUTH ACTIONS --------------------

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const updateUserInfo = (info) => {
  return updateProfile(auth.currentUser, info);
};

export const logoutUser = async () => {
  await signOut(auth);
  await axiosPublic.post("/auth/logout");
};

// -------------------- AUTH LISTENER --------------------

export const subscribeAuth = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback({
        authUser: null,
        userInfo: null,
        isAdmin: false,
        isAuthLoading: false,
        isUserInfoLoading: false,
      });
      return;
    }

    try {
      await axiosPublic.post("/auth/jwt", { email: user.email });

      const res = await axiosSecure.get("/users/me");

      const userInfo = res?.data?.data;

      callback({
        authUser: user,
        userInfo,
        isAdmin: userInfo?.role === "admin",
        isAuthLoading: false,
        isUserInfoLoading: false,
      });
    } catch (err) {
      console.log("Auth sync error:", err);

      callback({
        authUser: user,
        userInfo: null,
        isAdmin: false,
        isAuthLoading: false,
        isUserInfoLoading: false,
      });
    }
  });
};
