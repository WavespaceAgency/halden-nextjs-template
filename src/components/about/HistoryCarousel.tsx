"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./History.module.css";

type Props = {
  /** Card contents (server-rendered), one per milestone. */
  cards: ReactNode[];
  /** Card centred on load. */
  start: number;
  /** Seconds between automatic steps (0 = off). */
  autoplay: number;
  labels: { region: string; prev: string; next: string; pause: string };
};

/** Dial ticks: every 4°, 29 on each side of the centre; opacity fades towards the ends (Figma values). */
const fade = [0.72, 0.718, 0.712, 0.702, 0.688, 0.67, 0.649, 0.624, 0.596, 0.566, 0.533, 0.498, 0.462, 0.424, 0.386, 0.347, 0.309, 0.272, 0.236, 0.202, 0.172, 0.142, 0.114, 0.09, 0.07, 0.05, 0.035, 0.025, 0.015, 0.01];
const ticks = Array.from({ length: 59 }, (_, k) => k - 29).filter((k) => k !== 0);
const GAP = 24;

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * The "Company History" timeline: a dial of ticks above a sliding row of cards.
 * The centre card sits on a blue spotlight; the track moves one card per step and the
 * dial turns 4° (Framer). Steps: prev / next buttons, ←/→ keys, mouse drag or touch swipe
 * (track and dial follow the pointer, then snap; a flick counts), a click on a side card,
 * and autoplay – which can be stopped with the Pause button (WCAG 2.2.2) and otherwise runs
 * only while the timeline is on screen, the tab is visible and
 * nobody is hovering or focused inside it, and never with "reduce motion".
 */
