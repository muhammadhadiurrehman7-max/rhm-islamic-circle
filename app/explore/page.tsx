"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Feature = { title: string; description: string; href: string; label?: string; keywords?: string };
type Group = { id: string; number: string; title: string; intro: string; features: Feature[] };

const groups: Group[] = [
  {
    id: "quran",
    number: "01",
    title: "Qur’an, Recitation & Tafsir",
    intro: "Everything for reading the Qur’an, listening to reciters, studying translations and understanding the verses.",
    features: [
      { title: "Qur’an reader & reciters", description: "Read the Qur’an, find Surahs and reciters, compare available translations and listen to recitation.", href: "/quran", label: "Read & listen", keywords: "quran surah ayah audio reciter translation" },
      { title: "Tafsir library", description: "Explore available Urdu, English and Arabic Tafsir editions, with scholar and source details.", href: "/tafsir", label: "Understand Qur’an", keywords: "tafsir tafseer scholars ibn kathir jalalayn bayan ul quran" },
      { title: "Offline Qur’an", description: "Manage supported Qur’an text, translations and audio saved on this device.", href: "/offline", label: "Study offline", keywords: "download saved offline no internet" },
    ],
  },
  {
    id: "knowledge",
    number: "02",
    title: "Hadith, Seerah & Islamic Knowledge",
    intro: "Explore the Prophet’s ﷺ Sunnah, Islamic beliefs, history and essential knowledge in one place.",
    features: [
      { title: "Hadith library", description: "Browse available Hadith collections and check references and grading where provided.", href: "/hadith", label: "Hadith & Sunnah", keywords: "bukhari muslim hadith sunnah narration" },
      { title: "Seerah & Islamic heritage", description: "Learn about the Prophet’s ﷺ life, Islamic history and historic places.", href: "/heritage", label: "History & Seerah", keywords: "seerah biography history heritage" },
      { title: "Discover Islam", description: "Explore clear introductions to belief, worship, the Qur’an and Sunnah.", href: "/learn", label: "Foundations", keywords: "belief aqeedah islam basics" },
      { title: "Names of Allah", description: "Study the Beautiful Names with Arabic, transliteration and meanings.", href: "/names-of-allah", label: "Asma ul Husna", keywords: "allah names attributes" },
    ],
  },
  {
    id: "practice",
    number: "03",
    title: "Salah, Duas & Daily Muslim Life",
    intro: "Your everyday worship tools—from prayer times and Qibla to remembrance, Hijri dates and personal routines.",
    features: [
      { title: "Prayer times, Azan & Qibla", description: "Check local Salah times, configure reminders and find the Qibla direction.", href: "/prayer-times", label: "Salah centre", keywords: "namaz salah prayer azan adhan qibla" },
      { title: "Islamic calendar", description: "View Hijri months alongside Gregorian dates, with guidance about local moon sighting.", href: "/islamic-calendar", label: "Hijri calendar", keywords: "hijri ramadan eid islamic dates" },
      { title: "Duas & Azkar", description: "Read daily supplications with Arabic, meanings and available source references.", href: "/duas", label: "Daily remembrance", keywords: "dua dhikr zikr morning evening" },
      { title: "Daily Muslim life", description: "Learn about Wudu, cleanliness, prayer preparation and everyday guidance.", href: "/daily-life", label: "Everyday guidance", keywords: "wudu ablution taharah cleanliness" },
      { title: "Worship tracker", description: "Keep a private checklist to reflect on your daily worship routine.", href: "/worship-tracker", label: "Personal routine", keywords: "habit salah fasting tracker" },
      { title: "Muslim Companion", description: "Open useful tools including Tasbeeh, Zakat guidance and the Islamic glossary.", href: "/companion", label: "More tools", keywords: "tasbeeh zakat glossary" },
    ],
  },
  {
    id: "learning",
    number: "04",
    title: "Qur’an Learning & Islamic Courses",
    intro: "Build your knowledge step by step, from Arabic letters and Qaida to structured learning pathways.",
    features: [
      { title: "Learning Academy", description: "Follow structured Islamic learning pathways and guided lessons.", href: "/academy", label: "Courses", keywords: "course lessons study academy" },
      { title: "Qaida & Arabic foundations", description: "Learn Arabic letters and build confidence in Qur’an reading.", href: "/qaida", label: "Start from basics", keywords: "noorani qaida arabic letters makharij" },
      { title: "Guided Islamic learning", description: "Continue exploring introductory topics and learning resources.", href: "/learn", label: "Explore topics", keywords: "learn islam topics" },
    ],
  },
  {
    id: "personal",
    number: "05",
    title: "My RHM, Personal Progress & Support",
    intro: "Keep your learning journey organised, revisit your progress and support beneficial work.",
    features: [
      { title: "My RHM dashboard", description: "Review your learning and worship checklist summaries in one personal space.", href: "/my-rhm", label: "Your dashboard", keywords: "dashboard saved progress" },
      { title: "My Islamic Journey", description: "Set personal learning goals and continue at your own pace.", href: "/journey", label: "Your goals", keywords: "goals journey progress" },
      { title: "RHM support & donations", description: "Visit the support page and learn how to contribute to the project.", href: "/donate", label: "Support RHM", keywords: "donate donation support charity" },
    ],
  },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return groups;
    return groups.map((group) => ({
      ...group,
      features: group.features.filter((feature) =>
        [feature.title, feature.description, feature.label ?? "", feature.keywords ?? "", group.title, group.intro]
          .some((value) => value.toLocaleLowerCase().includes(term)),
      ),
    })).filter((group) => group.features.length > 0);
  }, [query]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="RHM Islam 360 home"><span className={styles.mark}>ر</span><span><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/academy">Learn</a><a href="/explore#practice">Daily worship</a><a href="/my-rhm">My RHM</a><a className={styles.active} href="/explore">Explore all</a></nav>
        <a className={styles.login} href="/login">Sign in</a>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>One platform · Five clear destinations</span>
        <h1>Everything in RHM, organised for you</h1>
        <p>Choose a main heading to reach related tools together. Or search for any feature by name, topic or keyword.</p>
        <label className={styles.searchLabel} htmlFor="feature-search">Search all RHM features</label>
        <input id="feature-search" className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: Tafsir, reciter, prayer, Ramadan, Qaida…" />
        <nav className={styles.quickLinks} aria-label="Jump to a section">
          {groups.map((group) => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}
        </nav>
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
        {filtered.length === 0 && <p className={styles.empty}>No matching feature found. Try a different word or topic.</p>}
      </div>

      <footer className={styles.footer}><strong>RHM — Rehmat, Hidayat & Ma’rifat</strong><span>A calm space for beneficial knowledge.</span><a href="/">Return to homepage</a></footer>
    </main>
  );
}
