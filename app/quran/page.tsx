"use client";

import { useEffect, useState } from "react";

type Surah = { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string };
type Ayah = { numberInSurah: number; text: string };
type Reciter = { identifier: string; name: string; englishName: string; language: string; format: string; type: string };
type Edition = { ayahs: Ayah[] };
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
    fetch(`https://api.alquran.cloud/v1/surah/${selected}/editions/quran-uthmani,en.sahih`)
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
  }, [selected]);

  return (
    <main className="quran-page">
      <header className="quran-topbar">
        <a className="quran-brand" href="/"> <span className="brand-mark">ر</span> RHM Islamic Circle</a>
        <a className="quran-home-link" href="/">Back to home</a>
      </header>
      <section className="quran-heading">
        <div className="eyebrow">The Noble Quran</div>
        <h1>Read. Reflect. Return.</h1>
        <p>Explore the words of Allah in Arabic alongside an English translation. Reading is open to everyone.</p>
      </section>
      <section className="quran-reader" aria-label="Quran reader">
        <div className="quran-controls">
          <label htmlFor="surah-select">Choose a Surah</label>
          <select id="surah-select" value={selected} onChange={(event) => setSelected(Number(event.target.value))}>
            {surahs.map((surah) => <option key={surah.number} value={surah.number}>{surah.number}. {surah.englishName} — {surah.name}</option>)}
          </select>
          {chapter && <span className="quran-count">{chapter.numberOfAyahs} Ayahs</span>}
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
              <p>English translation · Saheeh International</p>
            </div>
            <div className="ayah-list">
              {chapter.editions[0].ayahs.map((ayah, index) => (
                <article className="ayah" key={ayah.numberInSurah}>
                  <div className="ayah-number">{ayah.numberInSurah}</div>
                  <p className="ayah-arabic" lang="ar" dir="rtl">{ayah.text}</p>
                  <p className="ayah-translation">{chapter.editions[1].ayahs[index]?.text}</p>
                </article>
              ))}
            </div>
          </>
        )}
        <p className="quran-source">Quran text, reciter catalogue, and recitation audio are provided through AlQuran Cloud API. Reciters are listed dynamically from the provider; this is not a claim to include every reciter worldwide. Please refer to trusted scholars for interpretation and study.</p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
