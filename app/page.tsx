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
  const [shareMessage, setShareMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  async function shareLearningLink(path: string, title: string) {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title, text: "Explore this learning resource from RHM Islam 360.", url });
        setShareMessage("Thank you for sharing beneficial knowledge.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareMessage("Learning link copied. You can now send it to others.");
      } else {
        setShareMessage("Copy this link from your browser address bar to share this lesson.");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") setShareMessage("Sharing is not available right now. You can copy the page link from your browser.");
    }
  }
  const [guidanceIndex, setGuidanceIndex] = useState(0);
  const [mosqueScene, setMosqueScene] = useState(0);
  useEffect(() => {
    const sceneTimer = window.setInterval(() => setMosqueScene((current) => (current + 1) % 2), 10000);
    return () => window.clearInterval(sceneTimer);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setGuidanceIndex((current) => (current + 1) % guidanceQuotes.length), 20000);
    return () => window.clearInterval(timer);
  }, []);
  const guidance = guidanceQuotes[guidanceIndex];
  return (
    <main>
      <a className="skip-to-content" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="brand" href="#"><span className="brand-mark">ر</span><span>RHM Islam 360</span></a>
        <button className="mobile-menu-toggle" type="button" aria-expanded={mobileMenuOpen} aria-controls="primary-navigation" onClick={() => setMobileMenuOpen((open) => !open)}><span aria-hidden="true">{mobileMenuOpen ? "×" : "☰"}</span><span>{mobileMenuOpen ? "Close" : "Menu"}</span></button>
        <nav id="primary-navigation" className={`nav-links${mobileMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          <a onClick={() => setMobileMenuOpen(false)} href="/learn">Discover Islam</a><a onClick={() => setMobileMenuOpen(false)} href="/heritage">Heritage & History</a><a onClick={() => setMobileMenuOpen(false)} href="#quran">Quran</a><a onClick={() => setMobileMenuOpen(false)} href="/hadith">Hadith</a><a onClick={() => setMobileMenuOpen(false)} href="/duas">Daily Duas</a><a onClick={() => setMobileMenuOpen(false)} href="/qaida">Qaida</a><a onClick={() => setMobileMenuOpen(false)} href="/daily-life">Daily Life</a><a onClick={() => setMobileMenuOpen(false)} href="/journey">My Journey</a><a onClick={() => setMobileMenuOpen(false)} href="#community">Community</a><a onClick={() => setMobileMenuOpen(false)} href="#about">About</a>
        </nav>
        <div className="nav-actions"><a className="btn btn-light" href="#learn">Explore</a><a className="btn btn-primary" href="/login">Join the circle</a></div>
      </header>

      <div id="main-content" tabIndex={-1}>
      <style jsx global>{`
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
          <p>Read the Qur’an with care, listen to beautiful recitation, understand authentic teachings, and learn Islam step by step — in a calm space made for learners everywhere.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/quran">Begin with the Qur’an <span aria-hidden="true">↗</span></a>
            <a className="btn btn-light" href="/learn">Explore Islamic learning</a>
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

      <section className="faith-entry-section" aria-labelledby="faith-entry-title">
        <div className="faith-entry-heading">
          <span className="eyebrow">A guide to the faith</span>
          <h2 id="faith-entry-title">Discover Islam</h2>
          <p>Explore the foundations of Muslim belief, worship, character and the place of Hadith in everyday life. Choose a subject to open its own learning space.</p>
        </div>
        <div className="faith-entry-grid">
          <a className="faith-entry-card faith-entry-main" href="/learn"><span className="faith-entry-icon">☪</span><span className="faith-entry-label">Start here</span><h3>Discover Islam</h3><p>Explore the foundations of faith, the Five Pillars, articles of Iman, Qur’an, Sunnah and Islamic character.</p><strong>Enter the learning guide ↗</strong></a>
          <a className="faith-entry-card" href="/hadith"><span className="faith-entry-icon">۞</span><h3>Hadith Library</h3><p>Explore Hadith collections with Arabic and available translations. Search by exact narration number or text.</p><strong>Open Hadith library ↗</strong></a>
          <a className="faith-entry-card" href="/duas"><span className="faith-entry-icon">🤲</span><h3>Daily Duas</h3><p>Learn daily supplications from the Qur’an and Sunnah with Arabic, Urdu, English and clear references.</p><strong>Explore daily duas ↗</strong></a>
          <a className="faith-entry-card" href="/daily-life"><span className="faith-entry-icon">☪</span><h3>Everyday Muslim Life</h3><p>Learn Wudu, Ghusl, cleanliness, prayer preparation, Qibla direction and daily Islamic manners.</p><strong>Open daily-life guide ↗</strong></a>
          <a className="faith-entry-card" href="/qaida"><span className="faith-entry-icon">ا ب</span><h3>Beginner’s Qaida</h3><p>Start learning Arabic letters and basic reading rules.</p><strong>Open Qaida lessons ↗</strong></a>
          <a className="faith-entry-card" href="/heritage"><span className="faith-entry-icon">🕌</span><h3>Islamic Heritage</h3><p>Explore Islamic history, historic cities, scholars, architecture, manuscripts and sacred places across the Muslim world.</p><strong>Explore history & heritage ↗</strong></a>
          <a className="faith-entry-card" href="/quran"><span className="faith-entry-icon">۩</span><h3>Qur’an Reader</h3><p>Read the Qur’an with Arabic text, translations and recitation.</p><strong>Read the Qur’an ↗</strong></a>
          <a className="faith-entry-card" href="/journey"><span className="faith-entry-icon">✦</span><h3>My Islamic Journey</h3><p>Set a gentle daily learning routine and track your personal progress on this device.</p><strong>Build your daily routine ↗</strong></a>
        </div>
      </section>

      <section className="share-learning-section" id="share-learning">
        <div className="share-learning-heading">
          <span className="eyebrow">Knowledge is a trust to share</span>
          <h2>Learn something meaningful. Pass it on.</h2>
          <p>Every lesson can become a source of benefit. Explore a learning space, then share its direct link with family, friends, classmates or your community.</p>
        </div>
        <div className="share-learning-grid">
          <article className="share-learning-card">
            <span className="share-card-mark">۩</span><span className="share-card-label">QUR’AN</span>
            <h3>Read and reflect</h3><p>Explore Arabic verses, translations, listening tools and study resources.</p>
            <div className="share-card-actions"><a href="/quran">Open Qur’an <span>↗</span></a><button type="button" onClick={() => shareLearningLink("/quran", "RHM Islam 360 — Qur’an")}>Share lesson ↗</button></div>
          </article>
          <article className="share-learning-card">
            <span className="share-card-mark">ا ب</span><span className="share-card-label">ARABIC FOUNDATIONS</span>
            <h3>Start with the letters</h3><p>Take your first steps in Arabic reading with beginner-friendly Qaida lessons.</p>
            <div className="share-card-actions"><a href="/qaida">Start learning <span>↗</span></a><button type="button" onClick={() => shareLearningLink("/qaida", "RHM Islam 360 — Qaida")}>Share lesson ↗</button></div>
          </article>
          <article className="share-learning-card">
            <span className="share-card-mark">۞</span><span className="share-card-label">HADITH & SUNNAH</span>
            <h3>Learn from authentic sources</h3><p>Explore narrations with available Arabic text, translations and references.</p>
            <div className="share-card-actions"><a href="/hadith">Explore Hadith <span>↗</span></a><button type="button" onClick={() => shareLearningLink("/hadith", "RHM Islam 360 — Hadith")}>Share lesson ↗</button></div>
          </article>
          <article className="share-learning-card">
            <span className="share-card-mark">رَبِّ زِدْنِي عِلْمًا</span><span className="share-card-label">DAILY REMINDERS</span>
            <h3>Bring learning into daily life</h3><p>Discover duas and practical Islamic guidance for everyday moments.</p>
            <div className="share-card-actions"><a href="/duas">Explore duas <span>↗</span></a><button type="button" onClick={() => shareLearningLink("/duas", "RHM Islam 360 — Daily Duas")}>Share lesson ↗</button></div>
          </article>
        </div>
        <p className="share-learning-status" role="status" aria-live="polite">{shareMessage}</p>
      </section>

      <section className="section" id="learn">
        <div className="section-heading"><div><div className="eyebrow">Explore the circle</div><h2>Knowledge for every step</h2></div><p className="section-intro">A growing collection of learning experiences designed to make Islamic learning approachable and consistent.</p></div>
        <div className="cards">{features.map((feature) => <article className="feature-card" key={feature.title}><div className="feature-icon" aria-hidden="true">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
        <a className="feature-card hadith-feature-card" href="/hadith"><div className="feature-icon" aria-hidden="true">۞</div><h3>Hadith & Sunnah Library</h3><p>Explore narrations from major Hadith collections in Arabic, Urdu, and English. Search by Hadith number or text and view available references.</p><span className="hadith-card-link">Explore Hadith library ↗</span></a>
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

      <section className="section" id="quran">
        <div className="daily"><div><div className="eyebrow">The heart of the journey</div><h2>Make time for the words of Allah.</h2><p>Read with Surah navigation, Urdu and English translations, available recitation, bookmarks, and saved last-read progress in one calm space.</p><a className="btn btn-light" href="/quran">Read Quran at RHM Islam 360 ↗</a></div><div className="arabic" lang="ar" dir="rtl">وَقُل رَّبِّ زِدْنِي عِلْمًا<br/><span style={{fontSize:14,color:"#d8e5dd"}}>And say: My Lord, increase me in knowledge. (20:114)</span></div></div>
      </section>

      <section className="section" id="community">
        <div className="section-heading"><div><div className="eyebrow">Learn together</div><h2>One circle, many journeys.</h2></div><p className="section-intro">Individuals can follow their own learning path. Organisations will be able to create groups and support shared learning while each member keeps personal progress private.</p></div>
        <div className="cards"><article className="feature-card"><div className="feature-icon">♡</div><h3>For individuals</h3><p>Build your own routine, save your place, and follow lessons at a comfortable pace.</p></article><article className="feature-card"><div className="feature-icon">♧</div><h3>For organisations</h3><p>Create learning circles for employees, students, or community members.</p></article><article className="feature-card"><div className="feature-icon">✧</div><h3>For families</h3><p>Encourage children and adults to learn together in a supportive environment.</p></article></div>
      </section>

      <footer className="footer" id="about"><span>© {new Date().getFullYear()} RHM Islam 360</span><span>Founded and owned by Mr Muhammad Hadi Ur Rehman</span><span>Built with care for learners everywhere</span></footer>
      </div>
    </main>
  );
}
