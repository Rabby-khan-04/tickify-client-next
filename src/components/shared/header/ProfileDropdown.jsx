"use client";

import { ChevronDown, Heart, LogOut, Settings, Ticket } from "lucide-react";
import avatar from "@/../public/icon/profile.png";
import Link from "next/link";
import Image from "next/image";
import { logoutUser } from "@/services/Auth.service";
import useAuthStore from "@/store/authStore";

const ProfileDropdown = ({ dropDown, setDropDown }) => {
  const { authUser } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    setDropDown(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setDropDown((prev) => !prev)}
        className="flex items-center justify-end cursor-pointer gap-2"
      >
        <Image
          src={authUser?.photoURL || avatar}
          width={32}
          height={32}
          className="size-8 rounded-full object-cover object-center"
          alt="profile"
        />

        <div className="max-lg:hidden space-y-1">
          <h4 className="text-sm text-white/80">Hi, Welcome</h4>
          <p className="text-sm lg:text-lg font-medium text-white truncate w-28">
            {authUser?.displayName || "Albert Edison"}
          </p>
        </div>

        <div className="max-lg:hidden">
          <ChevronDown
            className={`text-white transform ${
              dropDown ? "rotate-180" : ""
            } transition-all duration-75`}
          />
        </div>
      </div>

      <div
        className={`absolute z-50 top-[130%] max-md:right-[-150%] md:right-0 bg-white w-72 md:w-80 rounded-2xl py-4 px-5 ${
          dropDown
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } overflow-hidden transition-all duration-75`}
      >
        <div className="flex items-center gap-5 pb-5">
          <Image
            src={authUser?.photoURL || avatar}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover object-center"
            alt="profile"
          />
          <div className="text-sm">
            <p className="font-medium text-dark">
              {authUser?.displayName || "Albert Edison"}
            </p>
            <h4 className="text-text-dark">
              {authUser?.email || "abcd@gmail.com"}
            </h4>
          </div>
        </div>

        <div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-4 text-text-muted text-sm py-2"
            onClick={() => setDropDown(false)}
          >
            <Settings className="w-4 h-4" />
            <span>Profile</span>
          </Link>

          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-4 text-text-muted text-sm py-2"
            onClick={() => setDropDown(false)}
          >
            <Ticket className="w-4 h-4" />
            <span>Bookings</span>
          </Link>

          <Link
            href="/favorite"
            className="md:hidden flex items-center gap-4 text-text-muted text-sm py-2"
            onClick={() => setDropDown(false)}
          >
            <Heart className="w-4 h-4" />
            <span>Favorite</span>
          </Link>

          <div
            onClick={handleLogout}
            className="flex items-center gap-4 text-text-muted text-sm py-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
