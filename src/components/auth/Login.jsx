"use client";

import logo from "@/../public/brand/logo.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { loginUser } from "@/services/Auth.service";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SocialLogin from "@/components/auth/Sociallogin";
import SectionTitle from "../shared/sectionTitle/SectionTitle";

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

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);
  const [serverError, setServerError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setServerError("");
    const { email, password } = data;
    try {
      await loginUser(email, password);
      toast.success("Welcome back!");
      router.push(from);
    } catch (error) {
      console.error(`Login ERROR: ${error}`);
      const msg =
        error?.code === "auth/invalid-credential"
          ? "Invalid email or password."
          : error.message || "Login failed. Please try again.";
      setServerError(msg);
    }
  };

  const handleDemoLogin = async (role) => {
    setServerError("");
    const { email, password } = DEMO_ACCOUNTS[role];
    setValue("email", email);
    setValue("password", password);
    setDemoLoading(role);
    try {
      await loginUser(email, password);
      toast.success(`Logged in as demo ${role}!`);
      router.push(from);
    } catch (error) {
      console.error(`Demo login ERROR: ${error}`);
      setServerError(error.message || "Demo login failed.");
    } finally {
      setDemoLoading(null);
    }
  };

  const isBusy = isSubmitting || !!demoLoading;

  const inputBase =
    "border rounded-md px-4 py-2 text-dark placeholder:text-dark/50 w-full transition-colors outline-none";
  const inputNormal = `${inputBase} border-dark/30 focus:border-primary/60`;
  const inputErr = `${inputBase} border-red-400 bg-red-50`;

  return (
    <section className="h-screen overflow-hidden md:grid md:grid-cols-2">
      {/* ── Left panel (dark / branded) ─────────────────────────── */}
      <div className="max-md:hidden relative p-6 md:p-8 xl:p-14 flex flex-col justify-between bg-bg-base">
        <BlurCircle top="-100px" right="-100px" />
        <Link href="/">
          <Image src={logo} className="w-32 lg:w-40" alt="logo" />
        </Link>
        <div className="max-w-2xl">
          <p
            className="text-4xl md:text-5xl xl:text-6xl italic leading-relaxed font-extralight bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, var(--text-primary), color-mix(in srgb, var(--text-primary) 40%, transparent))",
            }}
          >
            Welcome back. Your next cinematic experience is just a click away!
          </p>
        </div>
        <BlurCircle bottom="-50px" left="-50px" />
      </div>

      {/* ── Right panel (always light — intentional auth design) ── */}
      <div className="max-md:h-screen max-md:relative bg-white flex items-center justify-center p-14">
        <div className="md:hidden">
          <BlurCircle top="-100px" right="-100px" />
        </div>

        <div className="max-md:py-8 max-md:px-6 max-md:rounded-xl max-w-xl w-full">
          <SectionTitle title="Welcome back" className="text-dark" />

          {/* Demo login buttons */}
          <div
            className="flex gap-2.5 mb-5"
            role="group"
            aria-label="Demo account login"
          >
            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleDemoLogin("user")}
              aria-busy={demoLoading === "user"}
              className="flex-1 flex items-center justify-center gap-2 border border-dark/20 rounded-md py-2 text-sm font-medium text-text-dark/60 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
              disabled={isBusy}
              onClick={() => handleDemoLogin("admin")}
              aria-busy={demoLoading === "admin"}
              className="flex-1 flex items-center justify-center gap-2 border border-dark/20 rounded-md py-2 text-sm font-medium text-text-dark/60 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          <div className="flex items-center gap-3 mb-5" role="separator">
            <div className="flex-1 h-px bg-dark/10" />
            <span className="text-xs text-dark/40">or login manually</span>
            <div className="flex-1 h-px bg-dark/10" />
          </div>

          {/* Server error banner */}
          {serverError && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-md text-sm text-red-600"
            >
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
            noValidate
          >
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="login-email" className="text-base text-dark/60">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "login-email-error" : undefined
                }
                placeholder="Enter your email"
                className={errors.email ? inputErr : inputNormal}
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && (
                <p
                  id="login-email-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="login-password"
                className="text-base text-dark/60"
              >
                Password <span aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={toggle ? "text" : "password"}
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "login-password-error" : undefined
                  }
                  placeholder="Enter your password"
                  className={errors.password ? inputErr : inputNormal}
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  })}
                />
                <button
                  type="button"
                  aria-label={toggle ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-2.5 text-dark/40 hover:text-dark transition-colors cursor-pointer"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  {toggle ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="login-password-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isBusy}
              aria-busy={isSubmitting}
              className="w-full py-2 bg-primary text-dark font-semibold rounded-md text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
            >
              {isSubmitting && (
                <span className="w-4 h-4 rounded-full border-2 border-dark border-t-transparent animate-spin block" />
              )}
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <SocialLogin />

          <div className="text-center mt-4 md:mt-6">
            <p className="text-dark/50 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-medium">
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
