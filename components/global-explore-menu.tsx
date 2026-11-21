"use client";

import { useEffect, useRef, useState } from "react";

const primaryLinks = [
  { label: "Read the Qur’an", href: "/quran", detail: "Surahs, Arabic, translation and recitation", icon: "⌂" },
  { label: "My Qur’an", href: "/my-rhm", detail: "Continue reading and revisit saved progress", icon: "▣" },
  { label: "Qur’an audio & reciters", href: "/quran", detail: "Choose a reciter and listen ayah by ayah", icon: "♫" },
];

const learnLinks = [
  { label: "Learning plans & Academy", href: "/academy", detail: "Structured lessons and learning progress" },
  { label: "Arabic Qaida & foundations", href: "/qaida", detail: "Build confidence with Arabic reading" },
  { label: "Tafsir library", href: "/tafsir", detail: "Explore available scholarly explanations" },
  { label: "Hadith library", href: "/hadith", detail: "Browse narrations and source references" },
  { label: "Islamic topics & lessons", href: "/learn", detail: "Study belief, Seerah and daily guidance" },
];

const moreLinks = [
  { label: "Duas & daily Azkar", href: "/duas", detail: "Supplications with source details" },
  { label: "Prayer times & Qibla", href: "/prayer-times", detail: "Everyday worship tools" },
  { label: "Islamic calendar & events", href: "/islamic-calendar", detail: "Hijri months and important occasions" },
  { label: "Names of Allah", href: "/names-of-allah", detail: "Meanings and reflections" },
  { label: "Islamic heritage & Seerah", href: "/heritage", detail: "History and sacred places" },
  { label: "My RHM dashboard", href: "/my-rhm", detail: "Your personal learning space" },
  { label: "Explore all features", href: "/explore", detail: "Browse the complete RHM directory" },
  { label: "Support RHM", href: "/donate", detail: "Help sustain beneficial learning" },
];

