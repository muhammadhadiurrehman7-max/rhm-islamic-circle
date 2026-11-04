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
      <Link href="/" className="eyebrow">← RHM Islamic Circle</Link>
      <div style={{ marginTop: 32 }}>
        <div className="eyebrow">Your learning space</div>
        <h1 style={{ font: '600 clamp(34px,5vw,54px) "Playfair Display",serif' }}>Assalamu Alaikum</h1>
        <p className="section-intro">Signed in as {email}. Your personal Quran-learning dashboard will grow here.</p>
      </div>
      <div className="cards" style={{ marginTop: 30 }}>
        <article className="feature-card"><h3>Last read</h3><p>Your last-read Surah and Ayah will appear here once progress tracking is connected.</p></article>
        <article className="feature-card"><h3>Bookmarks</h3><p>Save Ayahs and return to them whenever you need.</p></article>
        <article className="feature-card"><h3>Learning goals</h3><p>Follow your lessons and build a steady daily routine.</p></article>
      </div>
      <form action="/auth/signout" method="post" style={{ marginTop: 28 }}><button className="btn btn-primary">Sign out</button></form>
    </main>
  );
}
