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
          <a onClick={() => setMobileMenuOpen(false)} href="/">Home</a><a onClick={() => setMobileMenuOpen(false)} href="/quran">Qur’an</a><a onClick={() => setMobileMenuOpen(false)} href="/academy">Learn</a><a onClick={() => setMobileMenuOpen(false)} href="/prayer-times">Prayer & Azan</a><a onClick={() => setMobileMenuOpen(false)} href="/explore#practice">Practice</a><a onClick={() => setMobileMenuOpen(false)} href="/my-rhm">My RHM</a><a onClick={() => setMobileMenuOpen(false)} href="/explore">Explore all</a>
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




      <section className="home-quick-access" aria-labelledby="quick-access-title">
        <div className="home-quick-access-heading">
          <span className="eyebrow">Quick access</span>
          <h2 id="quick-access-title">What would you like to do?</h2>
          <p>Go straight to the things people use most. No need to search through menus.</p>
        </div>
        <div className="home-quick-access-grid">
          <a className="home-quick-link home-quick-prayer" href="/prayer-times"><span aria-hidden="true">☾</span><strong>Namaz & Azan</strong><small>Prayer times and reminders</small></a>
          <a className="home-quick-link" href="/daily-life#qibla"><span aria-hidden="true">⌖</span><strong>Qibla direction</strong><small>Find the Kaaba direction</small></a>
          <a className="home-quick-link" href="/quran"><span aria-hidden="true">۩</span><strong>Read Qur’an</strong><small>Open Surahs and recitation</small></a>
          <a className="home-quick-link" href="/duas"><span aria-hidden="true">🤲</span><strong>Daily Duas</strong><small>Supplications and Azkar</small></a>
          <a className="home-quick-link" href="/hadith"><span aria-hidden="true">۞</span><strong>Hadith</strong><small>Browse source references</small></a>
          <a className="home-quick-link" href="/tafsir"><span aria-hidden="true">📖</span><strong>Tafsir</strong><small>Explore available explanations</small></a>
          <a className="home-quick-link" href="/qaida"><span aria-hidden="true">ا ب</span><strong>Qaida & Arabic</strong><small>Start learning step by step</small></a>
          <a className="home-quick-link" href="/companion"><span aria-hidden="true">◎</span><strong>Tasbeeh & tools</strong><small>Open everyday Muslim tools</small></a>
          <a className="home-quick-link" href="/islamic-calendar"><span aria-hidden="true">▦</span><strong>Islamic calendar</strong><small>Hijri dates and occasions</small></a>
        </div>
      </section>
      <style jsx global>{`
        .home-quick-access{width:min(1240px,calc(100% - 40px));margin:34px auto 10px;padding:clamp(22px,3vw,34px);border:1px solid #c9d8ce;border-radius:22px;background:#fffdf7;color:#17251f}
        .home-quick-access-heading{max-width:720px;margin-bottom:20px}
        .home-quick-access-heading h2{margin:6px 0;color:#14251d;font-size:clamp(24px,3vw,32px);line-height:1.2}
        .home-quick-access-heading p{margin:0;color:#35463d;line-height:1.65}
        .home-quick-access-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
        .home-quick-link{display:grid;grid-template-columns:42px minmax(0,1fr);grid-template-rows:auto auto;align-items:center;column-gap:12px;min-height:78px;padding:13px 15px;border:1px solid #c9d8ce;border-radius:14px;background:#fff;color:#17251f;text-decoration:none;transition:border-color .16s ease,transform .16s ease,box-shadow .16s ease}
        .home-quick-link:hover{border-color:#176b4d;transform:translateY(-2px);box-shadow:0 7px 20px rgba(23,107,77,.10)}
        .home-quick-link>span{grid-row:1/3;display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#e1eee7;color:#10543c;font-size:23px}
        .home-quick-link strong{align-self:end;color:#17251f;font-size:15px}
        .home-quick-link small{align-self:start;color:#46584d;font-size:12px;line-height:1.4}
        .home-quick-link.home-quick-prayer{border:2px solid #176b4d;background:#edf5ef}
        .home-quick-link:focus-visible{outline:3px solid #b98735;outline-offset:3px}
        html[data-site-theme="dark"] .home-quick-access{background:#17231e;border-color:#40594b;color:#fff8e9}
        html[data-site-theme="dark"] .home-quick-access-heading h2,html[data-site-theme="dark"] .home-quick-link strong{color:#fff8e9}
        html[data-site-theme="dark"] .home-quick-access-heading p,html[data-site-theme="dark"] .home-quick-link small{color:#e0e9e2}
        html[data-site-theme="dark"] .home-quick-link{background:#101b16;border-color:#40594b}
        html[data-site-theme="dark"] .home-quick-link>span{background:#294638;color:#d5f0df}
        html[data-site-theme="dark"] .home-quick-link.home-quick-prayer{background:#1c382a;border-color:#9abdaa}
        @media(max-width:760px){.home-quick-access{width:calc(100% - 28px);margin:24px auto 8px;padding:20px 16px}.home-quick-access-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.home-quick-link{grid-template-columns:36px minmax(0,1fr);min-height:74px;padding:10px;column-gap:9px}.home-quick-link>span{width:36px;height:36px;font-size:20px}.home-quick-link strong{font-size:13px}.home-quick-link small{font-size:11px}}
        @media(max-width:380px){.home-quick-access-grid{grid-template-columns:1fr}}
        @media(prefers-reduced-motion:reduce){.home-quick-link{transition:none}.home-quick-link:hover{transform:none}}
      `}</style>
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
