"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  /** The article (server-rendered). */
  children: ReactNode;
};

/**
 * The article section plus a thin brand bar at the top of the window that fills while
 * you read it (transform only, rAF-throttled scroll listener).
 */
export function ReadingProgress({ className, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = sectionRef.current;
    const bar = barRef.current;
    const fill = fillRef.current;
    if (!body || !bar || !fill) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = body.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      fill.style.transform = `scaleX(${p})`;
      bar.style.opacity = p > 0 ? "1" : "0";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] opacity-0 transition-opacity duration-400" aria-hidden="true">
        <div ref={fillRef} className="size-full origin-left bg-linear-to-r from-brand to-[#7baff9] shadow-[0_0_12px_rgb(44_103_246/0.45)]" style={{ transform: "scaleX(0)" }} />
      </div>
      <section ref={sectionRef} className={className}>
        {children}
      </section>
    </>
  );
}
