"use client";

import Link from "next/link";

const steps = [
  { n:"01", title:"Prepare for Salah", detail:"Make sure the prayer time has begun, your body and clothes are clean, the place is clean, and the required parts of the body are covered. Face the Qiblah." },
  { n:"02", title:"Make Wudu when needed", detail:"Begin with Bismillah, wash the hands, rinse the mouth and nose, wash the face, wash the arms including the elbows, wipe the head and ears, and wash the feet including the ankles. Follow the Sunnah sequence and do not waste water." },
  { n:"03", title:"Stand and intend the prayer", detail:"Stand calmly if able. Have the intention in your heart for the specific prayer. A spoken formula is not required." },
  { n:"04", title:"Begin with Takbir", detail:"Raise the hands in the manner taught in the Sunnah and say Allahu Akbar. Place the hands as taught in your school of practice, then recite the opening supplication if you know it, seeking refuge with Allah, Bismillah and Surah al-Fatihah." },
  { n:"05", title:"Recite while standing", detail:"Recite Surah al-Fatihah in each rak'ah. In the first two rak'ahs, add another passage from the Qur'an. Learn slowly, with correct pronunciation; a short surah is enough to begin." },
  { n:"06", title:"Bow — Ruku", detail:"Say Allahu Akbar and bow with hands on the knees and back settled. Say Subhana Rabbiyal- 'Azim. Rise saying Sami' Allahu liman hamidah; while standing say Rabbana wa lakal-hamd." },
  { n:"07", title:"Prostrate — Sujud", detail:"Say Allahu Akbar and prostrate with the forehead and nose, both palms, both knees and toes on the ground. Say Subhana Rabbiyal-A'la. Sit between the two prostrations, ask Allah for forgiveness, then perform the second sujud." },
  { n:"08", title:"Complete the rak'ahs", detail:"Stand for the next rak'ah and repeat the standing, recitation, bowing and two prostrations. In the sitting after the second rak'ah, recite At-Tahiyyat. In the final sitting, add Salawat Ibrahimiyyah and a known supplication." },
  { n:"09", title:"End with Salam", detail:"Turn the head to the right and then left, saying Assalamu 'alaykum wa rahmatullah. Remain calm and do not rush the movements." },
];

const prayers = [
  ["Fajr","2 rak'ahs"],
  ["Dhuhr","4 rak'ahs"],
  ["Asr","4 rak'ahs"],
  ["Maghrib","3 rak'ahs"],
  ["Isha","4 rak'ahs"],
];

const learn = [
  ["Allah is the Greatest","Allahu Akbar","اللّٰهُ أَكْبَرُ"],
  ["Glory be to my Lord, the Most Great","Subhana Rabbiyal-'Azim","سُبْحَانَ رَبِّيَ الْعَظِيمِ"],
  ["Glory be to my Lord, the Most High","Subhana Rabbiyal-A'la","سُبْحَانَ رَبِّيَ الْأَعْلَى"],
  ["Allah hears the one who praises Him","Sami' Allahu liman hamidah","سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ"],
  ["Our Lord, to You is all praise","Rabbana wa lakal-hamd","رَبَّنَا وَلَكَ الْحَمْدُ"],
  ["My Lord, forgive me","Rabbighfir li","رَبِّ اغْفِرْ لِي"],
];

