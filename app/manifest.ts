import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "RHM Islam 360",
    short_name: "RHM 360",
    description:
      "A free Islamic learning space for the Quran, Hadith, Arabic Qaida and Islamic knowledge.",
    lang: "en",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait-primary",
    background_color: "#f7f5ed",
    theme_color: "#123d32",
    categories: ["education", "books", "lifestyle"],
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Read the Quran", short_name: "Quran", url: "/quran" },
      { name: "Explore Hadith", short_name: "Hadith", url: "/hadith" },
      { name: "Learn Qaida", short_name: "Qaida", url: "/qaida" },
      { name: "Discover Islam", short_name: "Discover", url: "/learn" },
    ],
  };
}
