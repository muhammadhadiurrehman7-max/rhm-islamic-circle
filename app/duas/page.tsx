"use client";

import { useEffect, useMemo, useState } from "react";

type Dua = {
  id: string;
  title: string;
  category: "Qur'anic duas" | "Prophetic Sunnah";
  sourceType: string;
  narrator?: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  reference: string;
  url: string;
  occasion: string;
  repetition?: string;
  scholarNote?: string;
};

const duas: Dua[] = [
  {
    id: "adam",
    title: "Dua for forgiveness — Prophet Adam عليه السلام",
    category: "Qur'anic duas",
    sourceType: "Words recorded in the Qur'an",
    narrator: "Prophet Adam and his wife عليهما السلام",
    arabic: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakunanna minal-khasirin.",
    english: "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will surely be among the losers.",
    urdu: "اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اور اگر تو ہمیں نہ بخشے اور ہم پر رحم نہ فرمائے تو ہم ضرور نقصان اٹھانے والوں میں سے ہو جائیں گے۔",
    reference: "Qur'an 7:23 — Surah al-A'raf",
    url: "https://quran.com/7/23",
    occasion: "For repentance and seeking Allah's forgiveness."
  },
  {
    id: "musa",
    title: "Dua for ease and clear speech — Prophet Musa عليه السلام",
    category: "Qur'anic duas",
    sourceType: "Words recorded in the Qur'an",
    narrator: "Prophet Musa عليه السلام",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي ۝ وَيَسِّرْ لِي أَمْرِي ۝ وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي ۝ يَفْقَهُوا قَوْلِي",
    transliteration: "Rabbi ishrah li sadri, wa yassir li amri, wahlul 'uqdatan min lisani, yafqahu qawli.",
    english: "My Lord, expand for me my chest, ease my task for me, and untie the knot from my tongue so that they may understand my speech.",
    urdu: "اے میرے رب! میرا سینہ کھول دے، میرا کام آسان فرما، اور میری زبان کی گرہ کھول دے تاکہ لوگ میری بات سمجھ سکیں۔",
    reference: "Qur'an 20:25–28 — Surah Ta-Ha",
    url: "https://quran.com/20/25-28",
    occasion: "A Qur'anic supplication for asking Allah for ease and clarity."
  },
  {
    id: "yunus",
    title: "Dua in distress — Prophet Yunus عليه السلام",
    category: "Qur'anic duas",
    sourceType: "Words recorded in the Qur'an",
    narrator: "Prophet Yunus عليه السلام",
    arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta, subhanaka, inni kuntu minaz-zalimin.",
    english: "There is no deity except You; exalted are You. Indeed, I have been among the wrongdoers.",
    urdu: "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔",
    reference: "Qur'an 21:87 — Surah al-Anbiya",
    url: "https://quran.com/21/87",
    occasion: "The Qur'an records this call of Prophet Yunus in the darkness."
  },
  {
    id: "wake",
    title: "When waking up",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Hudhaifa ibn al-Yaman رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
    english: "All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.",
    urdu: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت جیسی نیند کے بعد زندگی عطا فرمائی، اور اسی کی طرف دوبارہ اٹھ کر جانا ہے۔",
    reference: "Sahih al-Bukhari 6312",
    url: "https://sunnah.com/bukhari:6312",
    occasion: "Upon waking from sleep."
  },
  {
    id: "sleep",
    title: "Before going to sleep",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Hudhaifa ibn al-Yaman رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika amutu wa ahya.",
    english: "In Your name, I die and I live.",
    urdu: "اے اللہ! تیرے ہی نام کے ساتھ میں مرتا اور جیتا ہوں۔",
    reference: "Sahih al-Bukhari 6312",
    url: "https://sunnah.com/bukhari:6312",
    occasion: "When going to bed."
  },
  {
    id: "leaving",
    title: "When leaving home",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Anas ibn Malik رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi, tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    english: "In the name of Allah; I place my trust in Allah. There is no might and no power except through Allah.",
    urdu: "اللہ کے نام سے، میں نے اللہ پر بھروسا کیا۔ اللہ کے سوا نہ کوئی طاقت ہے اور نہ قوت۔",
    reference: "Sunan Abi Dawud 5095",
    url: "https://sunnah.com/abudawud:5095",
    occasion: "When stepping out of the home."
  },
  {
    id: "morning",
    title: "Morning and evening remembrance",
    category: "Prophetic Sunnah",
    sourceType: "Prophetic supplication",
    narrator: "Uthman ibn Affan رضي الله عنه narrated it from the Prophet ﷺ",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-Sami'ul-'Alim.",
    english: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm. He is the All-Hearing, the All-Knowing.",
    urdu: "اللہ کے نام کے ساتھ، جس کے نام کی برکت سے زمین و آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، خوب جاننے والا ہے۔",
    reference: "Sunan Abi Dawud 5088",
    url: "https://sunnah.com/abudawud:5088",
    occasion: "The narration mentions saying it three times in the morning and three times in the evening.",
    repetition: "3 times in the morning and 3 times in the evening.",
    scholarNote: "The Sunnah.com entry records the grading as Sahih by Al-Albani. Grades and numbering can differ between editions."
  }
];


