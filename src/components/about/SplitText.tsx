import { Fragment, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";
import styles from "./SplitText.module.css";

/** One run of text with its own classes (two-tone headings). */
export type SplitPart = {
  text: string;
  className?: string;
  /** Start this part on a new line. */
  break?: boolean;
};

type Props = {
  as?: ElementType;
  /** Plain text, or parts with their own classes. */
  text: string | SplitPart[];
  mode?: "chars" | "words";
  /** "view" plays when the text scrolls into view, "load" on first paint (above the fold). */
  trigger?: "view" | "load";
  /** Start delay in seconds. */
  delay?: number;
  /** Seconds between letters / words. */
  stagger?: number;
  /** Classes for the <br> before a part with `break` (e.g. "hidden sm:block"). */
  breakClass?: string;
  className?: string;
  id?: string;
};

/**
 * The About page's Framer text effect, split on the server (no layout shift).
 * It differs from the shared `motion/SplitText` in its timings: the letter pop uses
 * Framer's exact spring curve and the words only un-blur (they don't rise).
 * "chars" mode gives screen readers a plain copy and hides the letter spans;
 * "words" mode keeps the words as real text. The view trigger is the site-wide
 * one (Motion.tsx sets data-split-play).
 */
export function SplitText({ as: Tag = "p", text, mode = "words", trigger = "view", delay, stagger, breakClass, className, id }: Props) {
  const parts: SplitPart[] = typeof text === "string" ? [{ text }] : text;
  const vars = {
    "--d": `${+(delay ?? (mode === "chars" ? 0.15 : 0.3)).toFixed(3)}s`,
    "--s": `${+(stagger ?? (mode === "chars" ? 0.03 : 0.025)).toFixed(3)}s`,
  } as CSSProperties;

  let index = 0;
  const pieces = parts.map((part, p) => (
    <Fragment key={p}>
      {part.break ? <br className={breakClass} /> : p > 0 ? " " : null}
      <span className={part.className}>
        {part.text
          .trim()
          .split(/\s+/)
          .map((word, w) => (
            <Fragment key={w}>
              {w > 0 && " "}
              {mode === "chars" ? (
                <span className={styles.word}>
                  {Array.from(word).map((ch, c) => (
                    <span key={c} className={styles.c} style={{ "--i": index++ } as CSSProperties}>
                      {ch}
                    </span>
                  ))}
                </span>
              ) : (
                <span className={styles.w} style={{ "--i": index++ } as CSSProperties}>
                  {word}
                </span>
              )}
            </Fragment>
          ))}
      </span>
    </Fragment>
  ));

  if (mode === "words") {
    return (
      <Tag id={id} className={cn(styles.root, className)} data-split={mode} data-trigger={trigger} style={vars}>
        {pieces}
      </Tag>
    );
  }

  const plain = parts
    .map((part) => part.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return (
    <Tag id={id} className={cn(styles.root, className)} data-split={mode} data-trigger={trigger} style={vars}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">{pieces}</span>
    </Tag>
  );
}
