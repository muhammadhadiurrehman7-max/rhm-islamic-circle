"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
        setMessage(data.session ? "Account created. You are signed in." : "Account created. Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.assign("/dashboard");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "var(--paper)" }}>
      <section style={{ width: "100%", maxWidth: 440, padding: 32, borderRadius: 24, background: "white", border: "1px solid #e8ede8" }}>
        <Link href="/" className="eyebrow">← RHM Islamic Circle</Link>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 34, marginBottom: 8 }}>{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>Save your learning journey and continue from where you left off.</p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14, marginTop: 24 }}>
          <label style={{ display: "grid", gap: 7, fontSize: 14 }}>Email address
            <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} />
          </label>
          <label style={{ display: "grid", gap: 7, fontSize: 14 }}>Password
            <input required minLength={8} type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} value={password} onChange={e => setPassword(e.target.value)} style={fieldStyle} />
          </label>
          <button className="btn btn-primary" disabled={busy} type="submit">{busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</button>
        </form>
        {message && <p role="status" style={{ padding: 12, background: "#edf3ed", borderRadius: 12, fontSize: 14 }}>{message}</p>}
        {mode === "signin" && <p style={{ marginTop: 12, fontSize: 14 }}><Link href="/forgot-password" style={{ color: "var(--green)", fontWeight: 700 }}>Forgot your password?</Link></p>}
        {mode === "signin" && <p style={{ marginTop: 12, fontSize: 14 }}><Link href="/forgot-password" style={{ color: "var(--green)", fontWeight: 700 }}>Forgot your password?</Link></p>}
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 22 }}>
          {mode === "signin" ? "New to the circle? " : "Already have an account? "}
          <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }} style={{ border: 0, background: "none", color: "var(--green)", fontWeight: 700 }}>
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </section>
    </main>
  );
}

const fieldStyle = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #d9e3dc", font: "inherit", outlineColor: "var(--green)" };
