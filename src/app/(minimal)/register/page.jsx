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
    watch,
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
            Welcome. Begin your cinematic adventure now with our ticketing
            platform!
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
              <label htmlFor="reg-name" className="text-base text-text-muted">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "reg-name-error" : undefined}
                className={`border rounded-md px-4 py-2 text-dark placeholder:text-dark transition-colors ${
                  errors.name ? "border-red-400 bg-red-50" : "border-dark/50"
                }`}
                placeholder="Enter your name"
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
              <label htmlFor="reg-photo" className="text-base text-text-muted">
                Photo URL <span aria-hidden="true">*</span>
              </label>
              <input
                id="reg-photo"
                type="url"
                aria-required="true"
                aria-invalid={!!errors.photo}
                aria-describedby={errors.photo ? "reg-photo-error" : undefined}
                className={`border rounded-md px-4 py-2 text-dark placeholder:text-dark transition-colors ${
                  errors.photo ? "border-red-400 bg-red-50" : "border-dark/50"
                }`}
                placeholder="https://example.com/photo.jpg"
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
              <label htmlFor="reg-email" className="text-base text-text-muted">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "reg-email-error" : undefined}
                className={`border rounded-md px-4 py-2 text-dark placeholder:text-dark transition-colors ${
                  errors.email ? "border-red-400 bg-red-50" : "border-dark/50"
                }`}
                placeholder="Enter your email"
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
              <label
                htmlFor="reg-password"
                className="text-base text-text-muted"
              >
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
                  className={`border rounded-md px-4 py-2 text-dark placeholder:text-dark w-full transition-colors ${
                    errors.password
                      ? "border-red-400 bg-red-50"
                      : "border-dark/50"
                  }`}
                  placeholder="Enter your password"
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
                  className="absolute right-2.5 top-2.5 text-dark cursor-pointer"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  {toggle ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <p id="reg-password-hint" className="text-xs text-text-muted">
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

            {/* Submit button — children wrapped in a stable span to prevent
                browser-extension DOM injection causing React hydration errors */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-2 bg-primary text-white rounded-md text-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-opacity"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting && (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin block" />
                )}
                {isSubmitting ? "Creating account..." : "Create Account"}
              </span>
            </button>
          </form>

          <SocialLogin />

          <div className="text-center mt-4 md:mt-6">
            <p className="text-text-muted text-sm">
              Already Have An Account?{" "}
              <Link href="/login" className="text-primary">
                Login !!
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

export default Register;
