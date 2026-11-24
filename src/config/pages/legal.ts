/**
 * Legal pages (Privacy Policy, Terms of Service).
 * ------------------------------------------------------------
 * The text lives in src/content/legal/*.mdx – every "## Heading"
 * becomes a section with an anchor (e.g. #your-rights-and-choices)
 * and an entry in the contents list.
 */
export const legalPage = {
  /** "Last updated November 1, 2026" */
  updatedPrefix: "Last updated",
  contentsTitle: "Contents",
  /** Soft mint / lime / blue mesh gradient behind the page title (Figma: five radial gradients on #ecf7f1). */
  heroBackground: [
    "radial-gradient(42% 42% at 50% 48%, rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.35) 60%, rgb(255 255 255 / 0) 100%)",
    "radial-gradient(45% 75% at 0% 100%, #7baff9, rgb(158 197 250 / 0.7) 45%, rgb(200 222 251 / 0) 100%)",
    "radial-gradient(50% 60% at 55% 105%, #7fd3cb, rgb(171 228 221 / 0.6) 50%, rgb(208 240 234 / 0) 100%)",
    "radial-gradient(45% 70% at 0% 0%, #9ce1de, rgb(190 234 230 / 0.7) 50%, rgb(221 243 239 / 0) 100%)",
    "radial-gradient(55% 90% at 100% 35%, #e0eea0, rgb(232 243 194 / 0.75) 50%, rgb(240 247 222 / 0) 100%)",
    "#ecf7f1",
  ].join(", "),
};
