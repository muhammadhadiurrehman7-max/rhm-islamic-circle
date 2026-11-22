"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

/**
 * Applies the saved site theme once and keeps it synchronised with the
 * navigation drawer. The theme switch lives in the drawer so it never
 * competes with mobile Back/Menu controls at the bottom of the screen.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apply = (value: string | null) => {
      const next: Theme = value === "dark" ? "dark" : "light";
      document.documentElement.dataset.siteTheme = next;
      document.documentElement.dataset.quranTheme = next;
      window.localStorage.setItem("rhm-site-theme", next);
      window.localStorage.setItem("rhm-quran-theme", next);
    };

    const saved = window.localStorage.getItem("rhm-site-theme") ?? window.localStorage.getItem("rhm-quran-theme");
    apply(saved);

    const syncTheme = (event: Event) => {
      const next = (event as CustomEvent<Theme>).detail;
      if (next === "light" || next === "dark") apply(next);
    };
    window.addEventListener("rhm-theme-change", syncTheme);
    return () => window.removeEventListener("rhm-theme-change", syncTheme);
  }, []);

  return <>{children}</>;
}
