import Link from "next/link";

const topics = [
  { icon:"☪", title:"What is Islam?", text:"Understand Tawheed, faith, worship, mercy and the purpose of Islam.", href:"/learn/what-is-islam", label:"Explore Islam" },
  { icon:"✦", title:"The Five Pillars of Islam", text:"Learn about Shahadah, Salah, Zakah, Sawm and Hajj through individual explanations.", href:"/learn/five-pillars", label:"Explore the five pillars" },
  { icon:"❖", title:"The Six Articles of Iman", text:"Explore the six essential beliefs of a Muslim, each explained separately.", href:"/learn/six-articles", label:"Explore the articles of faith" },
  { icon:"۞", title:"The Qur’an and Sunnah", text:"Learn about the Qur’an, the Prophetic example and responsible study.", href:"/learn/quran-sunnah", label:"Explore Qur’an and Sunnah" },
  { icon:"♡", title:"Character and daily life", text:"Explore honesty, patience, mercy, family rights, justice and kindness.", href:"/learn/character", label:"Explore good character" }
];

export default function DiscoverIslamPage() {
  return <main className="quran-page discover-islam-page">
    <header className="quran-topbar"><Link className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</Link><Link className="quran-home-link" href="/">Back to home</Link></header>
    <div className="discover-islam-wrap">
      <header className="discover-islam-hero">
        <span className="eyebrow">A guide to the faith</span>
        <h1>Discover Islam</h1>
        <p>Explore the foundations of Muslim belief, worship, character and the place of the Qur’an and Sunnah in everyday life. Choose a subject to open a dedicated learning page.</p>
        <span className="discover-islam-arabic" lang="ar" dir="rtl">اِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</span>
        <span className="discover-islam-reference">“Read in the name of your Lord who created.” — Qur’an 96:1</span>
      </header>
      <div className="discover-islam-grid">
        {topics.map((topic,index)=><article className="discover-topic-card" key={topic.href}>
          <span className="discover-topic-icon">{topic.icon}</span><span className="discover-topic-number">TOPIC {String(index+1).padStart(2,"0")}</span>
          <h2>{topic.title}</h2><p>{topic.text}</p><Link href={topic.href}>{topic.label} →</Link>
        </article>)}
      </div>
      <div className="discover-other-resources"><h2>Explore other RHM learning spaces</h2><div className="discover-other-grid">
        <Link href="/quran"><strong>Qur’an Reader</strong><span>Read and listen to the Qur’an →</span></Link>
        <Link href="/hadith"><strong>Hadith Library</strong><span>Browse Hadith collections →</span></Link>
        <Link href="/hadith#qaida-lessons"><strong>Beginner’s Qaida</strong><span>Learn Arabic reading basics →</span></Link>
        <Link href="/heritage"><strong>Islamic Heritage</strong><span>Explore historic mosques →</span></Link>
      </div></div>
      <p className="discover-islam-note">These pages offer introductory educational information, not personal religious rulings or a complete Tafsir. For detailed explanations and individual circumstances, consult a qualified, trusted scholar.</p>
    </div>
    <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
  </main>;
}
