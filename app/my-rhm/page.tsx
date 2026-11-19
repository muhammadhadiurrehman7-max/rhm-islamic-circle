"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type Snapshot = { salah: number; journey: number; academy: number; tasbeeh: number };

const spaces = [
  { title: "Qur’an & recitation", detail: "Read, search Surahs, listen to reciters and continue where you left off.", href: "/quran", tag: "Read & listen" },
  { title: "Prayer centre", detail: "Check location-based prayer times, reminders and Qibla guidance.", href: "/prayer-times", tag: "Daily worship" },
  { title: "Learning Academy", detail: "Follow the guided pathways and the gentle seven-day learning plan.", href: "/academy", tag: "Learn step by step" },
  { title: "My Islamic Journey", detail: "Choose small daily learning activities and review your consistency.", href: "/journey", tag: "Personal progress" },
  { title: "Worship tracker", detail: "Keep a private checklist for Salah, Qur’an reading and remembrance.", href: "/worship-tracker", tag: "Private checklist" },
  { title: "Hadith & Sunnah", detail: "Explore narrations and inspect the displayed collection references.", href: "/hadith", tag: "Knowledge" },
  { title: "Duas & Azkar", detail: "Read supplications with Arabic, meanings and available source references.", href: "/duas", tag: "Remembrance" },
  { title: "Qaida & Tajweed foundations", detail: "Build Arabic reading foundations at a comfortable pace.", href: "/qaida", tag: "Arabic learning" },
];

function todayKey() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

function readSnapshot(): Snapshot {
  const result: Snapshot = { salah: 0, journey: 0, academy: 0, tasbeeh: 0 };
  try {
    const tracker = JSON.parse(localStorage.getItem("rhm-worship-tracker") || "{}");
    const items = tracker && typeof tracker === "object" ? tracker[todayKey()] : [];
    if (Array.isArray(items)) result.salah = items.filter((x) => ["fajr", "dhuhr", "asr", "maghrib", "isha"].includes(x)).length;
  } catch { /* Local progress is optional. */ }
  try {
    const journey = JSON.parse(localStorage.getItem("rhm-islam-360-journey-v1") || "{}");
    const items = journey && typeof journey === "object" ? journey[todayKey()] : [];
    if (Array.isArray(items)) result.journey = items.length;
  } catch { /* Local progress is optional. */ }
  try {
    const academy = JSON.parse(localStorage.getItem("rhm-academy-plan-v1") || "[]");
    if (Array.isArray(academy)) result.academy = academy.length;
  } catch { /* Local progress is optional. */ }
  try {
    const count = Number(localStorage.getItem("rhm-companion-tasbeeh-v1") || 0);
    if (Number.isFinite(count) && count >= 0) result.tasbeeh = Math.floor(count);
  } catch { /* Local progress is optional. */ }
  return result;
}

export default function MyRhmPage() {
  const [snapshot, setSnapshot] = useState<Snapshot>({ salah: 0, journey: 0, academy: 0, tasbeeh: 0 });
  const [ready, setReady] = useState(false);
  const [date, setDate] = useState("");
  useEffect(() => {
    setSnapshot(readSnapshot());
    setDate(new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
    setReady(true);
  }, []);
  const total = useMemo(() => snapshot.salah + snapshot.journey, [snapshot]);
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/"><span className={styles.mark}>ر</span><span><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/academy">Learn</a><a href="/explore#practice">Practice</a><a href="/my-rhm" aria-current="page">My RHM</a><a href="/explore">Explore all</a></nav>
      </header>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Your personal learning space</span>
        <h1>My RHM</h1>
        <p>Continue your learning and daily routine from one calm dashboard. Choose one useful next step; there is no pressure to complete everything.</p>
        <div className={styles.date}>{date || "Your day, at your pace"}</div>
        <div className={styles.heroActions}><a href="/quran">Continue with Qur’an ↗</a><a href="/academy">Choose a learning path ↗</a></div>
      </section>
      <section className={styles.summary} aria-label="Your saved progress on this device">
        <article><span>Prayer checklist</span><strong>{ready ? `${snapshot.salah} / 5` : "—"}</strong><small>Items ticked today</small></article>
        <article><span>Daily journey</span><strong>{ready ? snapshot.journey : "—"}</strong><small>Activities marked today</small></article>
        <article><span>7-day learning plan</span><strong>{ready ? `${snapshot.academy} / 7` : "—"}</strong><small>Steps completed</small></article>
        <article><span>Tasbeeh counter</span><strong>{ready ? snapshot.tasbeeh.toLocaleString() : "—"}</strong><small>Saved on this device</small></article>
      </section>
      <p className={styles.privacy}>Progress is read from the existing RHM tools on this browser only. These figures are personal checklist records, not a measure of faith, prayer validity or religious standing. Your data is not uploaded or synced by this dashboard.</p>
      <section className={styles.section}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>Your next steps</span><h2>Learning & worship spaces</h2><p>Open an existing RHM section whenever you are ready.</p></div><a href="/explore">View all features ↗</a></div>
        <div className={styles.grid}>{spaces.map((space) => <a className={styles.card} href={space.href} key={space.href}><span>{space.tag}</span><h3>{space.title}</h3><p>{space.detail}</p><strong>Open section ↗</strong></a>)}</div>
      </section>
      <section className={styles.note}><span className={styles.eyebrow}>A gentle reminder</span><h2>Consistency without pressure</h2><p>Use these tools to organise learning and remembrance. RHM does not judge worship or issue religious rulings. For questions of religious practice, consult reliable sources and qualified scholars.</p></section>
      <footer className={styles.footer}><strong>RHM — Rehmat, Hidayat & Ma’rifat</strong><a href="/">Return home</a></footer>
    </main>
  );
}
