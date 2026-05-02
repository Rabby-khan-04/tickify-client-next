"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavLink = ({ items }) => {
  const pathname = usePathname();
  const { path, ICON, text } = items;

  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={`relative flex items-center md:pl-10 gap-2 max-md:justify-center py-2.5 transition-colors ${
        isActive
          ? "bg-primary/15 text-primary"
          : "theme-text-muted hover:theme-text-primary hover:bg-primary/5"
      }`}
    >
      <ICON className="w-4 h-4 shrink-0" />
      <span className="max-md:hidden">{text}</span>
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute right-0 top-0 w-1.5 rounded-l h-full bg-primary z-10" />
      )}
    </Link>
  );
};

export default DashboardNavLink;
