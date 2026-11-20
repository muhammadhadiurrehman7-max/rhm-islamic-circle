"use client";

import { useEffect, useState } from "react";

const guidanceQuotes = [
  {
    "quote": "The most beloved of deeds to Allah are those that are most consistent, even if they are few.",
    "arabic": "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
    "by": "Prophet Muhammad ﷺ",
    "source": "Sahih al-Bukhari 6464; Sahih Muslim 783",
    "url": "https://sunnah.com/bukhari:6464"
  },
  {
    "quote": "Whoever is deprived of gentleness is deprived of goodness.",
    "arabic": "مَنْ يُحْرَمِ الرِّفْقَ يُحْرَمِ الْخَيْرَ",
    "by": "Prophet Muhammad ﷺ",
    "source": "Sahih Muslim 2592c",
    "url": "https://sunnah.com/muslim:2592c"
  },
  {
    "quote": "Make things easy and do not make them difficult; give glad tidings and do not drive people away.",
    "arabic": "يَسِّرُوا وَلَا تُعَسِّرُوا وَبَشِّرُوا وَلَا تُنَفِّرُوا",
    "by": "Prophet Muhammad ﷺ",
    "source": "Sahih al-Bukhari 69",
    "url": "https://sunnah.com/bukhari:69"
  },
  {
    "quote": "My Lord, increase me in knowledge.",
    "arabic": "رَّبِّ زِدْنِي عِلْمًا",
    "by": "Qur'an 20:114",
    "source": "The Holy Qur'an",
    "url": "https://quran.com/20/114"
  }
];

