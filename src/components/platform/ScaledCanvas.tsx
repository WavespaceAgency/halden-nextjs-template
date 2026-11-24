"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./HowItWorks.module.css";

type Props = { children: ReactNode };

/**
 * Fixed 828×520 mockup canvas, scaled down to the width of its column.
 * The scale is a CSS variable (--s) kept up to date by a ResizeObserver; the box keeps the
 * 828:520 ratio and clips, so the page never scrolls sideways before the script runs.
 */
export function ScaledCanvas({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) => box.style.setProperty("--s", String(entry.contentRect.width / 828)));
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.scale}>
      <div className={styles.canvas}>{children}</div>
    </div>
  );
}
