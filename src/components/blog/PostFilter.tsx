"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import styles from "./PostFilter.module.css";

type Item = {
  slug: string;
  category: string;
  /** Featured posts are in the hero, so "All" leaves them out. */
  featured: boolean;
  /** The rendered post card (a Server Component). */
  card: ReactNode;
};

type Props = {
  items: Item[];
  /** Tab labels. The first one ("All") shows every post that is not featured. */
  categories: string[];
  filterLabel: string;
  title: string;
  empty: string;
  loadMore: string;
  /** Cards shown before "Load More Posts". */
  pageSize: number;
};

const SPRING = "cubic-bezier(0.34, 1.3, 0.64, 1)";
const OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Indexes of the posts that match a filter ("" = All). */
function matching(items: Item[], filter: string) {
  return items.flatMap((item, i) => ((filter ? item.category === filter : !item.featured) ? [i] : []));
}

/** Move the pill under the pressed chip (works when the chips wrap onto two rows too). */
function placeIndicator(group: HTMLElement, indicator: HTMLElement, animate: boolean) {
  const active = group.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
  if (!active) return;
  if (!animate) group.dataset.still = "";
  indicator.style.setProperty("--x", `${active.offsetLeft}px`);
  indicator.style.setProperty("--y", `${active.offsetTop}px`);
  indicator.style.setProperty("--w", `${active.offsetWidth}px`);
  indicator.style.setProperty("--h", `${active.offsetHeight}px`);
  if (!animate) requestAnimationFrame(() => requestAnimationFrame(() => delete group.dataset.still));
}

/**
 * Category chips (toggle buttons with aria-pressed), the post grid and "Load More Posts".
 * Every card is in the server HTML; filtering only toggles `hidden`.
 * Motion as on the Astro build: the pill slides under the pressed chip; on a filter change
 * the old cards fade out, the grid eases to its new height and the new cards rise in one by one.
 */
export function PostFilter({ items, categories, filterLabel, title, empty, loadMore, pageSize }: Props) {
  const [filter, setFilter] = useState("");
  const [shown, setShown] = useState(pageSize);
  const groupRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  /** What to animate after the next render. */
  const pending = useRef<{ kind: "filter"; startHeight: number } | { kind: "more"; from: number } | null>(null);
  const run = useRef(0);

  const list = matching(items, filter);
  const visible = new Set(list.slice(0, shown));

  // Place the pill once (the CSS shows it from then on), then keep it in place when the chips reflow.
  useEffect(() => {
    const group = groupRef.current;
    const indicator = indicatorRef.current;
    if (!group || !indicator) return;
    placeIndicator(group, indicator, false);
    group.dataset.ready = "";
    const observer = new ResizeObserver(() => placeIndicator(group, indicator, false));
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  // Slide the pill whenever the pressed chip changes.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (groupRef.current && indicatorRef.current) placeIndicator(groupRef.current, indicatorRef.current, !reduceMotion());
  }, [filter]);

  const enter = (indexes: number[]) =>
    indexes.forEach((index, i) =>
      itemRefs.current[index]?.animate(
        [
          { opacity: 0, transform: "translateY(28px) scale(0.97)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 700, delay: i * 70, easing: SPRING, fill: "backwards" },
      ),
    );

  // After a filter change or "load more" has rendered: animate the new cards in.
  useLayoutEffect(() => {
    const job = pending.current;
    pending.current = null;
    if (!job || reduceMotion()) return;
    const next = list.slice(0, shown);
    if (job.kind === "more") {
      enter(next.slice(job.from));
      return;
    }
    const grid = gridRef.current;
    if (!grid) return;
    const endHeight = grid.offsetHeight;
    if (job.startHeight !== endHeight) {
      grid.animate([{ height: `${job.startHeight}px` }, { height: `${endHeight}px` }], { duration: 520, easing: OUT });
    }
    enter(next);
  });

  const choose = async (category: string) => {
    const value = category === categories[0] ? "" : category;
    if (value === filter) return;
    const token = ++run.current;
    const grid = gridRef.current;
    if (!grid || reduceMotion()) {
      setFilter(value);
      setShown(pageSize);
      return;
    }
    // Fade the current cards out first, then swap.
    grid.getAnimations().forEach((a) => a.cancel());
    const startHeight = grid.offsetHeight;
    const current = itemRefs.current.filter((li): li is HTMLLIElement => !!li && !li.hidden);
    await Promise.all(
      current.map((li) => {
        li.getAnimations().forEach((a) => a.cancel());
        return li
          .animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-8px) scale(0.98)" }], {
            duration: 180,
            easing: "ease-in",
            fill: "forwards",
          })
          .finished.catch(() => undefined);
      }),
    );
    if (token !== run.current) return;
    current.forEach((li) => li.getAnimations().forEach((a) => a.cancel()));
    pending.current = { kind: "filter", startHeight };
    setFilter(value);
    setShown(pageSize);
  };

  const showMore = () => {
    const from = shown;
    pending.current = { kind: "more", from };
    setShown(from + pageSize);
    // Move focus to the first new post so keyboard users continue from there.
    requestAnimationFrame(() => itemRefs.current[list[from]]?.querySelector("a")?.focus({ preventScroll: true }));
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div ref={groupRef} className={cn(styles.group, "relative flex flex-wrap gap-2")} role="group" aria-label={filterLabel}>
          <span ref={indicatorRef} className={cn(styles.indicator, "pointer-events-none absolute top-0 left-0 rounded-pill bg-brand-bright")} aria-hidden="true" />
          {categories.map((category, i) => {
            const pressed = i === 0 ? filter === "" : filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={pressed}
                onClick={() => void choose(category)}
                className={cn(
                  styles.chip,
                  "relative min-h-[42px] rounded-pill border border-line px-[18px] text-[15px] leading-5 font-medium text-body transition-[color,border-color,background-color,scale] duration-300 hover:border-ink/30 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.96] aria-pressed:border-brand-bright aria-pressed:bg-brand-bright aria-pressed:text-white",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
        <h2 className="text-[28px] leading-[1.3] font-medium tracking-[-0.02em] text-ink sm:text-[32px]">{title}</h2>
      </div>

      <ul ref={gridRef} className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
        {items.map((item, i) => (
          <li
            key={item.slug}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            hidden={!visible.has(i)}
          >
            {item.card}
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="text-center text-body">{empty}</p>}

      {list.length > shown && (
        <div className="flex justify-center">
          <Button variant="outline" size="xl" className="rounded-pill! border-ink-2/16! bg-transparent!" onClick={showMore}>
            {loadMore}
          </Button>
        </div>
      )}
    </>
  );
}
