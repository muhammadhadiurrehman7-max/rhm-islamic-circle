# Netlify deployment for RHM Islam 360

This repository is a Next.js 16 application. Netlify supports the Next.js App Router and uses its maintained OpenNext adapter; the project should be imported from GitHub rather than converted into a static-only site.

## 1. Create the Netlify site

1. Sign in to Netlify.
2. Choose **Add new project** → **Import an existing project**.
3. Choose GitHub and authorize access to `muhammadhadiurrehman7-max/rhm-islamic-circle`.
4. Select the `main` branch.
5. Let Netlify detect Next.js. The repository's `netlify.toml` sets the build command to `npm run build` and Node.js 22. Do not force a static export or replace the Next.js runtime with a plain static publish.

## 2. Add the existing Supabase project settings

In Netlify: **Project configuration** → **Environment variables**, add the same values used by the existing Vercel deployment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Use the values from the existing Supabase project / current deployment settings. Do not put credentials in GitHub files or commit a `.env` file. Never expose a Supabase service-role key in a `NEXT_PUBLIC_*` variable.

## 3. Update Supabase authentication URLs after the first deploy

After Netlify gives the site a URL:

1. In Supabase Authentication URL configuration, add the new Netlify site URL to the allowed redirect URLs.
2. Set the Site URL to the preferred production URL only when ready to switch.
3. Keep the existing Vercel URL allowed during testing so existing sign-in links continue to work.

## 4. Verify before switching users

Test the Netlify URL on desktop and mobile:

- Home page and navigation
- Quran and Hadith pages, including exact-number search
- Daily Duas
- Supabase sign-in, sign-out, and protected pages
- Any forms, uploads, and server-side routes

Keep Vercel available as a fallback until these checks pass. A successful GitHub commit does not itself create a Netlify deployment: a Netlify account must authorize the GitHub repository and supply the Supabase environment variables.

## Existing services

- Source code: GitHub repository, `main` branch
- Database and authentication: existing Supabase project (unchanged)
- Hosting: Netlify can be added alongside Vercel; no database migration is required
