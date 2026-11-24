/**
 * Pricing page content (route "/pricing").
 * ------------------------------------------------------------
 * Every text, price and table value on the Pricing page lives here.
 * Edit the values; the components in src/components/pricing/ render them.
 * Icons are SVG path data on the grid noted next to each set.
 */
import heroImage from "@/assets/images/pricing/hero.png";
import type { FaqContent } from "@/components/sections/Faq";
import type { EyebrowContent } from "@/components/ui/Eyebrow";
import { type PageHeroContent, shieldIcon } from "@/config/pages/security";
import { eyebrowIcons } from "@/config/pages/shared";
import { siteConfig } from "@/config/site";

/** "Every plan includes" icons on a 48×48 tile (stroke only). */
const includedIcons = {
  document: "M31 20l-6-6h-8v20h14V20Zm-6-6v6h6m-11 6h8m-8 4h6",
  shield: "M20 24l3 3 5-6m-4-7 9 3.5V23c0 5.5-4 9.5-9 11-5-1.5-9-5.5-9-11v-5.5L24 14Z",
  sparkle: "M24 14l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8Z",
  wave: "M18 20v8m4-12v16m4-13v10m4-7v4",
  handoff: "M14 20h14c3.3 0 6 2.7 6 6s-2.7 6-6 6h-6m-4-8-4-4 4-4",
  chart: "M14 32h20m-17 0v-9m6 9V16m6 16v-7",
  tag: "M19 19h.1M14 16v7l11 11 9-9-11-11h-7l-2 2Z",
  cancel: "M20.5 20.5l7 7m0-7-7 7M24 14c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10Z",
} as const;

export const meta = {
  title: "Pricing",
  description: "One flat monthly price per clinic location. No per-minute fees, no setup charge, cancel any time.",
};

export const hero: PageHeroContent = {
  title: "Simple pricing\nper location",
  description: "One flat monthly price per clinic location. No per-minute fees, no setup charge, cancel any time.",
  cta: { label: "Book a Demo", href: siteConfig.cta.href },
  image: heroImage,
};

export type Plan = {
  name: string;
  /** Shown big. Prices with a digit ("$399") count up when they scroll into view. */
  price: string;
  period?: string;
  description: string;
  badge?: string;
  /** The highlighted (dark) plan. */
  featured?: boolean;
  cta: { label: string; href: string };
  features: string[];
};

