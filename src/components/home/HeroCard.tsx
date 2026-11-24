"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import loopStyles from "./LoopZone.module.css";
import { prefersReducedMotion, usePlaying } from "./usePlaying";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * The dark hero card. Adds two things on top of the server-rendered content:
 *   - desktop (hover + fine pointer): a soft light follows the pointer and the photo, glows and
 *     flow diagram shift a few pixels (eased in requestAnimationFrame, CSS vars --mx/--my/--px/--py)
 *   - the glow and waveform loops pause while the card is off screen or the tab is hidden
 */
export function HeroCard({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const playing = usePlaying(ref);
  const [pointer, setPointer] = useState(false);

  useEffect(() => {
    const card = ref.current;
    if (!card || prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // Targets (t*, m*) and eased values (c*, sm*).
    let tx = 0, ty = 0, cx = 0, cy = 0, mx = 0, my = 0, smx = 0, smy = 0;
    let raf = 0;
    const step = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      smx += (mx - smx) * 0.14;
      smy += (my - smy) * 0.14;
      card.style.setProperty("--px", cx.toFixed(4));
      card.style.setProperty("--py", cy.toFixed(4));
      card.style.setProperty("--mx", `${smx.toFixed(1)}px`);
      card.style.setProperty("--my", `${smy.toFixed(1)}px`);
      const still = Math.abs(tx - cx) < 0.001 && Math.abs(ty - cy) < 0.001 && Math.abs(mx - smx) < 0.5 && Math.abs(my - smy) < 0.5;
      raf = still ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onEnter = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      smx = mx = e.clientX - r.left;
      smy = my = e.clientY - r.top;
      setPointer(true);
    };
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      tx = (mx / r.width) * 2 - 1;
      ty = (my / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      tx = ty = 0;
      setPointer(false);
      kick();
    };
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cn(loopStyles.zone, className)} data-pointer={pointer ? "" : undefined} data-paused={playing ? undefined : ""}>
      {children}
    </div>
  );
}
