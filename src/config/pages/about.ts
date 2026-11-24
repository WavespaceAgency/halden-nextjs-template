/**
 * About page content (route "/about").
 * ------------------------------------------------------------
 * Every text, number and image on the About page lives here.
 * Edit the values; the components in src/components/about/ render them.
 * The "Halden in the news" cards are the newest blog posts (src/content/blog).
 * Photos are imported from src/assets/images/about (next/image reads their size).
 */
import type { StaticImageData } from "next/image";
import storyClinician from "@/assets/images/about/story-clinician.png";
import storyConsultation from "@/assets/images/about/story-consultation.png";
import { eyebrowIcons } from "@/config/pages/shared";
import { siteConfig } from "@/config/site";

export const meta = {
  title: "About",
  description:
    "Halden is the AI agent that answers every patient call, text and referral, so clinic teams spend their day with patients instead of on hold.",
};

export const hero = {
  /** Two-tone heading: first part grey, second part dark (each part on its own line on wide screens). */
  titleMuted: "The front-desk partner",
  title: "for busy clinics",
  description:
    "Halden is the AI agent that answers every patient call, text and referral, so clinic teams spend their day with patients instead of on hold.",
  primary: siteConfig.cta,
  /** "Live Demo" button: the hosted dashboard demo (src/config/site.ts), opens in a new tab. */
  secondary: siteConfig.liveDemo,
};

export const story = {
  eyebrow: { label: "Our story", icon: eyebrowIcons.question, tone: "lime" as const },
  paragraphs: [
    "In 2024 our founders spent a week behind the front desk of a busy dermatology clinic. The staff were kind, fast and completely overloaded. Half the calls went to voicemail.",
    "We built Halden so clinic teams can spend their time on the patients in front of them. It answers every call, books the visit and writes it into the chart, then hands anything sensitive straight to a person.",
  ],
  /** Last paragraph, shown darker and bolder. */
  highlight: "Today Halden answers calls for clinics across the US, in more than 30 languages.",
  /** Two photos under the text (wide one first). */
  photos: [
    { src: storyClinician, alt: "Clinician reviewing a tablet in an exam room" },
    { src: storyConsultation, alt: "Doctor smiling while talking with a patient" },
  ] satisfies { src: StaticImageData; alt: string }[],
};

/** Value card icons: stroke paths on a 48×48 grid, drawn on a coloured tile. */
export const values = {
  eyebrow: { label: "Our values", icon: eyebrowIcons.hourglass, tone: "sky" as const },
  title: "Four rules we ",
  titleMuted: "build by",
  items: [
    {
      title: "Patients first",
      text: "Every rule starts with what is safest for the caller.",
      tile: "#c8defb",
      icon: "M24 33c-6-4-10-7.5-10-12 0-3.3 2.5-6 5.5-6 2 0 3.5 1 4.5 2.6 1-1.6 2.5-2.6 4.5-2.6 3 0 5.5 2.7 5.5 6 0 4.5-4 8-10 12Z",
    },
    {
      title: "Staff stay in charge",
      text: "Halden handles the routine. Your team owns the rest.",
      tile: "#d1c3fb",
      icon: "M14 33c0-4 3-7 7-7s7 3 7 7m0-17.7c1.8.5 3 2 3 3.7s-1.2 3.2-3 3.7m2 3.6c2.4.9 4 3.4 4 6.7M21 23a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    },
    {
      title: "Trust is earned",
      text: "We test with real clinics and say what we can’t do.",
      tile: "#c5eeec",
      icon: "m20 24 3 3 5-6m-4-7 9 3.5V23c0 5.5-4 9.5-9 11-5-1.5-9-5.5-9-11v-5.5l9-3.5Z",
    },
    {
      title: "Say it plainly",
      text: "No jargon for patients, no black boxes for clinics.",
      tile: "#f3f8e0",
      icon: "M14 17.5c0-1.7 1.3-3 3-3h14c1.7 0 3 1.3 3 3v9c0 1.7-1.3 3-3 3h-9l-5 4v-4c-1.7 0-3-1.3-3-3v-9Z",
    },
  ],
};

export const history = {
  eyebrow: { label: "Our journey", icon: eyebrowIcons.grid, tone: "violet" as const },
  title: "Company History",
  description: "From one waiting room to 1,200+ clinics.",
  /** Card shown in the centre when the page loads (0 = first). */
  start: 2,
  /** Seconds between automatic steps (0 turns autoplay off). */
  autoplay: 3,
  labels: {
    region: "Company milestones",
    prev: "Previous milestone",
    next: "Next milestone",
    /** Toggle button that stops / restarts autoplay (aria-pressed shows its state, so the label stays the same). */
    pause: "Pause autoplay",
  },
  /** `progress` = how much of the bar is filled (0–1). */
  milestones: [
    {
      year: "2023",
      title: "The idea",
      text: "Our founders spent a week behind a busy dermatology front desk and watched half the calls go to voicemail.",
      progress: 1 / 7,
    },
    {
      year: "2024",
      title: "Halden is founded",
      text: "We started in San Francisco with a seed round and one goal: answer every patient call in one ring.",
      progress: 2 / 7,
    },
    {
      year: "2024",
      title: "First clinic goes live",
      text: "Brightwater Dermatology switched on Halden and cut voicemail to zero in its very first week.",
      progress: 3 / 7,
    },
    {
      year: "2025",
      title: "Texts and web chat",
      text: "The same agent began answering patient texts and website chat with one shared set of rules.",
      progress: 4 / 7,
    },
    {
      year: "2025",
      title: "SOC 2 Type II and BAA",
      text: "We completed our SOC 2 Type II audit and now sign a BAA with every clinic by default.",
      progress: 5 / 7,
    },
    {
      year: "2026",
      title: "30+ languages",
      text: "Halden detects a caller’s language and switches mid-call, with no transfer needed.",
      progress: 6 / 7,
    },
    {
      year: "2026",
      title: "1,200+ clinics",
      text: "Halden now answers calls, texts and referrals for more than 1,200 clinics across the US.",
      progress: 1,
    },
  ],
};

/** Clinic names shown as coloured tiles (sample names – replace with your customers). */
export const trustedBy = {
  eyebrow: { label: "Trusted by clinic teams", icon: eyebrowIcons.hourglass, tone: "sky" as const },
  /** `dark` = navy text for the darker blue tiles. */
  clinics: [
    { name: "Brightwater", bg: "#f2f8de" },
    { name: "Northside Ortho", bg: "#eff5fe" },
    { name: "Sunrise Pediatrics", bg: "#c5eeec" },
    { name: "Cedar Family", bg: "#d1c3fb" },
    { name: "Lumen Health", bg: "#7baff9", dark: true },
    { name: "Oakview Dental", bg: "#f2f8de" },
    { name: "Harbor Women’s", bg: "#7baff9", dark: true },
    { name: "Riverbend Care", bg: "#d1c3fb" },
    { name: "Summit Derm", bg: "#c3dffe" },
    { name: "Bayline Clinics", bg: "#ffffff" },
    { name: "Elm Street PT", bg: "#f1f2f4" },
    { name: "Clearview Eye", bg: "#c5eeec" },
  ],
};

export const press = {
  eyebrow: { label: "News & press", icon: eyebrowIcons.grid, tone: "violet" as const },
  title: "Halden in the news",
  viewAll: { label: "View All", href: "/blog" },
  /** Posts per page and the most pages shown in the pagination. */
  perPage: 3,
  maxPages: 5,
  labels: { pagination: "News pages", page: "Page" },
};
