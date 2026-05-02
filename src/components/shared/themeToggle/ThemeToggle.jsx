"use client";

import useThemeStore from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="cursor-pointer"
    >
      <div
        className={`relative w-12 h-6 rounded-full border transition-colors duration-300 ${
          isDark
            ? "bg-primary/20 border-primary/30"
            : "bg-primary/30 border-primary/50"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary shadow-sm transition-all duration-300 flex items-center justify-center ${
            isDark ? "left-0.5" : "left-6"
          }`}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-dark" />
          ) : (
            <Sun className="w-3 h-3 text-dark" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
