import { cn } from "./utils";

export type ButtonVariant = "primary" | "dark" | "outline" | "glass" | "light";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Hover (as on the Framer build): the button grows to 102% with a soft spring, its icon nudges,
 * and it presses in to 97% on click. Colours ease over 250ms. Only the listed properties
 * transition (never `transition: all`).
 */
const base =
  "group/btn inline-flex shrink-0 items-center justify-center gap-2.5 rounded-button font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,scale] duration-[250ms,250ms,250ms,300ms,450ms] ease-[ease,ease,ease,ease,cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] active:scale-[0.97] active:duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50 motion-reduce:hover:scale-100 [&_svg]:transition-[translate,scale,rotate] [&_svg]:duration-500 [&_svg]:ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:[&_svg]:scale-110";

const variants: Record<ButtonVariant, string> = {
  /** Blue – main action on dark and light backgrounds (Figma "Book a demo", hero). */
  primary: "bg-brand text-white shadow-brand hover:bg-brand-hover hover:shadow-[0_1px_2px_0_rgb(44_103_246/0.3),0_10px_32px_0_rgb(44_103_246/0.5)]",
  /** Navy – header button. */
  dark: "bg-ink-2 text-canvas hover:bg-[#1b2c45] hover:shadow-[0_1px_2px_0_rgb(12_26_47/0.12),0_8px_24px_0_rgb(12_26_47/0.22)]",
  /** Thin border on light backgrounds. */
  outline: "border border-line bg-surface text-ink hover:bg-canvas-2",
  /** Frosted outline on dark backgrounds (Figma "Live Demo"). */
  glass: "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/15",
  /** White on dark or coloured backgrounds. */
  light: "bg-surface text-ink hover:bg-canvas-2",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  /** 44px – header (Figma: 12/18 padding, 15px text). */
  md: "min-h-11 px-[18px] text-[15px] leading-5",
  /** 52px – hero and CTA buttons (Figma: 16/24 padding, 17px text). */
  lg: "min-h-[52px] px-6 text-[17px] leading-6",
  /** 52px with 16px text (Figma CTA, "Load more", "View all", 404 buttons). */
  xl: "min-h-[52px] px-6 text-base leading-6",
};

/** Button classes – use on <a>, <Link>, <button> or anything that should look like a button. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
