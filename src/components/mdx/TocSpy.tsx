"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import styles from "./TocSpy.module.css";

export type TocItem = { id: string; text: string };

type Props = {
  /** Sections in page order (ids of the h2 headings). */
  items: TocItem[];
  /** "line" = blog "On this page" (marker on a left rule), "pill" = legal "Contents" (pill behind the link). */
  variant: "line" | "pill";
};

const linkClasses = {
  line: "flex min-h-8 items-center border-l-2 border-ink-2/12 py-1.5 pl-3 text-[15px] leading-5 text-body transition-[color,padding] duration-300 hover:text-ink-2 aria-[current=location]:border-brand aria-[current=location]:font-medium aria-[current=location]:text-ink-2",
  pill: "flex min-h-9 items-center rounded-[10px] px-2.5 py-2 text-[15px] leading-5 text-body transition-[color,background-color,translate] duration-300 hover:bg-sky-tint/60 hover:text-ink-2 aria-[current=location]:bg-sky-tint aria-[current=location]:font-medium aria-[current=location]:text-ink-2",
};

const markerClasses = {
  line: "bg-brand",
  pill: "rounded-[10px] bg-sky-tint",
};

/**
 * Table of contents that highlights the section in view (aria-current="location") and slides
 * a marker to it. A section is "current" once its heading passes 30% of the window height
 * (IntersectionObserver); at the very bottom of the page the last section wins.
 * The headings are found by the ids passed in `items`.
 */
export function TocSpy({ items, variant }: Props) {
  const [active, setActive] = useState(items[0]?.id);
  const rootRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

  // Watch the headings.
  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const above = new Set<Element>();
    let atEnd = false;

    const update = () => {
      const last = atEnd ? targets[targets.length - 1] : [...targets].reverse().find((t) => above.has(t));
      setActive((last ?? targets[0]).id);
    };

    // The root reaches far above the window and ends 30% from its top: "intersecting" = above that line.
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? above.add(e.target) : above.delete(e.target)));
        update();
      },
      { rootMargin: "100000px 0px -70% 0px" },
    );
    targets.forEach((t) => lineObserver.observe(t));

    // Bottom of the page: only listen to scrolling while the last heading is on screen.
    const checkEnd = () => {
      const end = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (end !== atEnd) {
        atEnd = end;
        update();
      }
    };
    const endObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", checkEnd, { passive: true });
        checkEnd();
      } else {
        window.removeEventListener("scroll", checkEnd);
        if (atEnd) {
          atEnd = false;
          update();
        }
      }
    });
    endObserver.observe(targets[targets.length - 1]);

    return () => {
      lineObserver.disconnect();
      endObserver.disconnect();
      window.removeEventListener("scroll", checkEnd);
    };
  }, [items]);

  // Slide the marker to the active link (jump there the first time).
  useEffect(() => {
    const root = rootRef.current;
    const marker = markerRef.current;
    if (!root || !marker || !active) return;
    const place = () => {
      const link = linkRefs.current.get(active);
      if (!link || !link.offsetParent) return;
      const a = link.getBoundingClientRect();
      const p = root.getBoundingClientRect();
      marker.style.setProperty("--x", `${a.left - p.left}px`);
      marker.style.setProperty("--y", `${a.top - p.top}px`);
      marker.style.setProperty("--w", `${a.width}px`);
      marker.style.setProperty("--h", `${a.height}px`);
      if (!("ready" in root.dataset)) {
        root.dataset.still = "";
        root.dataset.ready = "";
        requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.still));
      }
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(root);
    return () => observer.disconnect();
  }, [active]);

  // Highlight the clicked link right away (the scroll then confirms it).
  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey) setActive(id);
  };

  return (
    <div ref={rootRef} className={cn(styles.root, styles[variant], "relative")}>
      <span ref={markerRef} className={cn(styles.marker, markerClasses[variant], "pointer-events-none absolute top-0 left-0")} aria-hidden="true" />
      <ul className={cn("relative flex flex-col", variant === "line" ? "gap-3.5" : "gap-1")}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              ref={(el) => {
                if (el) linkRefs.current.set(item.id, el);
                else linkRefs.current.delete(item.id);
              }}
              aria-current={item.id === active ? "location" : undefined}
              onClick={(event) => onClick(event, item.id)}
              className={cn(styles.link, linkClasses[variant])}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
