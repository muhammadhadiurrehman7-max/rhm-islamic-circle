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
      `}
        .rhm-quran-hub{position:relative;overflow:hidden;padding:clamp(42px,6vw,78px) 20px;background:linear-gradient(180deg,#f3f0e5 0%,#e8eee4 100%);color:#17392e}
        .rhm-quran-hub-shell{width:min(1180px,100%);margin:auto}
        .rhm-quran-hub-intro{max-width:760px}.rhm-quran-kicker{display:block;color:#8b682d;font-size:.72rem;font-weight:850;letter-spacing:.16em}
        .rhm-quran-hub-intro h2{margin:13px 0 14px;color:#17392e;font:600 clamp(32px,4.7vw,54px)/1.08 Georgia,serif;letter-spacing:-.035em}
        .rhm-quran-hub-intro>p{max-width:680px;color:#52665a;font-size:1.02rem;line-height:1.85}
        .rhm-quran-hub-actions{display:flex;gap:12px;flex-wrap:wrap;margin:25px 0 18px}
        .rhm-quran-action-primary,.rhm-quran-action-secondary{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:48px;padding:0 19px;border-radius:999px;text-decoration:none;font-weight:800}
        .rhm-quran-action-primary{background:#173d30;color:#fff8e9;border:1px solid #173d30}.rhm-quran-action-secondary{border:1px solid #9d875d;color:#294b3a;background:rgba(255,255,255,.45)}
        .rhm-quran-trustline{display:flex;gap:10px;flex-wrap:wrap;color:#647467;font-size:.83rem;font-weight:650}
        .rhm-quran-hub-art{position:absolute;top:44px;right:max(5vw,calc((100vw - 1180px)/2));width:clamp(220px,27vw,340px);height:310px;display:grid;place-items:center;pointer-events:none}
        .rhm-quran-arch{width:80%;height:100%;padding:12px;border:1px solid #b79b61;border-radius:180px 180px 24px 24px;background:linear-gradient(145deg,#244b39,#102a21);box-shadow:0 22px 50px rgba(26,57,41,.2)}
        .rhm-quran-arch-inner{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px;border:1px solid rgba(226,198,133,.55);border-radius:170px 170px 17px 17px;text-align:center;color:#f7edcf}
        .rhm-quran-arch-star{font-size:30px;color:#dfbd73}.rhm-quran-arch-inner p{margin:18px 0;color:#fff5dc;font:2rem/1.8 Georgia,serif}
        .rhm-quran-verse-ref{font-size:.65rem;letter-spacing:.18em;color:#e6c77e;font-weight:800}.rhm-quran-verse-meaning{max-width:190px;margin-top:12px;color:#eee3c9;font-size:.85rem;line-height:1.6}
        .rhm-quran-journey-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:38px 0 18px;padding:19px 22px;border:1px solid #d4d9ca;border-radius:17px;background:rgba(255,255,255,.7);box-shadow:0 8px 26px rgba(33,61,43,.06)}
        .rhm-quran-journey-copy strong,.rhm-quran-journey-copy small{display:block}.rhm-quran-journey-copy strong{margin:5px 0;color:#1b3d30;font-size:1.05rem}.rhm-quran-journey-copy small{color:#617064}
        .rhm-quran-journey-bar>a{flex:none;padding:12px 16px;border-radius:999px;background:#e8d5a4;color:#352813;text-decoration:none;font-weight:850}
        .rhm-quran-tools-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}
        .rhm-quran-tool{display:flex;flex-direction:column;align-items:flex-start;min-height:205px;padding:21px;border:1px solid #d8ddcf;border-radius:17px;background:#fffdf7;color:#1b3d30;text-decoration:none;transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
        .rhm-quran-tool:hover{transform:translateY(-3px);border-color:#b89b5d;box-shadow:0 12px 28px rgba(27,61,48,.09)}
        .rhm-quran-tool-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#edf1e6;color:#28543d;font-size:1.35rem}
        .rhm-quran-tool-label{margin-top:15px;color:#927039;font-size:.64rem;font-weight:850;letter-spacing:.15em}
        .rhm-quran-tool strong{margin:5px 0;color:#1b3d30;font-size:1.06rem}.rhm-quran-tool p{margin:0 0 15px;color:#657367;font-size:.9rem;line-height:1.65}
        .rhm-quran-tool-link{margin-top:auto;color:#755622;font-size:.83rem;font-weight:850}
        .rhm-quran-hub-footnote{margin-top:20px;color:#6b766a;font-size:.76rem;line-height:1.6}
        html[data-site-theme="dark"] .rhm-quran-hub{background:linear-gradient(180deg,#111f19,#17291f);color:#f2ead8}
        html[data-site-theme="dark"] .rhm-quran-hub-intro h2,html[data-site-theme="dark"] .rhm-quran-tool strong{color:#f4ead3}
        html[data-site-theme="dark"] .rhm-quran-hub-intro>p,html[data-site-theme="dark"] .rhm-quran-trustline,html[data-site-theme="dark"] .rhm-quran-tool p,html[data-site-theme="dark"] .rhm-quran-hub-footnote{color:#c2cdbf}
        html[data-site-theme="dark"] .rhm-quran-journey-bar{background:#20372b;border-color:#405b47}
        html[data-site-theme="dark"] .rhm-quran-journey-copy strong{color:#f4ead3}html[data-site-theme="dark"] .rhm-quran-journey-copy small{color:#c2cdbf}
        html[data-site-theme="dark"] .rhm-quran-tool{background:#1c3025;border-color:#3d5947;color:#f4ead3}
        html[data-site-theme="dark"] .rhm-quran-tool-icon{background:#294534;color:#f0dba7}
        html[data-site-theme="dark"] .rhm-quran-tool-link{color:#e6c77e}
        html[data-site-theme="dark"] .rhm-quran-action-secondary{color:#f1dfb5;border-color:#8c784e;background:#23372a}
        @media(max-width:760px){.rhm-quran-hub-art{position:relative;top:auto;right:auto;width:210px;height:230px;margin:28px auto 0}.rhm-quran-journey-bar{align-items:flex-start;flex-direction:column}.rhm-quran-journey-bar>a{align-self:stretch;text-align:center}.rhm-quran-tools-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:520px){.rhm-quran-hub{padding:38px 15px}.rhm-quran-tools-grid{grid-template-columns:1fr}.rhm-quran-tool{min-height:unset}.rhm-quran-hub-actions>*{width:100%}.rhm-quran-trustline{font-size:.75rem}}
</style>
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
