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

const Register = () => {
  const [toggle, setToggle] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, photo, email, password } = data;

    registerUser(email, password)
      .then(() => {
        updateUserInfo({ displayName: name, photoURL: photo })
          .then(() => {
            axiosPublic
              .post("/auth/register", { email, name, photo })
              .then((res) => {
                if (res.data?.data) {
                  toast.success("🎉 Account created successfully!");
                  router.push(from);
                }
              })
              .catch((err) => {
                console.error(`Register ERROR: ${err}`);
              });
          })
          .catch((error) => {
            console.error(`Update profile ERROR: ${error}`);
            toast.error(error.message || "Registration Failed!");
          });
      })
      .catch((error) => {
        console.error(`Register ERROR: ${error}`);
        toast.error(error.message || "Registration Failed!");
      });
  };

  return (
    <section className="h-screen overflow-hidden md:grid md:grid-cols-2">
      <div className="max-md:hidden relative p-6 md:p-8 xl:p-14 flex flex-col justify-between">
        <BlurCircle top="-100px" right="-100px" />

        <Link href="/">
          {" "}
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

      <div className="max-md:h-screen max-md:relative md:bg-white flex items-center justify-center p-14">
        <div className="md:hidden">
          <BlurCircle top="-100px" right="-100px" />
        </div>

        <div className="max-md:bg-white max-md:py-8 max-md:px-6 max-md:rounded-xl max-w-xl w-full">
          <SectionTitle title="Create an account" className="text-dark" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-4"
          >
            {/* Name */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base text-text-muted">Name*</label>
              <input
                type="text"
                className="border border-dark/50 rounded-md px-4 py-2 text-dark placeholder:text-dark"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-xs text-red-500">Name is required!!</p>
              )}
            </div>

            {/* Photo */}
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-base text-text-muted">Photo URL*</label>
              <input
                type="text"
                className="border border-dark/50 rounded-md px-4 py-2 text-dark placeholder:text-dark"
                placeholder="Enter your photo"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-xs text-red-500">Photo is required!!</p>
              )}
            </div>

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
              value="Create Account"
            />
          </form>

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
