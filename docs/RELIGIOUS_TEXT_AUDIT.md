# RHM Islam 360 — Independent Sacred Text Audit

**Status: audit framework established; full religious verification is not yet complete.**

Do not describe the entire Quran or Hadith library as independently verified until documented checks are completed and reviewed.

## Quran text

- The app streams Arabic Uthmani text from AlQuran Cloud (quran-uthmani).
- Independent comparison source: Tanzil Project Uthmani text. Tanzil documents verification against the Madinah Mushaf and requires verbatim reproduction without changing the text.
- Automated comparison: scripts/audit_quran.py.
- It compares every Surah/Ayah key and exact Unicode string. NFC-equivalent differences are listed separately. It does not strip diacritics or use fuzzy matching.
- A mismatch is a review item, not permission for software to edit Quran text. A qualified Quran teacher/Hafiz must review each discrepancy against a recognised printed Mushaf before any source/display change.
- GitHub Actions runs the comparison on relevant pushes and weekly, and uploads a report artifact.

## Translation audit

Translations are not the Arabic Quran and are not interchangeable. Each edition must record its exact identifier, translator, language, version, source/licence, verse-key alignment and reviewer. The Quran reader joins translation text to Arabic verses by numberInSurah, not array position.

## Hadith audit

The current reader consumes the Fawaz Ahmed Hadith API dataset. Its own data cannot independently verify itself. Structural checks are useful but do not authenticate the matn, isnad, grading or reference.

For every collection and edition, record:
- collection and publisher/edition;
- printed or authorised digital reference, volume and page where available;
- Arabic matn comparison and translation attribution;
- narrator/isnad information where available;
- grading exactly as attributed to a named scholar and source, never inferred by the app;
- numbering scheme and known split/combined narration differences;
- reviewer, date and decision.

Sunnah.com explains that Arabic and English numbering may differ because narrations can be split or combined, and some references are still being verified. Never assume a bare number is universal. Sunnah.com also prohibits scraping or mass reproduction; use its official API with permission/API key or authorised editions for independent checking.

## Duas and scholar quotations

- Quranic duas link to the exact Surah and Ayah.
- Prophetic duas include collection, book/chapter where available, Hadith number, narrator and source.
- A Companion narrator is not described as the author of a Prophetic supplication.
- Scholar quotations require exact work, author, edition, volume/page or stable source, and context. Scholar grading is separate from Prophetic wording.
- Never invent attributions, virtues, repetition counts or authenticity grades.
- A qualified reviewer must approve additions before they are labelled verified.

## Audit status labels

- **Automated match:** matches a named reference under a stated comparison method.
- **Human reviewed:** checked by a named qualified reviewer against a specified edition.
- **Needs review:** discrepancy, missing source, uncertain numbering or conflicting grading.
- **Not audited:** no independent comparison has been completed.

Automated matching does not establish authenticity, correct recitation, interpretation or a religious ruling.
