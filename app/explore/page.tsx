"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Feature = { title: string; description: string; href: string; label?: string };
type Group = { id: string; number: string; title: string; intro: string; features: Feature[] };

const groups: Group[] = [
  {
    id: "quran",
    number: "01",
    title: "Qur’an & recitation",
    intro: "Begin with the Qur’an. Reading, listening and study tools stay together in one dedicated space.",
    features: [
      { title: "Qur’an reader", description: "114 Surahs, Arabic text, translations, Ayah navigation and recitation.", href: "/quran", label: "Main experience" },
      { title: "Offline Qur’an library", description: "Save Arabic text and a selected Urdu or English translation to this device.", href: "/quran/offline", label: "Download for offline" },
    ],
  },
  {
    id: "knowledge",
    number: "02",
    title: "Islamic knowledge",
    intro: "Explore foundational knowledge and source-labelled resources at your own pace.",
    features: [
      { title: "Hadith library", description: "Browse available collections, search narrations and check their displayed references.", href: "/hadith" },
      { title: "Duas & Azkar", description: "Read supplications with Arabic, meanings and source references.", href: "/duas" },
      { title: "Discover Islam", description: "Learn about belief, worship, the Qur’an, Sunnah and Islamic character.", href: "/learn" },
      { title: "Names of Allah", description: "Explore the Beautiful Names with Arabic, transliteration and meanings.", href: "/names-of-allah" },
      { title: "Seerah & Islamic heritage", description: "Explore the Prophet’s ﷺ life, Islamic history, places and heritage.", href: "/heritage" },
    ],
  },
  {
    id: "worship",
    number: "03",
    title: "Worship & daily life",
    intro: "Practical tools for worship and everyday Muslim life, grouped away from the main reading experience.",
    features: [
      { title: "Prayer times", description: "View the prayer schedule for your selected location.", href: "/prayer-times" },
      { title: "Daily Muslim life", description: "Explore Qibla, Wudu, cleanliness, prayer preparation and daily guidance.", href: "/daily-life" },
      { title: "Tasbeeh, Zakat & Islamic glossary", description: "Open the Companion for its personal worship and learning tools.", href: "/companion" },
      { title: "Worship tracker", description: "Use a private daily checklist to reflect on your routine.", href: "/worship-tracker" },
    ],
  },
  {
    id: "learning",
    number: "04",
    title: "Learning & personal growth",
    intro: "Build knowledge gradually with structured lessons and personal progress tools.",
    features: [
      { title: "Learning Academy", description: "Explore structured learning pathways and available lessons.", href: "/academy", label: "Guided learning" },
      { title: "My RHM dashboard", description: "See your saved learning and worship checklist progress in one private place.", href: "/my-rhm", label: "Personal dashboard" },
      { title: "Qaida & Arabic foundations", description: "Start with Arabic letters and the foundations of Qur’an reading.", href: "/qaida" },
      { title: "My Islamic journey", description: "Keep your personal learning goals and progress in one place.", href: "/journey" },
      { title: "Muslim Companion", description: "Access personal tools, calendar information, glossary and daily support.", href: "/companion" },
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
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a className={styles.active} href="/explore">Explore</a><a href="/academy">Academy</a><a href="/companion">Companion</a></nav>
        <a className={styles.login} href="/login">Sign in</a>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>One platform · Clear pathways</span>
        <h1>Explore RHM Islam 360</h1>
        <p>All the learning and worship resources, thoughtfully arranged. Choose what you need without having to navigate a crowded homepage.</p>
        <label className={styles.searchLabel} htmlFor="feature-search">Find a feature</label>
        <input id="feature-search" className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Qur’an, Hadith, prayer, Qaida…" />
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
