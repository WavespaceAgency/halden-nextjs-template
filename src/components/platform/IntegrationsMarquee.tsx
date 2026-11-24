"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";
import styles from "./Integrations.module.css";

export type Integration = { name: string; category: string; color: string };

type Props = {
  rows: Integration[][];
  /** Pixels per second (Framer: 40). */
  speed: number;
  listLabel: string;
  pauseLabel: string;
  playLabel: string;
};

const darkMarks = new Set(["#2c67f6", "#0c1a2f"]);
const COPIES = [0, 1, 2];
const GAP = 16;

/**
 * Two endless rows of integration cards (first row scrolls left, second right), faded at both edges.
 * Only the first copy of each list is read by screen readers. The duration is measured so the rows
 * move at `speed` px/s. Hovering a row eases it to a stop (and back). The rows pause off-screen,
 * when the tab is hidden, and with the pause button (shown on keyboard focus). Still with "reduce motion".
 */
export function IntegrationsMarquee({ rows, speed, listLabel, pauseLabel, playLabel }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLUListElement | null)[]>([]);
  const { paused: offscreen } = useInView(wrap, 0);
  const [stopped, setStopped] = useState(false);

  // Duration = width of one copy / speed (after the fonts have loaded, and on resize).
  useEffect(() => {
    const update = () =>
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const cycle = (row.scrollWidth + GAP) / COPIES.length;
        row.style.setProperty("--marquee-duration", `${(cycle / speed).toFixed(2)}s`);
      });
    update();
    let alive = true;
    document.fonts?.ready.then(() => alive && update());
    const ro = new ResizeObserver(update);
    rowRefs.current.forEach((row) => row && ro.observe(row));
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [speed]);

  // Hover: ease the row's speed down to 0 and back up instead of a hard pause.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    const cleanups = rowRefs.current.map((row) => {
      if (!row) return () => {};
      let frame = 0;
      const ease = (to: number) => {
        cancelAnimationFrame(frame);
        const anims = row.getAnimations();
        if (!anims.length) return;
        const from = anims[0].playbackRate;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / 450);
          const rate = from + (to - from) * (1 - Math.pow(1 - t, 3));
          anims.forEach((a) => (a.playbackRate = Math.max(rate, 0.0001)));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      };
      const onEnter = () => ease(0);
      const onLeave = () => ease(1);
      row.addEventListener("pointerenter", onEnter);
      row.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(frame);
        row.removeEventListener("pointerenter", onEnter);
        row.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div ref={wrap} className={cn("relative mt-12 flex flex-col gap-4 overflow-hidden py-2 lg:mt-16", (offscreen || stopped) && styles.paused)}>
      {rows.map((row, r) => (
        <ul
          key={r}
          ref={(el) => {
            rowRefs.current[r] = el;
          }}
          className={cn(styles.row, r === 1 && styles.reverse, "flex w-max gap-4")}
          aria-label={listLabel}
        >
          {COPIES.flatMap((copy) =>
            row.map((item) => (
              <li
                key={`${copy}-${item.name}`}
                className={cn(styles.chip, "flex h-[72px] shrink-0 items-center gap-[14px] rounded-[20px] bg-white py-3 pr-7 pl-3 shadow-[0_2px_8px_0_rgb(12_26_47/0.04)]")}
                aria-hidden={copy > 0 ? true : undefined}
              >
                <span
                  className={cn("flex size-12 items-center justify-center rounded-[14px] text-xl leading-6 font-medium", darkMarks.has(item.color) ? "text-white" : "text-ink-2")}
                  style={{ background: item.color }}
                  aria-hidden="true"
                >
                  {item.name.charAt(0)}
                </span>
                <span className="flex flex-col gap-0.5 whitespace-nowrap">
                  <span className="text-lg leading-6 font-medium tracking-[-0.01em] text-ink">{item.name}</span>
                  <span className="text-sm leading-5 text-muted">{item.category}</span>
                </span>
              </li>
            )),
          )}
        </ul>
      ))}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-canvas to-transparent sm:w-[200px]" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-canvas to-transparent sm:w-[200px]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setStopped((s) => !s)}
        aria-pressed={stopped}
        className="absolute top-2 right-4 z-10 min-h-11 -translate-y-[200%] rounded-full bg-ink-2 px-4 text-sm font-medium text-canvas opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100 motion-reduce:hidden"
      >
        {stopped ? playLabel : pauseLabel}
      </button>
    </div>
  );
}
