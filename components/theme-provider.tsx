"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("rhm-site-theme");
    const initial: Theme = saved === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.dataset.siteTheme = initial;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.siteTheme = theme;
    window.localStorage.setItem("rhm-site-theme", theme);
  }, [theme, ready]);

  return (
    <>
      {children}
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
    </>
  );
}