const additionalDuas: Dua[] = [
 { id:"rabbana-201", title:"Good in this life and the next", category:"Qur'anic duas", sourceType:"Words recorded in the Qur'an", narrator:"A supplication taught in the Qur'an", arabic:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", transliteration:"Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.", english:"Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.", urdu:"اے ہمارے رب! ہمیں دنیا میں بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں آگ کے عذاب سے بچا۔", reference:"Qur'an 2:201 — Surah al-Baqarah", url:"https://quran.com/2/201", occasion:"A comprehensive supplication for good in this life and the Hereafter." },
 { id:"steadfast-heart", title:"Dua for steadfastness of the heart", category:"Qur'anic duas", sourceType:"Words recorded in the Qur'an", narrator:"A supplication of the believers", arabic:"رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ", transliteration:"Rabbana la tuzigh qulubana ba'da idh hadaytana wa hab lana min ladunka rahmah, innaka Antal-Wahhab.", english:"Our Lord, do not let our hearts deviate after You have guided us, and grant us mercy from Yourself. You are the Bestower.", urdu:"اے ہمارے رب! ہمیں ہدایت دینے کے بعد ہمارے دلوں کو ٹیڑھا نہ ہونے دے، اور ہمیں اپنے پاس سے رحمت عطا فرما۔ بے شک تو بہت عطا فرمانے والا ہے۔", reference:"Qur'an 3:8 — Surah Aal 'Imran", url:"https://quran.com/3/8", occasion:"Ask Allah to keep the heart firm upon guidance." },
 { id:"family-prayer", title:"Dua for a righteous family", category:"Qur'anic duas", sourceType:"Words recorded in the Qur'an", narrator:"Supplication of the servants of the Most Merciful", arabic:"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", transliteration:"Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.", english:"Our Lord, grant us from our spouses and offspring comfort to our eyes and make us an example for the righteous.", urdu:"اے ہمارے رب! ہمیں ہماری بیویوں اور اولاد سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔", reference:"Qur'an 25:74 — Surah al-Furqan", url:"https://quran.com/25/74", occasion:"For a family grounded in faith, goodness and righteousness." },
 { id:"enter-mosque", title:"When entering the mosque", category:"Prophetic Sunnah", sourceType:"Prophetic supplication", narrator:"Abu Humayd or Abu Usayd رضي الله عنهما narrated it from the Prophet ﷺ", arabic:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", transliteration:"Allahumma-ftah li abwaba rahmatik.", english:"O Allah, open for me the gates of Your mercy.", urdu:"اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔", reference:"Sahih Muslim 713", url:"https://sunnah.com/muslim:713", occasion:"Upon entering the mosque." },
 { id:"leave-mosque", title:"When leaving the mosque", category:"Prophetic Sunnah", sourceType:"Prophetic supplication", narrator:"Abu Humayd or Abu Usayd رضي الله عنهما narrated it from the Prophet ﷺ", arabic:"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", transliteration:"Allahumma inni as'aluka min fadlik.", english:"O Allah, I ask You for Your favour.", urdu:"اے اللہ! میں تجھ سے تیرا فضل مانگتا ہوں۔", reference:"Sahih Muslim 713", url:"https://sunnah.com/muslim:713", occasion:"Upon leaving the mosque." },
 { id:"after-wudu", title:"After completing Wudu", category:"Prophetic Sunnah", sourceType:"Prophetic remembrance", narrator:"Umar ibn al-Khattab رضي الله عنه narrated it from the Prophet ﷺ", arabic:"أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", transliteration:"Ash-hadu an la ilaha illallahu wahdahu la sharika lah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh.", english:"I bear witness that none has the right to be worshipped except Allah alone, with no partner, and I bear witness that Muhammad is His servant and Messenger.", urdu:"میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود برحق نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔", reference:"Sahih Muslim 234", url:"https://sunnah.com/muslim:234", occasion:"After completing Wudu." },
 { id:"after-salah", title:"Remembrance after the obligatory prayer", category:"Prophetic Sunnah", sourceType:"Prophetic remembrance", narrator:"Thawban رضي الله عنه narrated it from the Prophet ﷺ", arabic:"أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", transliteration:"Astaghfirullah (three times). Allahumma Antas-Salam wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.", english:"I seek Allah's forgiveness (three times). O Allah, You are Peace and from You is peace. Blessed are You, O Possessor of majesty and honour.", urdu:"میں اللہ سے بخشش مانگتا ہوں (تین مرتبہ)۔ اے اللہ! تو سلامتی والا ہے اور تیری ہی طرف سے سلامتی ہے۔ اے عظمت اور بزرگی والے! تو بابرکت ہے۔", reference:"Sahih Muslim 591", url:"https://sunnah.com/muslim:591", occasion:"After completing the obligatory prayer." }
];

export default function DailyDuasPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState<"both" | "en" | "ur">("both");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const syncTheme = () => {
      const saved = window.localStorage.getItem("rhm-site-theme") ?? window.localStorage.getItem("rhm-quran-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
      setThemeReady(true);
    };
    syncTheme();
    window.addEventListener("rhm-theme-change", syncTheme);
    return () => window.removeEventListener("rhm-theme-change", syncTheme);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.dataset.siteTheme = theme;
    document.documentElement.dataset.quranTheme = theme;
    window.localStorage.setItem("rhm-site-theme", theme);
    window.localStorage.setItem("rhm-quran-theme", theme);
    window.dispatchEvent(new CustomEvent("rhm-theme-change", { detail: theme }));
  }, [theme, themeReady]);
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return [...duas, ...additionalDuas].filter((dua) => {
      const categoryMatch = category === "All" || dua.category === category;
      const textMatch = !q || [dua.title, dua.arabic, dua.transliteration, dua.english, dua.urdu, dua.reference, dua.narrator ?? ""].some((part) => part.toLocaleLowerCase().includes(q));
      return categoryMatch && textMatch;
    });
  }, [query, category]);

  return (
    <main className="quran-page duas-page" data-theme={theme}>
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</a>
        <div className="quran-top-actions"><a className="quran-home-link" href="/hadith">Hadith library</a><a className="quran-home-link" href="/">Home</a></div>
      </header>
      <section className="quran-heading">
        <div className="eyebrow">Daily remembrance & supplications</div>
        <h1>Daily Duas</h1>
        <p>Study supplications from the Qur'an and Prophetic Sunnah, with Arabic, transliteration, Urdu and English meanings, narrators and source references.</p>
      </section>
      <nav className="learning-space-nav" aria-label="Explore learning spaces"><a href="/quran">Qur’an</a><a href="/hadith">Hadith</a><a href="/qaida">Qaida</a><a href="/duas" aria-current="page">Daily Duas</a><a href="/learn">Discover Islam</a><a href="/daily-life">Daily Life</a></nav>
      <section className="quran-reader duas-reader">
        <div className="duas-intro"><strong>Learn one dua at a time.</strong><p>Use the search to find a dua by occasion, Prophet's name, Companion narrator, words or exact reference such as 6312.</p></div>
        <div className="duas-controls">
          <label htmlFor="duas-search">Search duas or references</label>
          <input id="duas-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: sleep, Musa, 6312, forgiveness…" />
          <label htmlFor="duas-category">Browse by source</label>
          <select id="duas-category" value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Qur'anic duas</option><option>Prophetic Sunnah</option></select>
          <label htmlFor="duas-language">Meaning language</label>
          <select id="duas-language" value={language} onChange={(event) => { const value = event.target.value; if (value === "both" || value === "en" || value === "ur") setLanguage(value); }}><option value="both">Urdu + English</option><option value="ur">Urdu</option><option value="en">English</option></select>
        </div>
        <p className="duas-count" aria-live="polite">{filtered.length} supplications found</p>
        {filtered.map((dua) => <article className="dua-card" key={dua.id}>
          <div className="dua-card-top"><span className="dua-category">{dua.category}</span><span className="dua-origin">{dua.sourceType}</span></div>
          <h2>{dua.title}</h2>
          <p className="dua-arabic" lang="ar" dir="rtl">{dua.arabic}</p>
          <p className="dua-transliteration">{dua.transliteration}</p>
          {(language === "both" || language === "en") && <p className="dua-meaning"><strong>Meaning (English)</strong>{dua.english}</p>}
          {(language === "both" || language === "ur") && <p className="dua-meaning dua-meaning-ur" lang="ur" dir="rtl"><strong>مفہوم (اردو)</strong>{dua.urdu}</p>}
          <div className="dua-meta"><span>{dua.narrator ?? dua.sourceType}</span><span>{dua.reference}</span></div>
          {dua.repetition && <p className="dua-repetition">{dua.repetition}</p>}
          <p className="dua-occasion">{dua.occasion}</p>
          {dua.scholarNote && <p className="dua-scholar-note">Scholarly grading note: {dua.scholarNote}</p>}
          <a className="dua-source-link" href={dua.url} target="_blank" rel="noreferrer">Open source reference ↗</a>
        </article>)}
        {filtered.length === 0 && <p className="quran-status">No duas matched. Try a shorter search or choose All sources.</p>}
      </section>
      <section className="duas-editorial-note">
        <h2>How references are presented</h2>
        <p><strong>Prophets:</strong> Qur'anic supplications are identified by the Prophet named in the passage and the exact Surah and ayah range.</p>
        <p><strong>Companions:</strong> When a Companion narrates a Prophetic dua, the Companion is labelled as the narrator. The wording is not incorrectly attributed to the Companion as its author.</p>
        <p><strong>Scholars:</strong> Scholars are cited for grading or explanation where a source records their view. A scholar's personal wording is not labelled as Prophetic Sunnah. Future scholar quotations should include the original book and page or a verifiable edition.</p>
        <p className="duas-caution">Translations are meanings to help learning; the Arabic Qur'anic and Hadith wording is the source text. Hadith grading can vary by scholar and edition. This page is educational, not a fatwa.</p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islam 360 · Learn, verify and practise with care.</footer>
    </main>
  );
}