export default function GlobalExploreMenu() {
  const [open, setOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.siteTheme === "dark" ? "dark" : "light");
    sync();
    window.addEventListener("rhm-theme-change", sync);
    return () => window.removeEventListener("rhm-theme-change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = Array.from(panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter((element) => element.getAttribute("aria-hidden") !== "true" && element.getClientRects().length > 0);
        if (!focusable.length) {
          event.preventDefault();
          panel.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!panel.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
          return;
        }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const normalized = query.trim().toLocaleLowerCase();
  const filter = <T extends { label: string; detail: string }>(items: T[]): T[] => normalized
    ? items.filter((item) => (item.label + " " + item.detail).toLocaleLowerCase().includes(normalized))
    : items;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.siteTheme = next;
    document.documentElement.dataset.quranTheme = next;
    window.localStorage.setItem("rhm-site-theme", next);
    window.localStorage.setItem("rhm-quran-theme", next);
    window.dispatchEvent(new CustomEvent("rhm-theme-change", { detail: next }));
    setTheme(next);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="rhm-menu-trigger"
        aria-label="Open RHM navigation"
        aria-expanded={open}
        aria-controls="rhm-navigation-drawer"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true">☰</span><span>Menu</span>
      </button>

      {open && (
        <div className="rhm-menu-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) { setOpen(false); triggerRef.current?.focus(); } }}>
          <aside
            ref={panelRef}
            id="rhm-navigation-drawer"
            className="rhm-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="RHM Islam 360 navigation"
            tabIndex={-1}
          >
            <div className="rhm-drawer-brand">
              <a href="/" onClick={() => setOpen(false)}><span className="rhm-drawer-mark">ر</span><span><strong>RHM Islam 360</strong><small>Rehmat · Hidayat · Ma’rifat</small></span></a>
              <button type="button" className="rhm-drawer-close" aria-label="Close navigation" onClick={() => { setOpen(false); triggerRef.current?.focus(); }}>×</button>
            </div>

            <div className="rhm-drawer-content">
              <label className="rhm-drawer-search">
                <span aria-hidden="true">⌕</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search RHM sections…" aria-label="Search RHM sections" />
                {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
              </label>

              <nav aria-label="RHM sections">
                <div className="rhm-drawer-group">
                  <h2>Start here</h2>
                  {filter(primaryLinks).map((item) => <a className="rhm-drawer-link" href={item.href} key={item.label} onClick={() => setOpen(false)}><span className="rhm-drawer-icon" aria-hidden="true">{item.icon}</span><span><strong>{item.label}</strong><small>{item.detail}</small></span><span className="rhm-drawer-arrow" aria-hidden="true">›</span></a>)}
                </div>

                <div className="rhm-drawer-group">
                  <button className="rhm-drawer-accordion" type="button" aria-expanded={learnOpen || Boolean(normalized)} onClick={() => setLearnOpen((value) => !value)}><span className="rhm-drawer-icon" aria-hidden="true">⌑</span><span><strong>Learn</strong><small>Courses, Qur’an study and knowledge</small></span><span className="rhm-drawer-chevron">{learnOpen || normalized ? "−" : "+"}</span></button>
                  {(learnOpen || Boolean(normalized)) && filter(learnLinks).map((item) => <a className="rhm-drawer-sublink" href={item.href} key={item.label} onClick={() => setOpen(false)}><strong>{item.label}</strong><small>{item.detail}</small></a>)}
                </div>

                <div className="rhm-drawer-group">
                  <button className="rhm-drawer-accordion" type="button" aria-expanded={moreOpen || Boolean(normalized)} onClick={() => setMoreOpen((value) => !value)}><span className="rhm-drawer-icon" aria-hidden="true">⋯</span><span><strong>More</strong><small>Daily worship, events and personal tools</small></span><span className="rhm-drawer-chevron">{moreOpen || normalized ? "−" : "+"}</span></button>
                  {(moreOpen || Boolean(normalized)) && filter(moreLinks).map((item) => <a className="rhm-drawer-sublink" href={item.href} key={item.label} onClick={() => setOpen(false)}><strong>{item.label}</strong><small>{item.detail}</small></a>)}
                </div>
                {normalized && filter([...primaryLinks, ...learnLinks, ...moreLinks]).length === 0 && <p className="rhm-drawer-empty">No matching section. Try another search.</p>}
              </nav>
            </div>

            <div className="rhm-drawer-footer">
              <div className="rhm-drawer-settings">
                <a href="/login" onClick={() => setOpen(false)}><span aria-hidden="true">◎</span> Profile / Sign in</a>
                <button type="button" onClick={toggleTheme}><span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span> {theme === "dark" ? "Light theme" : "Dark theme"}</button>
              </div>
              <a className="rhm-drawer-donate" href="/donate" onClick={() => setOpen(false)}>✦ Support beneficial knowledge</a>
              <small className="rhm-drawer-note">A calm space to read, learn and reflect.</small>
            </div>
          </aside>
        </div>
      )}

      <style jsx global>{`
        .rhm-menu-trigger{position:fixed;right:20px;top:18px;z-index:10002;display:inline-flex;align-items:center;gap:9px;min-height:42px;padding:0 15px;border:1px solid #d9c9a9;border-radius:999px;background:#fff9ef;color:#263b31;box-shadow:0 4px 18px rgba(47,37,20,.13);font:650 13px/1 "DM Sans",Arial,sans-serif;cursor:pointer}
        .rhm-menu-trigger span:first-child{font-size:18px}
        .rhm-menu-trigger:hover{background:#f3ead9;border-color:#b89a67}
        .rhm-menu-trigger:focus-visible,.rhm-drawer-close:focus-visible,.rhm-drawer-link:focus-visible,.rhm-drawer-sublink:focus-visible,.rhm-drawer-accordion:focus-visible,.rhm-drawer-settings :is(a,button):focus-visible{outline:3px solid #b78b43;outline-offset:3px}
        .rhm-menu-overlay{position:fixed;inset:0;z-index:10003;display:flex;justify-content:flex-end;background:rgba(25,27,22,.38);backdrop-filter:blur(2px)}
        .rhm-navigation-drawer{display:flex;flex-direction:column;width:min(430px,100%);height:100%;max-height:100dvh;background:#fff9ef;color:#27271f;box-shadow:-16px 0 55px rgba(0,0,0,.16);outline:none;animation:rhm-drawer-in .2s ease-out}
        .rhm-drawer-brand{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:17px 20px;border-bottom:1px solid #e7dcc9}
        .rhm-drawer-brand>a{display:flex;align-items:center;gap:10px;text-decoration:none;color:#243a30}
        .rhm-drawer-brand strong,.rhm-drawer-brand small{display:block}
        .rhm-drawer-brand strong{font-size:16px;letter-spacing:-.02em}
        .rhm-drawer-brand small{margin-top:3px;color:#806b4b;font-size:10px;letter-spacing:.08em}
        .rhm-drawer-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#234b3a;color:#fff4df;font:700 23px Georgia,serif}
        .rhm-drawer-close{width:36px;height:36px;border:0;border-radius:50%;background:transparent;color:#29271f;font-size:27px;cursor:pointer}
        .rhm-drawer-content{flex:1;overflow:auto;padding:17px 18px 20px;overscroll-behavior:contain}
        .rhm-drawer-search{display:flex;align-items:center;gap:9px;min-height:43px;padding:0 12px;border:1px solid #e0d3bd;border-radius:12px;background:#fffdf8;color:#675b48}
        .rhm-drawer-search>span{font-size:22px}
        .rhm-drawer-search input{width:100%;min-width:0;border:0;outline:0;background:transparent;color:#28271f;font:14px "DM Sans",Arial,sans-serif}
        .rhm-drawer-search input::placeholder{color:#827766;opacity:1}
        .rhm-drawer-search button{border:0;background:transparent;color:#5e5548;font-size:20px}
        .rhm-drawer-group{padding:18px 0 4px}
        .rhm-drawer-group h2{margin:0 0 9px 3px;color:#8b7047;font-size:10px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
        .rhm-drawer-link,.rhm-drawer-accordion{display:flex;align-items:center;gap:12px;width:100%;padding:10px 8px;border:0;border-radius:11px;background:transparent;color:#28271f;text-align:left;text-decoration:none}
        .rhm-drawer-link:hover,.rhm-drawer-accordion:hover,.rhm-drawer-sublink:hover{background:#f2eadc}
        .rhm-drawer-icon{display:grid;place-items:center;flex:none;width:24px;color:#a88b59;font-size:18px}
        .rhm-drawer-link>span:nth-child(2),.rhm-drawer-accordion>span:nth-child(2){display:grid;gap:3px;min-width:0}
        .rhm-drawer-link strong,.rhm-drawer-accordion strong{font-size:14px;font-weight:650}
        .rhm-drawer-link small,.rhm-drawer-accordion small,.rhm-drawer-sublink small{color:#756b5c;font-size:11px;line-height:1.45}
        .rhm-drawer-arrow,.rhm-drawer-chevron{margin-left:auto;color:#8e7957;font-size:22px}
        .rhm-drawer-sublink{display:grid;gap:3px;margin:3px 0 3px 35px;padding:9px 12px;border-left:2px solid #d7c29b;border-radius:0 9px 9px 0;color:#2c2a23;text-decoration:none}
        .rhm-drawer-sublink strong{font-size:13px;font-weight:650}
        .rhm-drawer-empty{padding:12px;color:#756b5c;font-size:13px}
        .rhm-drawer-footer{padding:15px 18px max(16px,env(safe-area-inset-bottom));border-top:1px solid #e7dcc9;background:#fff7e9}
        .rhm-drawer-settings{display:grid;grid-template-columns:1fr 1fr;gap:9px}
        .rhm-drawer-settings :is(a,button){display:flex;align-items:center;justify-content:center;gap:8px;min-height:39px;padding:0 10px;border:1px solid #dfd1b9;border-radius:999px;background:#fffaf1;color:#342f25;font-size:12px;font-weight:600;text-decoration:none}
        .rhm-drawer-donate{display:flex;justify-content:center;align-items:center;min-height:39px;margin-top:10px;border-radius:999px;background:#493516;color:#fff4db;font-size:12px;font-weight:750;text-decoration:none}
        .rhm-drawer-note{display:block;margin-top:9px;color:#80745f;text-align:center;font-size:10px}
        html[data-site-theme="dark"] .rhm-navigation-drawer{background:#171d19;color:#f4eee1}
        html[data-site-theme="dark"] .rhm-drawer-brand{border-color:#35463a}
        html[data-site-theme="dark"] .rhm-drawer-brand>a,.rhm-navigation-drawer[data-theme="dark"] .rhm-drawer-brand>a{color:#f4eee1}
        html[data-site-theme="dark"] .rhm-drawer-brand small,html[data-site-theme="dark"] .rhm-drawer-group h2{color:#d7bc82}
        html[data-site-theme="dark"] .rhm-drawer-close,html[data-site-theme="dark"] .rhm-drawer-link,html[data-site-theme="dark"] .rhm-drawer-accordion{color:#f4eee1}
        html[data-site-theme="dark"] .rhm-drawer-link:hover,html[data-site-theme="dark"] .rhm-drawer-accordion:hover,html[data-site-theme="dark"] .rhm-drawer-sublink:hover{background:#25352b}
        html[data-site-theme="dark"] .rhm-drawer-link small,html[data-site-theme="dark"] .rhm-drawer-accordion small,html[data-site-theme="dark"] .rhm-drawer-sublink small,html[data-site-theme="dark"] .rhm-drawer-note{color:#c4cbbb}
        html[data-site-theme="dark"] .rhm-drawer-sublink{color:#f4eee1;border-color:#8e774e}
        html[data-site-theme="dark"] .rhm-drawer-search{background:#202820;border-color:#4a5948}
        html[data-site-theme="dark"] .rhm-drawer-search input{color:#f4eee1}
        html[data-site-theme="dark"] .rhm-drawer-footer{background:#1c241e;border-color:#35463a}
        html[data-site-theme="dark"] .rhm-drawer-settings :is(a,button){background:#242e26;border-color:#53634f;color:#f4eee1}
        html[data-site-theme="dark"] .rhm-drawer-donate{background:#d5b879;color:#241d10}
        @keyframes rhm-drawer-in{from{transform:translateX(22px);opacity:.7}to{transform:translateX(0);opacity:1}}
        @media(max-width:560px){.rhm-menu-trigger{top:auto;right:14px;bottom:max(14px,env(safe-area-inset-bottom));min-height:45px}.rhm-navigation-drawer{width:100%;max-width:460px}.rhm-drawer-content{padding:13px 15px 18px}}
        @media(prefers-reduced-motion:reduce){.rhm-navigation-drawer{animation:none}}
      `}</style>
    </>
  );
}
