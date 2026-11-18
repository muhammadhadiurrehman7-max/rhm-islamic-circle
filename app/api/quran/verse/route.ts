import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

export const runtime = "nodejs";

type CachedToken = { value: string; expiresAt: number };
let cachedToken: CachedToken | null = null;

async function getContentToken(clientId: string, clientSecret: string, authBase: string, scope: string) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
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
  if (!response.ok) throw new Error("Quran content authentication failed.");
  const data = await response.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + Number(data.expires_in || 3600) * 1000 };
  return cachedToken.value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verseKey = searchParams.get("verse");
  const language = searchParams.get("language") || "ur";
  const tafsirs = searchParams.get("tafsirs");
  const resources = searchParams.get("resources");
  const chapterNumber = searchParams.get("chapter");

  if (resources === "tajweed" && (!chapterNumber || !Number.isInteger(Number(chapterNumber)) || Number(chapterNumber) < 1 || Number(chapterNumber) > 114)) {
    return NextResponse.json({ error: "Provide a valid Surah number for Tajweed text." }, { status: 400 });
  }
  if (resources !== "tafsirs" && resources !== "tajweed" && (!verseKey || !/^([1-9]|[1-9][0-9]|1[01][0-9]|11[0-4]):[1-9][0-9]{0,2}$/.test(verseKey))) {
    return NextResponse.json({ error: "Provide a valid verse reference such as 2:255." }, { status: 400 });
  }
  if (resources && resources !== "tafsirs" && resources !== "tajweed") {
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
    return NextResponse.json({
      error: "Word-by-word study needs Quran Foundation API credentials. Add QF_CLIENT_ID and QF_CLIENT_SECRET to the server environment.",
      setupRequired: true,
    }, { status: 503 });
  }

  const environment = process.env.QF_ENV === "prelive" ? "prelive" : "production";
  const authBase = environment === "prelive" ? "https://prelive-oauth2.quran.foundation" : "https://oauth2.quran.foundation";
  const apiBase = environment === "prelive" ? "https://apis-prelive.quran.foundation" : "https://apis.quran.foundation";
  const scope = process.env.QF_SCOPE || "content";
  try {
    const token = await getContentToken(clientId, clientSecret, authBase, scope);
    const endpoint = resources === "tafsirs"
      ? `${apiBase}/content/api/v4/resources/tafsirs?language=${encodeURIComponent(language)}`
      : resources === "tajweed"
        ? `${apiBase}/content/api/v4/quran/verses/uthmani_tajweed?chapter_number=${encodeURIComponent(chapterNumber || "")}`
        : `${apiBase}/content/api/v4/verses/by_key/${verseKey}?${new URLSearchParams({ words: "true", language, ...(tafsirs ? { tafsirs } : {}) }).toString()}`;
    const response = await fetch(endpoint, {
      headers: { "x-auth-token": token, "x-client-id": clientId },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      if (response.status === 401) cachedToken = null;
      return NextResponse.json({ error: "The Quran study service could not return this verse. Check API access and resource permissions." }, { status: response.status === 404 ? 404 : 502 });
    }
    return NextResponse.json(await response.json(), { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
  } catch {
    return NextResponse.json({ error: "The Quran study service is temporarily unavailable." }, { status: 502 });
  }
}
