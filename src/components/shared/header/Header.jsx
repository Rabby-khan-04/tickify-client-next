"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/../public/brand/logo.png";
import ProfileDropdown from "./ProfileDropdown";
import { Heart, LucideMenu, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import ThemeToggle from "../themeToggle/ThemeToggle";

const Header = () => {
  const pathname = usePathname();
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { authUser } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY >= 92);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenuAndDropdown = () => {
    setIsOpen((prev) => !prev);
    setDropDown(false);
  };

  const closeMenuAndDropdown = () => {
    setIsOpen(false);
    setDropDown(false);
  };

  // ✅ Always white when transparent (over hero image), theme-aware when scrolled
  const textColor = scrolling ? "text-(--text-primary)" : "text-white";
  const borderColor = scrolling
    ? "border-[var(--border-subtle)]"
    : "border-white/20";
  const iconColor = scrolling ? "text-(--text-primary)" : "text-white";
  const dividerColor = scrolling ? "bg-(--border-subtle)" : "bg-white/30";

  return (
    <header
      className={`py-5 px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolling
          ? "bg-(--nav-bg-scrolled) shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/">
            <Image src={logo} alt="logo" className="h-9 md:h-12 w-auto" />
          </Link>
        </div>

        {/* Nav links */}
        <div
          className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:z-50 max-md:h-screen max-md:flex max-md:items-center max-md:justify-center max-md:backdrop-blur overflow-hidden transition-all duration-300 ${
            isOpen ? "max-md:w-full max-md:bg-black/80" : "max-md:w-0"
          }`}
        >
          <XIcon
            className={`h-6 w-6 absolute top-6 right-6 cursor-pointer md:hidden ${iconColor}`}
            onClick={() => setIsOpen(false)}
          />
          <ul
            className={`${textColor} flex max-md:flex-col items-center justify-center text-2xl max-md:space-y-4 md:text-lg font-medium [&>li>a]:hover:text-primary [&>li>a]:transition-all [&>li>a]:duration-150`}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/movies", label: "Movies" },
              { href: "/how-it-works", label: "How it Works" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  className={`inline-block px-3 transition-colors duration-150 hover:text-primary ${
                    pathname === href ? "text-primary" : ""
                  }`}
                  href={href}
                  onClick={closeMenuAndDropdown}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <ThemeToggle />

          {authUser ? (
            <>
              <Link
                href="/dashboard/profile/favorites"
                className={`inline-block border p-2 rounded-full max-md:hidden hover:border-primary/40 transition-colors ${borderColor}`}
              >
                <Heart className={`h-5 w-5 ${iconColor}`} />
              </Link>
              <div className={`h-5 w-px max-md:hidden ${dividerColor}`} />
              <ProfileDropdown
                dropDown={dropDown}
                setDropDown={setDropDown}
                scrolling={scrolling}
              />
            </>
          ) : (
            <Link href="/login" className="btn">
              Login
            </Link>
          )}

          <LucideMenu
            className={`md:hidden h-7 w-7 cursor-pointer ${iconColor}`}
            onClick={toggleMenuAndDropdown}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
