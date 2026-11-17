"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const tasks = [
  { id: "quran", title: "Read a portion of the Qur’an", detail: "Continue at your own pace.", href: "/quran", action: "Open Qur’an" },
  { id: "listen", title: "Listen to a Qur’an recitation", detail: "Take a moment to listen and reflect.", href: "/quran", action: "Listen" },
  { id: "hadith", title: "Study one Hadith", detail: "Check its collection and reference.", href: "/hadith", action: "Open Hadith" },
  { id: "dua", title: "Review or learn a Dua", detail: "Explore supplications with their sources.", href: "/duas", action: "Explore Duas" },
  { id: "learn", title: "Spend time learning", detail: "Choose a lesson in Islam, Qaida or daily practice.", href: "/learn", action: "Choose a lesson" },
  { id: "good", title: "Do one act of kindness", detail: "A personal goal for good character and service.", href: "/daily-life", action: "Daily-life guide" },
];

type History = Record<string, string[]>;

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DailyJourneyPage() {
  const [today, setToday] = useState("");
  const [history, setHistory] = useState<History>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToday(getTodayKey());
    try {
      const saved = window.localStorage.getItem("rhm-islam-360-journey-v1");
      if (saved) {
        const parsed = JSON.parse(saved) as History;
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) setHistory(parsed);
      }
    } catch {
      // The checklist remains usable for this visit if browser storage is unavailable.
    }
    setReady(true);
  }, []);

  const completed = today ? history[today] ?? [] : [];
  const progress = Math.round((completed.length / tasks.length) * 100);
  const activeDateKeys = Object.keys(history).filter((key) => Array.isArray(history[key]) && history[key].length > 0).sort();
  const activeDays = activeDateKeys.length;
  const weeklyDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = getDateKey(date);
    return { key, label: date.toLocaleDateString(undefined, { weekday: "short" }), active: activeDateKeys.includes(key), isToday: key === today };
  });
  let currentStreak = 0;
  const streakCursor = new Date();
  if (today && !activeDateKeys.includes(today)) streakCursor.setDate(streakCursor.getDate() - 1);
  while (activeDateKeys.includes(getDateKey(streakCursor))) {
    currentStreak += 1;
    streakCursor.setDate(streakCursor.getDate() - 1);
  }
  let bestStreak = 0;
  let runningStreak = 0;
  let previousDate: Date | null = null;
  for (const key of activeDateKeys) {
    const date = new Date(`${key}T12:00:00`);
    const difference = previousDate ? Math.round((date.getTime() - previousDate.getTime()) / 86400000) : 0;
    runningStreak = difference === 1 ? runningStreak + 1 : 1;
    bestStreak = Math.max(bestStreak, runningStreak);
    previousDate = date;
  }
  const dateLabel = useMemo(() => new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }), []);

  function toggleTask(id: string) {
    if (!today) return;
    setHistory((current) => {
      const nextItems = current[today] ?? [];
      const updatedItems = nextItems.includes(id) ? nextItems.filter((item) => item !== id) : [...nextItems, id];
      const next: History = { ...current };
      if (updatedItems.length) next[today] = updatedItems;
      else delete next[today];
      try {
        window.localStorage.setItem("rhm-islam-360-journey-v1", JSON.stringify(next));
      } catch {
        // Keep the updated checklist in memory even if storage is unavailable.
      }
      return next;
    });
  }

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/">RHM Islam 360</a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/hadith">Hadith</a><a href="/duas">Duas</a></nav>
      </header>
      <nav className="learning-space-nav" aria-label="Explore learning spaces">
        <a href="/quran">Qur’an</a><a href="/hadith">Hadith</a><a href="/qaida">Qaida</a><a href="/duas">Daily Duas</a><a href="/learn">Discover Islam</a><a href="/daily-life">Daily Life</a><a href="/journey" aria-current="page">My Journey</a>
      </nav>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>A gentle daily routine</span>
        <h1>My Islamic Journey</h1>
        <p>Build a steady learning habit, one small step at a time. Choose the activities that matter to you today. This is a personal tracker, not a measure of faith or worship.</p>
        <div className={styles.date}>{dateLabel}</div>
      </section>

      <section className={styles.dashboard} aria-label="Daily learning progress">
        <div className={styles.progressCard}>
          <div className={styles.progressTop}><div><span className={styles.eyebrow}>TODAY’S PROGRESS</span><h2>{completed.length} of {tasks.length} activities</h2></div><strong>{progress}%</strong></div>
          <div className={styles.progressTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Today's completed activities"><span style={{ width: `${progress}%` }} /></div>
          <p>{progress === 100 ? "You completed your personal checklist today. Alhamdulillah." : "Every small, consistent effort can help build a lasting habit."}</p>
        </div>
        <div className={styles.statsCard}><span className={styles.statIcon}>✦</span><strong>{currentStreak}</strong><span>day current learning streak</span><div className={styles.bestStreak}>Best: {bestStreak} {bestStreak === 1 ? "day" : "days"} · {activeDays} active days total</div></div>
      </section>

      <section className={styles.weekSection} aria-label="Last seven days of learning activity">
        <div className={styles.weekHeading}><div><span className={styles.eyebrow}>YOUR RHYTHM</span><h2>Last seven days</h2></div><span>{weeklyDays.filter((day) => day.active).length} of 7 days active</span></div>
        <div className={styles.weekGrid}>{weeklyDays.map((day) => <div className={`${styles.weekDay} ${day.active ? styles.weekActive : ""} ${day.isToday ? styles.weekToday : ""}`} key={day.key}><span>{day.label}</span><strong aria-label={day.active ? `${day.key}: activity recorded` : `${day.key}: no activity recorded`}>{day.active ? "✓" : "·"}</strong></div>)}</div>
        <p>Only days when you tick at least one activity are counted. A missed day is simply a fresh opportunity to begin again.</p>
      </section>

      <section className={styles.tasksSection}>
        <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>YOUR CHECKLIST</span><h2>Today’s steps</h2></div><span className={styles.saved}>{ready ? "Saved on this device" : "Loading your progress…"}</span></div>
        <div className={styles.taskList}>
          {tasks.map((task, index) => {
            const isDone = completed.includes(task.id);
            return <article className={`${styles.task} ${isDone ? styles.taskDone : ""}`} key={task.id}>
              <button type="button" className={styles.check} onClick={() => toggleTask(task.id)} aria-pressed={isDone} aria-label={isDone ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}>{isDone ? "✓" : String(index + 1).padStart(2, "0")}</button>
              <div className={styles.taskCopy}><h3>{task.title}</h3><p>{task.detail}</p></div>
              <a href={task.href}>{task.action} ↗</a>
            </article>;
          })}
        </div>
        <p className={styles.privacy}>Your checklist is stored only in this browser on this device. It is not synced to an account or shared with RHM Islam 360. Clearing browser data may erase it.</p>
      </section>
      <footer className={styles.footer}><a href="/">← Return to RHM Islam 360</a><span>Learn at your own pace · Keep your intentions sincere</span></footer>
    </main>
  );
}
