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
  useEffect(() => {
    const timer = window.setInterval(() => setGuidanceIndex((current) => (current + 1) % guidanceQuotes.length), 20000);
    return () => window.clearInterval(timer);
  }, []);
  const guidance = guidanceQuotes[guidanceIndex];
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#"><span className="brand-mark">ر</span><span>RHM Islamic Circle</span></a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#learn">Learn</a><a href="#quran">Quran</a><a href="/hadith">Hadith</a><a href="#community">Community</a><a href="#about">About</a>
        </nav>
        <div className="nav-actions"><a className="btn btn-light" href="#learn">Explore</a><a className="btn btn-primary" href="/login">Join the circle</a></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">A place to learn, reflect & grow</div>
          <h1>Your Quran journey, wherever you are.</h1>
          <p>Read, listen, learn, and build a meaningful connection with the Quran. RHM Islamic Circle is a welcoming learning space for individuals, families, and communities around the world.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#quran">Explore the Quran <span aria-hidden="true">↗</span></a><a className="btn btn-light" href="#learn">Discover learning paths</a></div>
          <div className="hero-note">Open to learners around the world · Learn at your own pace</div>
        </div>
        <div className="hero-garden" role="img" aria-label="A peaceful animated garden beneath a crescent moon, framed by an Islamic arch">
          <div className="garden-arch"><div className="garden-sky"><span className="garden-moon">☾</span><i className="garden-star star-one">✦</i><i className="garden-star star-two">✧</i><i className="garden-star star-three">·</i><div className="garden-dome"></div><div className="garden-minaret"></div><div className="garden-horizon"></div><div className="garden-water"></div><div className="garden-tree tree-left"></div><div className="garden-tree tree-right"></div><div className="garden-flower flower-one">✿</div><div className="garden-flower flower-two">✿</div><div className="garden-flower flower-three">✿</div><div className="garden-path"></div></div></div>
          <div className="garden-caption">سُبْحَانَ اللّٰهِ · Find peace in remembrance</div>
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
        <div className="daily"><div><div className="eyebrow">The heart of the journey</div><h2>Make time for the words of Allah.</h2><p>The Quran reading area will bring Surah navigation, translations, recitation, bookmarks, and last-read progress together in one calm space.</p><a className="btn btn-light" href="/quran">Read Quran at RHM Islamic Circle ↗</a></div><div className="arabic" lang="ar" dir="rtl">وَقُل رَّبِّ زِدْنِي عِلْمًا<br/><span style={{fontSize:14,color:"#d8e5dd"}}>And say: My Lord, increase me in knowledge. (20:114)</span></div></div>
      </section>

      <section className="section" id="community">
        <div className="section-heading"><div><div className="eyebrow">Learn together</div><h2>One circle, many journeys.</h2></div><p className="section-intro">Individuals can follow their own learning path. Organisations will be able to create groups and support shared learning while each member keeps personal progress private.</p></div>
        <div className="cards"><article className="feature-card"><div className="feature-icon">♡</div><h3>For individuals</h3><p>Build your own routine, save your place, and follow lessons at a comfortable pace.</p></article><article className="feature-card"><div className="feature-icon">♧</div><h3>For organisations</h3><p>Create learning circles for employees, students, or community members.</p></article><article className="feature-card"><div className="feature-icon">✧</div><h3>For families</h3><p>Encourage children and adults to learn together in a supportive environment.</p></article></div>
      </section>

      <footer className="footer" id="about"><span>© {new Date().getFullYear()} RHM Islamic Circle</span><span>Founded and owned by Mr Muhammad Hadi Ur Rehman</span><span>Built with care for learners everywhere</span></footer>
    </main>
  );
}
