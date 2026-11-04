"use client";
import { useEffect, useMemo, useState } from "react";

type H = { hadithnumber?: number | string; text?: string; grades?: { name?: string; grade?: string }[] };
const books = [{id:"bukhari",name:"Sahih al-Bukhari"},{id:"muslim",name:"Sahih Muslim"},{id:"abudawud",name:"Sunan Abu Dawud"},{id:"tirmidhi",name:"Jami' at-Tirmidhi"},{id:"nasai",name:"Sunan an-Nasa'i"},{id:"ibnmajah",name:"Sunan Ibn Majah"},{id:"malik",name:"Muwatta Malik"}];
async function edition(id:string) {
  const base = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/"+id;
  let r = await fetch(base+".min.json"); if(!r.ok) r = await fetch(base+".json");
  if(!r.ok) throw new Error("Edition unavailable"); return r.json() as Promise<{hadiths?:H[]}>;
}
export default function HadithPage() {
  const [book,setBook]=useState("bukhari"),[lang,setLang]=useState("urd"),[items,setItems]=useState<H[]>([]),[arabic,setArabic]=useState<H[]>([]);
  const [query,setQuery]=useState(""),[limit,setLimit]=useState(50),[loading,setLoading]=useState(true),[error,setError]=useState(""),[theme,setTheme]=useState<"light"|"dark">("light");
  useEffect(()=>{if(localStorage.getItem("rhm-quran-theme")==="dark")setTheme("dark");},[]);
  useEffect(()=>{localStorage.setItem("rhm-quran-theme",theme);},[theme]);
  useEffect(()=>{let live=true;setLoading(true);setError("");setLimit(50);
    Promise.all([edition((lang==="ara"?"ara":lang)+"-"+book),lang==="ara"?Promise.resolve(null):edition("ara-"+book).catch(()=>null)])
    .then(([translated,arab])=>{if(!live)return;setItems(translated.hadiths||[]);setArabic(arab?.hadiths||[]);if(!translated.hadiths?.length)setError("No narrations were returned for this edition.");})
    .catch(()=>{if(live){setItems([]);setArabic([]);setError("This edition could not be loaded. Please try another collection or language.");}})
    .finally(()=>{if(live)setLoading(false);});return()=>{live=false;};
  },[book,lang]);
  const filtered=useMemo(()=>{const q=query.trim().toLocaleLowerCase();return items.filter((h,i)=>!q||String(h.hadithnumber??i+1).includes(q)||String(h.text??"").toLocaleLowerCase().includes(q));},[items,query]);
  const bookName=books.find(b=>b.id===book)?.name||book;
  return <main className="quran-page hadith-page" data-theme={theme}>
    <header className="quran-topbar"><a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</a><div className="quran-top-actions"><button className="theme-toggle" onClick={()=>setTheme(theme==="light"?"dark":"light")}>{theme==="light"?"☾ Dark mode":"☀ Light mode"}</button><a className="quran-home-link" href="/">Back to home</a></div></header>
    <section className="quran-heading"><div className="eyebrow">Hadith & Sunnah Library</div><h1>Explore the Hadith.</h1><p>Read narrations from major Hadith collections in Arabic, Urdu, or English. Search by words or Hadith number.</p></section>
    <section className="islam-learning" aria-label="Learn about Islam">
      <div className="islam-learning-heading"><span className="eyebrow">A guide to the faith</span><h2>Discover Islam</h2><p>Explore the foundations of Muslim belief, worship, character and the place of Hadith in everyday life.</p></div>
      <div className="islam-info-grid">
        <article className="islam-info-card"><span className="islam-info-icon">☪</span><h3>What is Islam?</h3><p>Islam is devotion and submission to the One God, Allah. It calls people to worship Him alone, follow His guidance, act with justice and show mercy to creation.</p><a href="https://quran.com/al-ikhlas" target="_blank" rel="noreferrer">Read Surah Al-Ikhlas ↗</a></article>
        <article className="islam-info-card"><span className="islam-info-icon">五</span><h3>The Five Pillars</h3><p><b>Shahadah</b> — testimony of faith; <b>Salah</b> — five daily prayers; <b>Zakah</b> — obligatory charity; <b>Sawm</b> — fasting in Ramadan; <b>Hajj</b> — pilgrimage for those able.</p><a href="https://www.dar-alifta.org/en/article/details/65/the-5-pillars-of-islam" target="_blank" rel="noreferrer">Learn about the pillars ↗</a></article>
        <article className="islam-info-card"><span className="islam-info-icon">✧</span><h3>The Six Articles of Iman</h3><p>Belief in Allah, His angels, His revealed books, His messengers, the Last Day, and divine decree (Qadar).</p><a href="https://www.dar-alifta.org/en/article/details/64/the-six-articles-of-faith" target="_blank" rel="noreferrer">Explore the articles of faith ↗</a></article>
        <article className="islam-info-card"><span className="islam-info-icon">۞</span><h3>Qur’an and Sunnah</h3><p>The Qur’an is Islam’s holy scripture. The Sunnah is the Prophet Muhammad’s ﷺ example; Hadith reports preserve accounts of his words, actions and approvals.</p><a href="https://quran.com/" target="_blank" rel="noreferrer">Read the Qur’an ↗</a></article>
        <article className="islam-info-card"><span className="islam-info-icon">♡</span><h3>Character and daily life</h3><p>Islam encourages truthfulness, patience, gratitude, keeping promises, kindness to parents and neighbours, caring for those in need, and avoiding harm.</p><a href="https://quran.com/16/90" target="_blank" rel="noreferrer">Read Qur’an 16:90 ↗</a></article>
        <article className="islam-info-card"><span className="islam-info-icon">📚</span><h3>Understanding Hadith</h3><p>Hadith are studied through their chains of narrators (isnad) and wording (matn). Common grading terms include Sahih (sound), Hasan (good) and Da‘if (weak); grading can differ between scholars.</p><a href="https://sunnah.com/" target="_blank" rel="noreferrer">Explore Hadith references ↗</a></article>
      </div>
      <div className="islam-learning-note"><strong>Learn with care</strong><p>A translation is an aid to understanding, not a replacement for the original Arabic. Hadith numbering and grading may vary by edition and scholar. For personal religious rulings, consult a qualified, trusted scholar and consider the context of the evidence.</p></div>
    </section>
    <section className="qaida-section" aria-label="Beginner Arabic Qaida lessons">
      <div className="qaida-heading"><span className="eyebrow">Start reading Arabic</span><h2>Beginner’s Qaida</h2><p>A step-by-step introduction to Arabic letters and the signs used when reading the Qur’an. Practise slowly and learn pronunciation from a qualified teacher.</p></div>
      <div className="qaida-lesson-grid">
        <article className="qaida-lesson"><span className="qaida-step">Lesson 01</span><h3>Arabic alphabet</h3><p className="qaida-arabic" lang="ar" dir="rtl">ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي</p><p>Learn to recognise each letter by its name and sound. Some letters have similar shapes, so notice their dots carefully.</p></article>
        <article className="qaida-lesson"><span className="qaida-step">Lesson 02</span><h3>Short vowels (Harakat)</h3><p className="qaida-arabic" lang="ar" dir="rtl">بَ　بِ　بُ</p><p>Fathah gives a short “a” sound, kasrah a short “i” sound, and dammah a short “u” sound. Practise each sound clearly.</p></article>
        <article className="qaida-lesson"><span className="qaida-step">Lesson 03</span><h3>Tanween</h3><p className="qaida-arabic" lang="ar" dir="rtl">بً　بٍ　بٌ</p><p>Tanween is a double vowel sign, commonly producing an “an”, “in” or “un” ending. Learn its pronunciation and when it appears.</p></article>
        <article className="qaida-lesson"><span className="qaida-step">Lesson 04</span><h3>Sukoon</h3><p className="qaida-arabic" lang="ar" dir="rtl">أَبْ　اِبْ　اُبْ</p><p>Sukoon marks a consonant without a following short vowel. Join the sounds smoothly without adding an extra vowel.</p></article>
        <article className="qaida-lesson"><span className="qaida-step">Lesson 05</span><h3>Long vowels (Madd)</h3><p className="qaida-arabic" lang="ar" dir="rtl">بَا　بِي　بُو</p><p>Alif, ya and waw can lengthen the matching vowel sound. Practise holding the sound for the correct duration with a teacher.</p></article>
        <article className="qaida-lesson"><span className="qaida-step">Lesson 06</span><h3>Shaddah and joining</h3><p className="qaida-arabic" lang="ar" dir="rtl">رَبَّ　مَدَّ</p><p>Shaddah indicates a doubled consonant. Next, practise joining letters and reading short words without losing each letter’s sound.</p></article>
      </div>
      <div className="qaida-practice"><div><strong>Daily practice</strong><p>Spend 10–15 minutes reviewing a small lesson. Listen, repeat, and ask a qualified Qur’an teacher to correct your makharij (letter articulation) and pronunciation.</p></div><a href="https://quran.com/" target="_blank" rel="noreferrer">Open Qur’an reading practice ↗</a></div>
      <p className="qaida-disclaimer">These are original beginner study notes, not a reproduction of a printed Qaida book and not a substitute for guided recitation. Arabic sounds can differ from their approximate English descriptions.</p>
    </section>
    <section className="quran-reader hadith-reader"><div className="hadith-controls">
      <label htmlFor="hadith-book">Collection</label><select id="hadith-book" value={book} onChange={e=>setBook(e.target.value)}>{books.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select>
      <label htmlFor="hadith-lang">Language</label><select id="hadith-lang" value={lang} onChange={e=>setLang(e.target.value)}><option value="urd">Urdu</option><option value="eng">English</option><option value="ara">Arabic</option></select>
      <label htmlFor="hadith-search">Search text or number</label><input id="hadith-search" type="search" value={query} onChange={e=>{setQuery(e.target.value);setLimit(50);}} placeholder="Search Hadith…"/>
    </div><p className="hadith-count">{loading?"Loading…":filtered.length+" matching narrations · Showing "+Math.min(limit,filtered.length)}</p>
    {loading&&<p className="quran-status">Loading Hadith collection…</p>}{error&&<div className="quran-error" role="alert">{error}</div>}
    {!loading&&!error&&filtered.slice(0,limit).map((h,i)=>{const no=h.hadithnumber??i+1;const ar=lang==="ara"?h.text:arabic[i]?.text;const grades=h.grades?.map(g=>[g.name,g.grade].filter(Boolean).join(": ")).join(" · ");return <article className="hadith-card" key={book+lang+no}><div className="ayah-card-top"><span className="ayah-number">{no}</span><span className="ayah-reference">{bookName}</span></div>{ar&&<p className="hadith-arabic" lang="ar" dir="rtl">{ar}</p>}{lang!=="ara"&&<p className={lang==="urd"?"hadith-translation hadith-urdu":"hadith-translation"} lang={lang==="urd"?"ur":"en"} dir={lang==="urd"?"rtl":"ltr"}>{h.text}</p>}<div className="hadith-meta"><span>Reference: {bookName}, Hadith {no}</span>{grades&&<span>Grade supplied by source: {grades}</span>}</div></article>;})}
    {!loading&&!error&&filtered.length===0&&<p className="quran-status">No matching narrations found.</p>}
    {!loading&&!error&&filtered.length>limit&&<button className="hadith-more" onClick={()=>setLimit(n=>n+50)}>Load 50 more Hadiths</button>}
    <p className="quran-source">Source: fawazahmed0 Hadith API. Text, numbering, and grading are shown as supplied by the source. Not every narration includes a grade. Consult qualified scholars and recognised printed editions for religious rulings.</p></section>
    <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
  </main>;
}