import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Islamic Events & Special Days",
  description: "A source-conscious guide to Ramadan, Eid, Hajj, the sacred months and important days in the Islamic year.",
};

const events = [
  {
    period: "Throughout the year",
    title: "The four sacred months",
    date: "Dhul-Qa'dah, Dhul-Hijjah, Muharram and Rajab",
    summary: "Allah identifies four months as sacred. Muslims are taught to respect their sanctity and avoid wrongdoing.",
    practice: "Increase in good deeds, repentance and care for others. Do not invent a special prayer or ritual without evidence.",
    source: "Qur'an 9:36; Sahih al-Bukhari 4662",
    links: [{ label: "Qur'an 9:36", href: "https://quran.com/9/36" }, { label: "Hadith 4662", href: "https://sunnah.com/bukhari:4662" }],
  },
  {
    period: "1 Muharram",
    title: "Islamic New Year",
    date: "Beginning of the Hijri year",
    summary: "The Hijri calendar begins with Muharram, one of the four sacred months. The calendar recalls the Hijrah as the historical reference for its era.",
    practice: "Reflect, renew good intentions and continue established acts of worship. There is no specifically prescribed New Year prayer or celebration established by an authentic text.",
    source: "Qur'an 9:36; Sahih al-Bukhari 4662",
    links: [{ label: "Qur'an 9:36", href: "https://quran.com/9/36" }, { label: "Hadith 4662", href: "https://sunnah.com/bukhari:4662" }],
  },
  {
    period: "9 and 10 Muharram (and/or 10 and 11)",
    title: "Day of Ashura",
    date: "10 Muharram",
    summary: "The Prophet ﷺ fasted on Ashura and explained that it is a day on which Allah saved Musa (Moses) and his people. He expressed the intention to fast the ninth as well.",
    practice: "Fasting on the 10th is established in authentic Hadith. Many scholars recommend adding the 9th or 11th to distinguish the fast; check the guidance followed by your trusted scholar.",
    source: "Sahih Muslim 1134; Sahih al-Bukhari 2004",
    links: [{ label: "Muslim 1134", href: "https://sunnah.com/muslim:1134" }, { label: "Bukhari 2004", href: "https://sunnah.com/bukhari:2004" }],
  },
  {
    period: "Throughout Rabi al-Awwal",
    title: "Seerah and the Prophet’s ﷺ life",
    date: "The Prophet’s exact birth date is historically disputed",
    summary: "Rabi al-Awwal is associated in historical biographies with the Prophet’s ﷺ birth and his passing. Reports differ about the exact birth date, so a particular day should not be presented as certain.",
    practice: "Study the Seerah from reliable sources, send blessings upon the Prophet ﷺ, and follow his established Sunnah. Historical remembrance should not be confused with a universally prescribed religious festival.",
    source: "Qur'an 33:56; consult recognised Seerah scholarship for historical chronology",
    links: [{ label: "Qur'an 33:56", href: "https://quran.com/33/56" }],
  },
  {
    period: "Rajab",
    title: "Isra’ and Mi‘raj",
    date: "Exact date is not established with certainty",
    summary: "The Qur’an refers to the Night Journey in Surah Al-Isra. Reports about the exact calendar date vary, and the commonly circulated date is not decisively established.",
    practice: "Learn the Qur’anic account and the place of Salah in the Prophet’s ﷺ teaching. Avoid claiming a specific date or special ritual is obligatory or authentically prescribed without evidence.",
    source: "Qur'an 17:1",
    links: [{ label: "Qur'an 17:1", href: "https://quran.com/17/1" }],
  },
  {
    period: "Sha‘ban",
    title: "Preparing for Ramadan",
    date: "The month before Ramadan",
    summary: "Authentic reports describe the Prophet ﷺ fasting frequently in Sha‘ban. It is a useful time to prepare for Ramadan with steady worship.",
    practice: "Build a manageable Qur’an and prayer routine, make up any outstanding obligatory fasts where applicable, and seek reliable guidance on individual circumstances. Do not attribute unverified special-night rituals to the Prophet ﷺ.",
    source: "Sahih al-Bukhari 1969; Sahih Muslim 1156",
    links: [{ label: "Bukhari 1969", href: "https://sunnah.com/bukhari:1969" }, { label: "Muslim 1156", href: "https://sunnah.com/muslim:1156" }],
  },
  {
    period: "Ramadan",
    title: "The month of Ramadan",
    date: "9th month of the Hijri calendar",
    summary: "Ramadan is the month in which the Qur’an was revealed as guidance. Fasting during the month is an obligation for eligible Muslims, with exemptions and rulings explained in Islamic law.",
    practice: "Fast according to the Qur’an and Sunnah, guard your conduct, pray, give charity and read the Qur’an. Those who are ill, travelling, pregnant, nursing or otherwise affected should seek qualified advice about their circumstances.",
    source: "Qur'an 2:183–185",
    links: [{ label: "Qur'an 2:183–185", href: "https://quran.com/2/183-185" }],
  },
  {
    period: "Last ten nights of Ramadan",
    title: "Laylat al-Qadr",
    date: "Seek it in the odd-numbered nights of the last ten nights",
    summary: "The Qur’an describes the Night of Decree as better than a thousand months. The Prophet ﷺ instructed believers to seek it in the last ten nights, especially the odd nights.",
    practice: "Increase prayer, Qur’an, remembrance and supplication. A well-known supplication taught by the Prophet ﷺ is: Allahumma innaka ‘afuwwun tuhibbul-‘afwa fa‘fu ‘anni.",
    source: "Qur'an 97:1–5; Sahih al-Bukhari 2017; Jami‘ at-Tirmidhi 3513",
    links: [{ label: "Surah Al-Qadr", href: "https://quran.com/97" }, { label: "Bukhari 2017", href: "https://sunnah.com/bukhari:2017" }, { label: "Tirmidhi 3513", href: "https://sunnah.com/tirmidhi:3513" }],
  },
  {
    period: "1 Shawwal",
    title: "Eid al-Fitr",
    date: "First day of Shawwal",
    summary: "Eid al-Fitr marks the completion of Ramadan. Muslims gather for the Eid prayer and share gratitude and joy.",
    practice: "Pay Zakat al-Fitr before the Eid prayer according to the applicable rulings; attend the prayer, exchange greetings and show kindness. Fasting is not observed on the day of Eid.",
    source: "Sahih al-Bukhari 1503; Sahih Muslim 884",
    links: [{ label: "Bukhari 1503", href: "https://sunnah.com/bukhari:1503" }, { label: "Muslim 884", href: "https://sunnah.com/muslim:884" }],
  },
  {
    period: "First ten days of Dhul-Hijjah",
    title: "The best days for righteous deeds",
    date: "1–10 Dhul-Hijjah",
    summary: "Hadith reports give special virtue to righteous deeds during the first ten days of Dhul-Hijjah.",
    practice: "Increase prayer, charity, Qur’an, remembrance and other good deeds. The prescribed Hajj rites take place in this season.",
    source: "Sahih al-Bukhari 969",
    links: [{ label: "Bukhari 969", href: "https://sunnah.com/bukhari:969" }],
  },
  {
    period: "9 Dhul-Hijjah",
    title: "Day of Arafah",
    date: "9 Dhul-Hijjah",
    summary: "The standing at Arafah is a central pillar of Hajj. For those not performing Hajj, fasting on this day is strongly recommended in the Sunnah.",
    practice: "Pilgrims follow the rites and guidance of their Hajj authorities. For non-pilgrims, the fast is reported to expiate the sins of the previous and coming year.",
    source: "Sahih Muslim 1162; Qur'an 2:197",
    links: [{ label: "Muslim 1162", href: "https://sunnah.com/muslim:1162" }, { label: "Qur'an 2:197", href: "https://quran.com/2/197" }],
  },
  {
    period: "10 Dhul-Hijjah",
    title: "Eid al-Adha",
    date: "10 Dhul-Hijjah",
    summary: "Eid al-Adha recalls the devotion and obedience shown by Ibrahim (Abraham) and his family. The Qur’an teaches that it is piety, not the meat or blood, that reaches Allah.",
    practice: "Attend the Eid prayer and, for those who are able and meet the conditions, offer the sacrifice according to recognised rulings. Share with family, neighbours and people in need.",
    source: "Qur'an 22:34–37; Sahih al-Bukhari 5558",
    links: [{ label: "Qur'an 22:34–37", href: "https://quran.com/22/34-37" }, { label: "Bukhari 5558", href: "https://sunnah.com/bukhari:5558" }],
  },
  {
    period: "11–13 Dhul-Hijjah",
    title: "Days of Tashriq",
    date: "11th, 12th and 13th Dhul-Hijjah",
    summary: "These are days of eating, drinking and remembering Allah. They are connected with the days following Eid al-Adha and the Hajj rites.",
    practice: "Continue remembrance and gratitude. Fasting these days is generally prohibited, with a specific exception reported for certain pilgrims who cannot find a sacrificial offering; consult a qualified scholar for the ruling.",
    source: "Sahih Muslim 1141; Qur'an 2:203",
    links: [{ label: "Muslim 1141", href: "https://sunnah.com/muslim:1141" }, { label: "Qur'an 2:203", href: "https://quran.com/2/203" }],
  },
];

