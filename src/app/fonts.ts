import { Geist, Geist_Mono } from "next/font/google";

/**
 * Fonts – Geist and Geist Mono (SIL Open Font License 1.1), self-hosted by next/font
 * at build time (no request to Google from the visitor's browser).
 * To change a font: import another Google font here and keep the `variable` names.
 */
export const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
