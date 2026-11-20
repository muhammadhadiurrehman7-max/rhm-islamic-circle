"use client";

const plan = [
  {
    day: "Monday",
    title: "Seek Allah’s forgiveness",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah.",
    english: "I seek the forgiveness of Allah.",
    urdu: "میں اللہ سے بخشش طلب کرتا ہوں۔",
    guidance: "The Prophet ﷺ said that he sought Allah’s forgiveness and turned to Him in repentance one hundred times a day. This is a daily practice in the narration, not a Monday-only Sunnah.",
    reference: "Sahih Muslim 2702",
    url: "https://sunnah.com/muslim:2702",
    count: "The narration mentions 100 times a day."
  },
  {
    day: "Tuesday",
    title: "Glorify and praise Allah",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi.",
    english: "Glory and praise be to Allah.",
    urdu: "اللہ پاک ہے اور تمام تعریف اسی کے لیے ہے۔",
    guidance: "A concise remembrance that combines glorifying Allah and praising Him.",
    reference: "Sahih al-Bukhari 6405",
    url: "https://sunnah.com/bukhari:6405",
    count: "The narration mentions 100 times in a day."
  },
  {
    day: "Wednesday",
    title: "Remembrance after the obligatory prayers",
    arabic: "سُبْحَانَ اللَّهِ · الْحَمْدُ لِلَّهِ · اللَّهُ أَكْبَرُ",
    transliteration: "SubhanAllah · Alhamdulillah · Allahu Akbar.",
    english: "Glory be to Allah · All praise is for Allah · Allah is the Greatest.",
    urdu: "اللہ پاک ہے · تمام تعریف اللہ کے لیے ہے · اللہ سب سے بڑا ہے۔",
    guidance: "The cited narration describes saying SubhanAllah 33 times, Alhamdulillah 33 times and Allahu Akbar 33 times after each prayer, then completing the hundred with the statement of tawhid recorded in the narration.",
    reference: "Sahih Muslim 597",
    url: "https://sunnah.com/muslim:597",
    count: "33 + 33 + 33, followed by the completion described in the hadith."
  },
  {
    day: "Thursday",
    title: "Remember Allah with the words of tawhid",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illAllahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ‘ala kulli shay’in qadir.",
    english: "There is no god worthy of worship except Allah alone, with no partner. To Him belongs the dominion and praise, and He has power over all things.",
    urdu: "اللہ کے سوا کوئی معبودِ برحق نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔ بادشاہی اسی کی ہے، تعریف اسی کے لیے ہے اور وہ ہر چیز پر قادر ہے۔",
    guidance: "This is a complete remembrance of Allah’s oneness and sovereignty.",
    reference: "Sahih al-Bukhari 6403",
    url: "https://sunnah.com/bukhari:6403",
    count: "The narration mentions 100 times in a day."
  },
  {
    day: "Friday",
    title: "Send blessings upon the Prophet ﷺ",
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
    transliteration: "Allahumma salli ‘ala Muhammad wa ‘ala ali Muhammad.",
    english: "O Allah, send Your blessings upon Muhammad and the family of Muhammad.",
    urdu: "اے اللہ! محمد ﷺ اور آلِ محمد پر رحمتیں نازل فرما۔",
    guidance: "Send blessings upon the Prophet ﷺ. The Prophet ﷺ encouraged increasing salawat upon him on Friday. This short wording is a brief form; the complete Salat Ibrahimiyyah is also taught in authentic narrations.",
    reference: "Sunan Abi Dawud 1047; wording also appears in Sahih al-Bukhari 3370",
    url: "https://sunnah.com/abudawud:1047",
    count: "No fixed number is assigned here."
  },
  {
    day: "Saturday",
    title: "Morning and evening protection",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma‘asmihi shay’un fil-ardi wa la fis-sama’i wa huwas-Sami‘ul-‘Alim.",
    english: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm; He is the All-Hearing, the All-Knowing.",
    urdu: "اللہ کے نام کے ساتھ، جس کے نام کی برکت سے زمین و آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، خوب جاننے والا ہے۔",
    guidance: "The narration mentions this supplication in the morning and evening.",
    reference: "Sunan Abi Dawud 5088",
    url: "https://sunnah.com/abudawud:5088",
    count: "3 times in the morning and 3 times in the evening."
  },
  {
    day: "Sunday",
    title: "A treasure from the treasures of Paradise",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah.",
    english: "There is no power and no strength except through Allah.",
    urdu: "اللہ کے سوا نہ کسی میں طاقت ہے نہ قوت۔",
    guidance: "The Prophet ﷺ described these words as a treasure from the treasures of Paradise.",
    reference: "Sahih al-Bukhari 6384",
    url: "https://sunnah.com/bukhari:6384",
    count: "No fixed number is assigned here."
  }
];

