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
    <section className="quran-reader hadith-reader" id="hadith-reader"><div className="hadith-controls">
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