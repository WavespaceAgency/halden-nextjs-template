"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./AboutHero.module.css";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * The About hero's <section> with its decorative layer: two glows drift slowly
 * (paused off screen and in hidden tabs) and a soft light eases after the pointer
 * (mouse / pen only). Nothing moves with "reduce motion". The content is passed in
 * as server-rendered children.
 */
export function HeroLight({ className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    // Pause the drifting glows when nobody can see them.
    let onScreen = true;
    const sync = () => hero.toggleAttribute("data-paused", !onScreen || document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(hero);
    document.addEventListener("visibilitychange", sync);

    const cleanup = () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches) return cleanup;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const step = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      hero.style.setProperty("--px", `${x.toFixed(1)}px`);
      hero.style.setProperty("--py", `${y.toFixed(1)}px`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0;
    };
    const target = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const enter = (e: PointerEvent) => {
      target(e);
      x = tx;
      y = ty;
      cancelAnimationFrame(raf);
      step();
      hero.setAttribute("data-lit", "");
    };
    const move = (e: PointerEvent) => {
      target(e);
      if (!raf) raf = requestAnimationFrame(step);
    };
    const leave = () => hero.removeAttribute("data-lit");
    hero.addEventListener("pointerenter", enter);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);

    return () => {
      cleanup();
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointerenter", enter);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={ref} className={cn(styles.hero, "relative isolate overflow-hidden", className)}>
      <div className={cn(styles.fx, "pointer-events-none absolute inset-0 -z-10")} aria-hidden="true">
        <span className={cn(styles.drift, styles.driftA)} />
        <span className={cn(styles.drift, styles.driftB)} />
        <span className={styles.light} />
      </div>
      {children}
    </section>
  );
}
