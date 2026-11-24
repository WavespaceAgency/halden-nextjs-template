"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion, usePlaying } from "./usePlaying";

/** Length of one "request" travelling through the diagram (ms). */
const LOOP = 4200;
/** The loop starts once the appear sequence is done (ms). */
const START = 2300;
const EASE = "cubic-bezier(0.45, 0, 0.55, 1)";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * Wraps the hero flow drawing and runs its signal loop with the Web Animations API:
 * light pulses travel along the connectors ([data-pulse], `offset-path`) and nodes flash
 * when a pulse arrives ([data-flash]). Timings come from data-start / data-travel / data-at
 * (ms inside the 4.2s loop). Paused off screen and in hidden tabs; off with reduced motion.
 */
export function FlowSignals({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const anims = useRef<Animation[]>([]);
  const playing = usePlaying(ref);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion() || !CSS.supports("offset-path", 'path("M0 0H1")')) return;
    const timing = { duration: LOOP, iterations: Infinity, delay: START };

    const pulses = Array.from(root.querySelectorAll<HTMLElement>("[data-pulse]")).map((p) => {
      const a = Number(p.dataset.start) / LOOP;
      const b = (Number(p.dataset.start) + Number(p.dataset.travel)) / LOOP;
      return p.animate(
        [
          { offset: 0, offsetDistance: "0%", opacity: 0 },
          { offset: a, offsetDistance: "0%", opacity: 0, easing: EASE },
          { offset: a + (b - a) * 0.2, opacity: 1 },
          { offset: a + (b - a) * 0.8, opacity: 1 },
          { offset: b, offsetDistance: "100%", opacity: 0 },
          { offset: 1, offsetDistance: "100%", opacity: 0 },
        ],
        timing,
      );
    });
    const flashes = Array.from(root.querySelectorAll<HTMLElement>("[data-flash]")).map((f) => {
      const a = Number(f.dataset.at) / LOOP;
      return f.animate(
        [
          { offset: 0, opacity: 0 },
          { offset: a, opacity: 0 },
          { offset: a + 120 / LOOP, opacity: 1, easing: "ease-out" },
          { offset: Math.min(1, a + 650 / LOOP), opacity: 0 },
          { offset: 1, opacity: 0 },
        ],
        timing,
      );
    });
    anims.current = [...pulses, ...flashes];
    return () => {
      anims.current.forEach((a) => a.cancel());
      anims.current = [];
    };
  }, []);

  useEffect(() => {
    anims.current.forEach((a) => (playing ? a.play() : a.pause()));
  }, [playing]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
