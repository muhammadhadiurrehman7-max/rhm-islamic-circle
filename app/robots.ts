import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/login",
          "/forgot-password",
          "/reset-password",
          "/offline",
          "/journey",
          "/worship-tracker",
        ],
      },
    ],
    sitemap: "https://rhm-islamic-circle.vercel.app/sitemap.xml",
    host: "https://rhm-islamic-circle.vercel.app",
  };
}
