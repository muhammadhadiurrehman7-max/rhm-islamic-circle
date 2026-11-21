"use client";

import { useState } from "react";

const groups = [
  {
    title: "Qur’an & Hadith",
    links: [
      { label: "Read the Qur’an", href: "/quran", detail: "Surahs, translation and recitation" },
      { label: "Tafsir library", href: "/tafsir", detail: "Browse available explanations" },
      { label: "Hadith collections", href: "/hadith", detail: "Read narrations and references" },
    ],
  },
  {
    title: "Learn Islam",
    links: [
      { label: "Learning academy", href: "/academy", detail: "Courses and learning paths" },
      { label: "Arabic Qaida", href: "/qaida", detail: "Start with Arabic letters and reading" },
      { label: "Lessons", href: "/learn", detail: "Browse available lessons" },
      { label: "Discover Islam", href: "/discover-islam", detail: "Explore Islamic knowledge" },
    ],
  },
  {
    title: "Daily worship",
    links: [
      { label: "Daily duas", href: "/duas", detail: "Supplications with references" },
      { label: "Prayer times", href: "/prayer-times", detail: "Find daily prayer times" },
      { label: "Daily life", href: "/daily-life", detail: "Practical everyday guidance" },
      { label: "Worship tracker", href: "/worship-tracker", detail: "Keep track of your routine" },
    ],
  },
  {
    title: "Explore & occasions",
    links: [
      { label: "Islamic events", href: "/islamic-events", detail: "Important dates and occasions" },
      { label: "Islamic calendar", href: "/islamic-calendar", detail: "Browse the Hijri calendar" },
      { label: "Names of Allah", href: "/names-of-allah", detail: "Learn the beautiful names" },
      { label: "Islamic heritage", href: "/heritage", detail: "Explore sacred places and history" },
    ],
  },
  {
    title: "Your RHM space",
    links: [
      { label: "My RHM", href: "/my-rhm", detail: "Your personal learning space" },
      { label: "My dashboard", href: "/dashboard", detail: "Your account and activity" },
      { label: "My learning journey", href: "/journey", detail: "Continue your progress" },
      { label: "Sign in / Create account", href: "/login", detail: "Access your account" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Explore all sections", href: "/explore", detail: "See the full RHM directory" },
      { label: "Qur’an offline reading", href: "/quran/offline", detail: "Open saved reading resources" },
      { label: "Learning companion", href: "/companion", detail: "Open your study companion" },
      { label: "Support RHM", href: "/donate", detail: "View ways to support the project" },
    ],
  },
];

export default function GlobalExploreMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rhm-explore-menu">
      {open && (
        <section className="rhm-explore-panel" id="rhm-explore-panel" aria-label="All RHM pages">
          <div className="rhm-explore-panel-heading">
            <div>
              <p>RHM ISLAM 360</p>
              <h2>Where would you like to go?</h2>
              <span>Choose one section. Each topic has its own page.</span>
            </div>
            <button type="button" className="rhm-explore-close" onClick={() => setOpen(false)} aria-label="Close page menu">×</button>
          </div>
          <div className="rhm-explore-groups">
            {groups.map((group) => (
              <section className="rhm-explore-group" key={group.title} aria-labelledby={`rhm-group-${group.title.replace(/[^a-z0-9]+/gi, "-")}`}>
                <h3 id={`rhm-group-${group.title.replace(/[^a-z0-9]+/gi, "-")}`}>{group.title}</h3>
                <div className="rhm-explore-links">
                  {group.links.map((link) => (
                    <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
                      <strong>{link.label}</strong>
                      <span>{link.detail}</span>
                      <span className="rhm-explore-arrow" aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      )}
      <button
        type="button"
        className="rhm-explore-trigger"
        aria-expanded={open}
        aria-controls="rhm-explore-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">☷</span>
        <span>{open ? "Close pages" : "All pages"}</span>
      </button>
      <style jsx global>{`
        .rhm-explore-menu{position:fixed;left:max(16px,env(safe-area-inset-left));right:auto;bottom:max(18px,env(safe-area-inset-bottom));z-index:10001;font-family:"DM Sans",Arial,sans-serif}
        .rhm-explore-trigger{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:46px;padding:0 18px;border:1px solid #174b3c;border-radius:999px;background:#174b3c;color:#fff;box-shadow:0 6px 22px rgba(10,38,29,.24);font-size:14px;font-weight:750;cursor:pointer}
        .rhm-explore-trigger:hover{background:#103c30}
        .rhm-explore-trigger:focus-visible,.rhm-explore-close:focus-visible,.rhm-explore-links a:focus-visible{outline:3px solid #d4a94f;outline-offset:3px}
        .rhm-explore-trigger>span:first-child{font-size:20px;line-height:1}
        .rhm-explore-panel{position:absolute;left:0;right:auto;bottom:58px;width:min(760px,calc(100vw - 28px));max-height:min(78vh,760px);overflow:auto;padding:22px;border:1px solid #dce6de;border-radius:20px;background:#fff;color:#18372e;box-shadow:0 18px 60px rgba(8,28,21,.24)}
        .rhm-explore-panel-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding-bottom:16px;border-bottom:1px solid #e7ede8}
        .rhm-explore-panel-heading p{margin:0 0 5px;color:#96733b;font-size:10px;font-weight:800;letter-spacing:.14em}
        .rhm-explore-panel-heading h2{margin:0 0 5px;color:#17352d;font:700 clamp(21px,3vw,28px)/1.2 "Playfair Display",Georgia,serif}
        .rhm-explore-panel-heading span{color:#5b7065;font-size:13px;line-height:1.5}
        .rhm-explore-close{flex:none;width:36px;height:36px;border:1px solid #dce6de;border-radius:50%;background:#f6f8f5;color:#24483b;font-size:24px;line-height:1;cursor:pointer}
        .rhm-explore-groups{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 24px;padding-top:18px}
        .rhm-explore-group h3{margin:0 0 9px;color:#174b3c;font-size:13px;font-weight:800}
        .rhm-explore-links{display:grid;gap:7px}
        .rhm-explore-links a{position:relative;display:grid;gap:2px;padding:10px 32px 10px 12px;border:1px solid #e8eee9;border-radius:11px;background:#fbfcfa;text-decoration:none}
        .rhm-explore-links a:hover{border-color:#9bb9a4;background:#f0f6f0}
        .rhm-explore-links a strong{color:#1d3e32;font-size:13px}
        .rhm-explore-links a span:not(.rhm-explore-arrow){color:#62766b;font-size:11px;line-height:1.4}
        .rhm-explore-links .rhm-explore-arrow{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#287052;font-size:18px}
        html[data-site-theme="dark"] .rhm-explore-panel{border-color:#3d5d4c;background:#142b21;color:#f2f1e8}
        html[data-site-theme="dark"] .rhm-explore-panel-heading{border-color:#365343}
        html[data-site-theme="dark"] .rhm-explore-panel-heading h2{color:#f4f0e4}
        html[data-site-theme="dark"] .rhm-explore-panel-heading span{color:#c5d3c9}
        html[data-site-theme="dark"] .rhm-explore-close{border-color:#46634f;background:#203d2e;color:#f5f0df}
        html[data-site-theme="dark"] .rhm-explore-group h3{color:#c5ddb9}
        html[data-site-theme="dark"] .rhm-explore-links a{border-color:#365343;background:#1a3427}
        html[data-site-theme="dark"] .rhm-explore-links a:hover{border-color:#83a58c;background:#244533}
        html[data-site-theme="dark"] .rhm-explore-links a strong{color:#f2f1e8}
        html[data-site-theme="dark"] .rhm-explore-links a span:not(.rhm-explore-arrow){color:#c4d2c8}
        @media(max-width:600px){.rhm-explore-menu{left:max(12px,env(safe-area-inset-left));right:auto;bottom:max(12px,env(safe-area-inset-bottom))}.rhm-explore-panel{width:calc(100vw - 24px);max-height:76vh;padding:17px;border-radius:16px}.rhm-explore-groups{grid-template-columns:1fr;gap:15px;padding-top:15px}.rhm-explore-trigger{min-height:44px;padding:0 15px}.rhm-explore-panel-heading h2{font-size:22px}}
        @media(prefers-reduced-motion:no-preference){.rhm-explore-panel{animation:rhm-menu-in .16s ease-out}@keyframes rhm-menu-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}}
      `}</style>
    </div>
  );
}
