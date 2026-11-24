"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { scrollToY } from "@/components/motion/SmoothScroll";
import { cn } from "@/lib/utils";
import { JobTabs, type JobTab } from "./JobTabs";
import { useInView } from "./useInView";
import styles from "./HowItWorks.module.css";

export type JobPanel = JobTab & {
  /** Scaled mockup canvas (server-rendered). */
  art: ReactNode;
  /** Title + text (server-rendered SplitText, replayed when the job turns on). */
  detail: ReactNode;
};

type Props = {
  jobs: JobPanel[];
  /** Accessible name of the job tabs. */
  tabsLabel: string;
  /** Colour wash that stays in place behind the cross-fading mockups on desktop. */
  background: ReactNode;
};

/** Framer: the next job fades in at +40px, +540px and +1040px of the 1500px track. */
const FIRST = 40;
const STEP = 500;
/** Sticky top of the pinned card on phones / tablets (header height). */
const MOBILE_TOP = 72;

/**
 * The interactive part of "How it works".
 * Pinned (desktop, or smaller screens where the tallest job card fits): the job row sticks while
 * the 1500px spacer scrolls by and the active job cross-fades at Framer’s thresholds; on desktop the
 * tabs scroll to their job. Stacked (no JS, or a card taller than the screen): all jobs in a column,
 * each one plays when it scrolls into view.
 * Loops inside the mockups run only for the job that is on and pause when the section is off-screen
 * or the tab is hidden. With "reduce motion" the CSS shows every final state.
 */
export function HowItWorksJobs({ jobs, tabsLabel, background }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const jobRefs = useRef<(HTMLElement | null)[]>([]);
  const [pinned, setPinned] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  // Loops pause while the section is off-screen or the browser tab is hidden.
  const { visible, paused } = useInView(track, 0);
  /** Stacked mode: jobs that have scrolled into view (they stay on). */
  const [seen, setSeen] = useState<boolean[]>(() => jobs.map(() => false));

  const indexFromScroll = useCallback(() => {
    const offset = -(track.current?.getBoundingClientRect().top ?? 0);
    if (offset < FIRST) return 0;
    return Math.min(jobs.length - 1, Math.floor((offset - FIRST) / STEP) + 1);
  }, [jobs.length]);

  // Layout mode: pinned or stacked. Measured after the first frame and again on resize.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const tallest = Math.max(...jobRefs.current.map((job) => job?.offsetHeight ?? 0));
      const pin = mq.matches || tallest + MOBILE_TOP + 24 <= window.innerHeight;
      setDesktop(mq.matches);
      setPinned(pin);
      if (pin) setActive(indexFromScroll());
      setReady(true);
    };
    const frame = requestAnimationFrame(update);
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, 150);
    };
    mq.addEventListener("change", update);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", onResize);
    };
  }, [indexFromScroll]);

  // Pinned: the scroll position picks the active job.
  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(indexFromScroll()));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pinned, indexFromScroll]);

  // Stacked: a job turns on once a third of it is in view.
  useEffect(() => {
    if (pinned) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = jobRefs.current.indexOf(entry.target as HTMLElement);
          setSeen((prev) => (prev[i] ? prev : prev.map((on, j) => on || j === i)));
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    jobRefs.current.forEach((job) => job && io.observe(job));
    return () => io.disconnect();
  }, [pinned]);

  /** Tabs: scroll to the middle of that job’s part of the track. */
  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(i === 0 ? top - 60 : top + FIRST + (i - 1) * STEP + STEP / 2);
    setActive(i);
  };

  const tabsShown = pinned && desktop;

  return (
    <div
      ref={track}
      className={cn(styles.hiw, "mt-12 lg:mt-8", pinned && styles.pinned, ready && styles.ready, paused && styles.paused)}
    >
      <div className={styles.sticky}>
        <JobTabs jobs={jobs} active={active} label={tabsLabel} layoutKey={`${pinned}-${desktop}`} onSelect={goTo} />
        <div className={styles.sharedBg} aria-hidden="true">
          {background}
        </div>
        <div className={styles.jobs}>
          {jobs.map((job, i) => {
            const isActive = pinned && i === active;
            const on = pinned ? isActive && visible : seen[i];
            return (
              <article
                key={job.id}
                ref={(el) => {
                  jobRefs.current[i] = el;
                }}
                id={`hiw-job-${job.id}`}
                role={tabsShown ? "tabpanel" : undefined}
                aria-labelledby={tabsShown ? `hiw-tab-${job.id}` : undefined}
                inert={pinned && !isActive}
                className={cn(styles.job, isActive && styles.active, on && styles.on)}
              >
                <div className={styles.art}>{job.art}</div>
                {job.detail}
              </article>
            );
          })}
        </div>
      </div>
      <div className={styles.spacer} aria-hidden="true" />
    </div>
  );
}
