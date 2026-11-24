"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "./usePlaying";

type Key = [x: number, y: number, scale: number];

/** Scroll distance (px into the section) of each keyframe. The middle one is the Figma layout. */
const STOPS = [0, 275, 550, 825, 1100];

/** Framer scroll keyframes per collage piece (matched by data-m): [x, y, scale] at each stop. */
const MOTION: Record<string, Key[]> = {
  reader: [[107, 310, 0.82], [9, 163, 0.91], [0, 0, 1], [91, -158, 1.05], [279, -289, 1.1]],
  family: [[-380, 136, 0.82], [-211, 42, 0.91], [0, 0, 1], [227, 21, 1.05], [440, 107, 1.1]],
  hands: [[-215, -238, 0.82], [-73, -134, 0.91], [0, 0, 1], [-12, 149, 1.05], [-116, 295, 1.1]],
  corridor: [[-445, -60, 0.82], [-215, -61, 0.91], [0, 0, 1], [168, 120, 1.05], [261, 289, 1.1]],
  callLog: [[-25, 269, 0.82], [-52, 133, 0.91], [0, 0, 1], [131, -112, 1.05], [330, -187, 1.1]],
  insurance: [[-299, -224, 0.82], [-118, -133, 0.91], [0, 0, 1], [31, 161, 1.05], [-36, 331, 1.1]],
  weekly: [[227, -102, 0.82], [129, -36, 0.91], [0, 0, 1], [-145, -3, 1.05], [-288, -48, 1.1]],
  refill: [[459, 132, 0.82], [211, 98, 0.91], [0, 0, 1], [-142, -154, 1.05], [-189, -349, 1.1]],
};

/** Keyframe value at scroll position `s` (linear between stops, clamped at both ends). */
function target(keys: Key[], s: number): Key {
  if (s <= STOPS[0]) return keys[0];
  for (let i = 1; i < STOPS.length; i++) {
    if (s <= STOPS[i]) {
      const t = (s - STOPS[i - 1]) / (STOPS[i] - STOPS[i - 1]);
      const a = keys[i - 1];
      const b = keys[i];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }
  }
  return keys[keys.length - 1];
}

type Props = {
  className?: string;
  labelledBy: string;
  children: ReactNode;
};

/**
 * The "98%" section element with its scroll-linked collage (desktop, motion allowed), like Framer:
 * the stage sticks while you scroll 1100px (CSS in resolved.css) and every [data-m] piece glides
 * from the centre to its place and past it. The scroll value is eased like Framer's spring.
 * Runs in requestAnimationFrame only while something moves.
 */
export function ResolvedStage({ className, labelledBy, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const items = Array.from(section.querySelectorAll<HTMLElement>("[data-m]")).flatMap((el) => {
      const keys = MOTION[el.dataset.m ?? ""];
      return keys ? [{ el, keys, cur: null as Key | null }] : [];
    });

    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      raf = 0;
      if (!desktop.matches) {
        items.forEach((it) => {
          it.el.style.transform = "";
          it.cur = null;
        });
        return;
      }
      // Framer smooths the scroll value with a spring (stiffness 200, damping 45): ease towards the target.
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1;
      last = now;
      const k = 1 - Math.exp(-dt * 9);
      const s = -section.getBoundingClientRect().top;
      let moving = false;
      for (const it of items) {
        const t = target(it.keys, s);
        if (!it.cur) it.cur = [...t];
        else
          for (let i = 0; i < 3; i++) {
            it.cur[i] += (t[i] - it.cur[i]) * k;
            if (Math.abs(t[i] - it.cur[i]) > (i === 2 ? 0.0005 : 0.1)) moving = true;
          }
        it.el.style.transform = `translate(${it.cur[0].toFixed(2)}px, ${it.cur[1].toFixed(2)}px) scale(${it.cur[2].toFixed(4)})`;
      }
      if (moving) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    request();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, []);

  return (
    <section ref={ref} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
