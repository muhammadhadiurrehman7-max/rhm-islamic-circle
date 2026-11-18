import type { MetadataRoute } from "next";

const siteUrl = "https://rhm-islamic-circle.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/learn", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/academy", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/learn/what-is-islam", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/learn/five-pillars", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/learn/six-articles", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/learn/quran-sunnah", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/learn/character", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/quran", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/hadith", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/duas", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/qaida", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/daily-life", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/prayer-times", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/names-of-allah", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/worship-tracker", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/journey", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/heritage", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/discover-islam", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/donate", priority: 0.4, changeFrequency: "monthly" as const },
  ];
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
