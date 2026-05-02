"use client";

import logo from "@/../public/brand/logo.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { registerUser, updateUserInfo } from "@/services/Auth.service";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import axiosPublic from "@/lib/axios/axiosPublic";
import SocialLogin from "@/components/auth/Sociallogin";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setServerError("");
    setIsSubmitting(true);
    const { name, photo, email, password } = data;
    try {
      await registerUser(email, password);
      await updateUserInfo({ displayName: name, photoURL: photo });
      const res = await axiosPublic.post("/auth/register", {
        email,
        name,
        photo,
      });
      if (res.data?.data) {
        toast.success("🎉 Account created successfully!");
        router.push(from);
      }
    } catch (error) {
      console.error(`Register ERROR: ${error}`);
      const msg =
        error?.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : error?.code === "auth/weak-password"
            ? "Password is too weak. Use at least 6 characters."
            : error.message || "Registration failed. Please try again.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "border rounded-md px-4 py-2 text-dark placeholder:text-dark/50 w-full transition-colors outline-none";
  const inputNormal = `${inputBase} border-dark/30 focus:border-primary/60`;
  const inputErr = `${inputBase} border-red-400 bg-red-50`;

  return (
    <section className="h-screen overflow-hidden md:grid md:grid-cols-2">
      {/* ── Left panel (dark / branded) ─────────────────────────── */}
      <div className="max-md:hidden relative overflow-hidden p-6 md:p-8 xl:p-14 flex flex-col justify-between bg-bg-base">
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
            Welcome. Begin your cinematic adventure now with our ticketing
            platform!
          </p>
        </div>
        <BlurCircle bottom="-50px" left="-50px" />
      </div>

      {/* ── Right panel (always light — intentional auth design) ── */}
      <div className="relative overflow-hidden max-md:h-screen bg-white flex items-center justify-center p-6 md:p-14">
        <BlurCircle top="-100px" right="-100px" />
        <BlurCircle bottom="-50px" left="-50px" />

        <div className="relative z-10 max-w-xl w-full">
          <SectionTitle title="Create an account" className="text-dark" />

          {/* Server-side error banner */}
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
            {/* Name */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="reg-name" className="text-base text-dark/60">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "reg-name-error" : undefined}
                placeholder="Enter your name"
                className={errors.name ? inputErr : inputNormal}
                {...register("name", {
                  required: "Name is required.",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters.",
                  },
                })}
              />
              {errors.name && (
                <p
                  id="reg-name-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="reg-photo" className="text-base text-dark/60">
                Photo URL <span aria-hidden="true">*</span>
              </label>
              <input
                id="reg-photo"
                type="url"
                aria-required="true"
                aria-invalid={!!errors.photo}
                aria-describedby={errors.photo ? "reg-photo-error" : undefined}
                placeholder="https://example.com/photo.jpg"
                className={errors.photo ? inputErr : inputNormal}
                {...register("photo", {
                  required: "Photo URL is required.",
                  pattern: {
                    value:
                      /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i,
                    message:
                      "Please enter a valid image URL (jpg, png, webp, etc.).",
                  },
                })}
              />
              {errors.photo && (
                <p
                  id="reg-photo-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="reg-email" className="text-base text-dark/60">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "reg-email-error" : undefined}
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
                  id="reg-email-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label htmlFor="reg-password" className="text-base text-dark/60">
                Password <span aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={toggle ? "text" : "password"}
                  autoComplete="new-password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby="reg-password-hint reg-password-error"
                  placeholder="Enter your password"
                  className={errors.password ? inputErr : inputNormal}
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[0-9])/,
                      message:
                        "Password must include at least one uppercase letter and one number.",
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
              <p id="reg-password-hint" className="text-xs text-dark/40">
                Min 6 characters, one uppercase letter and one number.
              </p>
              {errors.password && (
                <p
                  id="reg-password-error"
                  role="alert"
                  className="text-xs text-red-500"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-2 bg-primary text-dark font-semibold rounded-md text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting && (
                  <span className="w-4 h-4 rounded-full border-2 border-dark border-t-transparent animate-spin block" />
                )}
                {isSubmitting ? "Creating account..." : "Create Account"}
              </span>
            </button>
          </form>

          <SocialLogin />

          <div className="text-center mt-4 md:mt-6">
            <p className="text-dark/50 text-sm">
              Already Have An Account?{" "}
              <Link href="/login" className="text-primary font-medium">
                Login !!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
