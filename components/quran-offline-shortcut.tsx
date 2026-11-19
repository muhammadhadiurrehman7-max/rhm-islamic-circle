"use client";

import { usePathname } from "next/navigation";

export default function QuranOfflineShortcut() {
  const pathname = usePathname();
  if (pathname !== "/quran") return null;
  return <a href="/quran/offline" aria-label="Open offline Qur'an library" style={{ position: "fixed", right: 18, bottom: 18, zIndex: 40, padding: "12px 16px", borderRadius: 999, background: "#245540", color: "#fff", boxShadow: "0 8px 28px #0003", textDecoration: "none", font: "700 13px Arial,sans-serif" }}>↓ Offline Qur'an</a>;
}
