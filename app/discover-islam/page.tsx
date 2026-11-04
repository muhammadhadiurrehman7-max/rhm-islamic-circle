import Link from "next/link";

const topics = [
  { icon: "☪", title: "What is Islam?", description: "Understand Tawheed, worshipping Allah alone, faith, mercy and the purpose of life.", href: "/learn/what-is-islam" },
  { icon: "✦", title: "The Five Pillars of Islam", description: "Explore Shahadah, Salah, Zakah, Sawm and Hajj in five individual explanations.", href: "/learn/five-pillars" },
  { icon: "❖", title: "The Six Articles of Iman", description: "Learn about belief in Allah, angels, revealed books, messengers, the Last Day and Qadar.", href: "/learn/six-articles" },
  { icon: "۞", title: "The Qur’an and Sunnah", description: "Learn what the Qur’an teaches and how the Prophet’s ﷺ example guides Muslim life.", href: "/learn/quran-sunnah" },
  { icon: "♡", title: "Character and daily life", description: "Explore honesty, patience, gratitude, justice, mercy and kindness to others.", href: "/learn/character" }
];

export default function DiscoverIslamPage() {
  return <main className="quran-page discover-islam-page">
    <header className="quran-topbar"><Link className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</Link><Link className="quran-home-link" href="/">Back to home</Link></header>
    <div className="discover-islam-wrap">
      <header className="discover-islam-hero">
        <span className="eyebrow">A guide to the faith</span>
        <h1>Discover Islam</h1>
        <p>Explore the foundations of Muslim belief, worship and character through clear, beginner-friendly lessons. Choose a topic to open its own learning page.</p>
        <span className="discover-islam-arabic" lang="ar" dir="rtl">اِقْرَأْ وَتَعَلَّمْ</span>
      </header>
      <section className="discover-topic-grid" aria-label="Islamic learning topics">
        {topics.map((topic,index)=><article className="discover-topic-card" key={topic.href}>
          <span className="discover-topic-icon">{topic.icon}</span>
          <span className="discover-topic-number">LESSON {String(index+1).padStart(2,"0")}</span>
          <h2>{topic.title}</h2>
          <p>{topic.description}</p>
          <Link href={topic.href}>Explore this topic <span aria-hidden="true">→</span></Link>
        </article>)}
      </section>
      <div className="discover-separate-note"><strong>Separate learning resources:</strong> Hadith collections, beginner’s Qaida lessons and the Islamic Heritage mosque gallery have their own dedicated areas on RHM Islamic Circle.</div>
      <nav className="discover-resource-links" aria-label="Other learning resources">
        <Link href="/hadith">Hadith Library ↗</Link>
        <Link href="/hadith#qaida-lessons">Beginner’s Qaida ↗</Link>
        <Link href="/heritage">Islamic Heritage &amp; Mosques ↗</Link>
        <Link href="/quran">Read the Qur’an ↗</Link>
      </nav>
      <p className="discover-learning-note">These pages provide introductory educational information. For detailed Tafsir, hadith verification and personal religious rulings, consult qualified and trusted scholars.</p>
    </div>
    <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
  </main>;
}
