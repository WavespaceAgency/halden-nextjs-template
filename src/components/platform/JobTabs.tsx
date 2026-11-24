"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import styles from "./HowItWorks.module.css";

export type JobTab = { id: string; number: string; label: string };

type Props = {
  jobs: JobTab[];
  active: number;
  /** Accessible name of the tab list. */
  label: string;
  /** Re-measure the indicator when the layout changes. */
  layoutKey: string;
  onSelect: (index: number) => void;
};

const keySteps: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

/**
 * Vertical job tabs of "How it works" (desktop). WAI-ARIA tabs pattern: roving tabindex,
 * arrow keys / Home / End move between tabs. A 2px indicator slides to the active tab.
 */
export function JobTabs({ jobs, active, label, layoutKey, onSelect }: Props) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicator = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tab = tabs.current[active];
    const ind = indicator.current;
    if (!tab || !ind || !tab.offsetHeight) return;
    ind.style.setProperty("--ind-y", `${tab.offsetTop}px`);
    ind.style.setProperty("--ind-h", `${tab.offsetHeight}px`);
  }, [active, layoutKey]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key in keySteps) next = (i + keySteps[e.key] + jobs.length) % jobs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = jobs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    tabs.current[next]?.focus();
    onSelect(next);
  };

  return (
    <div role="tablist" aria-label={label} aria-orientation="vertical" className={`${styles.tabs} relative flex-col gap-1`}>
      <span ref={indicator} className={styles.ind} aria-hidden="true" />
      {jobs.map((job, i) => (
        <button
          key={job.id}
          ref={(el) => {
            tabs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`hiw-tab-${job.id}`}
          aria-controls={`hiw-job-${job.id}`}
          aria-selected={i === active}
          tabIndex={i === active ? 0 : -1}
          onClick={() => onSelect(i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className="flex min-h-11 items-center gap-4 border-l-2 border-line pl-[18px] text-left text-[13px] leading-4 font-medium tracking-[0.02em] text-body uppercase transition-colors duration-300 hover:text-ink focus-visible:text-ink aria-selected:text-ink"
        >
          <span>{job.number}</span>
          <span>{job.label}</span>
        </button>
      ))}
    </div>
  );
}
