/**
 * Site-wide settings.
 * ------------------------------------------------------------
 * Edit this file to rebrand the template: name, URL, navigation,
 * footer links, social profiles and the main call to action.
 * Page text lives in src/config/pages/*.ts.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type FooterColumn = { title: string; links: NavLink[] };

const name = "Halden";
const legalName = "Halden Health, Inc.";

/**
 * The public URL of your site, used for canonical links, Open Graph and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL, or replace the fallback with your domain. On Vercel the
 * production URL is picked up automatically, so the demo needs no setup.
 */
const url = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name,
  legalName,
  url,
  /** Default title for the home page and pages without their own title. */
  title: "Halden – AI Front Desk for Clinics",
  description:
    "Halden is an AI front desk for clinics: it answers, triages and books every patient call, text and web chat, then writes it straight into your clinic's systems.",
  email: "hello@example.com",
  locale: "en_US",
  /** Browser UI colour on mobile (matches the header background). */
  themeColor: "#ffffff",

  /** Main call to action, used in the header and mobile menu. */
  cta: { label: "Book a Demo", href: "/book-a-demo" },

  /** "Live Demo" buttons (hero, about, closing CTA band). An external link opens in a new tab. */
  liveDemo: { label: "Live Demo", href: "https://halden-web-dashboard.vercel.app/" },

  /** Eased mouse-wheel scrolling (Lenis). Touch scrolling always stays native. */
  smoothScroll: true,

  nav: {
    /** Header links. */
    main: [
      { label: "Platform", href: "/platform" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
    ] satisfies NavLink[],
    /** Links in the "Pages" dropdown – every page in the template. */
    pages: [
      { label: "Home", href: "/" },
      { label: "Platform", href: "/platform" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Blog Post", href: "/blog/how-a-dermatology-clinic-stopped-losing-monday-mornings" },
      { label: "Book a Demo", href: "/book-a-demo" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "404", href: "/404" },
    ] satisfies NavLink[],
    /** Label of the dropdown button in the header. */
    pagesLabel: "Pages",
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Platform", href: "/platform" },
          { label: "Security", href: "/security" },
          { label: "Pricing", href: "/pricing" },
          { label: "Integrations", href: "/platform#integrations" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
          { label: "How It Works", href: "/platform" },
          { label: "Contact", href: "/book-a-demo" },
        ],
      },
      {
        title: "Compliance",
        links: [
          { label: "Trust Center", href: "/security" },
          { label: "HIPAA", href: "/security#compliance" },
          { label: "BAA", href: "/security#compliance" },
          { label: "SOC 2", href: "/security#standards" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help Centre", href: "mailto:hello@example.com" },
          { label: "System Status", href: "/security" },
          { label: "Book a Demo", href: "/book-a-demo" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" },
          { label: "Accessibility", href: "/privacy-policy#your-rights-and-choices" },
        ],
      },
    ] satisfies FooterColumn[],
    /** Copyright line. Update the year when you launch. */
    copyright: `© 2026 ${legalName}`,
    /** Template credit in the footer. Remove it (set to null) or point it at your own studio. */
    credit: { label: "Template by Wavespace →", href: "https://www.wavespace.agency" } as NavLink | null,
  },

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X (Twitter)", href: "https://x.com/" },
  ] satisfies NavLink[],
};

export type SiteConfig = typeof siteConfig;
