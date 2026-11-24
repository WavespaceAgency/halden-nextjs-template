"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** The digits to show, e.g. "404". */
  code: string;
  className?: string;
};

/**
 * The big "404" digits (decorative, hidden from screen readers). With a mouse they
 * lean away from the pointer anywhere over the parent section; the float loop pauses
 * off screen and in hidden tabs. Nothing moves with "reduce motion" (CSS).
 */
export function DigitsParallax({ code, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = true;
    const sync = () => el.toggleAttribute("data-paused", !onScreen || document.hidden);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    const cleanup = () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };

    // The pointer area is the whole hero, which is this component's parent element.
    const area = el.parentElement;
    if (!area || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover) and (pointer: fine)").matches) return cleanup;

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = area.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--px", (-x * 14).toFixed(2));
        el.style.setProperty("--py", (-y * 10).toFixed(2));
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      cleanup();
      cancelAnimationFrame(frame);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <p ref={ref} className={cn("nf-code", className)} aria-hidden="true">
      {Array.from(code).map((digit, i) => (
        <span key={i} className="nf-digit" style={{ "--i": i } as CSSProperties}>
          <span className="nf-float">
            <span className="nf-glyph bg-linear-to-b from-ink-2 to-brand bg-clip-text text-transparent">{digit}</span>
          </span>
        </span>
      ))}
    </p>
  );
}
