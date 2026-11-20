"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Step = "email" | "code";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) throw error;
      setStep("code");
      setMessage("If an account exists for this email, a 6-digit recovery code has been sent. Enter it below.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send a recovery code. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: token.trim(),
        type: "recovery",
      });
      if (error) throw error;
      window.location.assign("/reset-password");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "That code could not be verified. Check it and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "var(--paper)" }}>
      <section style={{ width: "100%", maxWidth: 440, padding: 32, borderRadius: 24, background: "white", border: "1px solid #e8ede8" }}>
        <Link href="/login" className="eyebrow">← Back to sign in</Link>
        <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 32 }}>Reset your password</h1>
        {step === "email" ? (
          <>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Enter your account email. We’ll send a one-time recovery code to verify it’s you.</p>
            <form onSubmit={requestCode} style={{ display: "grid", gap: 14, marginTop: 24 }}>
              <label style={{ display: "grid", gap: 7, fontSize: 14 }}>Email address
                <input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle} />
              </label>
              <button className="btn btn-primary" disabled={busy}>{busy ? "Sending…" : "Send recovery code"}</button>
            </form>
          </>
        ) : (
          <>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Enter the 6-digit code sent to <strong>{email}</strong>. Do not share this code with anyone.</p>
            <form onSubmit={verifyCode} style={{ display: "grid", gap: 14, marginTop: 24 }}>
              <label style={{ display: "grid", gap: 7, fontSize: 14 }}>Recovery code
                <input required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={token} onChange={e => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))} style={fieldStyle} />
              </label>
              <button className="btn btn-primary" disabled={busy || token.length !== 6}>{busy ? "Verifying…" : "Verify code"}</button>
              <button type="button" disabled={busy} onClick={() => { setStep("email"); setToken(""); setMessage(""); }} style={{ border: 0, background: "none", color: "var(--green)", fontWeight: 700 }}>Use a different email</button>
            </form>
          </>
        )}
        {message && <p role="status" style={{ padding: 12, background: "#edf3ed", borderRadius: 12, fontSize: 14 }}>{message}</p>}
      </section>
    </main>
  );
}

const fieldStyle = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid #d9e3dc", font: "inherit" };
