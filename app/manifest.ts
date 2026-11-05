import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/", name: "RHM Islam 360", short_name: "RHM 360",
    description: "A free Islamic learning space for the Quran, Hadith, Arabic Qaida and Islamic knowledge.",
    lang: "en", start_url: "/", scope: "/", display: "standalone",
    display_override: ["standalone", "minimal-ui"], orientation: "portrait-primary",
    background_color: "#071b16", theme_color: "#0b3028",
    categories: ["education", "books", "lifestyle"],
    icons: [
      { src: "/icon.jpg", sizes: "96x96", type: "image/jpeg", purpose: "any" },
      { src: "/icon.jpg", sizes: "96x96", type: "image/jpeg", purpose: "maskable" }
    ],
    shortcuts: [
      { name: "Read the Quran", short_name: "Quran", url: "/quran" },
      { name: "Explore Hadith", short_name: "Hadith", url: "/hadith" },
      { name: "Learn Qaida", short_name: "Qaida", url: "/qaida" },
      { name: "Discover Islam", short_name: "Discover", url: "/learn" }
    ]
  };
}