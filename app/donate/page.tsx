export default function DonatePage() {
  return (
    <main className="donate-page">
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islam 360</a>
        <a className="quran-home-link" href="/">Back to home</a>
      </header>
      <section className="donate-heading">
        <div className="eyebrow">Support RHM Islam 360</div>
        <h1>Support Islamic learning</h1>
        <p>RHM Islam 360 aims to make reliable Islamic learning resources freely accessible. Donation facilities are being prepared and are not currently accepting contributions.</p>
      </section>
      <section className="donation-options" aria-label="Donation availability">
        <article className="donation-card">
          <div className="donation-method-icon" aria-hidden="true">♡</div>
          <h2>Donation facilities are being prepared</h2>
          <p>Please check back later. No bank, wallet, or personal payment details are published on this page at this time.</p>
        </article>
      </section>
      <section className="donate-heading">
        <h2>How contributions may support the project</h2>
        <p>If donation facilities are introduced in the future, contributions may help with website hosting, app development, accessibility, and creating free Islamic learning resources. No payment is required to access the basic learning content.</p>
      </section>
      <p className="donation-note">Please do not send money to any account claiming to represent RHM Islam 360 unless official recipient details are published here and independently verified. Never share your PIN, password, or one-time verification code.</p>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islam 360 · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
