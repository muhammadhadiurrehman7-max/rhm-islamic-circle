const CACHE_NAME = "rhm-islamic-circle-v2";
const OFFLINE_URL = "/offline";
const CORE_ASSETS = [OFFLINE_URL, "/icon.svg", "/icon-192.svg", "/icon-512.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((key) => key.startsWith("rhm-islamic-circle-") && key !== CACHE_NAME).map((key) => caches.delete(key)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/_next/static/") || ["/icon.svg", "/icon-192.svg", "/icon-512.svg"].includes(url.pathname)) {
    event.respondWith(caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(async (response) => {
      if (response.ok && ["/quran", "/quran/offline", OFFLINE_URL].includes(url.pathname)) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    }).catch(async () => {
      const offlinePage = await caches.match(OFFLINE_URL);
      return offlinePage || new Response("You are offline. Please reconnect and try again.", {
        status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }));
  }
});