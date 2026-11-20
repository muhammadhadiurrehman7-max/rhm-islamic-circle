import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

export const runtime = "nodejs";

type CachedToken = {
  cacheKey: string;
  value: string;
  expiresAt: number;
};

let cachedToken: CachedToken | null = null;
let pendingToken: { cacheKey: string; promise: Promise<string> } | null = null;

async function getContentToken(
  clientId: string,
  clientSecret: string,
  authBase: string,
  scope: string,
  forceRefresh = false,
) {
  const cacheKey = [authBase, clientId, scope].join("|");

  if (forceRefresh && cachedToken?.cacheKey === cacheKey) cachedToken = null;
  if (cachedToken?.cacheKey === cacheKey && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  if (pendingToken?.cacheKey === cacheKey) return pendingToken.promise;

  const promise = (async () => {
    const body = new URLSearchParams({ grant_type: "client_credentials", scope });
    const response = await fetch(`${authBase}/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      // Do not include the upstream body: it can contain sensitive diagnostic details.
      throw new Error(`Quran Foundation authentication failed (${response.status}).`);
    }

    const data = await response.json();
    if (typeof data.access_token !== "string" || !data.access_token) {
      throw new Error("Quran Foundation returned an invalid access token.");
    }

    cachedToken = {
      cacheKey,
      value: data.access_token,
      expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000,
    };
    return cachedToken.value;
  })();

  pendingToken = { cacheKey, promise };
  try {
    return await promise;
  } finally {
    if (pendingToken?.promise === promise) pendingToken = null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verseKey = searchParams.get("verse");
  const language = searchParams.get("language") || "ur";
  const tafsirs = searchParams.get("tafsirs");
  const resources = searchParams.get("resources");

  if (resources !== "tafsirs" && (!verseKey || !/^([1-9]|[1-9][0-9]|1[01][0-9]|11[0-4]):[1-9][0-9]{0,2}$/.test(verseKey))) {
    return NextResponse.json({ error: "Provide a valid verse reference such as 2:255." }, { status: 400 });
  }
  if (resources && resources !== "tafsirs") {
    return NextResponse.json({ error: "Unsupported resource request." }, { status: 400 });
  }
  if (!/^[a-z]{2}$/.test(language)) {
    return NextResponse.json({ error: "Language must be a two-letter code." }, { status: 400 });
  }
  if (tafsirs && !/^\d+(,\d+)*$/.test(tafsirs)) {
    return NextResponse.json({ error: "Tafsir resource IDs must be comma-separated numbers." }, { status: 400 });
  }

  const clientId = process.env.QF_CLIENT_ID;
  const clientSecret = process.env.QF_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    // Preview deployments can safely use the production server-side proxy.
    // Credentials remain server-only in Production and are never exposed to the browser.
    const productionUrl = new URL("https://rhm-islamic-circle.vercel.app/api/quran/verse");
    searchParams.forEach((value, key) => productionUrl.searchParams.set(key, value));
    try {
      const upstream = await fetch(productionUrl, { cache: "no-store" });
      const payload = await upstream.json();
      return NextResponse.json(payload, {
        status: upstream.status,
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
      });
    } catch {
      return NextResponse.json({
        error: "The Qur’an study service is temporarily unavailable. Please try again shortly.",
      }, { status: 503 });
    }
  }

  const environment = process.env.QF_ENV === "prelive" ? "prelive" : "production";
  const authBase = environment === "prelive"
    ? "https://prelive-oauth2.quran.foundation"
    : "https://oauth2.quran.foundation";
  const apiBase = environment === "prelive"
    ? "https://apis-prelive.quran.foundation"
    : "https://apis.quran.foundation";
  const scope = process.env.QF_SCOPE || "content";

  const endpoint = resources === "tafsirs"
    ? `${apiBase}/content/api/v4/resources/tafsirs?language=${encodeURIComponent(language)}`
    : `${apiBase}/content/api/v4/verses/by_key/${verseKey}?${new URLSearchParams({
        words: "true",
        language,
        ...(tafsirs ? { tafsirs } : {}),
      }).toString()}`;

  try {
    let token = await getContentToken(clientId, clientSecret, authBase, scope);
    let response = await fetch(endpoint, {
      headers: { "x-auth-token": token, "x-client-id": clientId },
      next: { revalidate: 3600 },
    });

    // A cached token can be revoked before its advertised expiry. Refresh and retry once.
    if (response.status === 401) {
      token = await getContentToken(clientId, clientSecret, authBase, scope, true);
      response = await fetch(endpoint, {
        headers: { "x-auth-token": token, "x-client-id": clientId },
        next: { revalidate: 3600 },
      });
    }

    if (!response.ok) {
      const status = response.status === 404 ? 404 : response.status === 429 ? 503 : 502;
      return NextResponse.json({
        error: response.status === 404
          ? "No matching verse or Tafsir passage was found."
          : response.status === 429
            ? "The Quran study service is receiving too many requests. Please try again shortly."
            : "The Quran study service could not complete this request. Please try again or check API access.",
      }, { status });
    }

    return NextResponse.json(await response.json(), {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({
      error: "The Quran study service is temporarily unavailable. Please try again shortly.",
    }, { status: 502 });
  }
}
