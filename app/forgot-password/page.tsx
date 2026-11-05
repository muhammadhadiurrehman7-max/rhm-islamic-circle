"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) throw error;
      setMessage("If an account exists for that email, a password reset link has been sent.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to request a reset link. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "var(--paper)" }}>
      <section style={{ width: "100%", maxWidth: 440, padding: 32, borderRadius: 24, background: "white", border: "1px solid #e8ede8" }}>
        <Link href="/login" className="eyebrow">← Back to sign in</Link>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 32 }}>Reset your password</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Enter your account email and we’ll send a secure password reset link.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 24 }}>
          <label style={{ display: "grid", gap: 7, fontSize: 14 }}>Email address
            <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} />
          </label>
          <button className="btn btn-primary" disabled={busy}>{busy ? "Sending…" : "Send reset link"}</button>
        </form>
        {message && <p role="status" style={{ padding: 12, background: "#edf3ed", borderRadius: 12, fontSize: 14 }}>{message}</p>}
      </section>
    </main>
  );
}

const fieldStyle = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #d9e3dc", font: "inherit" };
