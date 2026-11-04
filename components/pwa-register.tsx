"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function PwaRegister() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const registerServiceWorker = () => {
      if (!("serviceWorker" in navigator)) return;
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // The website remains usable if offline support cannot be registered.
      });
    };

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      window.addEventListener("load", registerServiceWorker, { once: true });
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (standalone) {
      setInstalled(true);
      return () => window.removeEventListener("load", registerServiceWorker);
    }

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    if (isIos) setShowIosHelp(true);

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setShowIosHelp(false);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("load", registerServiceWorker);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  }

  if (installed) return null;

  if (installPrompt) {
    return (
      <aside className="pwa-install-card" aria-label="Install RHM Islam 360">
        <div>
          <strong>Install RHM Islam 360</strong>
          <span>Open your Islamic learning app from your home screen.</span>
        </div>
        <button type="button" onClick={installApp}>Install app</button>
      </aside>
    );
  }

  if (showIosHelp) {
    return (
      <aside className="pwa-install-card pwa-ios-help" aria-label="Add RHM Islam 360 to your home screen">
        <div>
          <strong>Add to your Home Screen</strong>
          <span>In Safari, tap Share, then choose “Add to Home Screen”.</span>
        </div>
        <button type="button" onClick={() => setShowIosHelp(false)} aria-label="Dismiss install instructions">×</button>
      </aside>
    );
  }

  return null;
}
