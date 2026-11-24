"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { scrollToY } from "@/components/motion/SmoothScroll";
import { useMediaQuery } from "./useMediaQuery";

/**
 * How the steps are shown:
 *   "init"   server HTML and first render (CSS already shows the right layout, step 1 active)
 *   "stack"  phones/tablets: every step stacked
 *   "tabs"   tabs, one step at a time (desktop, or every width with `tabsOnMobile`)
 *   "scroll" tabs + the stage sticks and the steps switch while scrolling (desktop, motion allowed)
 */
export type StepsMode = "init" | "stack" | "tabs" | "scroll";

type Options = {
  count: number;
  /** Scroll distance per step in scroll mode (px). */
  step: number;
  /** Wrapper that gets the extra scroll height (its top padding is skipped). */
  trackRef: RefObject<HTMLElement | null>;
  /** The part that sticks (CSS gives it `position: sticky` and `top`). */
  stageRef: RefObject<HTMLElement | null>;
  /** Use tabs on every width, not only on desktop. */
  tabsOnMobile?: boolean;
};

const keyMoves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/**
 * Scroll-driven tabs for the home page ("How it works", "Security"), like the Framer site.
 * The layout of each mode lives in CSS (media queries + `html.js`), so nothing shifts on
 * hydration; this hook only tracks the active step and the scroll position.
 * Tabs follow the WAI-ARIA pattern: arrow keys, Home and End move between them.
 */
export function useScrollSteps({ count, step, trackRef, stageRef, tabsOnMobile = false }: Options) {
  const [active, setActive] = useState(0);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mode: StepsMode = desktop === null ? "init" : desktop ? (reduce ? "tabs" : "scroll") : tabsOnMobile ? "tabs" : "stack";
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Scroll distance since the stage started sticking. */
  const progress = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return 0;
    const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
    return stickyTop - (track.getBoundingClientRect().top + (parseFloat(getComputedStyle(track).paddingTop) || 0));
  }, [trackRef, stageRef]);

  // Scroll mode: the step under the scroll position becomes active.
  useEffect(() => {
    if (mode !== "scroll") return;
    const onScroll = () => setActive(Math.max(0, Math.min(count - 1, Math.floor((progress() + step / 2) / step))));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, count, step, progress]);

  /** Show step `i` (in scroll mode: scroll to it). */
  const go = (i: number, focus = false) => {
    if (mode === "scroll") scrollToY(window.scrollY - progress() + i * step + 1);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  /** Props for tab `i`: role, selection, roving tabindex, click and arrow keys. */
  const tabProps = (i: number, id: string, panelId: string) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabRefs.current[i] = el;
    },
    type: "button" as const,
    role: "tab",
    id,
    "aria-controls": panelId,
    "aria-selected": i === active,
    tabIndex: i === active ? 0 : -1,
    onClick: () => go(i),
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
      let next = -1;
      if (e.key in keyMoves) next = (i + keyMoves[e.key] + count) % count;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = count - 1;
      if (next < 0) return;
      e.preventDefault();
      go(next, true);
    },
  });

  return { active, mode, tabProps };
}
