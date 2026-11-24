"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./ShareLinks.module.css";

type Props = {
  url: string;
  /** Accessible name ("Copy Link"). */
  label: string;
  /** Announced to screen readers after copying. */
  copiedLabel: string;
  className: string;
};

/** Copies the post URL; the arrow turns into a check for 2 seconds and screen readers hear "Link copied". */
export function CopyLinkButton({ url, label, copiedLabel, className }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): let the visitor copy it by hand.
      window.prompt("", url);
    }
  };

  return (
    <>
      <button type="button" aria-label={label} onClick={copy} data-copied={copied || undefined} className={cn(className, copied && "bg-sky-tint")}>
        <span className="relative size-3.5" aria-hidden="true">
          <svg className={cn(styles.arrow, "absolute inset-0 m-auto size-3")} viewBox="0 0 12 12" fill="none" data-no-draw>
            <path d="M3 9 9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className={cn(styles.check, "absolute inset-0 m-auto size-3.5 text-brand")} viewBox="0 0 14 14" fill="none" data-no-draw>
            <path d="m2.5 7.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
          </svg>
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
