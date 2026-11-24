"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./Press.module.css";

type Props = {
  /** The cards of each page (server-rendered <li> elements). */
  pages: ReactNode[];
  labels: { pagination: string; page: string };
};

/**
 * Pages of news cards with round page buttons. On a page change the old cards fade
 * out (0.2s), the new ones rise in one after another and their titles pop again (the
 * page is re-mounted, so the text effect replays), while the blue marker slides to the
 * new number. With "reduce motion" the page switches at once. Without JavaScript only
 * the first page and no buttons are shown.
 */
export function PressPager({ pages, labels }: Props) {
  /** Page whose button is current (moves at once). */
  const [selected, setSelected] = useState(0);
  /** Page that is shown (follows `selected` after the fade-out). */
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  /** Bumped on every change so the shown page re-mounts and replays its entrance. */
  const [round, setRound] = useState(0);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const select = (target: number) => {
    if (target === selected) return;
    setSelected(target);
    window.clearTimeout(timer.current);
    const show = () => {
      setLeaving(false);
      setShown(target);
      setRound((r) => r + 1);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return show();
    setLeaving(true);
    timer.current = window.setTimeout(show, 200);
  };

  return (
    <>
      <div className="mt-10 lg:mt-12">
        {pages.map((page, p) => {
          const current = p === shown;
          return (
            <ul
              key={current ? `${p}-${round}` : p}
              className={cn(styles.page, "grid gap-12 md:grid-cols-3 md:gap-8")}
              hidden={!current}
              data-enter={current && round > 0 ? "" : undefined}
              data-leave={current && leaving ? "" : undefined}
            >
              {page}
            </ul>
          );
        })}
      </div>

      {pages.length > 1 && (
        <nav className={cn(styles.pager, "relative mt-12 flex gap-2")} aria-label={labels.pagination}>
          <span className={cn(styles.dot, "absolute top-0 left-0 size-10 rounded-full bg-brand-bright")} style={{ "--p": selected } as CSSProperties} aria-hidden="true" />
          {pages.map((_, p) => (
            <button
              key={p}
              type="button"
              className="relative flex size-10 items-center justify-center rounded-full border border-ink-2/12 text-[15px] font-medium text-ink-2 transition-colors duration-300 hover:bg-canvas-2 aria-[current=true]:border-transparent aria-[current=true]:text-white aria-[current=true]:hover:bg-transparent"
              aria-label={`${labels.page} ${p + 1}`}
              aria-current={p === selected ? "true" : undefined}
              onClick={() => select(p)}
            >
              {p + 1}
            </button>
          ))}
        </nav>
      )}
    </>
  );
}
