"use client";

import logo from "@/../public/brand/logo.png";
import avatar from "@/../public/icon/profile.png";
import ThemeToggle from "@/components/shared/themeToggle/ThemeToggle";
import useAuthStore from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = () => {
  const { userInfo } = useAuthStore();

  return (
    <header className="py-4 px-8 z-50 transition-all duration-150 border-b border-border-subtle bg-bg-base">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" className="h-7 md:h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Image
            src={userInfo?.photo || avatar}
            width={32}
            height={32}
            className="size-8 rounded-full object-cover object-center"
            alt="profile"
          />
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
