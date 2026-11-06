"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (password !== confirm) {
      setMessage("The passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setMessage("Your password has been updated. You can now sign in.");
      setPassword("");
      setConfirm("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update password. Request a new reset link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "var(--paper)" }}>
      <section style={{ width: "100%", maxWidth: 440, padding: 32, borderRadius: 24, background: "white", border: "1px solid #e8ede8" }}>
        <Link href="/login" className="eyebrow">← RHM Islamic Circle</Link>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 32 }}>Choose a new password</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Use at least 8 characters and keep your password private.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 24 }}>
          <label style={{ display: "grid", gap: 7, fontSize: 14 }}>New password
            <input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} style={fieldStyle} />
          </label>
          <label style={{ display: "grid", gap: 7, fontSize: 14 }}>Confirm new password
            <input required minLength={8} type="password" autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} style={fieldStyle} />
          </label>
          <button className="btn btn-primary" disabled={busy}>{busy ? "Updating…" : "Update password"}</button>
        </form>
        {message && <p role="status" style={{ padding: 12, background: "#edf3ed", borderRadius: 12, fontSize: 14 }}>{message}</p>}
      </section>
    </main>
  );
}

const fieldStyle = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #d9e3dc", font: "inherit" };
