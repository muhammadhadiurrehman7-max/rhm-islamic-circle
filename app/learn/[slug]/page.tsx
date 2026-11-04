"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Lesson = { title: string; subtitle: string; intro: string; sections: { title: string; body: string; reference?: string }[] };

const lessons: Record<string, Lesson> = {
  "five-pillars": {
    title: "The Five Pillars of Islam",
    subtitle: "The foundations of Muslim worship and practice",
    intro: "The Five Pillars are the central acts of worship in Islam. They shape a Muslim’s relationship with Allah and responsibilities towards other people. Each pillar has its own meaning, conditions and practical guidance.",
    sections: [
      { title: "1. Shahadah — testimony of faith", body: "The Shahadah is the declaration that none has the right to be worshipped except Allah, and that Muhammad ﷺ is the Messenger of Allah. It expresses the heart of Islam: worship Allah alone and accept the guidance brought by His Messenger. A Muslim learns its meaning, believes it sincerely and tries to make their actions agree with it.", reference: "Qur’an 47:19" },
      { title: "2. Salah — the five daily prayers", body: "Salah is the prescribed worship performed five times each day: Fajr, Dhuhr, Asr, Maghrib and Isha. Prayer includes purification, facing the Qiblah, standing, recitation, bowing and prostration. It gives structure to the day, remembrance of Allah and a regular opportunity to seek guidance and forgiveness.", reference: "Qur’an 2:43" },
      { title: "3. Zakah — obligatory charity", body: "Zakah is a required act of giving for Muslims whose qualifying wealth reaches the applicable threshold and conditions. It purifies wealth, supports eligible people and strengthens care within the community. The amount, assets and timing depend on Islamic legal rules, so a person should ask a knowledgeable scholar about their own circumstances.", reference: "Qur’an 9:60" },
      { title: "4. Sawm — fasting in Ramadan", body: "Sawm is the fast observed during the month of Ramadan, from dawn until sunset. Muslims abstain from food, drink and other things that invalidate the fast, while also seeking to improve patience, gratitude, self-control, worship and care for others. Islam recognises exemptions and make-up rules for certain circumstances; ask a qualified scholar about individual cases.", reference: "Qur’an 2:183–185" },
      { title: "5. Hajj — pilgrimage to Makkah", body: "Hajj is the pilgrimage to Makkah performed during its prescribed days. It is obligatory once in a lifetime for a Muslim who is physically and financially able and meets its conditions. The rites include entering Ihram, standing at Arafat, and other prescribed acts. Hajj reminds Muslims of devotion to Allah, humility and the unity of believers.", reference: "Qur’an 3:97" }
    ]
  },
  "six-articles": {
    title: "The Six Articles of Iman",
    subtitle: "The essential beliefs of a Muslim",
    intro: "Iman includes belief in the matters taught by Allah and His Messenger. These six articles are commonly taught together as the foundations of Islamic belief.",
    sections: [
      { title: "1. Belief in Allah", body: "Believe that Allah is the one true God, the Creator and Sustainer of everything. He alone deserves worship. Muslims affirm His beautiful names and perfect attributes in a manner befitting Him." },
      { title: "2. Belief in the angels", body: "Believe that angels are created by Allah and obey His commands. They have duties assigned by Allah; examples mentioned in Islamic teaching include Jibril, who brought revelation, and the angels who record deeds." },
      { title: "3. Belief in the revealed books", body: "Believe in the scriptures Allah revealed to His messengers, including the Tawrah, Zabur, Injil and the Qur’an. Muslims believe the Qur’an is Allah’s final revelation and the preserved criterion for guidance." },
      { title: "4. Belief in the messengers", body: "Believe in all messengers sent by Allah, without rejecting any of them. They called people to worship Allah and live by His guidance. Muhammad ﷺ is the final Messenger." },
      { title: "5. Belief in the Last Day", body: "Believe in resurrection, judgement, accountability and the Hereafter. This belief encourages a person to act responsibly, seek forgiveness and remember that worldly life is not the end." },
      { title: "6. Belief in divine decree (Qadar)", body: "Believe that Allah’s knowledge encompasses everything and that nothing occurs outside His will. Muslims still make choices and are accountable for them; belief in Qadar encourages trust in Allah while continuing to do what is right." }
    ]
  },
  "what-is-islam": {
    title: "What is Islam?",
    subtitle: "Worship Allah alone and live by His guidance",
    intro: "Islam is devotion and willing submission to the one God, Allah. Its central message is Tawheed: worship Allah alone, without associating partners with Him, and follow the guidance conveyed by His messengers.",
    sections: [
      { title: "Tawheed — the oneness of Allah", body: "Tawheed means affirming Allah’s oneness and directing worship to Him alone. Surah Al-Ikhlas (Chapter 112) is a concise declaration of Allah’s uniqueness. Read it in the RHM Qur’an reader using the link below.", reference: "Qur’an, Surah Al-Ikhlas (112)" },
      { title: "Faith and worship", body: "Islam teaches belief, prayer, charity, fasting, pilgrimage for those able, remembrance of Allah and seeking beneficial knowledge. Worship is not limited to rituals; sincere good actions can also be acts of worship." },
      { title: "Mercy, justice and responsibility", body: "A Muslim is encouraged to be truthful, fair, patient and merciful, to honour trusts, care for family and neighbours, and avoid harming others. Faith should be reflected in a person’s conduct." }
    ]
  },
  "quran-sunnah": {
    title: "The Qur’an and Sunnah",
    subtitle: "The Qur’an is revelation; the Sunnah shows the Prophetic example",
    intro: "The Qur’an is the holy scripture of Islam, revealed to Prophet Muhammad ﷺ. The Sunnah refers to his teachings and example. Hadith reports preserve accounts of his words, actions and approvals.",
    sections: [
      { title: "The Qur’an", body: "The Qur’an is recited in Arabic and contains guidance about belief, worship, character, history and the Hereafter. Translations help readers understand its meanings, but a translation is not the Arabic Qur’an itself. Read the Arabic text and available translations in the RHM reader." },
      { title: "The Sunnah", body: "The Sunnah explains and demonstrates how the Prophet ﷺ lived and taught. Muslims study it with care, alongside the Qur’an and the explanations of qualified scholars." },
      { title: "How to study", body: "Read regularly, reflect on the meaning, learn the context and ask knowledgeable teachers when something is unclear. Avoid taking a verse or narration out of context." }
    ]
  },
  "character": {
    title: "Character and daily life",
    subtitle: "Let faith be reflected in how you treat others",
    intro: "Islam places great importance on good character. Faith should be visible in honesty, patience, mercy, fairness and fulfilling the rights of other people.",
    sections: [
      { title: "Truthfulness and trust", body: "Speak truthfully, keep promises, return what is entrusted to you and be fair in business and daily dealings." },
      { title: "Kindness to family and neighbours", body: "Show respect and care to parents, relatives, neighbours and people in need. Offer help without humiliating others and treat people with dignity." },
      { title: "Patience and gratitude", body: "Practise patience in hardship and gratitude in ease. Avoid arrogance, mockery, backbiting and causing harm." },
      { title: "Justice and excellence", body: "The Qur’an teaches justice, excellence and generosity, and forbids wrongdoing and oppression.", reference: "Qur’an 16:90" }
    ]
  }
};