const features = [
  { icon: "۞", title: "Read the Quran", text: "Explore all 114 Surahs with a clear reading experience and space for translations and recitation." },
  { icon: "♫", title: "Listen & reflect", text: "Listen to available reciters, repeat ayahs, follow along, and make space for reflection." },
  { icon: "✦", title: "Learn step by step", text: "Build confidence with Arabic letters, Qaida foundations, reading practice, and guided lessons." },
  { icon: "☾", title: "Daily reminders", text: "Create a steady routine with daily Ayah reflections, duas, goals, and personal progress." },
  { icon: "◎", title: "Learning circles", text: "Join as an individual or learn together in a private group organised by a company or community." },
  { icon: "❖", title: "Islamic knowledge", text: "Discover Seerah, Prophets’ stories, Islamic history, and learning resources with clear references." }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [guidanceIndex, setGuidanceIndex] = useState(0);
  const [lastReadKey, setLastReadKey] = useState<string | null>(null);
  useEffect(() => { try { setLastReadKey(window.localStorage.getItem("rhm-quran-last-read")); } catch { setLastReadKey(null); } }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setGuidanceIndex((current) => (current + 1) % guidanceQuotes.length), 20000);
    return () => window.clearInterval(timer);
  }, []);
  const guidance = guidanceQuotes[guidanceIndex];
  return (
    <main>
      <a className="skip-to-content" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="RHM Islam 360 — Rehmat, Hidayat and Ma’rifat"><span className="brand-mark">ر</span><span className="brand-copy"><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <button className="mobile-menu-toggle" type="button" aria-expanded={mobileMenuOpen} aria-controls="primary-navigation" onClick={() => setMobileMenuOpen((open) => !open)}><span aria-hidden="true">{mobileMenuOpen ? "×" : "☰"}</span><span>{mobileMenuOpen ? "Close" : "Menu"}</span></button>
        <nav id="primary-navigation" className={`nav-links${mobileMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMobileMenuOpen(false)} href="/">Home</a><a onClick={() => setMobileMenuOpen(false)} href="/quran">Qur’an</a><a onClick={() => setMobileMenuOpen(false)} href="/academy">Learn</a><a onClick={() => setMobileMenuOpen(false)} href="/explore#practice">Practice</a><a onClick={() => setMobileMenuOpen(false)} href="/my-rhm">My RHM</a><a onClick={() => setMobileMenuOpen(false)} href="/explore">Explore all</a>
        </nav>
        <div className="nav-actions"><a className="btn btn-primary" href="/login">Join the circle</a></div>
      </header>

      <div id="main-content" tabIndex={-1}>
      <style jsx global>{`
        .academy-home-promo{position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:28px;margin:34px auto;padding:clamp(28px,5vw,56px);width:min(1240px,calc(100% - 40px));border:1px solid #d8e6d9;border-radius:26px;background:linear-gradient(115deg,#f7f4e8 0%,#e7f2e8 55%,#dcefe5 100%);box-shadow:0 16px 42px rgba(22,66,47,.08)}
        .academy-promo-copy{position:relative;z-index:1;max-width:780px}.academy-promo-copy h2{margin:10px 0 12px;color:#173d31;font:600 clamp(27px,4vw,42px)/1.15 "Playfair Display",Georgia,serif}.academy-promo-copy p{max-width:720px;margin:0 0 22px;color:#526b60;line-height:1.8}.academy-promo-emblem{position:absolute;right:5%;top:50%;transform:translateY(-50%);font-size:clamp(110px,18vw,220px);line-height:1;color:rgba(24,103,73,.10);pointer-events:none}
        html[data-site-theme="dark"] .academy-home-promo{border-color:#355b49;background:linear-gradient(115deg,#17392e,#203f32 55%,#294b3a)}html[data-site-theme="dark"] .academy-promo-copy h2{color:#f4ecd8}html[data-site-theme="dark"] .academy-promo-copy p{color:#d1dfd5}
        @media(max-width:560px){.academy-home-promo{margin:24px auto;padding:26px 22px;width:calc(100% - 28px)}.academy-promo-emblem{right:-8%;font-size:130px}}
        .premium-hero {
          position: relative;
          background-image: linear-gradient(90deg,rgba(8,25,20,.94) 0%,rgba(8,25,20,.82) 42%,rgba(8,25,20,.30) 72%,rgba(8,25,20,.18) 100%),url('/images/rhm-islam360-quran-hero.webp');
          background-size: cover; background-position: center 56%; color: #f7f1df;
        }
        .premium-hero-copy h1 { color:#fff7e8; text-shadow:0 3px 24px rgba(0,0,0,.28); }
        .premium-hero-copy > p:not(.hero-arabic-kicker) { color:#eee7d8; }
        .premium-hero-copy .hero-arabic-kicker { color:#f0ce82; }
        .premium-hero .eyebrow,.premium-hero .hero-note { color:#e5d5ad; }
        .premium-hero .btn-light { background:rgba(255,255,255,.10); border-color:rgba(236,211,155,.55); color:#fff7e8; }
        .premium-hero .calligraphy-stage { filter:drop-shadow(0 18px 35px rgba(0,0,0,.26)); }
        html[data-site-theme="dark"] .premium-hero { background-image:linear-gradient(90deg,rgba(5,18,14,.95),rgba(5,18,14,.78) 45%,rgba(5,18,14,.25)),url('/images/rhm-islam360-quran-hero.webp'); }
        @media(max-width:850px) { .premium-hero { background-position:58% center; } .premium-hero:before { content:"";position:absolute;inset:0;background:rgba(7,24,18,.24);pointer-events:none; } .premium-hero-copy,.calligraphy-stage { position:relative;z-index:1; } }
        @media(max-width:560px) { .premium-hero { background-position:62% center; } .premium-hero-copy { padding:18px 12px;border-radius:18px;background:rgba(7,24,18,.52);backdrop-filter:blur(3px); } }
      `}</style>
      <section className="hero premium-hero">
        <div className="hero-copy premium-hero-copy">
          <div className="eyebrow">A beautiful space for beneficial knowledge</div>
          <p className="hero-arabic-kicker" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <h1>Let the light of knowledge illuminate your journey.</h1>
          <p>Read the Qur’an with care, listen to beautiful recitation, study Islamic teachings with clear source references, and learn step by step — in a calm space made for learners everywhere.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/quran">Begin with the Qur’an <span aria-hidden="true">↗</span></a>
            <a className="btn btn-light" href="/academy">Explore Learning Academy</a>
          </div>
          <div className="hero-note">Free learning resources · Arabic, Urdu and English · Learn at your own pace</div>
        </div>
        <div className="calligraphy-stage" aria-label="Qur’anic calligraphy: Read in the name of your Lord who created, Surah Al-Alaq 96 verse 1">
          <div className="calligraphy-orbit orbit-one"></div>
          <div className="calligraphy-orbit orbit-two"></div>
          <div className="calligraphy-star star-a">✦</div><div className="calligraphy-star star-b">✧</div>
          <div className="calligraphy-arch">
            <div className="calligraphy-inner">
              <span className="calligraphy-overline">THE FIRST REVELATION</span>
              <div className="calligraphy-bismillah" lang="ar" dir="rtl">اقْرَأْ</div>
              <div className="calligraphy-main" lang="ar" dir="rtl">بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</div>
              <span className="calligraphy-rule"></span>
              <p className="calligraphy-translation">“Read in the name of your Lord who created.”</p>
              <span className="calligraphy-reference">THE QUR’AN · 96:1</span>
            </div>
          </div>
          <div className="calligraphy-caption"><span>۞</span> Knowledge begins with revelation <span>۞</span></div>
        </div>
      </section>

      <section className="sacred-learning-ribbon" aria-label="Explore sacred places and learning">
        <a href="/heritage#kaaba"><span className="ribbon-symbol">⌂</span><span><strong>Makkah Al-Mukarramah</strong><small>Explore the Holy Kaaba</small></span><span className="ribbon-arrow">↗</span></a>
        <a href="/heritage#masjid-nabawi"><span className="ribbon-symbol">۞</span><span><strong>Al-Madinah Al-Munawwarah</strong><small>Discover Al-Masjid an-Nabawi</small></span><span className="ribbon-arrow">↗</span></a>
        <a href="/quran"><span className="ribbon-symbol">۩</span><span><strong>Qur’an & reflection</strong><small>Read, listen and understand</small></span><span className="ribbon-arrow">↗</span></a>
      </section>



      {/* RHM_QURAN_EXPERIENCE_START: original learning hub, independently designed for RHM Islam 360 */}
      <section className="rhm-quran-hub" aria-labelledby="rhm-quran-hub-title">
        <div className="rhm-quran-hub-shell">
          <div className="rhm-quran-hub-intro">
            <span className="rhm-quran-kicker">YOUR QUR’AN JOURNEY · RHM ISLAM 360</span>
            <h2 id="rhm-quran-hub-title">A closer connection, one Ayah at a time.</h2>
            <p>Read at your pace, listen with focus, explore trusted explanations and build a lasting daily habit. Your study space brings the tools together without crowding the page.</p>
            <div className="rhm-quran-hub-actions">
              <a className="rhm-quran-action-primary" href="/quran">Open the Qur’an reader <span aria-hidden="true">↗</span></a>
              <a className="rhm-quran-action-secondary" href="/tafsir">Explore Tafsir library</a>
            </div>
            <div className="rhm-quran-trustline"><span>114 Surahs</span><i aria-hidden="true">·</i><span>Arabic, Urdu & English</span><i aria-hidden="true">·</i><span>Free core learning</span></div>
          </div>
          <div className="rhm-quran-hub-art" aria-label="Decorative geometric arch inspired by Islamic architecture">
            <div className="rhm-quran-arch">
              <div className="rhm-quran-arch-inner">
                <span className="rhm-quran-arch-star">۞</span>
                <p lang="ar" dir="rtl">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
                <span className="rhm-quran-verse-ref">TA-HA · 20:114</span>
                <span className="rhm-quran-verse-meaning">Ask your Lord to increase you in knowledge.</span>
              </div>
            </div>
          </div>
          <div className="rhm-quran-journey-bar">
            <div className="rhm-quran-journey-copy">
              <span className="rhm-quran-kicker">PICK UP WHERE YOU PAUSED</span>
              <strong>{lastReadKey ? `Continue your reading · Ayah ${lastReadKey}` : "Begin a new reading journey"}</strong>
              <small>{lastReadKey ? "Your last reading position is saved on this device." : "Your reading position will be remembered on this device."}</small>
            </div>
            <a href={lastReadKey ? `/quran?surah=${encodeURIComponent(lastReadKey.split(":")[0])}#ayah-${encodeURIComponent(lastReadKey)}` : "/quran"}> {lastReadKey ? "Continue reading" : "Start reading"} <span aria-hidden="true">→</span></a>
          </div>
          <div className="rhm-quran-tools-grid">
            <a className="rhm-quran-tool" href="/quran#recitation"><span className="rhm-quran-tool-icon">♫</span><span className="rhm-quran-tool-label">LISTEN</span><strong>Recitation studio</strong><p>Choose a reciter, replay an Ayah, follow along and continue through a Surah.</p><span className="rhm-quran-tool-link">Explore listening ↗</span></a>
            <a className="rhm-quran-tool" href="/quran#translation"><span className="rhm-quran-tool-icon">文</span><span className="rhm-quran-tool-label">UNDERSTAND</span><strong>Translations & word study</strong><p>Read meaning alongside the Arabic and explore individual words at your pace.</p><span className="rhm-quran-tool-link">Study the words ↗</span></a>
            <a className="rhm-quran-tool" href="/tafsir"><span className="rhm-quran-tool-icon">۞</span><span className="rhm-quran-tool-label">REFLECT</span><strong>Scholarly Tafsir</strong><p>Explore attributed editions and keep each scholar’s explanation distinct.</p><span className="rhm-quran-tool-link">Open Tafsir ↗</span></a>
            <a className="rhm-quran-tool" href="/academy"><span className="rhm-quran-tool-icon">ا ب</span><span className="rhm-quran-tool-label">BUILD SKILLS</span><strong>Qur’an learning path</strong><p>Strengthen your foundations through Arabic, Qaida, recitation and guided learning.</p><span className="rhm-quran-tool-link">Start learning ↗</span></a>
            <a className="rhm-quran-tool" href="/my-rhm"><span className="rhm-quran-tool-icon">◎</span><span className="rhm-quran-tool-label">YOUR PROGRESS</span><strong>Bookmarks & notes</strong><p>Keep meaningful passages close and return to your personal study notes.</p><span className="rhm-quran-tool-link">View my space ↗</span></a>
            <a className="rhm-quran-tool" href="/islamic-calendar"><span className="rhm-quran-tool-icon">☾</span><span className="rhm-quran-tool-label">STAY CONSISTENT</span><strong>Daily goals & seasons</strong><p>Make space for regular reading and prepare for Ramadan and other blessed days.</p><span className="rhm-quran-tool-link">Plan your routine ↗</span></a>
          </div>
          <div className="rhm-quran-hub-footnote">RHM is independently designed. Qur’anic text, translations, recitations and explanations remain attributed to their respective sources.</div>
        </div>
      </section>
      {/* RHM_QURAN_EXPERIENCE_END */}

      <section className="faith-entry-section" aria-labelledby="faith-entry-title">
        <div className="faith-entry-heading">
          <span className="eyebrow">A clear path through RHM</span>
          <h2 id="faith-entry-title">Explore by purpose</h2>
          <p>Start with one area. Every resource has its own dedicated space, so the homepage stays calm and easy to navigate.</p>
        </div>
        <div className="faith-entry-grid home-primary-grid">
          <a className="faith-entry-card faith-entry-main" href="/quran"><span className="faith-entry-icon">۩</span><span className="faith-entry-label">THE HEART OF RHM</span><h3>Qur’an & Study</h3><p>Read, listen, explore translations and Tafsir, study Tajweed, search reciters and access offline downloads.</p><strong>Open Qur’an study ↗</strong></a>
          <a className="faith-entry-card" href="/explore#learn"><span className="faith-entry-icon">۞</span><h3>Islamic Knowledge</h3><p>Explore Hadith, Duas, the Beautiful Names of Allah, Seerah, heritage and foundations of Islam.</p><strong>Explore knowledge ↗</strong></a>
          <a className="faith-entry-card" href="/explore#practice"><span className="faith-entry-icon">☾</span><h3>Worship & Daily Life</h3><p>Find prayer times, Qibla, worship guidance, Tasbeeh, Zakat tools and everyday learning.</p><strong>Open worship tools ↗</strong></a>
          <a className="faith-entry-card" href="/my-rhm"><span className="faith-entry-icon">ا ب</span><h3>My RHM & Progress</h3><p>Continue your personal learning journey and review the progress saved on this device.</p><strong>Open my dashboard ↗</strong></a>
        </div>
        <div className="home-explore-link"><a className="btn btn-primary" href="/explore">View all RHM features ↗</a></div>
      </section>
      <section className="guidance-section" aria-label="Islamic guidance and reminders">
        <div className="guidance-inner">
          <div className="eyebrow">A moment of reflection</div>
          <h2>Islamic Guidance</h2>
          <div className="guidance-ornament" aria-hidden="true">۞</div>
          <div className="guidance-quote" key={guidanceIndex} aria-live="polite">
            {guidance.arabic && <p className="guidance-arabic" lang="ar" dir="rtl">{guidance.arabic}</p>}
            <blockquote>“{guidance.quote}”</blockquote>
            <p className="guidance-by">{guidance.by}</p>
            <a className="guidance-source" href={guidance.url} target="_blank" rel="noreferrer">Source: {guidance.source} ↗</a>
          </div>
          <div className="guidance-timer">A new reminder appears every 20 seconds</div>
          <div className="guidance-dots" aria-label={`Reminder ${guidanceIndex+1} of ${guidanceQuotes.length}`}>
            {guidanceQuotes.map((item,index)=><button key={item.by+index} type="button" className={index===guidanceIndex?"active":""} aria-label={`Show reminder ${index+1}`} onClick={()=>setGuidanceIndex(index)} />)}
          </div>
        </div>
      </section>


      <footer className="footer" id="about"><span>© {new Date().getFullYear()} RHM Islam 360</span><span><strong>RHM means Rehmat, Hidayat &amp; Ma’rifat</strong><small>A journey of mercy, guidance and understanding.</small></span><span>Founded and owned by Mr Muhammad Hadi Ur Rehman</span></footer>
      </div>
    </main>
  );
}
