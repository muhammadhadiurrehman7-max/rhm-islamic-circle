"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const links = [
  { title: "My RHM dashboard", description: "See your saved learning and worship checklist progress in one private place.", href: "/my-rhm", tag: "Personal" },
  { title: "Qur’an & reciters", description: "Read, listen, compare translations and continue your Qur’an study.", href: "/quran", tag: "Worship" },
  { title: "Prayer times & Qibla", description: "Open the prayer centre for local prayer guidance and direction.", href: "/prayer-times", tag: "Worship" },
  { title: "Islamic calendar", description: "Browse Hijri months and Gregorian dates using Pakistan local time.", href: "/islamic-calendar", tag: "Calendar" },
  { title: "Daily Duas & Azkar", description: "Explore supplications with Arabic, meanings and references.", href: "/duas", tag: "Worship" },
  { title: "Hadith library", description: "Search recognised collections and inspect the source edition.", href: "/hadith", tag: "Knowledge" },
  { title: "Learning Academy", description: "Follow structured Islamic learning and guided lessons.", href: "/academy", tag: "Learning" },
  { title: "Qaida & Arabic", description: "Build foundations in Arabic letters and Qur’an reading.", href: "/qaida", tag: "Learning" },
  { title: "Discover Islam", description: "Explore core beliefs, practice and introductory topics.", href: "/learn", tag: "Learning" },
  { title: "Prophetic Seerah & heritage", description: "Explore Islamic history and heritage resources.", href: "/heritage", tag: "Learning" },
  { title: "My learning journey", description: "Track personal learning goals and daily consistency.", href: "/journey", tag: "Personal" },
  { title: "Worship tracker", description: "Use a private daily checklist for personal reflection.", href: "/worship-tracker", tag: "Personal" },
  { title: "Names of Allah", description: "Study the beautiful names with meanings.", href: "/names-of-allah", tag: "Knowledge" },
  { title: "Daily life guidance", description: "Find practical learning for everyday Muslim life.", href: "/daily-life", tag: "Knowledge" },
];

const words = [
  ["Akhlaq", "أخلاق", "Character, manners and ethical conduct."],
  ["Akhirah", "الآخرة", "The Hereafter; life after death."],
  ["Du'a", "دعاء", "Supplication: calling upon Allah."],
  ["Dhikr", "ذكر", "Remembrance of Allah."],
  ["Fiqh", "فقه", "Understanding Islamic practical rulings."],
  ["Hadith", "حديث", "A report describing the Prophet’s ﷺ words, actions or approvals."],
  ["Ihsan", "إحسان", "Excellence in worship and conduct."],
  ["Iman", "إيمان", "Faith or belief."],
  ["Salah", "صلاة", "The prescribed ritual prayer."],
  ["Sawm", "صوم", "Fasting."],
  ["Sadaqah", "صدقة", "Voluntary charity."],
  ["Tafsir", "تفسير", "Explanation and interpretation of the Qur’an."],
  ["Taqwa", "تقوى", "God-consciousness and mindful obedience."],
  ["Tawbah", "توبة", "Repentance and turning back to Allah."],
  ["Tawhid", "توحيد", "The oneness of Allah."],
  ["Zakat", "زكاة", "Obligatory almsgiving, subject to its conditions."],
];

