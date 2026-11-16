"use client";

import { useEffect, useRef, useState } from "react";

type Surah = { number: number; name: string; englishName: string; englishNameTranslation: string; numberOfAyahs: number; revelationType: string };
type Ayah = { number: number; numberInSurah: number; text: string; juz?: number; page?: number };
type Reciter = { identifier: string; name: string; englishName: string; language: string; format: string; type: string };
function readSurahAudioIndex(value: unknown): Record<string, number> {
  const found: Record<string, number> = {};
  const visit = (node: unknown, key = "") => {
    if (Array.isArray(node)) {
      if (/^ar\./.test(key)) {
        const rates = node.map(Number).filter((n) => Number.isFinite(n) && n > 0);
        if (rates.length) found[key] = rates.includes(128) ? 128 : Math.max(...rates);
      }
      node.forEach((item) => visit(item));
      return;
    }
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (typeof record.identifier === "string" && /^ar\./.test(record.identifier)) {
      const rates = [record.bitrate, record.bitrates, record.quality, record.qualities].flatMap((item) => Array.isArray(item) ? item : [item]).map(Number).filter((n) => Number.isFinite(n) && n > 0);
      if (rates.length) found[record.identifier] = rates.includes(128) ? 128 : Math.max(...rates);
    }
    Object.entries(record).forEach(([childKey, child]) => {
      if (/^ar\./.test(childKey)) {
        const candidate = child && typeof child === "object" ? child as Record<string, unknown> : {};
        const rates = [...Object.keys(candidate), candidate.bitrate, candidate.bitrates, candidate.quality, candidate.qualities, ...(Array.isArray(child) ? child : [])].flatMap((item) => Array.isArray(item) ? item : [item]).map(Number).filter((n) => Number.isFinite(n) && n > 0);
        if (rates.length) found[childKey] = rates.includes(128) ? 128 : Math.max(...rates);
      }
      visit(child, childKey);
    });
  };
  visit(value);
  return found;
}
type Translation = { identifier: string; name: string; englishName: string; language: string; format: string; type: string };
type Edition = { ayahs: Ayah[]; edition?: Translation };
type SurahText = { name: string; englishName: string; numberOfAyahs: number; editions: Edition[] };
type SearchMatch = { text: string; number: number; numberInSurah: number; surah: { number: number; englishName: string; name: string } };
type WordPart = { id?: number; position?: number; textUthmani?: string; textIndopak?: string; text_uthmani?: string; text_indopak?: string; translation?: { text?: string }; transliteration?: { text?: string }; audioUrl?: string; audio_url?: string };
type TafsirResource = { id: number; name: string; author_name?: string; slug: string; language_name: string };
type TafsirPassage = { id: number; name: string; author?: string; text: string };
function cleanTafsirText(value: string) {
  return value.replace(/<\/(p|div|h[1-6]|li|br)\s*>/gi, "\n\n").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

export default function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selected, setSelected] = useState(1);
  const [chapter, setChapter] = useState<SurahText | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [surahAudioBitrates, setSurahAudioBitrates] = useState<Record<string, number>>({});
  const [selectedReciter, setSelectedReciter] = useState("ar.alafasy");
  const [recitersLoading, setRecitersLoading] = useState(true);
  const [audioError, setAudioError] = useState("");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState("ur.jalandhry");
  const [translationsLoading, setTranslationsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [autoNextSurah, setAutoNextSurah] = useState(true);
  const [continueAfterSurah, setContinueAfterSurah] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState("");
  const [readerQuery, setReaderQuery] = useState("");
  const [fontScale, setFontScale] = useState(1);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteFor, setNoteFor] = useState<string | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [autoNextAyah, setAutoNextAyah] = useState(true);
  const [repeatCount, setRepeatCount] = useState(1);
  const [repeatRemaining, setRepeatRemaining] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeAyah, setActiveAyah] = useState<string | null>(null);
  const [lastRead, setLastRead] = useState<string | null>(null);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [tafsirs, setTafsirs] = useState<TafsirResource[]>([]);
  const [selectedTafsirs, setSelectedTafsirs] = useState<string[]>([]);
  const [tafsirMode, setTafsirMode] = useState(true);
  const [tafsirByAyah, setTafsirByAyah] = useState<Map<number, TafsirPassage[]>>(new Map());
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchMatch[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("");
  const [wordStudy, setWordStudy] = useState<Record<string, WordPart[]>>({});
  const [wordLoading, setWordLoading] = useState<string | null>(null);
  const [wordErrors, setWordErrors] = useState<Record<string, string>>({});
  const [wordStudyMode, setWordStudyMode] = useState(false);
  const [wordPanelsOpen, setWordPanelsOpen] = useState<Record<string, boolean>>({});
  const surahAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const requestedSurah = Number(new URLSearchParams(window.location.search).get("surah"));
    if (Number.isInteger(requestedSurah) && requestedSurah >= 1 && requestedSurah <= 114) setSelected(requestedSurah);
  }, []);


  // Keep one listening volume across the Surah player and every Ayah player.
  useEffect(() => {
    const storageKey = "rhm-quran-audio-volume";
    const storedValue = window.localStorage.getItem(storageKey);
    const stored = storedValue === null ? Number.NaN : Number(storedValue);
    const initialVolume = Number.isFinite(stored) && stored >= 0 && stored <= 1 ? stored : 1;

    const applyVolume = (root: ParentNode, volume: number) => {
      if (root instanceof HTMLAudioElement && root.volume !== volume) root.volume = volume;
      root.querySelectorAll("audio").forEach((audio) => {
        if (audio.volume !== volume) audio.volume = volume;
      });
    };

    applyVolume(document, initialVolume);

    const handleVolumeChange = (event: Event) => {
      const changedAudio = event.target;
      if (!(changedAudio instanceof HTMLAudioElement)) return;
      const volume = changedAudio.volume;
      window.localStorage.setItem(storageKey, String(volume));
      document.querySelectorAll("audio").forEach((audio) => {
        if (audio !== changedAudio && audio.volume !== volume) audio.volume = volume;
      });
    };

    document.addEventListener("volumechange", handleVolumeChange);
    const observer = new MutationObserver((records) => {
      const savedValue = window.localStorage.getItem(storageKey);
      const saved = savedValue === null ? Number.NaN : Number(savedValue);
      const volume = Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : initialVolume;
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) applyVolume(node, volume);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("volumechange", handleVolumeChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    try {
      setBookmarks(JSON.parse(window.localStorage.getItem("rhm-quran-bookmarks") || "[]"));
      setNotes(JSON.parse(window.localStorage.getItem("rhm-quran-notes") || "{}"));
      setLastRead(window.localStorage.getItem("rhm-quran-last-read"));
      const savedScale = Number(window.localStorage.getItem("rhm-quran-font-scale"));
      if (Number.isFinite(savedScale)) setFontScale(Math.min(1.6, Math.max(.8, savedScale)));
    } catch { /* Ignore invalid local reading preferences and start clean. */ }
    finally { setPreferencesLoaded(true); }
  }, []);
  useEffect(() => { if (preferencesLoaded) window.localStorage.setItem("rhm-quran-bookmarks", JSON.stringify(bookmarks)); }, [bookmarks, preferencesLoaded]);
  useEffect(() => { if (preferencesLoaded) window.localStorage.setItem("rhm-quran-notes", JSON.stringify(notes)); }, [notes, preferencesLoaded]);
  useEffect(() => { if (preferencesLoaded) window.localStorage.setItem("rhm-quran-font-scale", String(fontScale)); }, [fontScale, preferencesLoaded]);

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
    fetch("/api/quran/verse?resources=tafsirs&language=ur")
      .then((response) => { if (!response.ok) throw new Error("Could not load Urdu Tafsir resources."); return response.json(); })
      .then((data) => {
        const available = (data.tafsirs || data.resources || []) as TafsirResource[];
        const urdu = available.filter((item) => item.id && (item.language_name === "urdu" || item.language_name === "ur"));
        setTafsirs(urdu);
        const preferred = urdu.find((item) => /ibn.?kathir/i.test(item.name)) || urdu[0];
        if (preferred) setSelectedTafsirs([String(preferred.id)]);
      })
      .catch(() => setSearchError("Urdu Tafsir choices are temporarily unavailable. Check Quran Foundation API access."));
  }, []);

  useEffect(() => {
    setWordStudy({});
    setWordErrors({});
    setWordLoading(null);
    setTafsirByAyah(new Map());
  }, [selected, selectedTafsirs.join(",")]);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("https://api.alquran.cloud/v1/edition/format/audio").then((response) => {
        if (!response.ok) throw new Error("The Ayah reciter catalogue could not be loaded.");
        return response.json();
      }),
      fetch("https://cdn.islamic.network/quran/info/by-surah/info.json").then((response) => {
        if (!response.ok) throw new Error("The full-Surah audio availability catalogue could not be loaded.");
        return response.json();
      }),
    ])
      .then(([editionData, surahIndex]) => {
        if (!active) return;
        const bitrates = readSurahAudioIndex(surahIndex);
        setSurahAudioBitrates(bitrates);
        const editions = (editionData.data as Reciter[]).filter((edition) =>
          edition.identifier.startsWith("ar.") && edition.language === "ar"
        );
        // Only list reciters that the CDN explicitly indexes for complete-Surah audio.
        const available = editions.filter((edition) => bitrates[edition.identifier]);
        setReciters(available);
        if (available.length && !available.some((edition) => edition.identifier === selectedReciter)) {
          setSelectedReciter(available[0].identifier);
        }
        if (!available.length) setAudioError("The provider did not return any matching full-Surah reciters. Ayah audio availability may still differ.");
      })
      .catch((error) => {
        if (active) setAudioError(error instanceof Error ? error.message : "The reciter availability list is temporarily unavailable.");
      })
      .finally(() => { if (active) setRecitersLoading(false); });
    return () => { active = false; };
  }, []);

  const surahAudioUrl = `https://cdn.islamic.network/quran/audio-surah/${surahAudioBitrates[selectedReciter] || 128}/${selectedReciter}/${selected}.mp3`;
  const translationByAyah = new Map((chapter?.editions[1]?.ayahs ?? []).map((ayah) => [ayah.numberInSurah, ayah.text]));
  const visibleAyahs = (chapter?.editions[0]?.ayahs ?? []).filter((ayah) => {
    const key = `${selected}:${ayah.numberInSurah}`;
    const translation = translationByAyah.get(ayah.numberInSurah) || "";
    const term = readerQuery.trim();
    const matchesSearch = !term || ayah.text.includes(term) || translation.toLocaleLowerCase().includes(term.toLocaleLowerCase()) || key.includes(term);
    return matchesSearch && (!showBookmarksOnly || bookmarks.includes(key));
  });
  const toggleBookmark = (key: string) => setBookmarks((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  const runGlobalSearch = async () => {
    const term = globalSearch.trim();
    if (!term) return;
    setSearching(true); setSearchError(""); setSearchResults([]);
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(term)}/all/${selectedTranslation}`);
      if (!response.ok) throw new Error("Search request failed");
      const data = await response.json();
      setSearchResults((data.data?.matches || []) as SearchMatch[]);
      if (!data.data?.matches?.length) setSearchError("No matching Ayahs were found in this translation.");
    } catch { setSearchError("Search is temporarily unavailable. Please try again."); }
    finally { setSearching(false); }
  };
  const jumpToJuz = async (juz: number) => {
    setSelectedJuz(String(juz)); setSearchError("");
    try {
      const response = await fetch(`https://api.alquran.cloud/v1/juz/${juz}/quran-uthmani`);
      if (!response.ok) throw new Error("Juz unavailable");
      const data = await response.json();
      const first = data.data.ayahs?.[0];
      if (!first) throw new Error("Empty Juz");
      setSelected(first.surah.number);
      window.setTimeout(() => document.getElementById(`ayah-${first.surah.number}-${first.numberInSurah}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 700);
    } catch { setSearchError("Could not open that Juz right now. Please try again."); }
  };
  const saveLastRead = (key: string) => { setLastRead(key); window.localStorage.setItem("rhm-quran-last-read", key); };
  const loadWordStudy = async (key: string) => {
    if (wordStudy[key]) return; // Keep fetched word/Tafsir data cached; panel visibility is controlled separately.
    setWordLoading(key); setWordErrors((current) => ({ ...current, [key]: "" }));
    try {
      const params = new URLSearchParams({ verse: key, language: chapter?.editions[1]?.edition?.language || "ur" });
      if (selectedTafsirs.length) params.set("tafsirs", selectedTafsirs.join(","));
      const response = await fetch(`/api/quran/verse?${params.toString()}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Word-by-word study is unavailable.");
      const verseData = data.verses?.[0] || data.verse || data;
      const words = verseData.words || data.words;
      if (Array.isArray(words) && words.length) setWordStudy((current) => ({ ...current, [key]: words }));
      if (selectedTafsirs.length) {
        const passages = (verseData.tafsirs || [])
          .filter((item: { resource_id?: number; id?: number; text?: string }) => selectedTafsirs.includes(String(item.resource_id || item.id)) && item.text)
          .map((item: { resource_id?: number; id?: number; name?: string; resource_name?: string; author_name?: string; text: string }) => {
            const resource = tafsirs.find((candidate) => String(candidate.id) === String(item.resource_id || item.id));
            return {
              id: Number(item.resource_id || item.id),
              name: item.resource_name || item.name || resource?.name || "Urdu Tafsir",
              author: item.author_name || resource?.author_name,
              text: cleanTafsirText(item.text),
            };
          });
        if (passages.length) setTafsirByAyah((current) => new Map(current).set(Number(key.split(":")[1]), passages));
      }
      if ((!Array.isArray(words) || !words.length) && !verseData.tafsirs?.length) throw new Error("No word-by-word or Tafsir details were returned for this Ayah.");
    } catch (error) { setWordErrors((current) => ({ ...current, [key]: error instanceof Error ? error.message : "Quran study details are unavailable." })); }
    finally { setWordLoading(null); }
  };

  // Load word details lazily as each Ayah approaches the viewport.
  // This avoids firing hundreds of API requests when a long Surah opens.
  useEffect(() => {
    if ((!wordStudyMode && !selectedTafsirs.length) || !chapter || loading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target as HTMLElement;
        const key = card.dataset.ayahKey;
        if (!key || wordStudy[key] || wordLoading === key || wordErrors[key]) return;
        void loadWordStudy(key);
        observer.unobserve(card);
      });
    }, { rootMargin: "500px 0px" });

    document.querySelectorAll<HTMLElement>(".ayah-card[data-ayah-key]").forEach((card) => {
      const key = card.dataset.ayahKey;
      if (key && !wordStudy[key] && !wordLoading && !wordErrors[key]) observer.observe(card);
    });
    return () => observer.disconnect();
  }, [wordStudyMode, selectedTafsirs.join(","), chapter, loading, wordStudy, wordLoading, wordErrors, selected]);

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

  // A Surah hand-off is driven by the newly mounted player, not by a single
  // onCanPlay callback. This handles both fast cached audio and slower networks.
  useEffect(() => {
    if (!continueAfterSurah) return;
    const player = surahAudioRef.current;
    if (!player) return;

    let cancelled = false;
    let started = false;
    const startNextSurah = () => {
      if (cancelled || started) return;
      started = true;
      player.play().then(() => {
        if (cancelled) return;
        setContinueAfterSurah(false);
        setPlaybackStatus("");
        setAudioError("");
      }).catch(() => {
        if (cancelled) return;
        setContinueAfterSurah(false);
        setPlaybackStatus("The next Surah is loaded, but your browser did not allow automatic playback. Press Play to continue.");
      });
    };

    const handleCanPlay = () => startNextSurah();
    const handleError = () => {
      if (cancelled) return;
      setContinueAfterSurah(false);
      setAudioError("The next Surah could not be loaded for this reciter. Choose another reciter or press Next Surah to try again.");
      setPlaybackStatus("");
    };

    player.addEventListener("canplay", handleCanPlay);
    player.addEventListener("error", handleError);
    if (player.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) startNextSurah();
    else player.load();

    return () => {
      cancelled = true;
      player.removeEventListener("canplay", handleCanPlay);
      player.removeEventListener("error", handleError);
    };
  }, [selected, continueAfterSurah, surahAudioUrl]);

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
      <nav className="learning-space-nav" aria-label="Explore learning spaces"><a href="/quran" aria-current="page">Qur’an</a><a href="/hadith">Hadith</a><a href="/qaida">Qaida</a><a href="/duas">Daily Duas</a><a href="/learn">Discover Islam</a><a href="/daily-life">Daily Life</a></nav>
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
          <a className="faith-resource-card" href="/qaida"><span>ا ب</span><h3>Beginner’s Qaida</h3><p>Learn Arabic letters and basic reading rules.</p><strong>Open Qaida ↗</strong></a>
          <a className="faith-resource-card" href="/heritage"><span>🕌</span><h3>Islamic Heritage</h3><p>Discover famous mosques and historic places.</p><strong>Explore heritage ↗</strong></a>
        </div>
      </section>
