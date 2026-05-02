"use client";

import { ChevronDown, Heart, LogOut, Settings, Ticket } from "lucide-react";
import avatar from "@/../public/icon/profile.png";
import Link from "next/link";
import Image from "next/image";
import { logoutUser } from "@/services/Auth.service";
import useAuthStore from "@/store/authStore";

const ProfileDropdown = ({ dropDown, setDropDown, scrolling }) => {
  const { authUser } = useAuthStore();

  const handleLogout = async () => {
    await logoutUser();
    setDropDown(false);
  };

  // Always white over hero, theme-aware when scrolled
  const textColor = scrolling ? "text-[var(--text-primary)]" : "text-white";
  const borderColor = scrolling
    ? "border-[var(--border-subtle)]"
    : "border-white/20";

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
          <h4 className={`text-sm ${textColor} opacity-70`}>Hi, Welcome</h4>
          <p
            className={`text-sm lg:text-lg font-medium ${textColor} truncate w-28`}
          >
            {authUser?.displayName || "Albert Edison"}
          </p>
        </div>

        <div className="max-lg:hidden">
          <ChevronDown
            className={`${textColor} transform ${dropDown ? "rotate-180" : ""} transition-all duration-75`}
          />
        </div>
      </div>

      {/* Dropdown panel — always themed, not affected by hero */}
      <div
        className={`absolute z-50 top-[130%] max-md:right-[-150%] md:right-0 bg-bg-card border border-border-subtle w-72 md:w-80 rounded-2xl py-4 px-5 shadow-xl ${
          dropDown
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } overflow-hidden transition-all duration-75`}
      >
        <div className="flex items-center gap-5 pb-4 mb-1 border-b border-border-subtle">
          <Image
            src={authUser?.photoURL || avatar}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover object-center"
            alt="profile"
          />
          <div className="text-sm">
            <p className="font-medium text-text-primary">
              {authUser?.displayName || "Albert Edison"}
            </p>
            <h4 className="text-text-muted text-xs mt-0.5">
              {authUser?.email || "abcd@gmail.com"}
            </h4>
          </div>
        </div>

        <div className="pt-1">
          {[
            { href: "/dashboard/profile", icon: Settings, label: "Profile" },
            { href: "/dashboard/bookings", icon: Ticket, label: "Bookings" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 text-text-secondary hover:text-text-primary text-sm py-2.5 transition-colors"
              onClick={() => setDropDown(false)}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}

          <Link
            href="/favorite"
            className="md:hidden flex items-center gap-4 text-text-secondary hover:text-text-primary text-sm py-2.5 transition-colors"
            onClick={() => setDropDown(false)}
          >
            <Heart className="w-4 h-4" />
            <span>Favorite</span>
          </Link>

          <div className="border-t border-border-subtle mt-1 pt-1">
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 text-red-400 hover:text-red-500 text-sm py-2.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
