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
    "quote": "Prepare for illness during your good health, and prepare for death during your life.",
    "arabic": "",
    "by": "Abdullah ibn Umar رضي الله عنهما",
    "source": "Reported in Sahih al-Bukhari 6416",
    "url": "https://sunnah.com/bukhari:6416"
  },
  {
    "quote": "Spread knowledge and teach those who do not know, for knowledge does not disappear while it is shared.",
    "arabic": "",
    "by": "Umar ibn Abd al-Aziz رحمه الله",
    "source": "His statement reported in Sahih al-Bukhari, Book of Knowledge, chapter 34",
    "url": "https://sunnah.com/bukhari/3"
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
  { icon: "♫", title: "Listen & reflect", text: "A planned audio library with recitation controls, repeat listening, and saved listening progress." },
  { icon: "✦", title: "Learn step by step", text: "Build confidence through beginner-friendly lessons in Arabic letters, Tajweed, and memorisation." },
  { icon: "☾", title: "Daily reminders", text: "Create a steady routine with daily Ayah reflections, duas, goals, and personal progress." },
  { icon: "◎", title: "Learning circles", text: "Join as an individual or learn together in a private group organised by a company or community." },
  { icon: "❖", title: "Islamic knowledge", text: "Discover Seerah, Prophets’ stories, Islamic history, and learning resources with clear references." }
];

export default function Home() {
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
      <header className="site-header">
        <a className="brand" href="#"><span className="brand-mark">ر</span><span>RHM Islam 360</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/learn">Discover Islam</a><a href="#quran">Quran</a><a href="/hadith">Hadith</a><a href="/qaida">Qaida</a><a href="#community">Community</a><a href="#about">About</a>
        </nav>
        <div className="nav-actions"><a className="btn btn-light" href="#learn">Explore</a><a className="btn btn-primary" href="/login">Join the circle</a></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">A place to learn, reflect & grow</div>
          <h1>Your Quran journey, wherever you are.</h1>
          <p>Read, listen, learn, and build a meaningful connection with the Quran. RHM Islam 360 is a welcoming learning space for individuals, families, and communities around the world.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#quran">Explore the Quran <span aria-hidden="true">↗</span></a><a className="btn btn-light" href="#learn">Discover learning paths</a></div>
          <div className="hero-note">Open to learners around the world · Learn at your own pace</div>
        </div>
        <div className={`hero-mosque-scene scene-${mosqueScene}`} aria-label={mosqueScene===0?"The Kaaba at Al-Masjid al-Haram in Makkah":"Al-Masjid an-Nabawi in Madinah"}>
          <div className="mosque-scene-image scene-image-makkah" aria-hidden="true"></div>
          <div className="mosque-scene-image scene-image-madinah" aria-hidden="true"></div>
          <div className="mosque-scene-shade"></div>
          <div className="mosque-scene-copy" key={mosqueScene}>
            <span className="mosque-scene-kicker">Sacred places of Islam</span>
            <h2>{mosqueScene===0?"Makkah Al-Mukarramah":"Al-Madinah Al-Munawwarah"}</h2>
            <p>{mosqueScene===0?"Al-Masjid al-Haram · The Holy Kaaba":"Al-Masjid an-Nabawi · The Prophet’s Mosque"}</p>
            <a href="/heritage">Explore Islamic heritage <span aria-hidden="true">↗</span></a>
          </div>
          <div className="mosque-scene-indicators" aria-label="Featured mosque scene">
            <button type="button" className={mosqueScene===0?"active":""} onClick={()=>setMosqueScene(0)} aria-label="Show Makkah"></button>
            <button type="button" className={mosqueScene===1?"active":""} onClick={()=>setMosqueScene(1)} aria-label="Show Madinah"></button>
          </div>
          <span className="mosque-scene-caption">A new sacred-place view every 10 seconds</span>
        </div>
      </section>

      <section className="faith-entry-section" aria-labelledby="faith-entry-title">
        <div className="faith-entry-heading">
          <span className="eyebrow">A guide to the faith</span>
          <h2 id="faith-entry-title">Discover Islam</h2>
          <p>Explore the foundations of Muslim belief, worship, character and the place of Hadith in everyday life. Choose a subject to open its own learning space.</p>
        </div>
        <div className="faith-entry-grid">
          <a className="faith-entry-card faith-entry-main" href="/learn"><span className="faith-entry-icon">☪</span><span className="faith-entry-label">Start here</span><h3>Discover Islam</h3><p>Explore the foundations of faith, the Five Pillars, articles of Iman, Qur’an, Sunnah and Islamic character.</p><strong>Enter the learning guide ↗</strong></a>
          <a className="faith-entry-card" href="/hadith"><span className="faith-entry-icon">۞</span><h3>Hadith Library</h3><p>Explore Hadith collections with Arabic and available translations.</p><strong>Open Hadith library ↗</strong></a>
          <a className="faith-entry-card" href="/daily-life"><span className="faith-entry-icon">☪</span><h3>Everyday Muslim Life</h3><p>Learn Wudu, Ghusl, cleanliness, prayer preparation, Qibla direction and daily Islamic manners.</p><strong>Open daily-life guide ↗</strong></a>
          <a className="faith-entry-card" href="/qaida"><span className="faith-entry-icon">ا ب</span><h3>Beginner’s Qaida</h3><p>Start learning Arabic letters and basic reading rules.</p><strong>Open Qaida lessons ↗</strong></a>
          <a className="faith-entry-card" href="/heritage"><span className="faith-entry-icon">🕌</span><h3>Islamic Heritage</h3><p>Discover historic mosques and important places around the world.</p><strong>Explore the gallery ↗</strong></a>
          <a className="faith-entry-card" href="/quran"><span className="faith-entry-icon">۩</span><h3>Qur’an Reader</h3><p>Read the Qur’an with Arabic text, translations and recitation.</p><strong>Read the Qur’an ↗</strong></a>
        </div>
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
        <div className="daily"><div><div className="eyebrow">The heart of the journey</div><h2>Make time for the words of Allah.</h2><p>The Quran reading area will bring Surah navigation, translations, recitation, bookmarks, and last-read progress together in one calm space.</p><a className="btn btn-light" href="/quran">Read Quran at RHM Islam 360 ↗</a></div><div className="arabic" lang="ar" dir="rtl">وَقُل رَّبِّ زِدْنِي عِلْمًا<br/><span style={{fontSize:14,color:"#d8e5dd"}}>And say: My Lord, increase me in knowledge. (20:114)</span></div></div>
      </section>

      <section className="section" id="community">
        <div className="section-heading"><div><div className="eyebrow">Learn together</div><h2>One circle, many journeys.</h2></div><p className="section-intro">Individuals can follow their own learning path. Organisations will be able to create groups and support shared learning while each member keeps personal progress private.</p></div>
        <div className="cards"><article className="feature-card"><div className="feature-icon">♡</div><h3>For individuals</h3><p>Build your own routine, save your place, and follow lessons at a comfortable pace.</p></article><article className="feature-card"><div className="feature-icon">♧</div><h3>For organisations</h3><p>Create learning circles for employees, students, or community members.</p></article><article className="feature-card"><div className="feature-icon">✧</div><h3>For families</h3><p>Encourage children and adults to learn together in a supportive environment.</p></article></div>
      </section>

      <footer className="footer" id="about"><span>© {new Date().getFullYear()} RHM Islam 360</span><span>Founded and owned by Mr Muhammad Hadi Ur Rehman</span><span>Built with care for learners everywhere</span></footer>
    </main>
  );
}
