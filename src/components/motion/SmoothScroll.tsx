"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Scroll the page to `y` px – eased with Lenis when it runs, native otherwise. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

/** Stop page scrolling (open menus, dialogs). */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) instance?.stop();
  else instance?.start();
}

/**
 * Eased mouse-wheel scrolling with Lenis, as on the Framer build. Touch scrolling stays native.
 * Off when the visitor prefers reduced motion. The real page scroll position is used, so sticky
 * sections, scroll-linked animations and anchors keep working. Turn it off in src/config/site.ts.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: true, autoRaf: true });
    instance = lenis;

    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      lenis.destroy();
      instance = null;
    };
    reduce.addEventListener("change", onChange);

    return () => {
      reduce.removeEventListener("change", onChange);
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
