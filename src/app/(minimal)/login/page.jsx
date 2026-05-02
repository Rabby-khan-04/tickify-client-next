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
import { loginUser } from "@/services/Auth.service";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SocialLogin from "@/components/auth/Sociallogin";

const Login = () => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
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
              className="w-full py-2 bg-primary text-white rounded-md text-xl cursor-pointer"
              value="Login"
            />
          </form>

          {/* ← Social login added here */}
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
