"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { loginUser } from "@/services/Auth.service";
import BlurCircle from "@/components/shared/blurCircle/BlurCircle";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";

const Login = () => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // fallback to home if no redirect
  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);

      toast.success("Successfully logged in!");
      console.log("Logging user");
      router.push(from);
    } catch (err) {
      console.log(`Login ERROR: ${err}`);
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Login failed. Please try again.",
      );
    }
  };

  return (
    <section className="relative z-50 overflow-hidden">
      <BlurCircle top="-150px" right="-150px" />

      <div className="container-fluid h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-xl py-8 px-6 md:py-20 md:px-10">
          <SectionTitle title="Login to your account" className="text-dark" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            {/* EMAIL */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base text-text-muted">Email*</label>

              <input
                type="email"
                className="border text-dark placeholder:text-dark border-dark/50 rounded-md px-4 py-2 w-full"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />

              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  Email is required!!
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base text-text-muted">Password*</label>

              <div className="relative">
                <input
                  type={toggle ? "text" : "password"}
                  className="border text-dark placeholder:text-dark border-dark/50 rounded-md px-4 py-2 w-full"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />

                <button
                  type="button"
                  className="absolute right-2.5 top-2.5 text-text-muted cursor-pointer"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  {toggle ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 font-medium">
                  Password is required!!
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <input
              type="submit"
              value="Login"
              className="w-full py-2 px-4 bg-primary text-white rounded-md text-xl font-medium cursor-pointer"
            />
          </form>

          {/* REGISTER */}
          <div className="text-center mt-4 md:mt-6">
            <p className="text-text-muted text-sm">
              Don{"'"}t Have An Account?{" "}
              <Link href={`/register?from=${from}`} className="text-primary">
                Register Here!!
              </Link>
            </p>
          </div>
        </div>
      </div>

      <BlurCircle bottom="-150px" left="-150px" />
    </section>
  );
};

export default Login;
