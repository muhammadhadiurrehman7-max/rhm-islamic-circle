import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) redirect("/login");

  const email = typeof data.claims.email === "string" ? data.claims.email : "Learner";

  return (
    <main className="section" style={{ minHeight: "100vh" }}>
      <Link href="/" className="eyebrow">← RHM Islam 360</Link>
      <div style={{ marginTop: 32 }}>
        <div className="eyebrow">Your learning space</div>
        <h1 style={{ font: '600 clamp(34px,5vw,54px) "Playfair Display",serif' }}>Assalamu Alaikum</h1>
        <p className="section-intro">Signed in as {email}. Your personal Quran-learning dashboard will grow here.</p>
      </div>
      <div className="cards" style={{ marginTop: 30 }}>
        <article className="feature-card"><h3>Reading position</h3><p>Your last-read Surah and Ayah are currently saved in the browser where you use the Qur’an reader. They are not synced to this account yet.</p><Link href="/quran">Continue reading →</Link></article>
        <article className="feature-card"><h3>Bookmarks & notes</h3><p>Qur’an bookmarks and personal notes are stored on this device. Account-wide cloud sync is not available yet.</p><Link href="/quran">Open Qur’an reader →</Link></article>
        <article className="feature-card"><h3>Learning goals</h3><p>Use the daily journey and worship checklist to organise your routine on this device.</p><Link href="/journey">Open My Journey →</Link></article>
      </div>
      <form action="/auth/signout" method="post" style={{ marginTop: 28 }}><button className="btn btn-primary">Sign out</button></form>
    </main>
  );
}
