import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/theme-provider";
import PwaRegister from "../components/pwa-register";

const siteUrl = "https://rhm-islamic-circle.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RHM Islam 360 | Quran, Hadith & Complete Islamic Learning",
    template: "%s | RHM Islam 360",
  },
  description: "RHM means Rehmat, Hidayat and Ma’rifat — a free Islamic learning space to explore the Holy Quran, Hadith, daily duas, Arabic Qaida and Islamic heritage with care and clear references.",
  applicationName: "RHM Islam 360",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "RHM Islam 360", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    shortcut: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/icon.jpg", type: "image/jpeg" }]
  },
  verification: { google: "oLZJuf2MTIq_Rwi3bvXEFPY202vRZ5_8plMjXqHYdvo" },
  keywords: [
    "RHM Islam 360", "Quran online", "read Quran", "Islamic learning",
    "learn Islam for beginners", "Five Pillars of Islam", "Six Articles of Iman",
    "Hadith library", "Daily duas", "Islamic supplications", "Arabic Qaida lessons", "Islamic history", "famous mosques",
    "Quran Urdu translation"
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "RHM Islam 360",
    title: "RHM Islam 360 | Quran, Islamic Learning & Hadith",
    description: "A journey of Rehmat, Hidayat and Ma’rifat: read the Quran, explore Islamic beliefs, learn Hadith and Arabic basics, and discover Islamic heritage.",
    locale: "en_US",
    images: ["/images/rhm-islam360-quran-hero.webp"]
  },
  twitter: {
    card: "summary_large_image",
    title: "RHM Islam 360 | Quran & Islamic Learning",
    description: "Rehmat, Hidayat & Ma’rifat — read the Quran and explore Islamic learning, Hadith, Qaida and Islamic heritage.",
    images: ["/images/rhm-islam360-quran-hero.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><ThemeProvider>{children}<PwaRegister /></ThemeProvider></body>
    </html>
  );
}