const tasbeehOptions = [
  { id: "subhan", label: "SubhanAllah", arabic: "سُبْحَانَ اللَّهِ", meaning: "Glory be to Allah", target: 33 },
  { id: "hamd", label: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", meaning: "All praise is for Allah", target: 33 },
  { id: "takbir", label: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", meaning: "Allah is the Greatest", target: 34 },
  { id: "istighfar", label: "Astaghfirullah", arabic: "أَسْتَغْفِرُ اللَّهَ", meaning: "I seek Allah's forgiveness", target: 100 },
  { id: "hawqala", label: "La hawla wa la quwwata illa billah", arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", meaning: "There is no power nor strength except through Allah", target: 100 },
  { id: "salawat", label: "Salawat upon the Prophet ﷺ", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", meaning: "O Allah, send blessings upon Muhammad", target: 100 },
  { id: "tahlil", label: "La ilaha illallah", arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", meaning: "There is no deity worthy of worship except Allah", target: 100 },
];

const formatPKR = (value: number) => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);

export default function MuslimCompanionPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100);
  const [query, setQuery] = useState("");
  const [nisab, setNisab] = useState("");
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [investments, setInvestments] = useState("");
  const [business, setBusiness] = useState("");
  const [debts, setDebts] = useState("");
  const [calendarLabels, setCalendarLabels] = useState({ gregorian: "", hijri: "" });

  useEffect(() => {
    const now = new Date();
    const gregorian = now.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    let hijri = "Hijri date is not supported by this browser";
    try { hijri = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { dateStyle: "full" }).format(now); } catch { /* Keep the explanatory fallback. */ }
    setCalendarLabels({ gregorian, hijri });
    try {
      const saved = Number(localStorage.getItem("rhm-companion-tasbeeh-v1"));
      if (Number.isFinite(saved) && saved >= 0) setCount(saved);
    } catch { /* The counter remains usable for this visit. */ }
  }, []);

  function updateCount(next: number) {
    const safe = Math.max(0, Math.floor(next));
    setCount(safe);
    try { localStorage.setItem(`rhm-companion-tasbeeh-${selectedZikr}`, String(safe)); if (selectedZikr === "subhan") localStorage.setItem("rhm-companion-tasbeeh-v1", String(safe)); } catch { /* Keep in memory if storage is blocked. */ }
  }

  const filteredWords = useMemo(() => words.filter(([en, ar, meaning]) => [en, ar, meaning].some((part) => part.toLowerCase().includes(query.trim().toLowerCase()))), [query]);
  const totalAssets = [cash, gold, silver, investments, business].reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const netAssets = Math.max(0, totalAssets - Math.max(0, Number(debts) || 0));
  const nisabValue = Number(nisab);
  const zakatDue = nisab !== "" && Number.isFinite(nisabValue) && nisabValue > 0 && netAssets >= nisabValue ? netAssets * 0.025 : 0;
  const reachedNisab = nisab !== "" && nisabValue > 0 && netAssets >= nisabValue;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/"><span className={styles.mark}>ر</span><span><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/academy">Learn</a><a href="/explore#practice">Practice</a><a href="/my-rhm">My RHM</a><a href="/explore">Explore all</a></nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Your everyday Islamic learning space</p>
        <p className={styles.arabic} lang="ar" dir="rtl">رَبِّ زِدْنِي عِلْمًا</p>
        <h1>RHM Muslim Companion</h1>
        <p>Bring your worship tools, learning resources and personal reminders together in one calm place. Use each tool as an aid to learning and consult qualified scholars for religious rulings.</p>
        <div className={styles.heroActions}><a href="/quran">Continue with Qur’an ↗</a><a href="/prayer-times">Open prayer centre ↗</a></div>
        <div className={styles.datePanel}><span>Today’s date</span><strong>{calendarLabels.gregorian || "Loading local date…"}</strong><span>Hijri calendar (browser calculation)</span><strong>{calendarLabels.hijri || "Loading Hijri date…"}</strong></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Everything connected</p><h2>Your RHM learning spaces</h2></div><span>12 resources</span></div>
        <div className={styles.linkGrid}>{links.map((item) => <a className={styles.linkCard} href={item.href} key={item.href}><span className={styles.tag}>{item.tag}</span><h3>{item.title} <span aria-hidden="true">↗</span></h3><p>{item.description}</p></a>)}</div>
      </section>

      <section className={styles.toolsGrid}>
        <article className={styles.toolCard}>
          <p className={styles.eyebrow}>Personal remembrance</p><h2>Digital Tasbeeh</h2><label className={styles.field}>Choose a remembrance<select value={selectedZikr} onChange={(e) => setSelectedZikr(e.target.value)}>{tasbeehOptions.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><p className={styles.arabicSmall} lang="ar" dir="rtl">{tasbeehOptions.find((item) => item.id === selectedZikr)?.arabic}</p><p className={styles.muted}>{tasbeehOptions.find((item) => item.id === selectedZikr)?.meaning}</p>
          <div className={styles.counter} aria-live="polite">{count}</div>
          <label className={styles.field}>Target
            <select value={target} onChange={(e) => setTarget(Number(e.target.value))}><option value={33}>33</option><option value={34}>34</option><option value={100}>100</option><option value={300}>300</option><option value={500}>500</option><option value={1000}>1,000</option></select>
          </label>
          <div className={styles.progressTrack} role="progressbar" aria-label="Tasbeeh target progress" aria-valuemin={0} aria-valuemax={target} aria-valuenow={Math.min(count, target)}><span style={{ width: Math.min(100, (count / target) * 100) + "%" }} /></div>
          <p className={styles.muted}>{Math.min(count, target)} of {target} counted · {Math.max(0, target - count)} remaining to target</p>
          <div className={styles.counterActions}><button className={styles.primaryButton} onClick={() => updateCount(count + 1)}>Count +1</button><button onClick={() => updateCount(count + 10)}>+10</button><button onClick={() => updateCount(0)}>Reset</button></div>
          <p className={styles.note}>This counter is saved only in this browser on this device. It does not sync to your RHM account.</p>
        </article>

        <article className={styles.toolCard}>
          <p className={styles.eyebrow}>Personal learning aid</p><h2>Islamic Dictionary</h2><p>Search a small starter glossary of commonly used Islamic terms.</p>
          <label className={styles.field}>Search by English, Arabic or meaning<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try: tawhid, ذكر, prayer…" /></label>
          <div className={styles.dictionaryList}>{filteredWords.map(([en, ar, meaning]) => <div className={styles.word} key={en}><div><strong>{en}</strong><span lang="ar" dir="rtl">{ar}</span></div><p>{meaning}</p></div>)}{filteredWords.length === 0 && <p className={styles.muted}>No matching terms. Try another spelling.</p>}</div>
          <p className={styles.note}>This is a concise learner’s glossary, not a substitute for detailed scholarly definitions. Meanings can vary by context.</p>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Educational estimate</p><h2>Zakat calculator</h2></div><span>PKR</span></div>
        <div className={styles.zakat}>
          <div className={styles.zakatIntro}><h3>Estimate 2.5% on eligible net zakatable wealth</h3><p>Enter your own current Nisab value and eligible asset amounts. The tool does not fetch or assume today’s gold or silver prices.</p><p className={styles.note}>Zakat eligibility depends on asset type, ownership, debts, the lunar year (hawl) and scholarly rules. Some assets and circumstances need specialist guidance. This estimate is educational, not a fatwa.</p></div>
          <div className={styles.zakatFields}>
            <label className={styles.field}>Nisab value (PKR)<input inputMode="decimal" type="number" min="0" value={nisab} onChange={(e) => setNisab(e.target.value)} placeholder="Enter current Nisab value" /></label>
            <label className={styles.field}>Cash, bank savings & cash equivalents<input inputMode="decimal" type="number" min="0" value={cash} onChange={(e) => setCash(e.target.value)} placeholder="0" /></label>
            <label className={styles.field}>Zakatable gold value<input inputMode="decimal" type="number" min="0" value={gold} onChange={(e) => setGold(e.target.value)} placeholder="0" /></label>
            <label className={styles.field}>Zakatable silver value<input inputMode="decimal" type="number" min="0" value={silver} onChange={(e) => setSilver(e.target.value)} placeholder="0" /></label>
            <label className={styles.field}>Eligible investments & shares<input inputMode="decimal" type="number" min="0" value={investments} onChange={(e) => setInvestments(e.target.value)} placeholder="0" /></label>
            <label className={styles.field}>Zakatable business stock / trade goods<input inputMode="decimal" type="number" min="0" value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="0" /></label>
            <label className={styles.field}>Deductible immediate liabilities (if applicable)<input inputMode="decimal" type="number" min="0" value={debts} onChange={(e) => setDebts(e.target.value)} placeholder="0" /></label>
          </div>
          <div className={styles.result}><div><span>Estimated net assets</span><strong>{formatPKR(netAssets)}</strong></div><div><span>Nisab threshold</span><strong>{nisabValue > 0 ? formatPKR(nisabValue) : "Not entered"}</strong></div><div><span>Estimated Zakat</span><strong>{nisab === "" || nisabValue <= 0 ? "Enter Nisab" : reachedNisab ? formatPKR(zakatDue) : "Below entered Nisab"}</strong></div><p>{reachedNisab ? "Your entered net assets meet or exceed the Nisab value. Confirm all conditions with a qualified scholar." : "The estimate will show a payment amount only after a valid Nisab value is entered and net assets meet it."}</p></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Learn with care</p><h2>For new Muslims and beginners</h2></div></div>
        <div className={styles.beginnerGrid}>
          <a href="/learn"><strong>Start with the foundations</strong><span>Explore belief, worship and the essentials of learning Islam.</span></a>
          <a href="/qaida"><strong>Learn Arabic reading</strong><span>Begin with letters, sounds and guided reading foundations.</span></a>
          <a href="/duas"><strong>Learn daily supplications</strong><span>Read the Arabic, meaning and source of selected duas.</span></a>
          <a href="/academy"><strong>Follow structured lessons</strong><span>Build knowledge gradually through the RHM Learning Academy.</span></a>
        </div>
      </section>

      <section className={styles.disclaimer}><h2>Knowledge, trust and responsibility</h2><p>RHM aims to present religious material with clear references and careful attribution. Translations and scholarly explanations are not the Qur’an itself. Hadith grading and numbering may differ by edition. AI tools, calculators and general educational pages must not be treated as independent sources of fatwas. For personal rulings, consult a qualified scholar you trust.</p><p>Prayer times and Hijri dates can differ by calculation method, location and local authority. Follow your local mosque or recognised authority where appropriate.</p></section>
      <footer className={styles.footer}><a href="/">RHM Islam 360</a><span>Rehmat • Hidayat • Ma’rifat</span><a href="/donate">Support RHM</a></footer>
    </main>
  );
}