export default function LearningTopicPage() {
  const params = useParams<{ slug: string }>();
  const lesson = lessons[params.slug];
  if (!lesson) {
    return <main className="quran-page learning-page"><div className="learning-detail-wrap"><h1>Topic not found</h1><Link href="/quran">Return to RHM Islamic learning</Link></div></main>;
  }
  return (
    <main className="quran-page learning-page">
      <header className="quran-topbar"><Link className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</Link><div className="quran-top-actions"><Link className="quran-home-link" href="/quran">Back to learning centre</Link></div></header>
      <div className="learning-detail-wrap">
        <Link className="learning-back" href="/quran">← All learning topics</Link>
        <header className="learning-detail-heading"><span className="eyebrow">RHM Islamic learning</span><h1>{lesson.title}</h1><p>{lesson.subtitle}</p><div className="learning-intro">{lesson.intro}</div></header>
        <div className="learning-section-grid">
          {lesson.sections.map((section, index) => <article className="learning-section-card" key={section.title}><span className="learning-section-number">{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2><p>{section.body}</p>{section.reference && <span className="learning-reference">Reference: {section.reference}</span>}</article>)}
        </div>
        {params.slug === "what-is-islam" && <div className="learning-next"><Link className="faith-action" href="/quran?surah=112#quran-reader">Read Surah Al-Ikhlas in the RHM Qur’an reader →</Link></div>}
        {params.slug === "quran-sunnah" && <div className="learning-next"><Link className="faith-action" href="/quran#quran-reader">Open the RHM Qur’an reader →</Link><Link className="faith-action" href="/hadith#hadith-reader">Explore the RHM Hadith library →</Link></div>}
        <p className="faith-note"><strong>Learning note:</strong> This page provides introductory educational information, not a personal religious ruling or a complete Tafsir. For detailed rulings and individual circumstances, consult a qualified, trusted scholar.</p>
        <footer className="learning-detail-footer"><Link href="/quran">← Return to RHM Islamic learning</Link></footer>
      </div>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
