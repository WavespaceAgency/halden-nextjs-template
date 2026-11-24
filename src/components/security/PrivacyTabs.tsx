"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./Privacy.module.css";

type Props = {
  /** Accessible name of the tab list. */
  label: string;
  /** Tab labels, in order. */
  tabs: string[];
  /** Server-rendered content of each tab panel (same order as `tabs`). */
  panels: ReactNode[];
  /** Server-rendered status card for each step (same order as `tabs`). */
  cards: ReactNode[];
};

/** Glass blades of the fan: rotated around their bottom centre, 12° apart. */
const BLADES = Array.from({ length: 15 }, (_, i) => -84 + i * 12);

/**
 * Interactive part of the Privacy section: a vertical WAI-ARIA tab list (click, arrow keys,
 * Home/End) that swaps the step text and the status card over the glass fan.
 *
 * Motion (skipped with "reduce motion"): on first view the card rows play in and the fan
 * unfolds; afterwards, on desktop, the fan leans towards the pointer and lifts the blades
 * nearest to it (eased in requestAnimationFrame, idle when still).
 * Without JavaScript the first step is shown.
 */
export function PrivacyTabs({ label, tabs, panels, cards }: Props) {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState(false);
  const [live, setLive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const stemRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bladeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // First view: play the card and unfold the fan, then let the pointer move it.
  useEffect(() => {
    const art = artRef.current;
    if (!art || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setSeen(true);
        timer = window.setTimeout(() => setLive(true), 1700);
      },
      { threshold: 0.35 },
    );
    io.observe(art);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  // Pointer: the fan leans ≤4° and the blades nearest the pointer's angle lift and light up.
  useEffect(() => {
    const root = rootRef.current;
    const art = artRef.current;
    const stem = stemRef.current;
    if (!live || !root || !art || !stem) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const blades = BLADES.map((deg, i) => ({ el: bladeRefs.current[i], deg, near: 0 }));
    let targetAngle = 0;
    let targetTilt = 0;
    let tilt = 0;
    let strength = 0;
    let targetStrength = 0;
    let raf = 0;

    const step = () => {
      tilt += (targetTilt - tilt) * 0.08;
      strength += (targetStrength - strength) * 0.08;
      art.style.setProperty("--tilt", `${tilt.toFixed(3)}deg`);
      let moving = Math.abs(targetTilt - tilt) > 0.01 || Math.abs(targetStrength - strength) > 0.005;
      for (const b of blades) {
        const goal = Math.max(0, 1 - Math.abs(b.deg - targetAngle) / 30) * strength;
        b.near += (goal - b.near) * 0.12;
        if (Math.abs(goal - b.near) > 0.003) moving = true;
        b.el?.style.setProperty("--near", b.near.toFixed(3));
      }
      raf = moving ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      const r = stem.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = r.bottom - e.clientY;
      targetAngle = Math.max(-90, Math.min(90, (Math.atan2(dx, Math.max(dy, 1)) * 180) / Math.PI));
      targetTilt = Math.max(-1, Math.min(1, dx / 700)) * 4;
      targetStrength = Math.hypot(dx, dy) < 560 ? 1 : 0.35;
      kick();
    };
    const onLeave = () => {
      targetTilt = 0;
      targetStrength = 0;
      kick();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [live]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = tabs.length - 1;
    const keys: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: last };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const index = (next + tabs.length) % tabs.length;
    setCurrent(index);
    tabRefs.current[index]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={cn(styles.stage, "mt-12 flex flex-col gap-12 lg:mt-0 lg:flex-row lg:items-center lg:gap-10 lg:pt-[88px]")}
      data-seen={seen ? "" : undefined}
      data-live={live ? "" : undefined}
    >
      <div className="flex flex-col gap-10 lg:h-[450px] lg:w-[334px] lg:shrink-0 lg:gap-[75px]">
        <div role="tablist" aria-label={label} aria-orientation="vertical" className="relative -ml-px flex flex-col gap-0.5 lg:w-[321px]">
          <span className={styles.indicator} style={{ "--i": current } as CSSProperties} aria-hidden="true" />
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`privacy-tab-${i}`}
              aria-controls={`privacy-panel-${i}`}
              aria-selected={i === current}
              tabIndex={i === current ? 0 : -1}
              onClick={() => setCurrent(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                styles.tab,
                "flex h-11 items-center gap-3.5 border-l-[3px] pl-[18px] text-left text-xs leading-4 font-medium tracking-[0.02em] uppercase focus-visible:outline-canvas lg:h-9",
              )}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{tab}</span>
            </button>
          ))}
        </div>

        <div className="grid pl-5 lg:w-[341px]">
          {panels.map((panel, i) => (
            <div
              key={tabs[i]}
              role="tabpanel"
              id={`privacy-panel-${i}`}
              aria-labelledby={`privacy-tab-${i}`}
              className={cn(styles.step, "col-start-1 row-start-1 flex flex-col items-start gap-7")}
              data-active={i === current ? "" : undefined}
            >
              {panel}
            </div>
          ))}
        </div>
      </div>

      {/* Illustration: glass fan + status card (drawn at 600×380, scaled down on small screens). */}
      <div ref={artRef} className={cn(styles.art, "relative lg:h-[380px] lg:flex-1")} aria-hidden="true" data-no-draw>
        <div className="absolute top-0 left-1/2 h-[380px] w-[600px] origin-top -translate-x-1/2 scale-(--s) lg:w-[560px]">
          <div className="absolute inset-x-0 top-[104px] h-[276px] overflow-hidden">
            {BLADES.map((deg, i) => (
              <span
                key={deg}
                ref={(el) => {
                  bladeRefs.current[i] = el;
                }}
                className={styles.blade}
                style={{ "--r": `${deg}deg`, "--bd": `${(Math.abs(i - 7) * 0.035).toFixed(3)}s` } as CSSProperties}
              />
            ))}
          </div>
          <span ref={stemRef} className={cn(styles.stem, "absolute top-[104px] left-[279px] h-[270px] w-0.5")} />

          <div className="absolute top-0 left-[308px] grid w-[292px]">
            {cards.map((card, i) => (
              <div
                key={tabs[i]}
                className={cn(
                  styles.step,
                  "col-start-1 row-start-1 rounded-card border border-canvas bg-canvas px-[18px] pt-[18px] pb-4 shadow-[0_18px_44px_0_rgb(50_25_4/0.12),0_1px_2px_0_rgb(50_25_4/0.05)]",
                )}
                data-active={i === current ? "" : undefined}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
