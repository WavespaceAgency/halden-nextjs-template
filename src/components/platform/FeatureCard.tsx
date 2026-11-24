"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";
import styles from "./Features.module.css";

type Props = { className?: string; style?: CSSProperties; children: ReactNode };

/**
 * One "Built for how clinics work" card (<li>). Its illustration plays in once a third of the card
 * is in view, then loops (Features.module.css); the loops pause while the card is off-screen.
 */
export function FeatureCard({ className, style, children }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const { started, paused } = useInView(ref);

  return (
    <li ref={ref} className={cn(styles.card, started && styles.on, paused && styles.paused, className)} style={style}>
      {children}
    </li>
  );
}