<section className="quran-reader" id="quran-reader" aria-label="Quran reader">
        <div className="quran-controls">
          <label htmlFor="surah-select">Choose a Surah</label>
          <select id="surah-select" value={selected} onChange={(event) => { setContinueAfterSurah(false); setPlaybackStatus(""); setSelected(Number(event.target.value)); }}>
            {surahs.map((surah) => <option key={surah.number} value={surah.number}>{surah.number}. {surah.englishName} — {surah.name}</option>)}
          </select>
          {chapter && <span className="quran-count">{chapter.numberOfAyahs} Ayahs</span>}
          <button type="button" className="reader-tool-button" onClick={() => setSelected((value) => Math.max(1, value - 1))} disabled={selected === 1}>← Previous Surah</button>
          <button type="button" className="reader-tool-button" onClick={() => setSelected((value) => Math.min(114, value + 1))} disabled={selected === 114}>Next Surah →</button>
          <label htmlFor="juz-select">Jump to Juz</label>
          <select id="juz-select" value={selectedJuz} onChange={(event) => { if (event.target.value) void jumpToJuz(Number(event.target.value)); }}><option value="">Choose Juz (1–30)</option>{Array.from({ length: 30 }, (_, index) => <option key={index + 1} value={index + 1}>Juz {index + 1}</option>)}</select>
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
              <p>Only reciters listed in the provider’s full-Surah catalogue appear here. Availability and audio quality are taken from the provider’s live index.</p>
            </div>
            <span className="recitation-symbol" aria-hidden="true">♫</span>
          </div>
          <label className="reciter-label" htmlFor="reciter-select">Reciter</label>
          <select id="reciter-select" className="reciter-select" value={selectedReciter} onChange={(event) => { setSelectedReciter(event.target.value); setAudioError(""); }} disabled={recitersLoading || reciters.length === 0}>
            {recitersLoading && <option>Loading reciters…</option>}
            {reciters.map((reciter) => <option key={reciter.identifier} value={reciter.identifier}>{reciter.englishName || reciter.name}</option>)}
          </select>
          <label className="auto-next-toggle"><input type="checkbox" checked={autoNextSurah} onChange={(event) => setAutoNextSurah(event.target.checked)} /> Automatically play the next Surah when this one finishes</label>
          <label className="reciter-label" htmlFor="tafsir-select">Urdu Tafsir — select one or more scholars (اردو تفاسیر)</label>
          <select id="tafsir-select" className="reciter-select" multiple size={Math.min(5, Math.max(3, tafsirs.length))} value={selectedTafsirs} onChange={(event) => setSelectedTafsirs(Array.from(event.target.selectedOptions, (option) => option.value))} aria-describedby="tafsir-help">
            {tafsirs.map((edition) => <option key={edition.id} value={String(edition.id)}>{edition.name}{edition.author_name ? " — " + edition.author_name : ""}</option>)}
          </select>
          <p id="tafsir-help" className="recitation-note">Ctrl (Windows) or Command (Mac) lets you select multiple editions. Tafsir appears separately with its source and author.</p>
          <label className="auto-next-toggle"><input type="checkbox" checked={tafsirMode} onChange={(event) => setTafsirMode(event.target.checked)} disabled={!selectedTafsirs.length} /> Show selected Urdu Tafsir automatically for each Ayah</label>
          <audio key={surahAudioUrl} ref={(audio) => { surahAudioRef.current = audio; if (audio) audio.playbackRate = playbackRate; }} className="surah-audio" controls preload="none" src={surahAudioUrl}
            onPlay={() => { document.querySelectorAll<HTMLAudioElement>(".quran-page .ayah-audio-row audio").forEach((audio) => audio.pause()); setActiveAyah(null); }}
            onEnded={() => {
              if (autoNextSurah && selected < 114) {
                const nextName = surahs.find((surah) => surah.number === selected + 1)?.englishName || "the next Surah";
                setContinueAfterSurah(true);
                setPlaybackStatus(`Completed. Loading ${nextName}…`);
                setSelected((current) => Math.min(114, current + 1));
              } else if (selected === 114) {
                setPlaybackStatus("You have reached the end of the Qur’an. May your recitation be accepted.");
              } else {
                setPlaybackStatus("Surah completed. Select the next Surah whenever you are ready.");
              }
            }}
            onError={() => {
              setAudioError("This Surah audio is temporarily unavailable for the selected reciter. Try another reciter or select the Surah again.");
              setContinueAfterSurah(false);
            }}>
            Your browser does not support audio playback.
          </audio>
          {audioError && <p className="recitation-error" role="status">{audioError}</p>}
          {playbackStatus && <p className="recitation-note" role="status" aria-live="polite">{playbackStatus}</p>}
          <p className="recitation-note">Source: AlQuran Cloud audio-edition catalogue and its full-Surah CDN index. The selected bitrate is chosen from the provider’s published availability data. Some individual Ayah files may have different availability.</p>
        </section>
        <section className="quran-search-panel" aria-label="Search the Quran">
          <form onSubmit={(event) => { event.preventDefault(); void runGlobalSearch(); }}><label htmlFor="quran-global-search">Search the entire Quran</label><input id="quran-global-search" type="search" value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Search a word or phrase in the selected translation"/><button type="submit" disabled={searching || !globalSearch.trim()}>{searching ? "Searching…" : "Search Quran"}</button></form>
          {searchError && <p role="status">{searchError}</p>}
          {searchResults.length > 0 && <ul className="quran-search-results">{searchResults.slice(0, 12).map((match) => <li key={match.number}><button type="button" onClick={() => { setSelected(match.surah.number); window.setTimeout(() => document.getElementById(`ayah-${match.surah.number}-${match.numberInSurah}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 700); }}>{match.surah.englishName} {match.surah.number}:{match.numberInSurah}</button><span>{match.text}</span></li>)}</ul>}
        </section>
        <div className="reader-tools" aria-label="Reading tools">
          <label htmlFor="quran-search">Find in this Surah</label>
          <input id="quran-search" type="search" value={readerQuery} onChange={(event) => setReaderQuery(event.target.value)} placeholder="Search Arabic, translation or reference (e.g. 2:5)" />
          <button type="button" className={`reader-tool-button ${showBookmarksOnly ? "is-active" : ""}`} onClick={() => setShowBookmarksOnly((value) => !value)}>{showBookmarksOnly ? "Show all Ayahs" : `Bookmarks (${bookmarks.length})`}</button>
          <button type="button" className={`reader-tool-button ${wordStudyMode ? "is-active" : ""}`} aria-pressed={wordStudyMode} onClick={() => setWordStudyMode((enabled) => !enabled)}>{wordStudyMode ? "Word-by-word mode: On" : "Word-by-word mode: Off"}</button>
          <label>Arabic size <input aria-label="Arabic text size" type="range" min="0.8" max="1.6" step="0.05" value={fontScale} onChange={(event) => setFontScale(Number(event.target.value))} /></label>
          <label>Repeat Ayah <select value={repeatCount} onChange={(event) => setRepeatCount(Number(event.target.value))}><option value={1}>Off</option><option value={2}>2 times</option><option value={3}>3 times</option><option value={5}>5 times</option><option value={10}>10 times</option></select></label>
          <label>Playback speed <select value={playbackRate} onChange={(event) => setPlaybackRate(Number(event.target.value))}><option value={0.75}>0.75×</option><option value={1}>1×</option><option value={1.25}>1.25×</option><option value={1.5}>1.5×</option><option value={2}>2×</option></select></label>
          <label><input type="checkbox" checked={autoNextAyah} onChange={(event) => setAutoNextAyah(event.target.checked)} /> Auto-play next Ayah</label>
          {lastRead && <button type="button" className="reader-tool-button" onClick={() => { const [surahNo, ayahNo] = lastRead.split(":").map(Number); setSelected(surahNo); window.setTimeout(() => document.getElementById(`ayah-${surahNo}-${ayahNo}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 650); }}>Resume {lastRead}</button>}
        </div>
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
              {visibleAyahs.map((ayah) => {
                const key = `${selected}:${ayah.numberInSurah}`;
                const bookmarked = bookmarks.includes(key);
                return (
                <article id={`ayah-${selected}-${ayah.numberInSurah}`} className={`ayah ayah-card ${activeAyah === key ? "is-playing" : ""}`} data-ayah-key={key} key={ayah.numberInSurah}>
                  <div className="ayah-card-top">
                    <span className="ayah-number">{ayah.numberInSurah}</span>
                    <span className="ayah-reference">{selected}:{ayah.numberInSurah}</span>
                    <div className="ayah-actions"><button type="button" aria-expanded={wordStudyMode || !!wordPanelsOpen[key]} onClick={() => { setWordPanelsOpen((current) => ({ ...current, [key]: !current[key] })); if (!wordStudy[key] && wordLoading !== key) void loadWordStudy(key); }}>{wordStudyMode || wordPanelsOpen[key] ? "Hide words" : wordLoading === key ? "Loading…" : "Show words"}</button><button type="button" aria-pressed={bookmarked} onClick={() => toggleBookmark(key)}>{bookmarked ? "★ Saved" : "☆ Bookmark"}</button><button type="button" onClick={() => setNoteFor(noteFor === key ? null : key)}>{notes[key] ? "Edit note" : "Add note"}</button></div>
                  </div>
                  <p className="ayah-arabic" lang="ar" dir="rtl" style={{ fontSize: `calc(clamp(28px, 4.5vw, 40px) * ${fontScale})` }}>{ayah.text.replace(/^\uFEFF/, "")}</p>
                  <p className={`ayah-translation ${chapter.editions[1]?.edition?.language === "ur" ? "ayah-translation-urdu" : ""}`} lang={chapter.editions[1]?.edition?.language || "ur"} dir={chapter.editions[1]?.edition?.language === "ur" || chapter.editions[1]?.edition?.language === "ar" ? "rtl" : "auto"}>{translationByAyah.get(ayah.numberInSurah) || "Translation unavailable for this Ayah."}</p>
                  {wordErrors[key] && <p className="word-study-error" role="status">{wordErrors[key]}</p>}
                  {wordStudy[key] && (wordStudyMode || wordPanelsOpen[key]) ? (
                    <>
                      <div className="word-study-heading">
                        <strong>Word-by-word meaning · لفظ بہ لفظ معنی</strong>
                        <span>Each word is shown separately with its Urdu meaning and pronunciation.</span>
                      </div>
                      <div className="word-study-panel" aria-label={`Word by word study for ${key}`} dir="rtl">
                        {wordStudy[key].map((word, index) => {
                          const audioPath = word.audioUrl || word.audio_url;
                          return (
                            <div className="word-study-item" key={word.id || word.position || index}>
                              <span className="word-study-arabic" lang="ar" dir="rtl">{word.textUthmani || word.text_uthmani || word.textIndopak || word.text_indopak || ""}</span>
                              <small className="word-study-meaning" lang="ur" dir="rtl">{word.translation?.text || "اردو معنی دستیاب نہیں"}</small>
                              <small className="word-study-transliteration" lang="en" dir="ltr">{word.transliteration?.text || ""}</small>
                              <small className="word-study-index">لفظ {word.position || index + 1}</small>
                              <audio controls preload="none" src={"https://audio.qurancdn.com/" + (audioPath || "")} aria-label={"Pronounce word " + (index + 1)}></audio>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}
                  {selectedTafsirs.length > 0 && (tafsirByAyah.get(ayah.numberInSurah) || []).map((passage) => <details className="ayah-tafsir ayah-tafsir-urdu" key={passage.id + "-" + ayah.numberInSurah} open={tafsirMode}>
                    <summary>{passage.name}{passage.author ? " — " + passage.author : ""} · آیت {ayah.numberInSurah}</summary>
                    <p lang="ur" dir="rtl">{passage.text}</p>
                  </details>)}
                  <div className="ayah-audio-row">
                    <span>Listen to Ayah {ayah.numberInSurah}</span>
                    <audio
                      controls
                      preload="none"
                      src={`https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayah.number}.mp3`}
                      aria-label={`Play Surah ${selected}, Ayah ${ayah.numberInSurah}`}
                      ref={(audio) => { if (audio) audio.playbackRate = playbackRate; }}
                      onPlay={(event) => {
                        document.querySelectorAll<HTMLAudioElement>(".quran-page audio").forEach((other) => { if (other !== event.currentTarget) other.pause(); });
                        if (activeAyah !== key) setRepeatRemaining(repeatCount);
                        setActiveAyah(key);
                        saveLastRead(key);
                        event.currentTarget.closest(".ayah-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      onEnded={(event) => {
                        if (repeatRemaining > 1) {
                          setRepeatRemaining((remaining) => remaining - 1);
                          event.currentTarget.currentTime = 0;
                          event.currentTarget.play().catch(() => setPlaybackStatus("Press Play to repeat this Ayah."));
                          return;
                        }
                        const nextAyah = event.currentTarget.closest(".ayah-card")?.nextElementSibling;
                        if (autoNextAyah && nextAyah instanceof HTMLElement) {
                          nextAyah.scrollIntoView({ behavior: "smooth", block: "center" });
                          const nextAudio = nextAyah.querySelector("audio");
                          if (nextAudio) nextAudio.play().catch(() => setPlaybackStatus("Next Ayah is ready. Press Play to continue."));
                        } else { setActiveAyah(null); }
                      }}
                    >
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                  {noteFor === key && <div className="ayah-note-editor"><label htmlFor={`note-${selected}-${ayah.numberInSurah}`}>Your private study note</label><textarea id={`note-${selected}-${ayah.numberInSurah}`} value={notes[key] || ""} onChange={(event) => setNotes((current) => ({ ...current, [key]: event.target.value }))} placeholder="Write a personal reflection or study note…" rows={3} /></div>}
                </article>
              ); })}
              {visibleAyahs.length === 0 && <p className="quran-status">No Ayahs match this search or bookmark filter.</p>}
            </div>
          </>
        )}
        <p className="quran-source">Arabic Quran text, translations, and Ayah-by-Ayah recitations are streamed through AlQuran Cloud. Translation names and contributors are shown where supplied by the source. Translation is not a substitute for Tafsir or scholarly explanation.</p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