export default function IslamicEventsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="RHM Islam 360 home"><span className={styles.mark}>ر</span><span><strong>RHM Islam 360</strong><small>Rehmat • Hidayat • Ma’rifat</small></span></a>
        <nav aria-label="Main navigation"><a href="/">Home</a><a href="/quran">Qur’an</a><a href="/islamic-calendar">Calendar</a><a href="/explore">Explore all</a></nav>
      </header>

      <section className={styles.hero}>
        <span className={styles.eyebrow}>THE HIJRI YEAR · LEARN WITH SOURCES</span>
        <h1>Islamic Events &amp; Special Days</h1>
        <p>A calm, source-conscious guide to important months, days and seasons in the Islamic year—what they mean, what is established, and how to make the most of them.</p>
        <div className={styles.notice}><strong>Dates in Pakistan can vary.</strong> Hijri dates shown by calculated calendars are estimates. Ramadan, Eid and other month-dependent observances should be confirmed through the recognised local moon-sighting announcement, including Pakistan’s Central Ruet-e-Hilal Committee.</div>
      </section>

      <section className={styles.intro}>
        <h2>How to use this guide</h2>
        <p>Read the significance and practical guidance for each occasion, then open the Qur’an or Hadith reference. Translations communicate meanings; consult the Arabic source and qualified scholars for detailed rulings. Where a date is disputed or not firmly established, this guide says so.</p>
        <div className={styles.quick}><a href="/islamic-calendar">Open Hijri calendar <span>↗</span></a><a href="/duas">Daily Duas <span>↗</span></a><a href="/hadith">Hadith library <span>↗</span></a></div>
      </section>

      <section className={styles.events} aria-label="Islamic events through the Hijri year">
        {events.map((event, index) => (
          <article className={styles.event} key={event.title}>
            <div className={styles.eventTop}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><div><p className={styles.period}>{event.period}</p><h2>{event.title}</h2><p className={styles.date}>{event.date}</p></div></div>
            <p>{event.summary}</p>
            <div className={styles.practice}><strong>What to learn or practise</strong><p>{event.practice}</p></div>
            <div className={styles.sources}><strong>References:</strong> <span>{event.source}</span><div>{event.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></div>
          </article>
        ))}
      </section>

      <section className={styles.note}>
        <h2>Important note on religious dates and differences</h2>
        <p>Islamic dates begin at sunset and depend on the beginning of each lunar month. Calculated calendars can differ from local moon-sighting decisions by a day or more. Some historical dates and optional practices are also subject to scholarly disagreement. This guide distinguishes established Qur’an and Hadith evidence from historical reports; it is educational, not a fatwa. For personal rulings, follow a trusted qualified scholar and the recognised authority in your area.</p>
      </section>
      <footer className={styles.footer}><a href="/">RHM Islam 360</a><span>Rehmat • Hidayat • Ma’rifat</span><a href="/islamic-calendar">Hijri calendar</a></footer>
    </main>
  );
}
