import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/", name: "RHM Islam 360", short_name: "RHM 360",
    description: "Rehmat, Hidayat & Ma’rifat — a free Islamic learning space for the Quran, Hadith, Arabic Qaida and Islamic knowledge.",
    lang: "en", start_url: "/", scope: "/", display: "standalone",
    display_override: ["standalone", "minimal-ui"], orientation: "portrait-primary",
    background_color: "#090909", theme_color: "#090909",
    categories: ["education", "books", "lifestyle"],
    icons: [
      { src: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" }
    ],
    shortcuts: [
      { name: "Read the Quran", short_name: "Quran", url: "/quran" },
      { name: "Explore Hadith", short_name: "Hadith", url: "/hadith" },
      { name: "Learn Qaida", short_name: "Qaida", url: "/qaida" },
      { name: "Discover Islam", short_name: "Discover", url: "/learn" },
      { name: "Prayer Times", short_name: "Prayer", url: "/prayer-times" },
      { name: "99 Names of Allah", short_name: "Asma ul Husna", url: "/names-of-allah" }
    ]
  };
}