export function HistoryCarousel({ cards, start, autoplay, labels }: Props) {
  const count = cards.length;
  const [index, setIndex] = useState(start);
  const [release, setRelease] = useState(false);
  const [dragging, setDragging] = useState(false);
  /** Dial position (in steps from the start card) while dragging; null = follow `index`. */
  const [dragPos, setDragPos] = useState<number | null>(null);
  /** Autoplay stopped by the visitor (Pause button) until they press Play. */
  const [stopped, setStopped] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, active: false, moved: false, x0: 0, y0: 0, dx: 0, t0: 0 });
  const firstRender = useRef(true);

  const go = (next: number, afterDrag = false) => {
    setRelease(afterDrag);
    setIndex(((next % count) + count) % count);
  };

  // The spotlight gives a small spring pulse on every step.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (reduceMotion()) return;
    const pulse = spotlightRef.current?.animate({ scale: [1, 0.97, 1] }, { duration: 700, easing: "cubic-bezier(0.34, 1.45, 0.64, 1)" });
    return () => pulse?.cancel();
  }, [index]);

  // Autoplay: only while on screen, the tab is visible and nobody hovers or focuses the timeline.
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || !autoplay || stopped || reduceMotion()) return;
    let timer = 0;
    let visible = false;
    let hovered = false;
    let focused = false;
    const restart = () => {
      window.clearInterval(timer);
      if (!visible || hovered || focused || document.hidden) return;
      timer = window.setInterval(() => {
        setRelease(false);
        setIndex((i) => (i + 1) % count);
      }, autoplay * 1000);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    io.observe(root);
    const set = (apply: () => void) => () => {
      apply();
      restart();
    };
    const enter = set(() => (hovered = true));
    const leave = set(() => (hovered = false));
    const focusIn = set(() => (focused = true));
    const focusOut = set(() => (focused = false));
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focusIn);
    root.addEventListener("focusout", focusOut);
    document.addEventListener("visibilitychange", restart);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focusIn);
      root.removeEventListener("focusout", focusOut);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [autoplay, count, stopped]);

  /** Width of one step (card + gap) in px. */
  const stepPx = () => (stageRef.current?.querySelector("li")?.offsetWidth ?? 340) + GAP;

  /** Track and dial follow the pointer while dragging (CSS variables, no re-render per frame). */
  const setDrag = (px: number) => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--drag", `${px}px`);
    root.style.setProperty("--dd", `${(px / stepPx()) * 4}deg`);
    const pos = Math.round(index - px / stepPx() - start);
    setDragPos((current) => (current === pos ? current : pos));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { down: true, active: false, moved: false, x0: e.clientX, y0: e.clientY, dx: 0, t0: performance.now() };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    d.dx = e.clientX - d.x0;
    const dy = e.clientY - d.y0;
    if (!d.active) {
      if (Math.abs(d.dx) < 6 || Math.abs(d.dx) < Math.abs(dy)) {
        if (Math.abs(dy) > 10) d.down = false; // vertical scroll wins
        return;
      }
      d.active = true;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    setDrag(d.dx);
  };

  const endDrag = (cancel: boolean) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (!d.active) return;
    d.active = false;
    const step = stepPx();
    const speed = d.dx / Math.max(1, performance.now() - d.t0); // px per ms
    let steps = Math.round(-d.dx / step);
    if (!cancel && steps === 0 && (Math.abs(d.dx) > 50 || Math.abs(speed) > 0.4)) steps = d.dx < 0 ? 1 : -1;
    rootRef.current?.style.setProperty("--drag", "0px");
    rootRef.current?.style.setProperty("--dd", "0deg");
    setDragging(false);
    setDragPos(null);
    go(index + (cancel ? 0 : steps), true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") go(index - 1);
    else if (e.key === "ArrowRight") go(index + 1);
  };

  const centre = dragPos ?? index - start;

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      data-release={release ? "" : undefined}
      data-dragging={dragging ? "" : undefined}
      style={{ "--i": index, "--start": start } as CSSProperties}
      onKeyDown={onKeyDown}
    >
      <div
        ref={stageRef}
        className={cn(styles.stage, "relative mt-[170px] lg:mt-[241px]")}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.region}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => endDrag(false)}
        onPointerCancel={() => endDrag(true)}
      >
        <svg className={cn(styles.dial, "pointer-events-none absolute left-1/2 size-[1000px]")} viewBox="-500 -500 1000 1000" fill="none" aria-hidden="true">
          {ticks.map((k) => {
            const d = Math.abs(k - centre) + 1;
            return (
              <line
                key={k}
                className={styles.tick}
                data-hl={d <= 3 ? d : undefined}
                x1="0"
                y1="400"
                x2="0"
                y2="428"
                strokeOpacity={fade[Math.abs(k)]}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ "--a": `${k * 4}deg` } as CSSProperties}
              />
            );
          })}
          <line x1="0" y1="400" x2="0" y2="464" stroke="#2c67f6" strokeWidth="3" strokeLinecap="round" />
        </svg>

        <div ref={spotlightRef} className={cn(styles.spotlight, "absolute top-0 left-1/2 h-full -translate-x-1/2 rounded-[28px] bg-white/95")} aria-hidden="true" />

        <ol className={cn(styles.track, "relative ml-[50%] flex w-max gap-6")}>
          {cards.map((card, i) => (
            <li
              key={i}
              className={cn(styles.card, "flex min-h-[312px] shrink-0 flex-col rounded-[28px] border border-white/90 bg-white/70 px-[23px] py-[31px] select-none sm:px-[29px]")}
              data-far={Math.abs(i - index) > 1 ? "" : undefined}
              aria-current={i === index ? "true" : undefined}
              onClick={() => {
                if (!drag.current.moved && i !== index) go(i);
              }}
            >
              {card}
            </li>
          ))}
        </ol>
      </div>

      <div className="relative flex justify-center gap-3 pt-14 pb-16 lg:pb-[100px]">
        <button
          type="button"
          className={cn(styles.navBtn, "flex size-12 items-center justify-center rounded-full bg-sky-tint text-lg font-medium text-ink hover:bg-sky")}
          aria-label={labels.prev}
          onClick={() => go(index - 1)}
        >
          <span className={styles.arrow} aria-hidden="true" style={{ "--nudge": "-3px" } as CSSProperties}>
            ←
          </span>
        </button>
        <button
          type="button"
          className={cn(styles.navBtn, "flex size-12 items-center justify-center rounded-full bg-brand text-lg font-medium text-white hover:bg-brand-hover")}
          aria-label={labels.next}
          onClick={() => go(index + 1)}
        >
          <span className={styles.arrow} aria-hidden="true" style={{ "--nudge": "3px" } as CSSProperties}>
            →
          </span>
        </button>
        {autoplay > 0 && (
          // Sits to the right of the centred prev / next pair without moving it. Hidden without
          // JavaScript and with "reduce motion", where autoplay never runs.
          <button
            type="button"
            className={cn(
              styles.navBtn,
              "absolute top-14 left-[calc(50%+66px)] flex size-12 items-center justify-center rounded-full border border-ink-2/12 bg-white/60 text-ink hover:bg-sky-tint motion-reduce:hidden [html:not(.js)_&]:hidden",
            )}
            aria-label={labels.pause}
            aria-pressed={stopped}
            onClick={() => setStopped((value) => !value)}
          >
            {stopped ? (
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-no-draw>
                <path d="M5 3.2v9.6a.6.6 0 0 0 .92.5l7.2-4.8a.6.6 0 0 0 0-1L5.92 2.7A.6.6 0 0 0 5 3.2Z" />
              </svg>
            ) : (
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-no-draw>
                <rect x="4" y="3" width="2.6" height="10" rx="1" />
                <rect x="9.4" y="3" width="2.6" height="10" rx="1" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
