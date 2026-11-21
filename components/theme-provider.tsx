"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type Accent = "emerald" | "ocean" | "burgundy" | "amethyst";

const accents: { id: Accent; label: string; colour: string }[] = [
  { id: "emerald", label: "Emerald green", colour: "#176b4d" },
  { id: "ocean", label: "Ocean blue", colour: "#185d91" },
  { id: "burgundy", label: "Burgundy", colour: "#87384b" },
  { id: "amethyst", label: "Amethyst", colour: "#69459a" },
];

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [accent, setAccent] = useState<Accent>("emerald");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("rhm-site-theme") ?? window.localStorage.getItem("rhm-quran-theme");
    const savedAccent = window.localStorage.getItem("rhm-site-accent");
    const initialTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    const initialAccent: Accent = accents.some((item) => item.id === savedAccent) ? savedAccent as Accent : "emerald";
    setTheme(initialTheme);
    setAccent(initialAccent);
    document.documentElement.dataset.siteTheme = initialTheme;
    document.documentElement.dataset.quranTheme = initialTheme;
    document.documentElement.dataset.siteAccent = initialAccent;
    window.localStorage.setItem("rhm-site-theme", initialTheme);
    window.localStorage.setItem("rhm-quran-theme", initialTheme);
    window.localStorage.setItem("rhm-site-accent", initialAccent);

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

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.siteAccent = accent;
    window.localStorage.setItem("rhm-site-accent", accent);
  }, [accent, ready]);

  return (
    <>
      {children}
      <div className="rhm-appearance-controls" aria-label="Website appearance settings">
        {paletteOpen && (
          <div className="rhm-palette-panel" role="group" aria-label="Choose colour palette">
            <strong>Choose your colour</strong>
            <p>Four clear palettes, available in both light and dark mode.</p>
            <div className="rhm-palette-options">
              {accents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`rhm-palette-option${accent === item.id ? " is-selected" : ""}`}
                  onClick={() => setAccent(item.id)}
                  aria-pressed={accent === item.id}
                  aria-label={item.label}
                  title={item.label}
                >
                  <span className="rhm-palette-swatch" style={{ backgroundColor: item.colour }} />
                  <span>{item.label}</span>
                  {accent === item.id && <span className="rhm-palette-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          type="button"
          className="rhm-palette-toggle"
          onClick={() => setPaletteOpen((open) => !open)}
          aria-expanded={paletteOpen}
          aria-label="Choose colour palette"
        >
          <span aria-hidden="true">◉</span> Colours
        </button>
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
