"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Tracks an element for scroll-triggered motion:
 *   started – true once `threshold` of it has been in view (stays true)
 *   visible – true while any part of it is on screen
 *   paused  – true while it is off-screen or the browser tab is hidden (pause loops then)
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.35) {
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) setStarted(true);
      },
      { threshold: [0, threshold] },
    );
    io.observe(el);
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref, threshold]);

  return { started, visible, paused: !visible || tabHidden };
}
