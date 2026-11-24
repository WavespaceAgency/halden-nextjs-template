/**
 * Content shared by several pages: the closing call-to-action band
 * (above the footer on most pages) and the eyebrow icons.
 */
import { siteConfig } from "@/config/site";
import ctaBackground from "@/assets/images/shared/cta-background.png";

/**
 * Icons for the small eyebrow tiles (SVG path data on a 28×28 grid, stroke only).
 * Add your own: draw a 28px icon, copy the `d` of its paths here.
 */
export const eyebrowIcons = {
  hourglass:
    "M9.9 8.67h8.2M9.9 19.33h8.2M10.884 8.67c0 3.362 6.232 3.362 6.232 5.33 0 1.968-6.232 1.968-6.232 5.33M17.116 8.67c0 3.362-6.232 3.362-6.232 5.33 0 1.968 6.232 1.968 6.232 5.33",
  question: "M11.54 11.571c0-2.296 4.92-2.296 4.92.164 0 1.804-2.46 1.968-2.46 3.772M14 17.803v.328",
  grid: "M8.875 8.875h4.1v4.1h-4.1v-4.1Zm6.15 0h4.1v4.1h-4.1v-4.1Zm-6.15 6.15h4.1v4.1h-4.1v-4.1Zm6.15 0h4.1v4.1h-4.1v-4.1Z",
} as const;

/** Play icon used in "Live Demo" buttons (18×18). */
export const playIcon = {
  circle: "M9 .625a8.375 8.375 0 1 1 0 16.75A8.375 8.375 0 0 1 9 .625Z",
  triangle: "M12.224 9 7.364 11.806V6.194L12.224 9Z",
};

export const ctaBand = {
  eyebrow: { label: "Get started", icon: eyebrowIcons.hourglass, tone: "mint" as const },
  title: "Hear Halden answer\nyour clinic’s phone.",
  description: "Book a 30-minute demo and we’ll show you a live call set up with your clinic’s own rules.",
  primary: { label: siteConfig.cta.label, href: siteConfig.cta.href },
  secondary: siteConfig.liveDemo,
  /** Background photo (src/assets/images/shared). */
  image: ctaBackground,
};
