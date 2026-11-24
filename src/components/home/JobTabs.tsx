"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { LoopZone } from "./LoopZone";
import { useScrollSteps } from "./useScrollSteps";
import styles from "./HowItWorks.module.css";

type Job = { id: string; label: string; title: string; description: string };

type Props = {
  jobs: Job[];
  /** "Live today" badge text. */
  live: string;
  /** aria-label of the tab list. */
  tabsLabel: string;
  /** One mock-up per job (Server Components, rendered by HowItWorks). */
  visuals: ReactNode[];
};

const pad = (n: number) => String(n + 1).padStart(2, "0");
/** Size the mock-ups are drawn at. */
const VISUAL_WIDTH = 748;

/**
 * The four jobs of "How it works". Desktop: tabs on the left, one job at a time; with motion
 * allowed the block sticks and the jobs switch every 500px of scroll (useScrollSteps).
 * Phones and tablets: the jobs are stacked and each one plays its entrance when scrolled into view.
 * Layout per mode: how-it-works.css.
 */
export function JobTabs({ jobs, live, tabsLabel, visuals }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { active, mode, tabProps } = useScrollSteps({ count: jobs.length, step: 500, trackRef, stageRef });
  const [seen, setSeen] = useState<boolean[]>(() => jobs.map(() => false));
  const tabbed = mode === "tabs" || mode === "scroll";

  // Stacked layout: each job plays its entrance once it is 30% in view.
  useEffect(() => {
    if (mode !== "stack") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = panelRefs.current.indexOf(e.target as HTMLElement);
          setSeen((s) => s.map((v, j) => v || j === i));
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3 },
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  // Scale the 748×383 mock-ups to their card.
  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).style.setProperty("--vs", String(Math.min(1, e.contentRect.width / VISUAL_WIDTH)));
    });
    visualRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  const isActive = (i: number) => (mode === "stack" ? seen[i] : i === active);

  return (
    <div ref={trackRef} className={cn(styles.track, "mt-12 lg:mt-8 lg:pt-20")}>
      <div ref={stageRef} className={cn(styles.stage, "relative")}>
        <div
          className={cn(styles.tabs, "relative hidden flex-col gap-1")}
          role="tablist"
          aria-label={tabsLabel}
          aria-orientation="vertical"
          style={{ "--tab-i": active } as CSSProperties}
        >
          {jobs.map((job, i) => (
            <button
              key={job.id}
              {...tabProps(i, `job-tab-${job.id}`, `job-${job.id}`)}
              className="flex h-11 items-center gap-4 border-l-2 border-line pl-[18px] text-left text-[13px] leading-[17px] font-medium tracking-[0.02em] text-body uppercase outline-offset-[-2px] aria-selected:border-ink aria-selected:text-ink"
            >
              <span>{pad(i)}</span>
              {job.label}
            </button>
          ))}
        </div>

        <LoopZone className={cn(styles.list, "flex flex-col gap-16")}>
          {jobs.map((job, i) => (
            <article
              key={job.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              id={`job-${job.id}`}
              className={cn(styles.job, "flex flex-col gap-6")}
              {...(tabbed ? { role: "tabpanel", "aria-labelledby": `job-tab-${job.id}` } : { "aria-labelledby": `job-title-${job.id}` })}
              data-active={isActive(i) ? "" : undefined}
            >
              <div className={cn(styles.text, "max-w-[620px]")}>
                <h3 id={`job-title-${job.id}`} className="text-h3 font-medium text-ink">
                  {job.title}
                </h3>
                <p className="mt-2 text-lead text-muted">{job.description}</p>
              </div>
              <div className={cn(styles.card, "overflow-hidden rounded-card p-5 sm:p-10")}>
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-3 text-sm leading-[18px] font-medium tracking-[0.02em] text-ink uppercase">
                    <span className="h-4 w-0.5 bg-ink" aria-hidden="true" />
                    {pad(i)} {job.label}
                  </p>
                  <p className="flex items-center gap-2 rounded-full bg-canvas px-3 py-1.5 text-[13px] leading-[17px] text-ink">
                    <span className="size-1.5 rounded-full bg-[#6bb1ff]" aria-hidden="true" />
                    {live}
                  </p>
                </div>
                <div
                  ref={(el) => {
                    visualRefs.current[i] = el;
                  }}
                  className={cn(styles.visual, "relative mt-7")}
                  aria-hidden="true"
                >
                  <div className="absolute top-0 left-0 origin-top-left scale-(--vs)">{visuals[i]}</div>
                </div>
              </div>
            </article>
          ))}
        </LoopZone>
      </div>
    </div>
  );
}
