import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark",
      isDark: true,
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        set({ theme: next, isDark: next === "dark" });
      },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        // Apply saved theme to DOM on page load
        if (state?.theme) {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    },
  ),
);

export default useThemeStore;
