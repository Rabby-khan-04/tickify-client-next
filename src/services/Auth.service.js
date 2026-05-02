import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

import auth from "@/lib/firebase/firebase.config";
import axiosPublic from "@/lib/axios/axiosPublic";
import axiosSecure from "@/lib/axios/axiosSecure";
import toast from "react-hot-toast";

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

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const changeUserPassword = (newPassword) => {
  const user = auth.currentUser;
  return updatePassword(user, newPassword);
};

export const updateUserEmail = (email) => {
  const user = auth.currentUser;
  return verifyBeforeUpdateEmail(user, email);
};

export const logoutUser = async () => {
  signOut(auth)
    .then(() => {
      axiosPublic
        .post("/auth/logout")
        .then(() => {
          localStorage.removeItem("access-token");
          toast.success("User logged out!!");
        })
        .catch((err) => {
          console.log(`Error in singout: ${err}`);
        });
    })
    .catch((err) => {
      toast.error("Something went wrong!!");
      console.log(`Error In Signout: ${err}`);
    });
};

// -------------------- AUTH LISTENER --------------------

export const subscribeAuth = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    // 👇 Always signal "still resolving" at the start
    callback({
      authUser: null,
      userInfo: null,
      isAdmin: false,
      isAuthLoading: true, // <-- key change
      isUserInfoLoading: true,
    });

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
