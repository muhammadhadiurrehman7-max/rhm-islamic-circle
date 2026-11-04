"use client";

import { useEffect, useState } from "react";

type Surah = { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string };
type Ayah = { number: number; numberInSurah: number; text: string };
type Reciter = { identifier: string; name: string; englishName: string; language: string; format: string; type: string };
type Translation = { identifier: string; name: string; englishName: string; language: string; format: string; type: string };
type Edition = { ayahs: Ayah[]; edition?: Translation };
type SurahText = { name: string; englishName: string; numberOfAyahs: number; editions: Edition[] };

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selected, setSelected] = useState(1);
  const [chapter, setChapter] = useState<SurahText | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState("ar.alafasy");
  const [recitersLoading, setRecitersLoading] = useState(true);
  const [audioError, setAudioError] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState("ur.jalandhry");
  const [translationsLoading, setTranslationsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const requestedSurah = Number(new URLSearchParams(window.location.search).get("surah"));
    if (Number.isInteger(requestedSurah) && requestedSurah >= 1 && requestedSurah <= 114) setSelected(requestedSurah);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("rhm-quran-theme");
    if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.quranTheme = theme;
    window.localStorage.setItem("rhm-quran-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load the Surah list.");
        return response.json();
      })
      .then((data) => setSurahs(data.data))
      .catch(() => setError("We couldn't load the Quran index. Please check your internet connection and try again."));
  }, []);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition?format=text&type=translation")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load translations.");
        return response.json();
      })
      .then((data) => {
        const available = (data.data as Translation[]).filter((edition) => edition.language && edition.identifier);
        setTranslations(available);
        const urdu = available.find((edition) => edition.identifier === "ur.jalandhry")
          || available.find((edition) => edition.language === "ur");
        if (urdu) setSelectedTranslation(urdu.identifier);
        else if (available.length) setSelectedTranslation(available[0].identifier);
      })
      .catch(() => setError("Translation options could not be loaded. Please refresh the page."))
      .finally(() => setTranslationsLoading(false));
  }, []);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition/format/audio")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load reciters.");
        return response.json();
      })
      .then((data) => {
        const arabicReciters = (data.data as Reciter[])
          .filter((edition) => edition.identifier.startsWith("ar.") && edition.language === "ar")
          .filter((edition) => edition.type === "versebyverse");
        setReciters(arabicReciters);
        if (arabicReciters.length && !arabicReciters.some((edition) => edition.identifier === selectedReciter)) {
          setSelectedReciter(arabicReciters[0].identifier);
        }
      })
      .catch(() => setAudioError("The reciter list is temporarily unavailable. Please try again later."))
      .finally(() => setRecitersLoading(false));
  }, []);

  const surahAudioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${selected}.mp3`;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch(`https://api.alquran.cloud/v1/surah/${selected}/editions/quran-uthmani,${selectedTranslation}`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load this Surah.");
        return response.json();
      })
      .then((data) => {
        if (active) setChapter({ ...data.data[0], editions: data.data });
      })
      .catch(() => {
        if (active) setError("This Surah could not be loaded right now. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [selected, selectedTranslation]);

  return (
    <main className="quran-page" data-theme={theme}>
      <header className="quran-topbar">
        <a className="quran-brand" href="/"> <span className="brand-mark">ر</span> RHM Islamic Circle</a>
        <div className="quran-top-actions">
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}>
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span> {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          <a className="quran-home-link" href="/">Back to home</a>
        </div>
      </header>
      <section className="sacred-places" aria-label="Photographs of the holy mosques">
        <div className="sacred-place sacred-kaaba">
          <div className="sacred-place-caption"><span>Makkah al-Mukarramah</span><strong>The Holy Kaaba</strong></div>
        </div>
        <div className="sacred-place sacred-madinah">
          <div className="sacred-place-caption"><span>Al-Madinah al-Munawwarah</span><strong>Al-Masjid an-Nabawi</strong></div>
        </div>
      </section>
      <section className="quran-heading">
        <div className="eyebrow">The Noble Quran</div>
        <h1>Read. Reflect. Return.</h1>
        <p>Read every Ayah in Arabic, listen verse by verse, and choose Urdu or another available translation language. Open to everyone, without sign-in.</p>
      </section>
      <section className="faith-centre" aria-labelledby="faith-centre-title">
        <div className="faith-centre-heading">
          <span className="eyebrow">RHM Islamic learning</span>
          <h2 id="faith-centre-title">Explore the foundations of Islam</h2>
          <p>Learn the essentials, read the Qur’an, and explore Hadith and beginner Arabic lessons — all within RHM Islamic Circle.</p>
        </div>
        <div className="faith-card-grid">
          <article className="faith-card"><span className="faith-icon">☪</span><h3>What is Islam?</h3><p>Explore Tawheed, faith, worship, mercy and the purpose of Islam.</p><a href="/learn/what-is-islam">Open full lesson →</a></article>
          <article className="faith-card"><span className="faith-icon">✦</span><h3>The Five Pillars</h3><p>Explore five separate explanations: Shahadah, Salah, Zakah, Sawm and Hajj.</p><a href="/learn/five-pillars">Open all five explanations →</a></article>
          <article className="faith-card"><span className="faith-icon">❖</span><h3>The Six Articles of Iman</h3><p>Learn about the six essential beliefs of a Muslim, each explained separately.</p><a href="/learn/six-articles">Open full lesson →</a></article>
          <article className="faith-card"><span className="faith-icon">۞</span><h3>Qur’an and Sunnah</h3><p>Understand the Qur’an, the Prophetic example and how to study them carefully.</p><a href="/learn/quran-sunnah">Open full lesson →</a></article>
          <article className="faith-card"><span className="faith-icon">♡</span><h3>Character and daily life</h3><p>Explore honesty, patience, mercy, family rights, justice and kindness.</p><a href="/learn/character">Open full lesson →</a></article>
          
          
          
        </div>
        <p className="faith-note"><strong>Learn responsibly:</strong> These are introductory learning notes, not personal religious rulings. Translation is not a substitute for the Arabic Qur’an or detailed Tafsir. For questions of Islamic law, consult a qualified, trusted scholar.</p>
      </section>
            <section className="faith-resources" aria-labelledby="faith-resources-title">
        <div className="faith-resources-heading"><span className="eyebrow">More from RHM</span><h2 id="faith-resources-title">Explore other learning spaces</h2><p>These resources are separate from the Discover Islam guide. Open each one whenever you want to study a different subject.</p></div>
        <div className="faith-resource-grid">
          <a className="faith-resource-card" href="/hadith"><span>📚</span><h3>Hadith Library</h3><p>Explore Hadith collections and translations.</p><strong>Open Hadith ↗</strong></a>
          <a className="faith-resource-card" href="/hadith#qaida-lessons"><span>ا ب</span><h3>Beginner’s Qaida</h3><p>Learn Arabic letters and basic reading rules.</p><strong>Open Qaida ↗</strong></a>
          <a className="faith-resource-card" href="/heritage"><span>🕌</span><h3>Islamic Heritage</h3><p>Discover famous mosques and historic places.</p><strong>Explore heritage ↗</strong></a>
        </div>
      </section>
<section className="quran-reader" id="quran-reader" aria-label="Quran reader">
        <div className="quran-controls">
          <label htmlFor="surah-select">Choose a Surah</label>
          <select id="surah-select" value={selected} onChange={(event) => setSelected(Number(event.target.value))}>
            {surahs.map((surah) => <option key={surah.number} value={surah.number}>{surah.number}. {surah.englishName} — {surah.name}</option>)}
          </select>
          {chapter && <span className="quran-count">{chapter.numberOfAyahs} Ayahs</span>}
          <label htmlFor="translation-select">Translation language</label>
          <select id="translation-select" value={selectedTranslation} onChange={(event) => setSelectedTranslation(event.target.value)} disabled={translationsLoading || translations.length === 0}>
            {translationsLoading && <option>Loading languages…</option>}
            {translations.map((edition) => <option key={edition.identifier} value={edition.identifier}>{edition.language.toUpperCase()} · {edition.englishName || edition.name}</option>)}
          </select>
        </div>
        <section className="recitation-panel" aria-label="Quran recitation player">
          <div className="recitation-heading">
            <div>
              <div className="eyebrow">Listen to the Quran</div>
              <h2>Choose a Qari / Reciter</h2>
              <p>Select a reciter and listen to the complete selected Surah.</p>
            </div>
            <span className="recitation-symbol" aria-hidden="true">♫</span>
          </div>
          <label className="reciter-label" htmlFor="reciter-select">Reciter</label>
          <select id="reciter-select" className="reciter-select" value={selectedReciter} onChange={(event) => { setSelectedReciter(event.target.value); setAudioError(""); }} disabled={recitersLoading || reciters.length === 0}>
            {recitersLoading && <option>Loading reciters…</option>}
            {reciters.map((reciter) => <option key={reciter.identifier} value={reciter.identifier}>{reciter.englishName || reciter.name}</option>)}
          </select>
          <audio key={surahAudioUrl} className="surah-audio" controls preload="none" src={surahAudioUrl}>
            Your browser does not support audio playback.
          </audio>
          {audioError && <p className="recitation-error" role="status">{audioError}</p>}
          <p className="recitation-note">Recitations are streamed from AlQuran Cloud. Audio availability may vary by reciter and Surah.</p>
        </section>
        {loading && <p className="quran-status">Loading Quran text…</p>}
        {error && <div className="quran-error" role="alert">{error}</div>}
        {!loading && chapter && !error && (
          <>
            <div className="surah-title">
              <span className="surah-arabic-name" lang="ar" dir="rtl">{chapter.name}</span>
              <h2>{chapter.englishName}</h2>
              <p>{chapter.editions[1]?.edition?.englishName || chapter.editions[1]?.edition?.name || selectedTranslation} · {chapter.editions[1]?.edition?.language?.toUpperCase() || "Translation"}</p>
            </div>
            <div className="ayah-list">
              {chapter.editions[0].ayahs.map((ayah, index) => (
                <article className="ayah ayah-card" key={ayah.numberInSurah}>
                  <div className="ayah-card-top">
                    <span className="ayah-number">{ayah.numberInSurah}</span>
                    <span className="ayah-reference">{selected}:{ayah.numberInSurah}</span>
                  </div>
                  <p className="ayah-arabic" lang="ar" dir="rtl">{ayah.text}</p>
                  <p className={`ayah-translation ${chapter.editions[1]?.edition?.language === "ur" ? "ayah-translation-urdu" : ""}`} lang={chapter.editions[1]?.edition?.language || "ur"} dir={chapter.editions[1]?.edition?.language === "ur" || chapter.editions[1]?.edition?.language === "ar" ? "rtl" : "auto"}>{chapter.editions[1]?.ayahs[index]?.text || "Translation unavailable for this Ayah."}</p>
                  <div className="ayah-audio-row">
                    <span>Listen to Ayah {ayah.numberInSurah}</span>
                    <audio
                      controls
                      preload="none"
                      src={`https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayah.number}.mp3`}
                      aria-label={`Play Surah ${selected}, Ayah ${ayah.numberInSurah}`}
                      onPlay={(event) => {
                        event.currentTarget.closest(".ayah-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      onEnded={(event) => {
                        const currentAyah = event.currentTarget.closest(".ayah-card");
                        const nextAyah = currentAyah?.nextElementSibling;
                        if (nextAyah instanceof HTMLElement) {
                          nextAyah.scrollIntoView({ behavior: "smooth", block: "center" });
                          const nextAudio = nextAyah.querySelector("audio");
                          if (nextAudio) {
                            nextAudio.play().catch(() => {
                              // Some browsers block chained playback; the next Ayah remains visible with its play control.
                            });
                          }
                        }
                      }}
                    >
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
        <p className="quran-source">Arabic Quran text, translations, and Ayah-by-Ayah recitations are streamed through AlQuran Cloud. Translation names and contributors are shown where supplied by the source. Translation is not a substitute for Tafsir or scholarly explanation.</p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
