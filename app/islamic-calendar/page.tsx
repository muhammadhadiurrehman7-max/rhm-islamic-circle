"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const TIME_ZONE = "Asia/Karachi";
const hijriFormatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
  timeZone: TIME_ZONE, day: "numeric", month: "long", year: "numeric",
});
const hijriPartsFormatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
  timeZone: TIME_ZONE, day: "numeric", month: "long", year: "numeric",
});
const gregorianFormatter = new Intl.DateTimeFormat("en-PK", {
  timeZone: TIME_ZONE, day: "numeric", month: "short", year: "numeric",
});
function part(parts: Intl.DateTimeFormatPart[], type: string) {
  return parts.find((item) => item.type === type)?.value ?? "";
}
function dateInPakistan() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const year = Number(part(parts, "year"));
  const month = Number(part(parts, "month"));
  const day = Number(part(parts, "day"));
  return new Date(Date.UTC(year, month - 1, day, 12));
}
function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
}
function getHijri(date: Date) {
  const parts = hijriPartsFormatter.formatToParts(date);
  return {
    day: Number(part(parts, "day")),
    month: part(parts, "month"),
    year: Number(part(parts, "year")),
  };
}
function getMonthStart(anchor: Date) {
  const hijri = getHijri(anchor);
  return addDays(anchor, 1 - hijri.day);
}

export default function IslamicCalendarPage() {
  const [today, setToday] = useState<Date | null>(null);
  const [monthAnchor, setMonthAnchor] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  useEffect(() => {
    const current = dateInPakistan();
    setToday(current);
    setMonthAnchor(current);
    setSelectedDate(current);
  }, []);
  if (!today || !monthAnchor || !selectedDate) {
    return <main className={styles.page}><section className={styles.hero}><h1>Islamic Calendar</h1><p>Preparing the Hijri calendar…</p></section></main>;
  }
  const hijriMonth = getHijri(monthAnchor);
  const monthStart = getMonthStart(monthAnchor);
  const calendarStart = addDays(monthStart, -monthStart.getUTCDay());
  const days = Array.from({ length: 42 }, (_, index) => addDays(calendarStart, index));
  const selectedHijri = getHijri(selectedDate);
  const isToday = (date: Date) => date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10);
  const isSelected = (date: Date) => date.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="RHM Islam 360 home"><span className={styles.mark}>ر</span><span><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/explore#practice">Practice</a><a href="/explore">Explore all</a></nav>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>RHM · LUNAR DATE & MONTH VIEW</span>
        <p className={styles.arabic} lang="ar" dir="rtl">التَّقْوِيمُ الْهِجْرِيُّ</p>
        <h1>Islamic Calendar</h1>
        <p>Explore the Hijri lunar months alongside Gregorian dates. The calendar uses the Umm al-Qura calculation as a helpful reference, with Pakistan local dates.</p>
        <div className={styles.todayPanel}>
          <div><span>Today in Pakistan</span><strong>{gregorianFormatter.format(today)}</strong></div>
          <div><span>Hijri date (calculated)</span><strong>{hijriFormatter.format(today)}</strong></div>
        </div>
      </section>

      <section className={styles.calendarWrap} aria-label="Hijri calendar">
        <div className={styles.calendarTop}>
          <div><span className={styles.eyebrow}>MONTHLY VIEW</span><h2>{hijriMonth.month} {hijriMonth.year} AH</h2><p>Umm al-Qura calendar reference</p></div>
          <div className={styles.controls}>
            <button type="button" onClick={() => { const next = addDays(monthAnchor, -30); setMonthAnchor(next); setSelectedDate(next); }} aria-label="Previous Hijri month">←</button>
            <button type="button" onClick={() => { setMonthAnchor(today); setSelectedDate(today); }}>Today</button>
            <button type="button" onClick={() => { const next = addDays(monthAnchor, 30); setMonthAnchor(next); setSelectedDate(next); }} aria-label="Next Hijri month">→</button>
          </div>
        </div>
        <div className={styles.weekdays}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div>
        <div className={styles.days}>
          {days.map((date) => {
            const hijri = getHijri(date);
            const inMonth = hijri.month === hijriMonth.month && hijri.year === hijriMonth.year;
            return <button key={date.toISOString()} type="button" className={[styles.day, !inMonth ? styles.outside : "", isToday(date) ? styles.today : "", isSelected(date) ? styles.selected : ""].filter(Boolean).join(" ")} onClick={() => setSelectedDate(date)} aria-pressed={isSelected(date)} aria-label={`${hijri.day} ${hijri.month} ${hijri.year} AH, ${gregorianFormatter.format(date)}`}>
              <strong>{hijri.day}</strong><small>{date.getUTCDate()}</small>
            </button>;
          })}
        </div>
        <div className={styles.legend}><span><i className={styles.todayDot} /> Today</span><span><i className={styles.selectedDot} /> Selected date</span><small>Hijri day · Gregorian day</small></div>
        <div className={styles.selectedPanel}>
          <span className={styles.eyebrow}>SELECTED DATE</span>
          <strong>{selectedHijri.day} {selectedHijri.month} {selectedHijri.year} AH</strong>
          <p>{gregorianFormatter.format(selectedDate)}</p>
        </div>
      </section>

      <section className={styles.note}>
        <h2>About Hijri dates</h2>
        <p>This calendar calculates dates using the browser’s built-in Umm al-Qura calendar data and the Pakistan time zone. Actual Islamic month beginnings and important observances in Pakistan may differ according to local moon sighting and announcements by the recognised authority. Please confirm religious dates with your local mosque or the Central Ruet-e-Hilal Committee.</p>
      </section>
      <footer className={styles.footer}><a href="/">RHM Islam 360</a><span>Rehmat • Hidayat • Ma’rifat</span><a href="/companion">Muslim Companion</a></footer>
    </main>
  );
}
