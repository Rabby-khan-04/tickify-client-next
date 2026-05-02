"use client";

import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  // ✅ Only DOM write in effect — no setState, no cascade
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
};

export default useTheme;
