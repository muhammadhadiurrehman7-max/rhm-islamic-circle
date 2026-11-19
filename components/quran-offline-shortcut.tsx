"use client";

import { useEffect, useState } from "react";

export default function QuranOfflineShortcut() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.location.pathname === "/quran");
    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  if (!visible) return null;
  return <a href="/quran/offline" aria-label="Open offline Qur'an library" style={{ position: "fixed", right: 18, bottom: 18, zIndex: 40, padding: "12px 16px", borderRadius: 999, background: "#245540", color: "#fff", boxShadow: "0 8px 28px #0003", textDecoration: "none", font: "700 13px Arial,sans-serif" }}>↓ Offline Qur'an</a>;
}