export default function WeeklyZikrPage() {
  return (
    <main className="quran-page weekly-zikr-page">
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</a>
        <div className="quran-top-actions"><a className="quran-home-link" href="/duas">Daily Duas</a><a className="quran-home-link" href="/">Home</a></div>
      </header>
      <section className="quran-heading">
        <div className="eyebrow">Remember Allah throughout the week</div>
        <h1>Weekly Zikr</h1>
        <p>A calm seven-day learning plan for authentic words of remembrance. Read the Arabic, learn its meaning and open the original source reference.</p>
      </section>
      <nav className="learning-space-nav" aria-label="Explore learning spaces">
        <a href="/quran">Qur’an</a><a href="/hadith">Hadith</a><a href="/duas">Daily Duas</a><a href="/weekly-zikr" aria-current="page">Weekly Zikr</a><a href="/prayer-times">Prayer Times</a><a href="/daily-life">Daily Life</a>
      </nav>
      <section className="quran-reader weekly-zikr-reader">
        <div className="duas-intro">
          <strong>One remembrance to study each day.</strong>
          <p>This is an optional way to organise learning across the week. The weekdays are not special religious timings for these adhkar unless a source explicitly says so. Follow the counts only where the cited narration mentions them; otherwise, no number is prescribed here.</p>
        </div>
        <div className="weekly-zikr-list">
          {plan.map((item, index) => (
            <article className="dua-card weekly-zikr-card" key={item.day}>
              <div className="dua-card-top"><span className="dua-category">{item.day}</span><span className="dua-origin">Weekly learning plan · {String(index + 1).padStart(2, "0")}/07</span></div>
              <h2>{item.title}</h2>
              <p className="dua-arabic" lang="ar" dir="rtl">{item.arabic}</p>
              <p className="dua-transliteration">{item.transliteration}</p>
              <p className="dua-meaning"><strong>Meaning (English)</strong>{item.english}</p>
              <p className="dua-meaning dua-meaning-ur" lang="ur" dir="rtl"><strong>مفہوم (اردو)</strong>{item.urdu}</p>
              <p className="dua-occasion">{item.guidance}</p>
              <p className="dua-repetition">{item.count}</p>
              <div className="dua-meta"><span>Source reference</span><span>{item.reference}</span></div>
              <a className="dua-source-link" href={item.url} target="_blank" rel="noreferrer">Open source reference ↗</a>
            </article>
          ))}
        </div>
      </section>
      <section className="duas-editorial-note">
        <h2>Accuracy and respectful practice</h2>
        <p>Arabic wording and references are provided so readers can verify the source. Translations are meanings, not replacements for the Arabic. Hadith numbering and grading can vary by edition and scholar.</p>
        <p>Do not treat this weekly arrangement as a new Sunnah, or as a guarantee of a particular result. For religious rulings or disputed narrations, consult a qualified scholar.</p>
        <p><a href="/duas">Explore Daily Duas ↗</a> · <a href="/worship-tracker">Open your private worship checklist ↗</a></p>
      </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islam 360 · Remember Allah with sincerity and consistency.</footer>
    </main>
  );
}
