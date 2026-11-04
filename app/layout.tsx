import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/theme-provider";
import PwaRegister from "../components/pwa-register";

const siteUrl = "https://rhm-islamic-circle.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RHM Islamic Circle | Quran, Islamic Learning & Hadith",
    template: "%s | RHM Islamic Circle",
  },
  description: "Explore the Holy Quran, learn Islam, study the Five Pillars and Articles of Iman, read Hadith, begin Arabic Qaida lessons, and discover famous mosques with RHM Islamic Circle.",
  applicationName: "RHM Islamic Circle",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "RHM Islamic Circle", statusBarStyle: "default" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  verification: { google: "oLZJuf2MTIq_Rwi3bvXEFPY202vRZ5_8plMjXqHYdvo" },
  keywords: [
    "RHM Islamic Circle",
    "Quran online",
    "read Quran",
    "Islamic learning",
    "learn Islam for beginners",
    "Five Pillars of Islam",
    "Six Articles of Iman",
    "Hadith library",
    "Arabic Qaida lessons",
    "Islamic history",
    "famous mosques",
    "Quran Urdu translation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "RHM Islamic Circle",
    title: "RHM Islamic Circle | Quran, Islamic Learning & Hadith",
    description: "A welcoming online space to read the Quran, explore Islamic beliefs, learn Hadith and Arabic basics, and discover Islamic heritage.",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "RHM Islamic Circle | Quran & Islamic Learning",
    description: "Read the Quran and explore Islamic learning, Hadith, Qaida and Islamic heritage.",
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
