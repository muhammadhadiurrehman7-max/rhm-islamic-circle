"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const HISTORY_KEY = "rhm-internal-navigation-history";

export default function GlobalBackButton() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(HISTORY_KEY);
      const stack: string[] = stored ? JSON.parse(stored) : [];
      const current = pathname || "/";
      if (stack[stack.length - 1] !== current) {
        if (stack.length > 1 && stack[stack.length - 2] === current) {
          stack.pop();
        } else {
          stack.push(current);
        }
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(stack.slice(-40)));
      }
    } catch {
      // Browser storage may be unavailable; the button still has a safe home fallback.
    }
  }, [pathname]);

  const goBack = useCallback(() => {
    try {
      const stored = sessionStorage.getItem(HISTORY_KEY);
      const stack: string[] = stored ? JSON.parse(stored) : [];
      if (stack.length > 1) {
        stack.pop();
        const previous = stack[stack.length - 1];
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(stack));
        if (previous && previous.startsWith("/") && !previous.startsWith("//")) {
          router.push(previous);
          return;
        }
      }
    } catch {
      // Fall through to the home route if history cannot be read.
    }
    router.push("/");
  }, [router]);

  return (
    <button type="button" className="rhm-global-back" onClick={goBack} aria-label="Go back to the previous RHM page">
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </button>
  );
}
