/**
 * Shared classes for the HTML product mockups on the Platform page
 * (floating cards, status pills, icon tiles). Values from the Figma / Framer mockups.
 */
import type { CSSProperties } from "react";
import type { Tone } from "@/config/pages/platform";

/** White floating card with a hairline border and soft shadow. */
export const mockCard =
  "rounded-[16px] border border-[rgb(12_26_47/0.07)] bg-white/94 shadow-[0_1px_2px_0_rgb(12_26_47/0.05),0_12px_32px_-8px_rgb(12_26_47/0.08)]";

/** Soft shadow used by tiles and pills (Figma "shadow-card" at 1px/10px). */
export const mockShadow = "shadow-[0_1px_1px_0_rgb(50_25_4/0.05),0_10px_14px_0_rgb(50_25_4/0.07)]";

/** White → light blue tile behind the Halden mark. */
export const mockTile = "bg-[radial-gradient(50%_50%_at_30%_25%,#fff_35%,#dfebfd_100%)]";

/** Small status pill: background + text colour per tone. */
export const pillTone: Record<Tone, string> = {
  blue: "bg-[#ecf3fe] text-[#204fc1]",
  green: "bg-[#dff5f1] text-[#316e60]",
  violet: "bg-[#f0ebfd] text-[#563dbd]",
  grey: "bg-[#f3f4f6] text-[#3f464d]",
  sky: "bg-[#c8defb] text-ink-2",
};

/** Halden mark without the dot (24×24 grid). */
export const markPaths = {
  circle: "M22.615 12c0 5.863-4.752 10.616-10.615 10.616S1.385 17.863 1.385 12 6.137 1.385 12 1.385 22.615 6.137 22.615 12Z",
  h: "M7.846 6.923v10.154M16.154 6.923v10.154M7.846 12h8.308",
};

/** Inline CSS custom properties, e.g. `vars({ "--i": 2 })` for the entrance stagger index. */
export function vars(values: Record<`--${string}`, string | number>, style?: CSSProperties): CSSProperties {
  return { ...style, ...values } as CSSProperties;
}
