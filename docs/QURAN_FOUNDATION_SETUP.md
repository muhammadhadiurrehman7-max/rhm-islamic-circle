# Quran Foundation API setup for RHM Islam 360

RHM's optional word-by-word study feature uses the official Quran Foundation Content API. The client secret is used only by the Next.js server route at `/api/quran/verse`; never add it to browser code, a public `NEXT_PUBLIC_*` variable, GitHub source, or a message.

## 1. Request API access
1. Open the [Quran Foundation Developer Console](https://quran.foundation/developer).
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

## 3. Test
Open an Ayah in the Quran reader and choose **Word by word**. Without credentials, the reader displays a setup message; after valid credentials and permissions are configured, it loads word text, translation/transliteration and word audio where supplied by the API.

Prelive Quran data is limited to Al-Fatihah and Al-Baqarah. Full Quran testing requires approved production API access.

## Official documentation
- [Quran Foundation Content API quickstart](https://api-docs.quran.com/docs/quickstart/)
- [Verses API and word-level data](https://api-docs.quran.com/docs/sdk/javascript/verses/)
- [Quran Foundation API reference](https://api-docs.quran.com/docs/api-reference/)
