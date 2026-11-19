"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type Language = "ur" | "en" | "ar";
type Surah = { number: number; name: string; englishName: string; numberOfAyahs: number };
type TafsirResource = { id: number; name: string; author_name?: string; language_name?: string; slug?: string };
type Passage = { id: number; name: string; author?: string; text: string };

const LANGUAGES: { id: Language; label: string; native: string }[] = [
  { id: "ur", label: "Urdu", native: "اردو" },
  { id: "en", label: "English", native: "English" },
  { id: "ar", label: "Arabic", native: "العربية" },
];

function cleanText(value: string) {
  return value.replace(/<\\/(p|div|h[1-6]|li|br)\\s*>/gi, "\\n\\n").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

export default function TafsirLibraryPage() {
  const [language, setLanguage] = useState<Language>("ur");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [surah, setSurah] = useState(1);
  const [ayah, setAyah] = useState(1);
  const [resources, setResources] = useState<TafsirResource[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [passages, setPassages] = useState<Passage[]>([]);
  const [arabicAyah, setArabicAyah] = useState("");
  const [loadingCatalogue, setLoadingCatalogue] = useState(true);
  const [loadingPassage, setLoadingPassage] = useState(false);
  const [error, setError] = useState("");
  const [passageError, setPassageError] = useState("");

  useEffect(() => {
    const sync = () => {
      const value = document.documentElement.dataset.siteTheme || window.localStorage.getItem("rhm-site-theme") || "light";
      setTheme(value === "dark" ? "dark" : "light");
    };
    sync();
    window.addEventListener("rhm-theme-change", sync);
    return () => window.removeEventListener("rhm-theme-change", sync);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => { if (!response.ok) throw new Error("The Surah index could not be loaded."); return response.json(); })
      .then((data) => { if (active) setSurahs(data.data || []); })
      .catch(() => { if (active) setError("The Surah index is temporarily unavailable. Please refresh and try again."); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setLoadingCatalogue(true);
    setResources([]);
    setSelectedIds([]);
    setPassages([]);
    setPassageError("");
    setError("");
    fetch(`/api/quran/verse?resources=tafsirs&language=${language}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "The Tafsir catalogue could not be loaded.");
        return data;
      })
      .then((data) => {
        if (!active) return;
        const available = (data.tafsirs || data.resources || []) as TafsirResource[];
        const languageResources = available.filter((item) => {
          const code = String(item.language_name || "").toLowerCase();
          return item.id && (code === language || code === LANGUAGES.find((item) => item.id === language)?.label.toLowerCase() || (language === "ar" && code.includes("arab")));
        });
        setResources(languageResources);
        if (!languageResources.length) setError("The connected provider did not return any editions for this language. RHM will not invent or substitute scholar texts.");
      })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "The Tafsir catalogue is unavailable."); })
      .finally(() => { if (active) setLoadingCatalogue(false); });
    return () => { active = false; };
  }, [language]);

  const selectedSurah = surahs.find((item) => item.number === surah);
  const filteredResources = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return resources;
    return resources.filter((item) => `${item.name} ${item.author_name || ""}`.toLowerCase().includes(term));
  }, [resources, query]);

  function toggleEdition(id: string) {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((value) => value !== id)
      : current.length < 3 ? [...current, id] : current);
  }

  async function loadPassages(nextAyah = ayah) {
    if (!selectedIds.length) {
      setPassageError("Choose at least one Tafsir edition first.");
      return;
    }
    setLoadingPassage(true);
    setPassageError("");
    setPassages([]);
    const key = `${surah}:${nextAyah}`;
    try {
      const [tafsirResponse, verseResponse] = await Promise.all([
        fetch(`/api/quran/verse?${new URLSearchParams({ verse: key, language, tafsirs: selectedIds.join(",") })}`),
        fetch(`https://api.alquran.cloud/v1/ayah/${key}/quran-uthmani`),
      ]);
      const tafsirData = await tafsirResponse.json();
      if (!tafsirResponse.ok) throw new Error(tafsirData.error || "The selected Tafsir text could not be loaded.");
      const verseData = tafsirData.verses?.[0] || tafsirData.verse || tafsirData;
      const returned = (verseData.tafsirs || []).filter((item: { text?: string }) => item.text);
      const mapped = returned.map((item: { resource_id?: number; id?: number; name?: string; resource_name?: string; author_name?: string; text: string }) => {
        const id = Number(item.resource_id || item.id);
        const resource = resources.find((candidate) => candidate.id === id);
        return { id, name: item.resource_name || item.name || resource?.name || "Tafsir edition", author: item.author_name || resource?.author_name, text: cleanText(item.text) };
      });
      setPassages(mapped);
      if (!mapped.length) setPassageError("No Tafsir passage was returned for this Ayah and selection. Try another Ayah or edition.");
      if (verseResponse.ok) {
        const verse = await verseResponse.json();
        setArabicAyah(verse.data?.text || verseData.text_uthmani || verseData.text || "");
      } else {
        setArabicAyah(verseData.text_uthmani || verseData.text || "");
      }
    } catch (reason) {
      setPassageError(reason instanceof Error ? reason.message : "The Tafsir passage is temporarily unavailable.");
    } finally {
      setLoadingPassage(false);
    }
  }

  function changeAyah(next: number) {
    if (!selectedSurah || next < 1 || next > selectedSurah.numberOfAyahs) return;
    setAyah(next);
    setPassages([]);
    setPassageError("");
  }

  return (
    <main className={styles.page} data-theme={theme}>
      <header className={styles.topbar}>
        <a href="/" className={styles.brand}><span>ر</span> RHM Islam 360</a>
        <nav aria-label="Learning spaces"><a href="/quran">Qur’an reader</a><a href="/hadith">Hadith</a><a href="/">Home</a></nav>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>RHM ISLAMIC RESEARCH LIBRARY</p>
        <h1>Qur’an Tafsir Library</h1>
        <p>Explore verified scholarly explanations in Urdu, English and Arabic. Select an edition and read its explanation by Surah and Ayah.</p>
        <div className={styles.languages} role="tablist" aria-label="Tafsir language">
          {LANGUAGES.map((item) => <button key={item.id} type="button" role="tab" aria-selected={language === item.id} className={language === item.id ? styles.activeLanguage : ""} onClick={() => { setLanguage(item.id); setQuery(""); }}>{item.native}<small>{item.label}</small></button>)}
        </div>
      </section>

      <section className={styles.layout}>
        <aside className={styles.catalogue}>
          <div className={styles.sectionHead}><div><span className={styles.eyebrow}>EDITIONS & SCHOLARS</span><h2>{language === "ur" ? "اردو تفاسیر" : language === "ar" ? "التفاسير العربية" : "English Tafsir"}</h2></div><span className={styles.count}>{resources.length}</span></div>
          <label className={styles.searchLabel} htmlFor="tafsir-edition-search">Search scholar or book</label>
          <input id="tafsir-edition-search" className={styles.search} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or author…" />
          <p className={styles.hint}>Choose up to 3 editions to compare. Every edition remains separate.</p>
          {loadingCatalogue ? <p className={styles.status}>Loading verified editions…</p> : <div className={styles.editionList}>
            {filteredResources.map((item) => <label key={item.id} className={styles.edition}>
              <input type="checkbox" checked={selectedIds.includes(String(item.id))} onChange={() => toggleEdition(String(item.id))} disabled={!selectedIds.includes(String(item.id)) && selectedIds.length >= 3} />
              <span><strong>{item.name}</strong><small>{item.author_name || "Author details not supplied by provider"}</small></span>
            </label>)}
            {!filteredResources.length && !error && <p className={styles.status}>No matching editions found.</p>}
          </div>}
          {error && <p className={styles.error} role="status">{error}</p>}
          <p className={styles.sourceNote}>Catalogue and Tafsir passages are supplied by Quran Foundation Content API. Availability depends on the permissions and editions enabled for RHM.</p>
        </aside>

        <section className={styles.reader} aria-labelledby="reader-title">
          <div className={styles.sectionHead}><div><span className={styles.eyebrow}>READ BY REFERENCE</span><h2 id="reader-title">Open a Tafsir passage</h2></div></div>
          <div className={styles.referenceControls}>
            <label>Surah<select value={surah} onChange={(event) => { setSurah(Number(event.target.value)); setAyah(1); setPassages([]); setPassageError(""); }}>
              {surahs.map((item) => <option key={item.number} value={item.number}>{item.number}. {item.englishName} — {item.name}</option>)}
            </select></label>
            <label>Ayah<input type="number" min="1" max={selectedSurah?.numberOfAyahs || 286} value={ayah} onChange={(event) => setAyah(Math.max(1, Math.min(selectedSurah?.numberOfAyahs || 286, Number(event.target.value) || 1)))} /></label>
            <button type="button" className={styles.loadButton} onClick={() => void loadPassages()} disabled={loadingPassage || loadingCatalogue || !selectedIds.length}>{loadingPassage ? "Loading…" : "Read Tafsir"}</button>
          </div>
          <p className={styles.hint}>Reference: {surah}:{ayah}{selectedSurah ? ` · ${selectedSurah.numberOfAyahs} Ayahs in this Surah` : ""}</p>
          {arabicAyah && <div className={styles.ayahCard}><span>QUR’AN · {surah}:{ayah}</span><p lang="ar" dir="rtl">{arabicAyah}</p></div>}
          {passageError && <p className={styles.error} role="status">{passageError}</p>}
          {loadingPassage && <p className={styles.status}>Retrieving the selected scholar’s original passage…</p>}
          {!passages.length && !loadingPassage && !passageError && <div className={styles.empty}><strong>Your study space is ready.</strong><p>Select one or more editions, choose a Surah and Ayah, then press “Read Tafsir”.</p></div>}
          <div className={styles.passages}>
            {passages.map((passage) => <article className={styles.passage} key={passage.id}>
              <header><div><span className={styles.eyebrow}>SOURCE EDITION</span><h3>{passage.name}</h3>{passage.author && <p>{passage.author}</p>}</div><span className={styles.reference}>{surah}:{ayah}</span></header>
              <div className={styles.passageText} lang={language} dir={language === "ur" || language === "ar" ? "rtl" : "ltr"}>{passage.text}</div>
              <footer>Original provider text · Not rewritten or combined by RHM</footer>
            </article>)}
          </div>
          <div className={styles.passageNav}><button type="button" onClick={() => changeAyah(ayah - 1)} disabled={ayah <= 1}>← Previous Ayah</button><button type="button" onClick={() => changeAyah(ayah + 1)} disabled={!selectedSurah || ayah >= selectedSurah.numberOfAyahs}>Next Ayah →</button></div>
        </section>
      </section>
      <footer className={styles.footer}>RHM Islam 360 · Learn with care, verify sources, and respect scholarly works.</footer>
    </main>
  );
}
