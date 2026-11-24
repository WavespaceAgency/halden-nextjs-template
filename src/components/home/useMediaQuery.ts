"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Live result of a CSS media query. `null` on the server and during hydration,
 * so the first client render matches the server HTML; the real value follows right after.
 */
export function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => null,
  );
}
