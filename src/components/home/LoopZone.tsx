"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import loopStyles from "./LoopZone.module.css";
import { usePlaying } from "./usePlaying";

type Props = Omit<ComponentProps<"div">, "ref"> & {
  as?: "div" | "section";
  children: ReactNode;
};

/**
 * Wrapper that pauses the CSS loops inside it (pulsing bars, blinking dots, drifting glows)
 * while it is off screen or the tab is hidden. Its children stay Server Components.
 */
export function LoopZone({ as: Tag = "div", className, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const playing = usePlaying(ref);
  return (
    <Tag ref={ref} className={cn(loopStyles.zone, className)} data-paused={playing ? undefined : ""} {...rest}>
      {children}
    </Tag>
  );
}
