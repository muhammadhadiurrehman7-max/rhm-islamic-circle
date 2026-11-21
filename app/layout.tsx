import type { Metadata } from "next";
import "./globals.css";
import "./readability.css";
import "./heritage-palette.css";
import "./visual-polish.css";
import "./accent-colours.css";
import "./contrast-accessibility.css";
import "./accessible-theme-system.css";
import "./design-system-v2.css";
import "./quran-inspired-design.css";
import ThemeProvider from "../components/theme-provider";
import PwaRegister from "../components/pwa-register";
import QuranOfflineShortcut from "../components/quran-offline-shortcut";
import GlobalBackButton from "../components/global-back-button";
import GlobalExploreMenu from "../components/global-explore-menu";

const siteUrl = "https://rhm-islamic-circle.vercel.app";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RHM Islam 360",
  alternateName: "Rehmat, Hidayat & Ma'rifat",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  description: "A free online space for Qur'an reading, Islamic learning, Hadith, daily duas, Arabic foundations and Islamic heritage, with source details where available.",
  knowsAbout: ["Qur'an", "Hadith", "Islamic studies", "Arabic reading", "Islamic history", "Daily supplications"]
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RHM Islam 360",
  alternateName: "RHM — Rehmat, Hidayat & Ma'rifat",
  url: siteUrl,
  inLanguage: ["en", "ur", "ar"],
  publisher: { "@type": "Organization", name: "RHM Islam 360", url: siteUrl }
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RHM Islam 360 | Free Quran, Hadith & Islamic Learning",
    template: "%s | RHM Islam 360",
  },
  description: "Explore the Qur'an, available Urdu and English translations, Hadith collections, daily duas, Arabic Qaida and Islamic heritage in a free online learning space. Learn at your own pace, with source details where available.",
  applicationName: "RHM Islam 360",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "RHM Islam 360", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }]
  },
  verification: { google: "oLZJuf2MTIq_Rwi3bvXEFPY202vRZ5_8plMjXqHYdvo" },
  keywords: [
    "RHM Islam 360", "Quran online", "read Quran online", "Quran Urdu translation",
    "free Islamic learning", "learn Islam for beginners", "Hadith in Urdu",
    "daily duas with references", "Arabic Qaida lessons", "Islamic history",
    "Quran recitation", "Islamic studies"
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "RHM Islam 360",
    title: "RHM Islam 360 | Free Quran & Islamic Learning",
    description: "Read the Qur'an, explore Hadith and daily duas, learn Arabic foundations and discover Islamic heritage in one free learning space.",
    locale: "en_US",
    images: [{ url: "/images/rhm-islam360-quran-hero.webp", width: 1200, height: 630, alt: "RHM Islam 360 — Qur'an and Islamic learning" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "RHM Islam 360 | Free Quran & Islamic Learning",
    description: "Read the Qur'an and explore Hadith, duas, Arabic foundations and Islamic heritage.",
    images: ["/images/rhm-islam360-quran-hero.webp"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GlobalBackButton />
          <GlobalExploreMenu />
          {children}
          <PwaRegister />
          <QuranOfflineShortcut />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]).replace(/</g, "\\u003c") }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
