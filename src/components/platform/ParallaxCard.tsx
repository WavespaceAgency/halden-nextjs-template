"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./PlatformHero.module.css";

type Props = { className?: string; children: ReactNode };

/**
 * Hero card whose photo drifts gently with the pointer (hover devices only, off with "reduce motion").
 * The pointer position is written to CSS variables on the card; PlatformHero.module.css moves the photo.
 */
export function ParallaxCard({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const set = (x: number, y: number, z: number) => {
      card.style.setProperty("--px", x.toFixed(3));
      card.style.setProperty("--py", y.toFixed(3));
      card.style.setProperty("--pz", String(z));
    };
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1, 1.04);
    };
    const onLeave = () => set(0, 0, 1);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cn(styles.card, className)}>
      {children}
    </div>
  );
}
