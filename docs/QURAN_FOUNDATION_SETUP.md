# Quran Foundation API setup for RHM Islam 360

RHM's optional word-by-word study feature uses the official Quran Foundation Content API. The client secret is used only by the Next.js server route at `/api/quran/verse`; never add it to browser code, a public `NEXT_PUBLIC_*` variable, GitHub source, or a message.

## 1. Request API access
1. Open the [Quran Foundation Developer Console](https://api-docs.quran.com/request-access/).
2. Create a backend/server application.
3. Request the Content API permissions needed for Quran verses and word data.
4. Obtain the app's client ID and client secret.

New backend apps may use granular scopes. The route supports a custom `QF_SCOPE` environment variable; use the exact scope string approved for the app. Older credentials may use `content`.

## 2. Add environment variables in Vercel
In the Vercel project `rhm-islamic-circle`, open Settings → Environment Variables and add:

- `QF_CLIENT_ID` — the app client ID
- `QF_CLIENT_SECRET` — the private app secret
- `QF_ENV` — `production` after production access is approved, or `prelive` while testing
- `QF_SCOPE` — optional; defaults to `content`, but use approved granular scopes if your app requires them

Apply to Preview and Production as appropriate, then redeploy. Do not paste the secret into GitHub or ChatGPT.

## 3. Enable the complete Quran dataset
The reader's Arabic Quran text and Surah index already cover all 114 Surahs. Word-by-word data and Tafsir are served by Quran Foundation, so their coverage depends on the API environment and dataset enabled for your app.

- Prelive is a test dataset and is limited to Al-Fatihah and Al-Baqarah.
- To enable word-by-word data and Urdu Tafsir throughout all 114 Surahs, request/confirm **production** Content API access and the granular scopes approved for your app, including `content.quran.read`, `content.tafsirs.read`, and any word/translation scopes shown in your Developer Console.
- Once production access is approved, set `QF_ENV=production` and add the same approved `QF_CLIENT_ID`, `QF_CLIENT_SECRET`, and `QF_SCOPE` values to the Vercel **Production** environment. Redeploy Production only after those values are configured.

## 4. Urdu Tafsir comparison
The Quran reader can display multiple Urdu Tafsir editions side by side for each Ayah. Select one or more editions in the Tafsir list; each passage is kept separate and labelled with the resource name/author supplied by Quran Foundation. The available writers are determined by the Urdu Tafsir resources actually returned for your API credentials—RHM must not invent missing author texts or merge different scholars' views without attribution.

## 5. Expanded scholar recommendations

The reader now recommends up to six editions for the selected language, matching well-known works only when those editions are actually present in the live Quran Foundation catalogue. Urdu recommendations include recognised catalogue matches such as Tafsir Ibn Kathir, Maariful Quran, Bayan-ul-Quran, Tafheem-ul-Quran, Tadabbur-e-Quran and Tafsir-e-Usmani; English recommendations include available matches such as Ibn Kathir, Ma'ariful Quran, al-Jalalayn, al-Sa'di, al-Muyassar, al-Tabari and al-Qurtubi. The exact list depends on the catalogue returned to the approved API application.

The searchable list continues to show all resources returned for the chosen language, not only the recommended editions. Selecting a recommendation never creates, paraphrases or downloads a scholar's text from an unverified source. Each passage remains separately attributed to the provider's edition and author metadata.

## 6. Test
Open any Surah in the Quran reader and select **Word by word** and one or more **Urdu Tafsir** editions. Check the returned Arabic words, Urdu meanings, transliteration, word audio, and each scholar's Tafsir independently. Prelive can only verify the two test Surahs; full 114-Surah word/Tafsir coverage requires approved production API access.

## Official documentation
- [Quran Foundation Content API quickstart](https://api-docs.quran.com/docs/quickstart/)
- [Verses API and word-level data](https://api-docs.quran.com/docs/sdk/javascript/verses/)
- [Quran Foundation API reference](https://api-docs.quran.com/docs/api-reference/)
