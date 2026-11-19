"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Feature = { title: string; description: string; href: string; label?: string };
type Group = { id: string; number: string; title: string; intro: string; features: Feature[] };

const groups: Group[] = [
  {
    id: "quran",
    number: "01",
    title: "Qur’an",
    intro: "Start here to read, listen, search and save Qur’an content for offline study.",
    features: [
      { title: "Qur’an reader", description: "Read all 114 Surahs, search by Surah, explore available translations and listen to recitation.", href: "/quran", label: "Start here" },
      { title: "Offline Qur’an library", description: "Save supported Arabic text, translations and recitation audio on this device.", href: "/quran/offline", label: "Without internet" },
    ],
  },
  {
    id: "learn",
    number: "02",
    title: "Learn & understand",
    intro: "Follow guided lessons and explore Islamic knowledge in a clear learning order.",
    features: [
      { title: "Learning Academy", description: "Follow structured pathways and a gentle seven-day starter plan.", href: "/academy", label: "Guided learning" },
      { title: "Qaida & Arabic foundations", description: "Begin with Arabic letters and build confidence in Qur’an reading.", href: "/qaida" },
      { title: "Hadith library", description: "Browse available collections and check narration references and grading where provided.", href: "/hadith" },
      { title: "Discover Islam", description: "Explore introductory topics about belief, worship, the Qur’an and Sunnah.", href: "/learn" },
      { title: "Seerah & Islamic heritage", description: "Discover the Prophet’s ﷺ life, Islamic history and historic places.", href: "/heritage" },
      { title: "Names of Allah", description: "Study the Beautiful Names with Arabic, transliteration and meanings.", href: "/names-of-allah" },
    ],
  },
  {
    id: "practice",
    number: "03",
    title: "Practice & daily worship",
    intro: "Find practical tools for Salah, remembrance and everyday Muslim life.",
    features: [
      { title: "Prayer centre", description: "Check local prayer times, set Azan reminders and use Qibla guidance.", href: "/prayer-times", label: "Daily worship" },
      { title: "Duas & Azkar", description: "Read supplications with Arabic, meanings and available source references.", href: "/duas" },
      { title: "Daily Muslim life", description: "Learn about Wudu, cleanliness, prayer preparation and everyday guidance.", href: "/daily-life" },
      { title: "Worship tracker", description: "Use a private daily checklist to reflect on your routine.", href: "/worship-tracker" },
      { title: "Muslim Companion", description: "Open Tasbeeh, Zakat tools, calendar information and the Islamic glossary.", href: "/companion" },
    ],
  },
  {
    id: "personal",
    number: "04",
    title: "My RHM — personal space",
    intro: "Return to your own dashboard, continue your goals and review progress saved in this browser.",
    features: [
      { title: "My RHM dashboard", description: "See your learning and worship checklist summaries in one place.", href: "/my-rhm", label: "Your dashboard" },
      { title: "My Islamic Journey", description: "Set personal learning goals and continue at your own pace.", href: "/journey" },
    ],
  },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return groups;
    return groups.map((group) => ({ ...group, features: group.features.filter((feature) => [feature.title, feature.description, group.title].some((value) => value.toLocaleLowerCase().includes(term))) })).filter((group) => group.features.length > 0);
  }, [query]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="RHM Islam 360 home"><span className={styles.mark}>ر</span><span><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/academy">Learn</a><a href="/explore#practice">Practice</a><a href="/my-rhm">My RHM</a><a className={styles.active} href="/explore">Explore all</a></nav>
        <a className={styles.login} href="/login">Sign in</a>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>One platform · Clear pathways</span>
        <h1>Explore RHM Islam 360</h1>
        <p>Choose one of four clear areas: Qur’an, learning, daily practice or your personal RHM space. Each card opens the right tool.</p>
        <label className={styles.searchLabel} htmlFor="feature-search">Find a feature</label>
        <input id="feature-search" className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Qur’an, lessons, prayer, duas…" />
        <div className={styles.heroLinks}><a href="/quran">Start with the Qur’an ↗</a><a href="/quran/offline">Offline library ↗</a></div>
      </section>

      <div className={styles.groups}>
        {filtered.map((group) => (
          <section className={styles.group} id={group.id} key={group.id}>
            <div className={styles.groupHeading}><span className={styles.number}>{group.number}</span><div><h2>{group.title}</h2><p>{group.intro}</p></div></div>
            <div className={styles.cards}>
              {group.features.map((feature) => (
                <a className={styles.card} href={feature.href} key={feature.title}>
                  <span className={styles.cardTop}>{feature.label || "Explore"}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <strong>Open section <span aria-hidden="true">↗</span></strong>
                </a>
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && <p className={styles.empty}>No matching feature found. Try a different search.</p>}
      </div>

      <footer className={styles.footer}><strong>RHM — Rehmat, Hidayat & Ma’rifat</strong><span>A calm space for beneficial knowledge.</span><a href="/">Return to homepage</a></footer>
    </main>
  );
}
