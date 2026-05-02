"use client";

import logo from "@/../public/brand/logo.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { loginUser } from "@/services/Auth.service";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SocialLogin from "@/components/auth/Sociallogin";

const DEMO_ACCOUNTS = {
  user: {
    email: process.env.NEXT_PUBLIC_DEMO_USER_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD,
  },
  admin: {
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
  },
};

console.log(DEMO_ACCOUNTS);

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null); // "user" | "admin" | null

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await loginUser(email, password);
      toast.success("Welcome back!");
      router.push(from);
    } catch (error) {
      console.error(`Login ERROR: ${error}`);
      toast.error(error.message || "Login failed!");
    }
  };

  const handleDemoLogin = async (role) => {
    const { email, password } = DEMO_ACCOUNTS[role];
    // Fill the inputs visually
    setValue("email", email);
    setValue("password", password);
    setDemoLoading(role);
    try {
      await loginUser(email, password);
      toast.success(`Logged in as demo ${role}!`);
      router.push(from);
    } catch (error) {
      console.error(`Demo login ERROR: ${error}`);
      toast.error(error.message || "Demo login failed!");
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <section className="h-screen overflow-hidden md:grid md:grid-cols-2">
      {/* Left panel */}
      <div className="max-md:hidden relative p-6 md:p-8 xl:p-14 flex flex-col justify-between">
        <BlurCircle top="-100px" right="-100px" />
        <Link href="/">
          <Image src={logo} className="w-32 lg:w-40" alt="logo" />
        </Link>
        <div className="max-w-2xl">
          <p className="text-4xl md:text-5xl xl:text-6xl italic leading-relaxed font-extralight text-transparent bg-linear-to-b from-white to-white/40 bg-clip-text">
            Welcome back. Your next cinematic experience is just a click away!
          </p>
        </div>
        <BlurCircle bottom="-50px" left="-50px" />
      </div>

      {/* Right panel */}
      <div className="max-md:h-screen max-md:relative md:bg-white flex items-center justify-center p-14">
        <div className="md:hidden">
          <BlurCircle top="-100px" right="-100px" />
        </div>

        <div className="max-md:bg-white max-md:py-8 max-md:px-6 max-md:rounded-xl max-w-xl w-full">
          <SectionTitle title="Welcome back" className="text-dark" />

          {/* Demo login buttons */}
          <div className="flex gap-2.5 mb-5">
            <button
              type="button"
              disabled={!!demoLoading || isSubmitting}
              onClick={() => handleDemoLogin("user")}
              className="flex-1 flex items-center justify-center gap-2 border border-dark/20 rounded-md py-2 text-sm font-medium text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="flex items-center justify-center w-3.5 h-3.5 shrink-0">
                {demoLoading === "user" ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin block" />
                ) : (
                  <User className="w-3.5 h-3.5" />
                )}
              </span>
              Demo User
            </button>

            <button
              type="button"
              disabled={!!demoLoading || isSubmitting}
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 flex items-center justify-center gap-2 border border-dark/20 rounded-md py-2 text-sm font-medium text-text-muted hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span className="flex items-center justify-center w-3.5 h-3.5 shrink-0">
                {demoLoading === "admin" ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin block" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5" />
                )}
              </span>
              Demo Admin
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-dark/10" />
            <span className="text-xs text-text-muted">or login manually</span>
            <div className="flex-1 h-px bg-dark/10" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            {/* Email */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base text-text-muted">Email*</label>
              <input
                type="email"
                className="border border-dark/50 rounded-md px-4 py-2 text-dark placeholder:text-dark"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">Email is required!!</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base text-text-muted">Password*</label>
              <div className="relative">
                <input
                  type={toggle ? "text" : "password"}
                  className="border border-dark/50 rounded-md px-4 py-2 text-dark placeholder:text-dark w-full"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-2.5 top-2.5 text-dark cursor-pointer"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  {toggle ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">Password is required!!</p>
              )}
            </div>

            <input
              type="submit"
              disabled={isSubmitting || !!demoLoading}
              className="w-full py-2 bg-primary text-white rounded-md text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              value={isSubmitting ? "Logging in..." : "Login"}
            />
          </form>

          <SocialLogin />

          <div className="text-center mt-4 md:mt-6">
            <p className="text-text-muted text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary">
                Register !!
              </Link>
            </p>
          </div>
        </div>

        <div className="md:hidden">
          <BlurCircle bottom="-50px" left="-50px" />
        </div>
      </div>
    </section>
  );
};

export default Login;
