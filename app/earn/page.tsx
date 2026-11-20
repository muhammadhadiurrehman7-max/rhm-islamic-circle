import Link from "next/link";
import styles from "./page.module.css";

const programmes = [
  { icon: "۞", title: "Qur’an Academy", status: "Learning pathway available", description: "Explore Qur’an reading, Qaida, Tajweed foundations and guided learning. Paid teacher-led classes may be introduced after teacher verification and booking/payment setup.", href: "/academy", action: "Explore the Academy" },
  { icon: "✦", title: "Structured Islamic courses", status: "Planned", description: "Future courses may include Arabic foundations, Qur’an studies and carefully sourced introductory Islamic learning, with clear course outlines and qualified instructors.", href: "/academy", action: "View learning pathways" },
  { icon: "▤", title: "Books & publications", status: "Planned", description: "Discover original RHM study guides and properly licensed publications. Copyright, author permissions and accurate references will be checked before anything is offered for sale.", href: "/explore", action: "Explore resources" },
  { icon: "♡", title: "Voluntary support", status: "Not accepting payments yet", description: "Support may help cover hosting, accessibility, app development and free learning resources. No payment details are being collected on this page.", href: "/donate", action: "Read the support information" },
  { icon: "◈", title: "RHM supporter membership", status: "Planned", description: "An optional membership may offer extra study sessions and downloadable learning materials. Essential Qur’an, Hadith and core learning resources will remain free.", href: "/academy", action: "Explore free learning" },
  { icon: "◎", title: "Ethical advertising", status: "Subject to platform approval", description: "If introduced, advertising will be limited, clearly identifiable and kept away from Qur’an text, recitation controls and other sensitive learning moments.", href: "/learn", action: "Our learning approach" },
  { icon: "⌂", title: "Institutional partnerships", status: "Partnership enquiries", description: "We welcome appropriate educational collaborations with reputable institutions, publishers and qualified teachers. Sponsorships will be disclosed transparently.", href: "mailto:hello@rhm-islamic-circle.vercel.app", action: "Make an enquiry" },
];

export const metadata = {
  title: "Support & Learning | Earn Centre",
  description: "Explore RHM Islam 360 learning programmes, publications, voluntary support and future partnerships.",
};

export default function EarnPage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link className={styles.brand} href="/"><span>ر</span> RHM Islam 360</Link>
        <nav aria-label="Page navigation">
          <Link href="/">Home</Link>
          <Link href="/academy">Academy</Link>
          <Link href="/donate">Support</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.ornament} aria-hidden="true">۞</div>
        <p className={styles.eyebrow}>LEARN · SUPPORT · GROW TOGETHER</p>
        <h1>Support a growing world of <em>beneficial knowledge</em></h1>
        <p className={styles.intro}>RHM Islam 360 aims to keep essential Islamic knowledge freely accessible while building sustainable educational services. Explore the programmes and ways to support the project.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/academy">Explore free learning ↗</Link>
          <Link className={styles.secondary} href="/donate">Support information</Link>
        </div>
        <p className={styles.promise}>The Qur’an, essential Hadith access and core Islamic learning will not be placed behind a paywall.</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>THE RHM ECOSYSTEM</p>
          <h2>Seven sustainable pathways</h2>
          <p>Some learning resources already exist. Paid services and payment collection are not active until the required systems, permissions and safeguards are in place.</p>
        </div>
        <div className={styles.grid}>
          {programmes.map((item) => (
            <article className={styles.card} key={item.title}>
              <span className={styles.icon} aria-hidden="true">{item.icon}</span>
              <p className={styles.status}>{item.status}</p>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <Link className={styles.cardLink} href={item.href}>{item.action} ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trust}>
        <div>
          <p className={styles.eyebrow}>TRANSPARENCY FIRST</p>
          <h2>Trust is more important than revenue.</h2>
          <p>Before accepting money, RHM Islam 360 will publish the recipient identity, purpose of each payment, applicable fees and refund terms. Donations for platform operations will be accounted for separately from any charitable or Zakat funds.</p>
        </div>
        <ul>
          <li>Never pay through unofficial personal accounts.</li>
          <li>No payment is required to access core Qur’an learning.</li>
          <li>Teachers, sources and publication rights must be checked.</li>
          <li>Payments will only be marked successful after provider verification.</li>
        </ul>
      </section>

      <section className={styles.next}>
        <p className={styles.eyebrow}>START HERE</p>
        <h2>Begin with the free Academy</h2>
        <p>Explore existing learning pathways while the booking, publishing and secure payment systems are prepared.</p>
        <Link className={styles.primary} href="/academy">Visit RHM Academy ↗</Link>
      </section>

      <footer className={styles.footer}>© {new Date().getFullYear()} RHM Islam 360 · Learn gently. Reflect thoughtfully. Share beneficial knowledge. <Link href="/">Return home</Link></footer>
    </main>
  );
}