export default function SalahGuidePage() {
  return <main className="salah-guide-page">
    <header className="sg-top"><Link href="/" className="sg-brand"><span>ر</span> RHM Islam 360</Link><Link href="/explore" className="sg-back">← Back to Explore</Link></header>
    <section className="sg-hero">
      <span className="sg-eyebrow">WORSHIP • LEARN • PRACTISE</span>
      <h1>Learn how to pray Salah</h1>
      <p>A clear beginner-friendly guide to preparing for prayer, learning its movements and recitations, and building a steady connection with Allah.</p>
      <div className="sg-actions"><a href="#steps">Step-by-step Salah</a><a href="#rakats">Five daily prayers</a><a href="#recitations">What to learn</a></div>
    </section>
    <section className="sg-section" id="rakats">
      <div className="sg-section-heading"><span>01</span><div><h2>The five daily obligatory prayers</h2><p>These are the obligatory (Fard) rak'ahs. Sunnah and Nafl prayers are additional acts of worship.</p></div></div>
      <div className="sg-prayer-grid">{prayers.map(([name,count])=><article className="sg-prayer-card" key={name}><strong>{name}</strong><span>{count}</span><small>Fard</small></article>)}</div>
      <p className="sg-note">The number of Fard rak'ahs is agreed upon. The arrangement and emphasis of some Sunnah prayers, hand positions, and certain details differ between recognised schools of fiqh. Learn the practical details from a trusted teacher in the school you follow.</p>
    </section>
    <section className="sg-section" id="steps">
      <div className="sg-section-heading"><span>02</span><div><h2>Salah, step by step</h2><p>Move with calmness and understanding. Do not rush from one position to another.</p></div></div>
      <div className="sg-steps">{steps.map(step=><article className="sg-step" key={step.n}><span>{step.n}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></article>)}</div>
    </section>
    <section className="sg-section" id="recitations">
      <div className="sg-section-heading"><span>03</span><div><h2>Words to learn in Salah</h2><p>Start with the short phrases, then learn the full recitations with a teacher and reliable audio.</p></div></div>
      <div className="sg-phrase-list">{learn.map(([meaning,latin,arabic])=><article className="sg-phrase" key={latin}><div><strong>{meaning}</strong><p>{latin}</p></div><span lang="ar" dir="rtl">{arabic}</span></article>)}</div>
      <div className="sg-learn-links"><Link href="/quran">Practise Qur'an recitation →</Link><Link href="/qaida">Learn Arabic letters and pronunciation →</Link><Link href="/duas">Study duas and supplications →</Link></div>
    </section>
    <section className="sg-section">
      <div className="sg-section-heading"><span>04</span><div><h2>Before, during and after prayer</h2><p>Build the knowledge and habits that support a sound and meaningful Salah.</p></div></div>
      <div className="sg-topic-grid">
        <article><h3>Wudu and purification</h3><p>Learn what invalidates Wudu, when Ghusl is required, and how to keep body, clothing and the prayer place clean.</p><Link href="/daily-life">Learn purification →</Link></article>
        <article><h3>Qiblah and prayer times</h3><p>Check your local prayer timetable and direction. Confirm the schedule with your local mosque.</p><Link href="/prayer-times">Open Prayer Times & Azan →</Link></article>
        <article><h3>Khushu — presence of heart</h3><p>Understand the meanings of what you recite, focus on standing before Allah, and gently return your attention when distracted.</p><Link href="/learn">Explore Islamic foundations →</Link></article>
        <article><h3>After Salah</h3><p>Learn authentic remembrances after prayer, make personal dua, and maintain the five daily prayers.</p><Link href="/duas">Browse daily duas →</Link></article>
      </div>
    </section>
    <section className="sg-section sg-warning">
      <h2>Important guidance</h2>
      <ul>
        <li>This is an introductory learning guide, not a fatwa or a substitute for a qualified teacher.</li>
        <li>Some details differ among the Hanafi, Maliki, Shafi'i and Hanbali schools and other recognised scholarly traditions. These differences should be treated respectfully.</li>
        <li>For women and men, the core pillars of Salah are shared; some detailed rulings and practice questions should be learned from a trusted scholar.</li>
        <li>If you are new to Islam or still learning Arabic, learn gradually and ask a qualified teacher to listen to your recitation and correct your movements.</li>
        <li>For illness, travel, missed prayers, menstruation, postnatal bleeding, or other personal circumstances, seek reliable, situation-specific guidance.</li>
      </ul>
    </section>
    <footer className="sg-footer">RHM Islam 360 · Learn carefully, practise sincerely, and ask qualified scholars when unsure.</footer>
    <style jsx global>{`
      .salah-guide-page{min-height:100vh;background:var(--page,#f7f4ec);color:var(--text,#1c2923);padding:0 22px 48px}.sg-top{max-width:1120px;margin:auto;min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:16px}.sg-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit;font-weight:800}.sg-brand span{display:grid;place-items:center;width:34px;height:34px;background:#151b18;color:#e5c27b;border-radius:10px;font-size:22px}.sg-back{color:inherit;text-decoration:none;font-weight:650}.sg-hero{max-width:1120px;margin:18px auto 36px;padding:clamp(28px,6vw,64px);border-radius:26px;background:linear-gradient(135deg,#101b17,#243c30);color:#fff}.sg-eyebrow{font-size:.75rem;letter-spacing:.18em;color:#e7c77f;font-weight:800}.sg-hero h1{font-size:clamp(2.2rem,6vw,4.2rem);line-height:1.08;margin:16px 0}.sg-hero p{max-width:720px;color:#e3e8e3;line-height:1.8;font-size:1.05rem}.sg-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}.sg-actions a,.sg-learn-links a{padding:11px 15px;border-radius:999px;background:#e8c77d;color:#1a241d;text-decoration:none;font-weight:750}.sg-section{max-width:1120px;margin:38px auto}.sg-section-heading{display:flex;gap:16px;align-items:flex-start;margin-bottom:22px}.sg-section-heading>span{color:#a17a32;font-size:1rem;font-weight:900;border:1px solid #cdb77f;border-radius:50%;width:40px;height:40px;display:grid;place-items:center;flex:0 0 auto}.sg-section h2{font-size:clamp(1.45rem,3vw,2rem);margin:0 0 7px}.sg-section-heading p,.sg-step p,.sg-topic-grid p{margin:0;line-height:1.75;color:var(--muted,#58665e)}.sg-prayer-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.sg-prayer-card,.sg-topic-grid article{border:1px solid var(--border,#d9d6cb);background:var(--surface,#fff);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:8px}.sg-prayer-card strong{font-size:1.05rem}.sg-prayer-card span{font-size:1.35rem;font-weight:850;color:#9a742f}.sg-prayer-card small{color:var(--muted,#58665e)}.sg-note{line-height:1.75;color:var(--muted,#58665e);font-size:.92rem;margin-top:15px}.sg-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.sg-step{display:flex;gap:14px;padding:18px;border:1px solid var(--border,#d9d6cb);background:var(--surface,#fff);border-radius:16px}.sg-step>span{font-weight:900;color:#a17a32;font-variant-numeric:tabular-nums}.sg-step h3,.sg-topic-grid h3{margin:0 0 7px;font-size:1.05rem}.sg-phrase-list{display:grid;gap:10px}.sg-phrase{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:17px;border:1px solid var(--border,#d9d6cb);background:var(--surface,#fff);border-radius:14px}.sg-phrase p{margin:6px 0 0;color:var(--muted,#58665e)}.sg-phrase>span{font-size:clamp(1.25rem,3vw,1.8rem);line-height:1.8}.sg-learn-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}.sg-learn-links a{font-size:.9rem}.sg-topic-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.sg-topic-grid a{color:#8a6428;font-weight:750;text-decoration:none;margin-top:5px}.sg-warning{padding:24px;border-radius:18px;background:#efe8d8}.sg-warning h2{margin-bottom:12px}.sg-warning ul{padding-left:22px;line-height:1.85}.sg-footer{max-width:1120px;margin:48px auto 0;padding-top:22px;border-top:1px solid var(--border,#d9d6cb);color:var(--muted,#58665e);font-size:.9rem}
      html[data-site-theme="dark"] .salah-guide-page{background:#101b24;color:#edf2f5;--surface:#192b37;--border:#39505e;--muted:#b5c3cb;--page:#101b24;--text:#edf2f5}html[data-site-theme="dark"] .sg-warning{background:#26342f}html[data-site-theme="dark"] .sg-topic-grid a{color:#e7c77f}
      @media(max-width:760px){.sg-prayer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sg-steps,.sg-topic-grid{grid-template-columns:1fr}.sg-top{min-height:62px}.sg-hero{margin-top:10px}.sg-phrase{align-items:flex-start;flex-direction:column}.sg-phrase>span{align-self:flex-end}.salah-guide-page{padding-left:14px;padding-right:14px}}
    `}</style>
  </main>;
}
