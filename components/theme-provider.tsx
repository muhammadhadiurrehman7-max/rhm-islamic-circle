"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("rhm-site-theme") ?? window.localStorage.getItem("rhm-quran-theme");
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.dataset.siteTheme = initialTheme;
    document.documentElement.dataset.quranTheme = initialTheme;
    window.localStorage.setItem("rhm-site-theme", initialTheme);
    window.localStorage.setItem("rhm-quran-theme", initialTheme);

    const syncTheme = (event: Event) => {
      const next = (event as CustomEvent<Theme>).detail;
      if (next === "light" || next === "dark") setTheme(next);
    };
    window.addEventListener("rhm-theme-change", syncTheme);
    setReady(true);
    return () => window.removeEventListener("rhm-theme-change", syncTheme);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.siteTheme = theme;
    document.documentElement.dataset.quranTheme = theme;
    window.localStorage.setItem("rhm-site-theme", theme);
    window.localStorage.setItem("rhm-quran-theme", theme);
    window.dispatchEvent(new CustomEvent<Theme>("rhm-theme-change", { detail: theme }));
  }, [theme, ready]);

  return (
    <>
      {children}
      <div className="rhm-appearance-controls" aria-label="Website appearance settings">
        <button
          type="button"
          className="site-theme-toggle"
          onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Switch website to dark theme" : "Switch website to light theme"}
          title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        >
          <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          <span>{theme === "light" ? "Dark theme" : "Light theme"}</span>
        </button>
      </div>
    </>
  );
}
