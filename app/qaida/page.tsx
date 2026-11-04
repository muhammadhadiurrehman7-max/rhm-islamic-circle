export default function QaidaPage() {
  return (
    <main className="quran-page qaida-page">
      <header className="quran-topbar">
        <a className="quran-brand" href="/"><span className="brand-mark">ر</span> RHM Islamic Circle</a>
        <div className="quran-top-actions">
          <a className="quran-home-link" href="/hadith">Open Hadith Library</a>
          <a className="quran-home-link" href="/">Back to home</a>
        </div>
      </header>
      <section className="qaida-section" id="qaida-lessons" aria-label="Beginner Arabic Qaida lessons">
            <div className="qaida-heading"><span className="eyebrow">Start reading Arabic</span><h2>Beginner’s Qaida</h2><p>A step-by-step introduction to Arabic letters and the signs used when reading the Qur’an. Practise slowly and learn pronunciation from a qualified teacher.</p></div>
            <div className="qaida-lesson-grid">
              <article className="qaida-lesson"><span className="qaida-step">Lesson 01</span><h3>Arabic alphabet</h3><p className="qaida-arabic" lang="ar" dir="rtl">ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي</p><p>Learn to recognise each letter by its name and sound. Some letters have similar shapes, so notice their dots carefully.</p></article>
              <article className="qaida-lesson"><span className="qaida-step">Lesson 02</span><h3>Short vowels (Harakat)</h3><p className="qaida-arabic" lang="ar" dir="rtl">بَ　بِ　بُ</p><p>Fathah gives a short “a” sound, kasrah a short “i” sound, and dammah a short “u” sound. Practise each sound clearly.</p></article>
              <article className="qaida-lesson"><span className="qaida-step">Lesson 03</span><h3>Tanween</h3><p className="qaida-arabic" lang="ar" dir="rtl">بً　بٍ　بٌ</p><p>Tanween is a double vowel sign, commonly producing an “an”, “in” or “un” ending. Learn its pronunciation and when it appears.</p></article>
              <article className="qaida-lesson"><span className="qaida-step">Lesson 04</span><h3>Sukoon</h3><p className="qaida-arabic" lang="ar" dir="rtl">أَبْ　اِبْ　اُبْ</p><p>Sukoon marks a consonant without a following short vowel. Join the sounds smoothly without adding an extra vowel.</p></article>
              <article className="qaida-lesson"><span className="qaida-step">Lesson 05</span><h3>Long vowels (Madd)</h3><p className="qaida-arabic" lang="ar" dir="rtl">بَا　بِي　بُو</p><p>Alif, ya and waw can lengthen the matching vowel sound. Practise holding the sound for the correct duration with a teacher.</p></article>
              <article className="qaida-lesson"><span className="qaida-step">Lesson 06</span><h3>Shaddah and joining</h3><p className="qaida-arabic" lang="ar" dir="rtl">رَبَّ　مَدَّ</p><p>Shaddah indicates a doubled consonant. Next, practise joining letters and reading short words without losing each letter’s sound.</p></article>
            </div>
            <div className="qaida-practice"><div><strong>Daily practice</strong><p>Spend 10–15 minutes reviewing a small lesson. Listen, repeat, and ask a qualified Qur’an teacher to correct your makharij (letter articulation) and pronunciation.</p></div><a href="/quran#quran-reader">Open RHM Qur’an reader →</a></div>
            <p className="qaida-disclaimer">These are original beginner study notes, not a reproduction of a printed Qaida book and not a substitute for guided recitation. Arabic sounds can differ from their approximate English descriptions.</p>
          </section>
      <footer className="quran-footer">© {new Date().getFullYear()} RHM Islamic Circle · Founded and owned by Mr Muhammad Hadi Ur Rehman</footer>
    </main>
  );
}
