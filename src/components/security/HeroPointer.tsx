"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

/**
 * The hero card. On desktop (fine pointer, motion allowed) it tracks the pointer and eases
 * four CSS variables in requestAnimationFrame: --px/--py (-1…1, photo parallax) and
 * --mx/--my (px, the soft light). `data-pointer` is set while the pointer is over the card.
 * The styles live in PageHero.module.css; touch devices and "reduce motion" get a static card.
 */
export function HeroPointer({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let mx = 0;
    let my = 0;
    let smx = 0;
    let smy = 0;
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
      card.setAttribute("data-pointer", "");
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
      tx = 0;
      ty = 0;
      card.removeAttribute("data-pointer");
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
