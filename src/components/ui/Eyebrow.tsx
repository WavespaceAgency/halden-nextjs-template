import { cn } from "@/lib/utils";

export type EyebrowTone = "mint" | "lime" | "sky" | "violet" | "white";

export type EyebrowContent = {
  /** Label text (shown uppercase in Geist Mono). */
  label: string;
  /** SVG path data for the 28×28 icon tile (stroke icon on a 28px grid). Leave out for no tile. */
  icon?: string;
  tone?: EyebrowTone;
};

type Props = EyebrowContent & {
  /** "light" = white label for dark backgrounds. */
  theme?: "dark" | "light";
  className?: string;
};

const tiles: Record<EyebrowTone, string> = {
  mint: "#c5eeec",
  lime: "#daeb8c",
  sky: "#c3dffe",
  violet: "#d1c3fb",
  white: "#ffffff",
};

/** Small label above section headings: coloured icon tile + mono uppercase text (Figma "Eyebrow"). */
export function Eyebrow({ label, icon, tone = "mint", theme = "dark", className }: Props) {
  return (
    <p className={cn("flex items-center gap-2.5", className)}>
      {icon && (
        <svg className="size-7 shrink-0" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect width="28" height="28" rx="8" fill={tiles[tone]} />
          <path d={icon} stroke="#0c1a2f" strokeWidth="1.476" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className={cn("font-mono text-sm font-semibold tracking-[0.06em] uppercase", theme === "light" ? "text-white" : "text-ink")}>
        {label}
      </span>
    </p>
  );
}
