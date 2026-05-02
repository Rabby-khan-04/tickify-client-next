"use client";

import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { loginWithGoogle } from "@/services/Auth.service";
import axiosPublic from "@/lib/axios/axiosPublic";

const SocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const res = await axiosPublic.post("/auth/register", {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });

      if (res.data?.data) {
        toast.success("🎉 Logged in with Google!");
        router.push(from);
      }
    } catch (err) {
      console.error(`Google Login ERROR: ${err}`);
      toast.error(err.message || "Google login failed!");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-dark/15" />
        <span className="text-text-muted text-xs">or continue with</span>
        <div className="flex-1 h-px bg-dark/15" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-dark/20 rounded-md py-2.5 px-4 text-dark text-sm font-medium hover:bg-dark/5 transition-colors cursor-pointer"
      >
        {/* Google SVG icon */}
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
          <path
            d="M47.532 24.552c0-1.636-.138-3.2-.395-4.692H24.48v9.19h12.978c-.576 2.95-2.26 5.454-4.764 7.13v5.858h7.68c4.496-4.14 7.158-10.24 7.158-17.486z"
            fill="#4285F4"
          />
          <path
            d="M24.48 48c6.48 0 11.916-2.146 15.888-5.814l-7.68-5.858c-2.148 1.44-4.902 2.292-8.208 2.292-6.312 0-11.658-4.262-13.566-9.988H3.002v6.05C6.956 42.886 15.124 48 24.48 48z"
            fill="#34A853"
          />
          <path
            d="M10.914 28.632A14.48 14.48 0 0 1 10.16 24c0-1.61.276-3.172.754-4.632v-6.05H3.002A23.954 23.954 0 0 0 .48 24c0 3.868.924 7.524 2.522 10.682l7.912-6.05z"
            fill="#FBBC05"
          />
          <path
            d="M24.48 9.38c3.556 0 6.744 1.222 9.256 3.624l6.888-6.888C36.392 2.146 30.956 0 24.48 0 15.124 0 6.956 5.114 3.002 13.318l7.912 6.05c1.908-5.726 7.254-9.988 13.566-9.988z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
