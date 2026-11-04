export const metadata = {
  title: "You are offline | RHM Islamic Circle",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="pwa-offline-page">
      <div className="pwa-offline-mark" aria-hidden="true">RHM</div>
      <p className="pwa-offline-kicker">RHM ISLAMIC CIRCLE</p>
      <h1>You are currently offline</h1>
      <p>
        Please reconnect to the internet to open Quran, Hadith, Qaida and other
        learning pages. Your app will be ready when your connection returns.
      </p>
      <a href="/">Try again</a>
    </main>
  );
}