export const plans = {
  eyebrow: { label: "Plans", icon: eyebrowIcons.hourglass, tone: "sky" } satisfies EyebrowContent,
  title: "Pick the plan that\n",
  titleMuted: "fits your clinic",
  description: "Every plan includes HIPAA controls, a signed BAA and onboarding by our team.",
  items: [
    {
      name: "Starter",
      price: "$399",
      period: "/ month",
      description: "For single-location practices getting started.",
      cta: { label: "Book a Demo", href: siteConfig.cta.href },
      features: ["Calls answered 24/7", "Booking into your EHR", "English + Spanish", "Call recordings and transcripts", "Email support"],
    },
    {
      name: "Growth",
      price: "$799",
      period: "/ month",
      badge: "Most popular",
      featured: true,
      description: "For busy clinics that want every channel covered.",
      cta: { label: "Book a Demo", href: siteConfig.cta.href },
      features: [
        "Everything in Starter",
        "Texts, web chat and eFax",
        "30+ languages",
        "Insurance checks before visits",
        "Waitlist fill for cancelled slots",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For groups with many locations and custom needs.",
      cta: { label: "Talk to Sales", href: siteConfig.cta.href },
      features: [
        "Everything in Growth",
        "Multi-location routing",
        "Custom EHR integrations",
        "SSO and advanced audit logs",
        "Dedicated success manager",
      ],
    },
  ] satisfies Plan[],
};

/** A table cell: true = included (tick), false = not included (dash), text = shown as is. */
export type CompareValue = boolean | string;

export type ComparePlan = {
  name: string;
  price: string;
  note: string;
  badge?: string;
  /** Gets the blue column tint and the primary button. */
  featured?: boolean;
  cta: { label: string; href: string };
};

export type CompareGroup = { title: string; rows: { label: string; values: CompareValue[] }[] };

export const compare = {
  eyebrow: { label: "Compare", icon: eyebrowIcons.grid, tone: "violet" } satisfies EyebrowContent,
  title: "Compare plans",
  intro: { title: "Features", text: "Everything you get, side by side." },
  /** Column headers, in the same order as the values in each row. */
  plans: [
    { name: "Starter", price: "$399", note: "per location / month", cta: { label: "Book a Demo", href: siteConfig.cta.href } },
    {
      name: "Growth",
      price: "$799",
      note: "per location / month",
      badge: "Popular",
      featured: true,
      cta: { label: "Book a Demo", href: siteConfig.cta.href },
    },
    { name: "Enterprise", price: "Custom", note: "for 5+ locations", cta: { label: "Talk to Sales", href: siteConfig.cta.href } },
  ] satisfies ComparePlan[],
  /** Screen-reader text for ticks and dashes. */
  labels: { included: "Included", notIncluded: "Not included" },
  groups: [
    {
      title: "Channels",
      rows: [
        { label: "Phone calls 24/7", values: [true, true, true] },
        { label: "Texts and web chat", values: [false, true, true] },
        { label: "Referral eFax", values: [false, true, true] },
        { label: "Languages", values: ["2", "30+", "30+"] },
      ],
    },
    {
      title: "Setup & scale",
      rows: [
        { label: "EHR integrations", values: ["Standard", "Standard", "Custom"] },
        { label: "Locations", values: ["1", "Up to 5", "Unlimited"] },
        { label: "SSO and audit exports", values: [false, false, true] },
      ],
    },
    {
      title: "Support",
      rows: [
        { label: "Support", values: ["Email", "Priority", "Dedicated manager"] },
        { label: "Onboarding", values: ["Guided", "Guided", "White-glove"] },
      ],
    },
  ] satisfies CompareGroup[],
};

/** Icon tile colours of the "Every plan includes" cards. */
export type IncludedTone = "sky" | "violet" | "mint" | "lime";

export const included = {
  eyebrow: { label: "Included", icon: shieldIcon, tone: "mint" } satisfies EyebrowContent,
  title: "Every plan includes",
  description: "No add-ons for the basics. These come with Starter, Growth and Enterprise.",
  items: [
    { title: "Signed BAA", text: "Signed before any patient data is shared.", icon: includedIcons.document, tone: "sky" },
    { title: "HIPAA controls", text: "Encryption, access roles and full audit logs.", icon: includedIcons.shield, tone: "violet" },
    { title: "Onboarding", text: "We set up scripts, rules and your EHR for you.", icon: includedIcons.sparkle, tone: "mint" },
    { title: "Call recordings", text: "Listen back and search every single call.", icon: includedIcons.wave, tone: "lime" },
    { title: "Human hand-off", text: "Sensitive calls go straight to your team.", icon: includedIcons.handoff, tone: "violet" },
    { title: "Live dashboard", text: "See every call, booking and hand-off live.", icon: includedIcons.chart, tone: "mint" },
    { title: "No per-minute fees", text: "One flat price per location, every month.", icon: includedIcons.tag, tone: "lime" },
    { title: "Cancel any time", text: "Month to month. No lock-in, no penalties.", icon: includedIcons.cancel, tone: "sky" },
  ] satisfies { title: string; text: string; icon: string; tone: IncludedTone }[],
};

export const faq: FaqContent = {
  heading: {
    eyebrow: { label: "FAQ", icon: eyebrowIcons.question, tone: "lime" },
    title: "Pricing\nquestions",
    description: "Plans, billing and what every location gets.",
  },
  items: [
    { question: "Is there a setup fee?", answer: "No. Onboarding, scripts and EHR connection are included in every plan." },
    {
      question: "Do you charge per minute or per call?",
      answer: "No. You pay one flat price per location, every month, with no per-minute fees.",
    },
    { question: "Can we switch plans later?", answer: "Yes. Upgrade or downgrade at any time, and changes are prorated." },
    {
      question: "Is there a contract?",
      answer: "Plans run month to month with no lock-in and no penalties. Annual plans renew unless cancelled 30 days before.",
    },
    {
      question: "Do you offer a trial?",
      answer: "Book a demo and we’ll show you a live call set up with your clinic’s own rules before you decide.",
    },
  ],
};
