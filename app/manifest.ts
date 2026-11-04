import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "RHM Islamic Circle",
    short_name: "RHM Circle",
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
        src: "/icon.svg",
        sizes: "192x192 512x512",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
