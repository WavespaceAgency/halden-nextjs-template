"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is on screen and the browser tab is visible.
 * Looping animations use it to pause when nobody can see them.
 * Starts as `true`, so the server HTML and the first client render match.
 */
export function usePlaying(ref: RefObject<Element | null>) {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return onScreen && tabVisible;
}

/** True when the visitor asked for reduced motion (read inside effects only). */
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
