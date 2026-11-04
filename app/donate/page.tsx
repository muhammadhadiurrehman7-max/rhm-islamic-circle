"use client";

import { useState } from "react";

function CopyValue({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="donation-value-row">
      <span className="donation-value">{value}</span>
      <button className="donation-copy" type="button" onClick={copy} aria-label={`Copy ${label}`}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function DonatePage() {
  return (
    <main className="donate-page">
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</a>
        <a className="quran-home-link" href="/">Back to home</a>
      </header>
      <section className="donate-heading">
        <div className="eyebrow">Support the circle</div>
        <h1>Support Islamic learning</h1>
        <p>If you wish to support RHM Islamic Circle, you can use one of the payment details below. Please verify the recipient and details in your banking app before confirming any transfer.</p>
      </section>
      <section className="donation-options" aria-label="Donation payment details">
        <article className="donation-card">
          <div className="donation-method-icon">E</div>
          <h2>EasyPaisa</h2>
          <p>Mobile account number</p>
          <CopyValue value="03148431837" label="EasyPaisa number" />
        </article>
        <article className="donation-card">
          <div className="donation-method-icon">S</div>
          <h2>SadaPay</h2>
          <p>Account number / mobile number</p>
          <CopyValue value="03148431837" label="SadaPay number" />
        </article>
        <article className="donation-card">
          <div className="donation-method-icon">SB</div>
          <h2>Soneri Bank</h2>
          <p>Bank account number</p>
          <CopyValue value="000882001645812" label="Soneri Bank account number" />
        </article>
      </section>
      <p className="donation-note">Before sending a donation, confirm the account name shown by your payment provider. Never share your PIN, password, or one-time verification code with anyone.</p>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
