"use client";

import { usePathname } from "next/navigation";

const photos = [
  {
    match: ["/", "/quran", "/quran/offline", "/offline"],
    image: "/images/rhm-islam360-quran-hero.webp",
    alt: "RHM Islam 360 Qur'an learning visual",
    credit: "RHM Islam 360"
  },
  {
    match: ["/hadith", "/sahaba", "/companion", "/tafsir"],
    image: "https://images.unsplash.com/photo-1738762898508-dfca67d1e88a?auto=format&fit=crop&w=1800&q=80",
    alt: "Interior architecture of Al-Masjid an-Nabawi in Madinah",
    credit: "Amien Taryamin / Unsplash"
  },
  {
    match: ["/duas", "/daily-life", "/salah-guide", "/prayer-times", "/worship-tracker"],
    image: "https://www.alriyadh.com/media/article/2025/07/22/img/4009469821.jpeg",
    alt: "Prayer hall inside Al-Masjid an-Nabawi",
    credit: "Al Riyadh"
  },
  {
    match: ["/heritage", "/islamic-calendar", "/discover-islam"],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Prophet%E2%80%99s%20Mosque%20from%20the%20inside.jpg?width=1800",
    alt: "Interior of the Prophet's Mosque",
    credit: "MohmmadRjab / Wikimedia Commons (CC0)"
  },
  {
    match: ["/academy", "/learn", "/qaida", "/explore", "/journey"],
    image: "https://portalcdn.spa.gov.sa/backend/original/202306/yP0Z3rL3LrjdP0P9GfbPAm85luzD6p4PzXsUT954.jpg",
    alt: "Reading room in the Prophet's Mosque library",
    credit: "Saudi Press Agency"
  }
];

const fallback = photos[0];

export default function PageMosqueVisual() {
  const pathname = usePathname() || "/";
  const photo = photos.find((item) => item.match.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(route + "/")
  )) || fallback;

  return (
    <div className="rhm-page-mosque-visual" role="img" aria-label={photo.alt}>
      <div className="rhm-page-mosque-visual__shade" />
      <span className="rhm-page-mosque-visual__brand">RHM ISLAM 360</span>
      <a className="rhm-page-mosque-visual__credit" href={photo.credit.includes("Unsplash") ? "https://unsplash.com/photos/al-masjid-al-nabawi-mosque-in-medina-GSXeIGXxgyw" : photo.credit.includes("Wikimedia") ? "https://commons.wikimedia.org/wiki/File:The_Prophet%E2%80%99s_Mosque_from_the_inside.jpg" : photo.credit.includes("Saudi Press") ? "https://www.spa.gov.sa/b3404caf84h" : photo.credit.includes("Al Riyadh") ? "https://www.alriyadh.com/2142408" : "/"} target="_blank" rel="noreferrer">
        Photo: {photo.credit}
      </a>
      <style jsx>{`
        .rhm-page-mosque-visual{height:clamp(88px,13vw,154px);position:relative;isolation:isolate;overflow:hidden;background-image:url("${photo.image}");background-size:cover;background-position:center 48%;background-color:#173650}
        .rhm-page-mosque-visual__shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,20,32,.58),rgba(5,20,32,.12) 65%,rgba(5,20,32,.32))}
        .rhm-page-mosque-visual__brand{position:absolute;left:clamp(18px,5vw,68px);bottom:19px;color:#fff8e9;font:700 11px/1.2 Arial,sans-serif;letter-spacing:.22em;text-shadow:0 2px 10px #000}
        .rhm-page-mosque-visual__credit{position:absolute;right:clamp(12px,3vw,34px);bottom:13px;color:#fff8e9;font:500 9px/1.4 Arial,sans-serif;text-shadow:0 1px 6px #000;opacity:.9;text-decoration:underline;text-underline-offset:3px}
        @media(max-width:560px){.rhm-page-mosque-visual{height:94px}.rhm-page-mosque-visual__brand{bottom:13px;font-size:9px}.rhm-page-mosque-visual__credit{font-size:8px;max-width:58%;text-align:right}}
      `}</style>
    </div>
  );
}
