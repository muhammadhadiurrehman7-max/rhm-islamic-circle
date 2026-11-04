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
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</a>
        <a className="quran-home-link" href="/">Back to home</a>
      </header>
      <section className="donate-heading">
        <div className="eyebrow">Support the circle</div>
        <h1>Support Islamic learning</h1>
        <p>If you wish to support RHM Islam 360, you can make a voluntary contribution using one of the payment details below. Bank and wallet transfers are sent directly to the recipient account you select; they are not processed by the website.</p>
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
      <section className="donate-heading">
        <h2>How contributions support the project</h2>
        <p>Voluntary contributions can help with website hosting, app development, accessibility, and creating free Islamic learning resources. No payment is required to access the basic learning content.</p>
      </section>
      <p className="donation-note">Before sending money, verify the recipient account title and details in your own banking or wallet app. Keep your transfer receipt. Never share your PIN, password, or one-time verification code. Donations are voluntary and are not represented as tax-deductible.</p>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islam 360 · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
