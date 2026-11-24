"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import type { security } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import { useScrollSteps } from "./useScrollSteps";
import styles from "./Security.module.css";

type Props = {
  steps: (typeof security)["steps"];
  tabsLabel: string;
  cta: { label: string; href: string };
  /** The fan of glass cards behind the step card (static, rendered by Security). */
  fan: ReactNode;
};

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * The four Security steps (Protect / Limit / Record / Review): tabs, text panels and the card on
 * top of the fan. Tabs work on every width; on desktop with motion allowed the steps also switch
 * every 300px of scroll (useScrollSteps). Layout per mode: security.css.
 */
export function SecuritySteps({ steps, tabsLabel, cta, fan }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { active, mode, tabProps } = useScrollSteps({ count: steps.length, step: 300, trackRef, stageRef, tabsOnMobile: true });
  const tabbed = mode !== "init";

  // Scale the 560×380 fan to its column (640px wide below 1024px).
  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;
    const lg = window.matchMedia("(min-width: 1024px)");
    const ro = new ResizeObserver(([e]) => visual.style.setProperty("--ss", String(Math.min(1, e.contentRect.width / (lg.matches ? 560 : 640)))));
    ro.observe(visual);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={trackRef} className={cn(styles.track, "mt-10 lg:mt-0 lg:pt-[88px]")}>
      <div ref={stageRef} className={cn(styles.stage, "grid gap-10 lg:grid-cols-[341px_minmax(0,745px)] lg:items-start lg:gap-[33px]")}>
        <div>
          <div
            className={cn(styles.tabs, "relative -ml-px hidden w-full max-w-[321px] flex-col gap-0.5")}
            role="tablist"
            aria-label={tabsLabel}
            aria-orientation="vertical"
            style={{ "--tab-i": active } as CSSProperties}
          >
            {steps.map((step, i) => (
              <button
                key={step.label}
                {...tabProps(i, `sec-tab-${i}`, `sec-panel-${i}`)}
                className="flex h-9 items-center gap-3.5 border-l-[3px] border-canvas/52 pl-[18px] text-left text-xs leading-4 font-medium tracking-[0.02em] text-sky uppercase outline-offset-[-2px] focus-visible:outline-canvas aria-selected:border-canvas aria-selected:text-canvas"
              >
                <span>{pad(i)}</span>
                {step.label}
              </button>
            ))}
          </div>
          <div className={cn(styles.panels, "grid gap-10 pl-5 lg:mt-[75px]")}>
            {steps.map((step, i) => (
              <div
                key={step.label}
                id={`sec-panel-${i}`}
                className={styles.panel}
                {...(tabbed ? { role: "tabpanel", "aria-labelledby": `sec-tab-${i}` } : { "aria-labelledby": `sec-title-${i}` })}
                data-active={i === active ? "" : undefined}
              >
                <h3 id={`sec-title-${i}`} className="max-w-[321px] text-h3 font-medium whitespace-pre-line text-canvas">
                  {step.title}
                </h3>
                <p className="mt-[11px] max-w-[321px] text-base leading-[26px] text-canvas">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 pl-5">
            <Button href={cta.href} variant="light" className="bg-canvas focus-visible:outline-canvas">
              {cta.label}
            </Button>
          </div>
        </div>

        <div ref={visualRef} className={cn(styles.visual, "relative mx-auto h-[calc(380px*var(--ss))] w-full max-w-[640px] lg:mt-[35px] lg:max-w-[560px]")} aria-hidden="true">
          <div className={cn(styles.group, "absolute top-0 h-[380px] w-[560px] origin-top -translate-x-1/2 scale-(--ss)")}>
            {fan}
            <div className="absolute top-0 left-[308px] grid w-[292px]">
              {steps.map((step, i) => (
                <div
                  key={step.label}
                  className={cn(styles.card, "rounded-[24px] border border-canvas bg-canvas px-[18px] pt-[18px] pb-4 shadow-[0_1px_2px_0_rgb(50_25_4/0.05),0_18px_44px_0_rgb(50_25_4/0.12)]")}
                  data-active={i === active ? "" : undefined}
                >
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2.5 text-h4 leading-6 font-medium tracking-[-0.015em] text-ink">
                      <span className="h-6 w-[3px] bg-brand-bright" />
                      {step.card.title}
                    </p>
                    <span className="font-mono text-[11px] leading-[14px] text-subtle">{step.card.number}</span>
                  </div>
                  <ul className="mt-3.5 flex flex-col gap-1.5">
                    {step.card.rows.map((row) => (
                      <li key={row.label} className={cn(styles.row, "flex items-center justify-between gap-3 rounded-lg bg-canvas-2 px-2.5 py-[9px]")}>
                        <span className="flex items-center gap-2 text-[13px] leading-[17px] text-ink">
                          <svg className="size-[18px] shrink-0" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="9" fill="#6BB1FF" />
                            <path d="m6.08 9.2 1.87 1.88 3.96-3.96" stroke="#FCFBF8" strokeWidth="1.41" />
                          </svg>
                          {row.label}
                        </span>
                        <span className={cn("text-[11px] leading-[14px] font-medium tracking-[0.02em]", row.blocked ? "text-[#c2185b]" : "text-ink-2")}>{row.status}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
