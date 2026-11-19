"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type Ayah = { number: number; numberInSurah: number; text: string; juz?: number; page?: number };
type StoredSurah = { id: number; name: string; englishName: string; ayahs: Ayah[]; translation: Ayah[]; translationId: string; savedAt: number };
type StoredAudio = { id: string; surah: number; reciter: string; blob: Blob; savedAt: number };
type SurahMeta = { number: number; name: string; englishName: string; numberOfAyahs: number };

const DB_NAME = "rhm-quran-offline-v1";
const DB_VERSION = 1;
const STORE_TEXT = "surahs";
const STORE_AUDIO = "audio";
const ARABIC_EDITION = "quran-uthmani";
const TRANSLATIONS: Record<string, { label: string; id: string }> = {
  ur: { label: "Urdu — Fateh Muhammad Jalandhry", id: "ur.jalandhry" },
  en: { label: "English — Saheeh International", id: "en.sahih" },
};
const AUDIO_RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy" },
  { id: "ar.abdurrahmaansudais", name: "Abdur-Rahman as-Sudais" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", name: "Mohamed Siddiq Al-Minshawi" },
  { id: "ar.mahermuaiqly", name: "Maher Al Muaiqly" },
];

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") return reject(new Error("This browser does not support offline storage."));
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_TEXT)) db.createObjectStore(STORE_TEXT, { keyPath: "id" });
      if (!db.objectStoreNames.contains(STORE_AUDIO)) db.createObjectStore(STORE_AUDIO, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open offline storage."));
  });
}
async function putRecord<T>(store: string, value: T) {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("Could not save offline content."));
  });
  db.close();
}
async function getAllRecords<T>(store: string): Promise<T[]> {
  const db = await openDatabase();
  const values = await new Promise<T[]>((resolve, reject) => {
    const request = db.transaction(store, "readonly").objectStore(store).getAll();
    request.onsuccess = () => resolve(request.result as T[]);
    request.onerror = () => reject(request.error || new Error("Could not read offline content."));
  });
  db.close();
  return values;
}
async function deleteRecord(store: string, id: IDBValidKey) {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error("Could not delete offline content."));
  });
  db.close();
}
async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("The Qur'an source is temporarily unavailable. Please try again when connected.");
  const data = await response.json();
  if (!data?.data) throw new Error("The Qur'an source returned an unexpected response.");
  return data.data;
}
function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function OfflineQuranPage() {
  const [catalogue, setCatalogue] = useState<SurahMeta[]>([]);
  const [saved, setSaved] = useState<StoredSurah[]>([]);
  const [audioSaved, setAudioSaved] = useState<StoredAudio[]>([]);
  const [language, setLanguage] = useState<"ur" | "en">("ur");
  const [reciter, setReciter] = useState(AUDIO_RECITERS[0].id);
  const [selected, setSelected] = useState(1);
  const [active, setActive] = useState<StoredSurah | null>(null);
  const [query, setQuery] = useState("");
  const [offlineSearch, setOfflineSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, label: "" });
  const [online, setOnline] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [lastRead, setLastRead] = useState("");
  const [storageEstimate, setStorageEstimate] = useState<{ usage?: number; quota?: number } | null>(null);
  const [audioObjectUrl, setAudioObjectUrl] = useState("");
  const cancelRef = useRef(false);

  async function refreshLibrary() {
    const [texts, audios] = await Promise.all([getAllRecords<StoredSurah>(STORE_TEXT), getAllRecords<StoredAudio>(STORE_AUDIO)]);
    setSaved(texts.sort((a, b) => a.id - b.id));
    setAudioSaved(audios);
    if (navigator.storage?.estimate) setStorageEstimate(await navigator.storage.estimate());
  }
  useEffect(() => {
    setOnline(navigator.onLine);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    setBookmarks(JSON.parse(localStorage.getItem("rhm-quran-bookmarks") || "[]"));
    setLastRead(localStorage.getItem("rhm-quran-last-read") || "");
    refreshLibrary().catch((reason) => setError(reason instanceof Error ? reason.message : "Offline library could not be opened."));
    fetch("https://api.alquran.cloud/v1/surah").then((r) => r.json()).then((d) => setCatalogue(d.data || [])).catch(() => {});
    return () => { window.removeEventListener("online", onOnline); window.removeEventListener("offline", onOffline); };
  }, []);

  const filteredCatalogue = useMemo(() => catalogue.filter((item) => `${item.number} ${item.name} ${item.englishName}`.toLowerCase().includes(query.toLowerCase())), [catalogue, query]);
  const savedTextBytes = useMemo(() => saved.reduce((sum, item) => sum + new Blob([JSON.stringify(item)]).size, 0), [saved]);
  const savedAudioBytes = useMemo(() => audioSaved.reduce((sum, item) => sum + item.blob.size, 0), [audioSaved]);
  const totalSavedBytes = savedTextBytes + savedAudioBytes;
  const selectedTranslationId = TRANSLATIONS[language].id;
  const savedForSelectedTranslation = saved.filter((item) => item.translationId === selectedTranslationId);
  const savedIds = new Set(savedForSelectedTranslation.map((item) => item.id));
  const offlineMatches = useMemo(() => { const term = offlineSearch.trim().toLocaleLowerCase(); if (term.length < 2) return []; return saved.flatMap((surah) => surah.ayahs.flatMap((ayah, index) => { const translation = surah.translation[index]?.text || ""; return ayah.text.toLocaleLowerCase().includes(term) || translation.toLocaleLowerCase().includes(term) ? [{ surah, ayah, translation }] : []; })).slice(0, 80); }, [saved, offlineSearch]);
  const audioId = (surah: number, reader: string) => `${surah}:${reader}`;

  async function downloadSurah(number: number) {
    if (!navigator.onLine) { setError("Connect to the internet before downloading this Surah."); return; }
    setBusy(true); setError(""); setStatus("Downloading verified Arabic text and selected translation…");
    try {
      const translationId = TRANSLATIONS[language].id;
      const data = await fetchJson(`https://api.alquran.cloud/v1/surah/${number}/editions/${ARABIC_EDITION},${translationId}`);
      if (!Array.isArray(data) || data.length < 2 || !Array.isArray(data[0].ayahs) || data[0].ayahs.length !== data[1].ayahs?.length) throw new Error("The two editions did not return matching Ayah counts. Nothing was saved.");
      const record: StoredSurah = { id: number, name: data[0].name, englishName: data[0].englishName, ayahs: data[0].ayahs, translation: data[1].ayahs, translationId, savedAt: Date.now() };
      await putRecord(STORE_TEXT, record);
      await refreshLibrary();
      setSelected(number); setActive(record);
      setStatus(`Surah ${number} is saved on this device for offline reading.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Download failed."); }
    finally { setBusy(false); }
  }
  async function downloadAll() {
    if (!catalogue.length) { setError("The Surah catalogue is still loading. Connect and try again."); return; }
    if (!navigator.onLine) { setError("Connect to the internet before downloading the complete Qur'an text."); return; }
    cancelRef.current = false; setBusy(true); setError(""); setProgress({ done: 0, total: 114, label: "Preparing complete Qur'an text" });
    let completed = 0;
    try {
      for (const surah of catalogue) {
        if (cancelRef.current) break;
        if (savedIds.has(surah.number)) { completed++; setProgress({ done: completed, total: 114, label: `Already saved: ${surah.englishName}` }); continue; }
        const editions = await fetchJson(`https://api.alquran.cloud/v1/surah/${surah.number}/editions/${ARABIC_EDITION},${TRANSLATIONS[language].id}`);
        if (!Array.isArray(editions) || editions.length < 2 || editions[0].ayahs?.length !== editions[1].ayahs?.length) throw new Error(`Could not validate both editions for ${surah.englishName}. The download stopped safely.`);
        await putRecord(STORE_TEXT, { id: surah.number, name: editions[0].name, englishName: editions[0].englishName, ayahs: editions[0].ayahs, translation: editions[1].ayahs, translationId: TRANSLATIONS[language].id, savedAt: Date.now() } satisfies StoredSurah);
        completed++; setProgress({ done: completed, total: 114, label: `Saved: ${surah.englishName}` });
      }
      await refreshLibrary();
      setStatus(cancelRef.current ? `Download paused. ${completed} Surahs are saved and can be resumed later.` : "Complete Qur'an text and selected translation are saved on this device.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "The full download stopped."); await refreshLibrary(); }
    finally { setBusy(false); }
  }
  async function downloadAudio(number: number) {
    if (!navigator.onLine) { setError("Connect to the internet before downloading recitation audio."); return; }
    setBusy(true); setError(""); setStatus("Downloading recitation audio. This may use significant storage and mobile data.");
    try {
      const url = `https://cdn.islamic.network/quran/audio-surah/128/${reciter}/${number}.mp3`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("This recitation audio is not available from the selected source.");
      const blob = await response.blob();
      if (!blob.size || (response.headers.get("content-type") || "").includes("text/html")) throw new Error("The audio source did not return a valid audio file.");
      await putRecord(STORE_AUDIO, { id: audioId(number, reciter), surah: number, reciter, blob, savedAt: Date.now() } satisfies StoredAudio);
      await refreshLibrary(); setStatus(`Audio for Surah ${number} saved on this device (${formatBytes(blob.size)}).`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Audio download failed. This provider may not permit browser downloads for this file."); }
    finally { setBusy(false); }
  }
  async function openSaved(number: number) {
    const record = saved.find((item) => item.id === number) || (await getAllRecords<StoredSurah>(STORE_TEXT)).find((item) => item.id === number);
    if (!record) { setError("This Surah has not been downloaded on this device."); return; }
    setActive(record); setSelected(number); setError(""); setStatus("Reading from this device's offline library.");
  }
  async function removeSurah(number: number) {
    await deleteRecord(STORE_TEXT, number);
    await refreshLibrary();
    if (active?.id === number) setActive(null);
    setStatus(`Surah ${number} text removed from this device.`);
  }
  async function removeAudio(item: StoredAudio) {
    await deleteRecord(STORE_AUDIO, item.id);
    await refreshLibrary(); setStatus(`Downloaded audio for Surah ${item.surah} removed.`);
  }
  function saveBookmark(ayah: number) {
    const key = `${selected}:${ayah}`;
    const next = bookmarks.includes(key) ? bookmarks.filter((item) => item !== key) : [...bookmarks, key];
    setBookmarks(next); localStorage.setItem("rhm-quran-bookmarks", JSON.stringify(next));
  }
  function setReadingPosition(ayah: number) {
    const key = `${selected}:${ayah}`;
    setLastRead(key); localStorage.setItem("rhm-quran-last-read", key);
  }
  const selectedAudio = audioSaved.find((item) => item.surah === selected && item.reciter === reciter);
  useEffect(() => { if (!selectedAudio) { setAudioObjectUrl(""); return; } const url = URL.createObjectURL(selectedAudio.blob); setAudioObjectUrl(url); return () => URL.revokeObjectURL(url); }, [selectedAudio]);
  const selectedSurahMeta = catalogue.find((item) => item.number === selected);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/quran" className={styles.brand}>← Back to Qur'an reader</a>
        <span className={styles.brandTitle}>RHM Offline Qur'an</span>
        <span className={online ? styles.online : styles.offline}>{online ? "Online" : "Offline mode"}</span>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>READ • LEARN • CONTINUE OFFLINE</p>
        <h1>Your Qur'an library, even without internet</h1>
        <p>Download Arabic Qur'an text with one chosen translation to this device. Once saved, open and read those Surahs without a connection. Downloads stay in this browser and are not automatically synced to another device.</p>
        <div className={styles.stats}>
          <div><strong>{savedForSelectedTranslation.length}/114</strong><span>Surahs saved in selected translation</span></div>
          <div><strong>{audioSaved.length}</strong><span>Audio files saved</span></div>
          <div><strong>{formatBytes(totalSavedBytes)}</strong><span>Estimated library size</span></div>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}><div><h2>Download your Qur'an</h2><p>Choose Urdu or English translation. Your saved Arabic and translation editions remain labelled separately.</p></div></div>
        <div className={styles.controls}>
          <label>Translation
            <select value={language} disabled={busy} onChange={(event) => setLanguage(event.target.value as "ur" | "en")}>
              <option value="ur">Urdu — Fateh Muhammad Jalandhry</option>
              <option value="en">English — Saheeh International</option>
            </select>
          </label>
          <button className={styles.primary} disabled={busy || !catalogue.length || savedForSelectedTranslation.length === 114} onClick={downloadAll}>{busy ? "Working…" : saved.length === 114 ? "All 114 Surahs saved" : "Download complete Qur'an text"}</button>
          {busy && progress.total > 0 && <button className={styles.secondary} onClick={() => { cancelRef.current = true; }}>Pause after current Surah</button>}
        </div>
        {progress.total > 0 && <div className={styles.progressWrap}><div className={styles.progressText}><span>{progress.label}</span><strong>{progress.done}/{progress.total}</strong></div><progress value={progress.done} max={progress.total}/></div>}
        <p className={styles.note}>The complete text download includes all 114 Surahs, Arabic Uthmani text and the selected translation. Tafsir editions and recitation audio are separate downloads; audio can be large.</p>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}><div><h2>Choose individual Surahs</h2><p>Download only what you need, or open a Surah already stored on this device.</p></div></div>
        <input className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Surah by number, Arabic or English name…" aria-label="Search Surahs"/>
        <div className={styles.surahGrid}>
          {(catalogue.length ? filteredCatalogue : saved.map((item) => ({ number: item.id, name: item.name, englishName: item.englishName, numberOfAyahs: item.ayahs.length }))).map((surah) => (
            <article className={styles.surahCard} key={surah.number}>
              <div><span className={styles.number}>{surah.number}</span><div><strong>{surah.englishName}</strong><small>{surah.name} · {surah.numberOfAyahs} Ayahs</small></div></div>
              <div className={styles.cardActions}>
                {savedIds.has(surah.number) ? <button className={styles.secondary} onClick={() => openSaved(surah.number)}>Read offline</button> : <button className={styles.primarySmall} disabled={busy || !online} onClick={() => downloadSurah(surah.number)}>Download</button>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}><div><h2>Search your downloaded Qur'an</h2><p>Search only the Arabic and translation text stored on this device. Results remain available offline.</p></div></div>
        <input className={styles.search} value={offlineSearch} onChange={(event) => setOfflineSearch(event.target.value)} placeholder="Search downloaded Arabic or translation (2+ characters)…" aria-label="Search downloaded Qur'an text"/>
        {offlineSearch.trim().length >= 2 && <div className={styles.downloadList}>{offlineMatches.map(({ surah, ayah, translation }) => <button key={surah.id + ":" + ayah.numberInSurah} className={styles.searchResult} onClick={() => { setActive(surah); setSelected(surah.id); setTimeout(() => document.getElementById(`offline-ayah-${ayah.numberInSurah}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 100); }}><strong>{surah.englishName} · Ayah {ayah.numberInSurah}</strong><span dir="rtl">{ayah.text}</span><span>{translation}</span></button>)}{offlineMatches.length === 0 && <p>No matching Ayahs in your downloaded Surahs.</p>}</div>}
      </section>

      <section className={styles.panel}>
        <div className={styles.sectionHeading}><div><h2>Offline recitation audio</h2><p>Save individual Surah audio files for listening without internet. Download sizes vary by reciter and Surah.</p></div></div>
        <div className={styles.controls}>
          <label>Reciter
            <select value={reciter} disabled={busy} onChange={(event) => setReciter(event.target.value)}>
              {AUDIO_RECITERS.map((reader) => <option value={reader.id} key={reader.id}>{reader.name}</option>)}
            </select>
          </label>
          <label>Surah
            <select value={selected} disabled={busy} onChange={(event) => setSelected(Number(event.target.value))}>
              {catalogue.map((surah) => <option key={surah.number} value={surah.number}>{surah.number}. {surah.englishName}</option>)}
            </select>
          </label>
          <button className={styles.primary} disabled={busy || !online || !catalogue.length || !!selectedAudio} onClick={() => downloadAudio(selected)}>{selectedAudio ? "Audio saved on this device" : "Download selected audio"}</button>
        </div>
        {selectedAudio && <audio className={styles.audio} controls preload="metadata" src={audioObjectUrl} />}
        {!!audioSaved.length && <div className={styles.downloadList}>{audioSaved.map((item) => <div key={item.id}><span>Surah {item.surah} · {AUDIO_RECITERS.find((reader) => reader.id === item.reciter)?.name || item.reciter} · {formatBytes(item.blob.size)}</span><button className={styles.textButton} onClick={() => removeAudio(item)}>Remove</button></div>)}</div>}
      </section>

      {active && <section className={styles.reader} aria-label="Offline Qur'an reader">
        <div className={styles.readerTop}><div><p className={styles.eyebrow}>SAVED ON THIS DEVICE</p><h2>{active.englishName} · {active.name}</h2><p>Arabic text and {TRANSLATIONS[language].label}</p></div><button className={styles.secondary} onClick={() => setActive(null)}>Close reader</button></div>
        {active.ayahs.map((ayah, index) => {
          const translation = active.translation[index];
          const key = `${active.id}:${ayah.numberInSurah}`;
          return <article className={styles.ayah} id={`offline-ayah-${ayah.numberInSurah}`} key={ayah.number}>
            <div className={styles.ayahTop}><span>Ayah {ayah.numberInSurah}</span><div><button className={styles.textButton} onClick={() => saveBookmark(ayah.numberInSurah)}>{bookmarks.includes(key) ? "★ Bookmarked" : "☆ Bookmark"}</button><button className={styles.textButton} onClick={() => setReadingPosition(ayah.numberInSurah)}>Last read</button></div></div>
            <p className={styles.arabic} lang="ar" dir="rtl">{ayah.text}</p>
            <p className={styles.translation} dir={active.translationId.startsWith("ur.") ? "rtl" : "ltr"} lang={active.translationId.startsWith("ur.") ? "ur" : "en"}>{translation?.text || "Translation not available in this saved edition."}</p>
          </article>;
        })}
      </section>}

      <section className={styles.panel}>
        <div className={styles.sectionHeading}><div><h2>Your reading continuity</h2><p>Bookmarks and last-read position are kept locally in this browser, alongside the existing RHM Qur'an reader preferences.</p></div></div>
        <p><strong>Last read:</strong> {lastRead || "Not set yet"}</p>
        <p><strong>Bookmarks:</strong> {bookmarks.length ? bookmarks.join(", ") : "No bookmarks yet"}</p>
        {lastRead && <button className={styles.secondary} onClick={() => { const [surah, ayah] = lastRead.split(":").map(Number); openSaved(surah).then(() => setTimeout(() => document.getElementById(`offline-ayah-${ayah}`)?.scrollIntoView({ behavior: "smooth" }), 100)); }}>Continue from last read</button>}
      </section>

      <section className={styles.panel} id="offline-download-management">
        <div className={styles.sectionHeading}><div><h2>Storage & download management</h2><p>See exactly what RHM has saved on this device. Remove individual downloads whenever you need space.</p></div></div>
        <div className={styles.stats}>
          <div><strong>{saved.length}</strong><span>Qur'an text Surahs saved</span></div>
          <div><strong>{audioSaved.length}</strong><span>Recitation audio files saved</span></div>
          <div><strong>{formatBytes(totalSavedBytes)}</strong><span>Total RHM offline library</span></div>
        </div>
        <div className={styles.stats}>
          <div><strong>{formatBytes(savedTextBytes)}</strong><span>Saved Arabic text and translation</span></div>
          <div><strong>{formatBytes(savedAudioBytes)}</strong><span>Saved recitation audio</span></div>
        </div>
        <h3>Manage saved Qur'an text</h3>
        {saved.length ? <div className={styles.downloadList}>{saved.map((item) => <div key={item.id}><span>Surah {item.id} · {item.englishName} · {item.ayahs.length} Ayahs · {formatBytes(new Blob([JSON.stringify(item)]).size)}</span><button className={styles.textButton} onClick={() => removeSurah(item.id)}>Remove</button></div>)}</div> : <p className={styles.note}>No Qur'an text downloads are stored on this device yet.</p>}
        <p className={styles.note}>Your saved audio files can be managed in the Offline recitation audio section above. Removing a download only removes that selected file from this device; it does not affect the original Qur'an source.</p>
        <p className={styles.note}>Browser storage information (not RHM-only): {storageEstimate?.usage ? formatBytes(storageEstimate.usage) : "Not available"} used of {storageEstimate?.quota ? formatBytes(storageEstimate.quota) : "an unknown limit"}. This estimate may include data from other websites, so it is different from the RHM library size shown above.</p>
        <p className={styles.note}>Keep this browser's site data to retain offline downloads. Clearing browser data, using private browsing, or switching devices may remove access to this library. Downloaded translations and audio are intended for personal offline use; source availability and reuse permissions may differ.</p>
      </section>

      {(status || error) && <div role="status" className={error ? styles.error : styles.status}>{error || status}</div>}
      <footer className={styles.footer}>RHM — Rehmat, Hidayat & Ma'rifat · Qur'an text and translation source: AlQuran Cloud API. Always verify recitation and learning with a qualified teacher.</footer>
    </main>
  );
}
