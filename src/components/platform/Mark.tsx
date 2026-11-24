import { markPaths } from "./mock";

type Props = {
  className?: string;
  /** Stroke width on the 24px grid. */
  stroke?: number;
};

/** Halden "H" mark used inside the mockup tiles (no dot). Uses currentColor. */
export function Mark({ className = "size-6", stroke = 1.48 }: Props) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={markPaths.circle} stroke="currentColor" strokeWidth={stroke} />
      <path d={markPaths.h} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}
