/**
 * Platform page content (route "/platform").
 * ------------------------------------------------------------
 * Every text, number and image on the Platform page lives here.
 * Edit the values; the components in src/components/platform/ render them.
 * Images are imported from src/assets/images/platform (next/image reads their size).
 * Names, quotes and integrations are fictional demo content.
 */
import { siteConfig } from "@/config/site";
import { eyebrowIcons } from "@/config/pages/shared";
import type { FaqContent } from "@/components/sections/Faq";
import avatarAna2 from "@/assets/images/platform/avatar-ana-2.jpg";
import avatarAna from "@/assets/images/platform/avatar-ana.png";
import avatarCall1 from "@/assets/images/platform/avatar-call-1.png";
import avatarCall2 from "@/assets/images/platform/avatar-call-2.png";
import avatarCall3 from "@/assets/images/platform/avatar-call-3.png";
import avatarDaniel2 from "@/assets/images/platform/avatar-daniel-2.jpg";
import avatarDaniel from "@/assets/images/platform/avatar-daniel.png";
import avatarDrPatelSm from "@/assets/images/platform/avatar-dr-patel-sm.jpg";
import avatarDrPatel from "@/assets/images/platform/avatar-dr-patel.png";
import avatarMaya2 from "@/assets/images/platform/avatar-maya-2.jpg";
import avatarMaya from "@/assets/images/platform/avatar-maya.png";
import avatarStaff from "@/assets/images/platform/avatar-staff.png";
import heroFrontDesk from "@/assets/images/platform/hero-front-desk.png";
import testimonialLenaOrtiz from "@/assets/images/platform/testimonial-lena-ortiz.jpg";
import testimonialMarkEllison from "@/assets/images/platform/testimonial-mark-ellison.jpg";
import testimonialRosaDelgado from "@/assets/images/platform/testimonial-rosa-delgado.jpg";

const gridIcon = eyebrowIcons.grid;

export const meta = {
  title: "Platform",
  description:
    "Halden answers calls, texts and referral faxes, books straight into your EHR and follows up, in your clinic’s voice and by your rules.",
};

/* ------------------------------------------------------------------ Hero */

export const hero = {
  /** Use "\n" for the line break from the design. */
  title: "One agent for every\nfront-desk job",
  description:
    "Halden answers calls, texts and referral faxes, books straight into your EHR and follows up, in your clinic’s voice and by your rules.",
  cta: { label: "Book a Demo", href: siteConfig.cta.href },
  image: heroFrontDesk,
};

/* ---------------------------------------------------------- How it works */

export type Tone = "blue" | "green" | "violet" | "grey" | "sky";

export type Job = {
  /** Used for element ids. */
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
};

export const howItWorks = {
  id: "how-it-works",
  heading: {
    eyebrow: { label: "How it works", icon: eyebrowIcons.hourglass, tone: "sky" as const },
    title: "Four jobs off your plate.\n",
    titleMuted: "Done for you, day and night.",
    description:
      "Your phones ring faster than your team can answer, and every missed call can mean a lost patient. Start with one job, or turn on all four.",
  },
  /** Accessible name of the job tabs. */
  tabsLabel: "Halden jobs",
  /** Pill in the top right corner of every panel. */
  status: "Live today",
  jobs: [
    {
      id: "answer",
      number: "01",
      label: "Answer",
      title: "Every call picked up.",
      description: "Halden answers calls, texts and website chats right away, day or night, in the patient’s own language.",
    },
    {
      id: "schedule",
      number: "02",
      label: "Schedule",
      title: "Booked straight into your EHR.",
      description:
        "Halden finds the right provider, visit type and open slot, then books it while the patient is still on the line.",
    },
    {
      id: "verify",
      number: "03",
      label: "Verify",
      title: "Insurance checked before they arrive.",
      description: "Eligibility, copays and referrals are confirmed in seconds, so there are no surprises at the front desk.",
    },
    {
      id: "follow-up",
      number: "04",
      label: "Follow Up",
      title: "No patient falls through the cracks.",
      description: "Reminders, confirmations and waitlist fills go out on their own, and every reply lands with your team.",
    },
  ] satisfies Job[],

  /** 01 Answer – channels, the Halden hub and live conversations. */
  answer: {
    channels: ["Call", "Text", "Web chat"],
    live: "Live",
    listTitle: "Conversations right now",
    listCount: "3 active · 0 on hold",
    conversations: [
      { title: "Call · Maya R.", detail: "Wants to reschedule", status: "Answering", avatar: avatarMaya },
      { title: "Text · Daniel K.", detail: "New patient question", status: "Replied", avatar: avatarDaniel },
      { title: "Web chat · Ana L.", detail: "Saturday hours?", status: "Answered", avatar: avatarAna },
    ],
  },

  /** 02 Schedule – provider calendar, the caller and the booking. */
  schedule: {
    calendarTitle: "Dr. Patel · Week of Nov 16",
    calendarAvatar: avatarDrPatelSm,
    synced: "EHR synced",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    times: ["9:00", "9:30", "10:00", "10:30", "11:00"],
    /** One string per day, one letter per time: "-" taken, "o" open, "x" booked by Halden. */
    slots: ["-o--o", "o--o-", "--o--", "-o-xo", "o--o-"],
    quote: "“Thursday morning works for me.”",
    quoteAvatar: avatarMaya2,
    booking: {
      title: "Maya R. · Follow-up visit",
      detail: "Thu, Nov 19 · 10:30 AM · Dr. Patel",
      status: "Booked",
      avatar: avatarMaya2,
    },
    confirmation: "Confirmation text sent to (415) ··· 0192",
  },

  /** 03 Verify – coverage check card. */
  verify: {
    patient: "Daniel K. · New patient",
    plan: "Aetna PPO · Member ID ···· 4821",
    avatar: avatarDaniel2,
    status: "Verified",
    rows: [
      { label: "Eligibility", value: "Active" },
      { label: "Specialist copay", value: "$35" },
      { label: "Deductible met", value: "$1,240 / $1,500" },
      { label: "Prior authorization", value: "Not required" },
      { label: "Referral on file", value: "Received via eFax" },
    ],
    timer: "Checked in 8 seconds",
    api: { label: "Payer API", status: "200 OK" },
    note: "Copay shared with patient by text",
  },

  /** 04 Follow up – automatic messages and the patient's phone. */
  followUp: {
    events: [
      {
        when: "48h before",
        title: "Reminder sent",
        detail: "“See you Thursday at 10:30, Maya. Reply C to confirm.”",
        status: "Sent",
        tone: "blue" as Tone,
        avatar: avatarMaya2,
      },
      {
        when: "Patient replied",
        title: "Appointment confirmed",
        detail: "Confirmed by text",
        status: "Confirmed",
        tone: "green" as Tone,
        avatar: avatarMaya2,
      },
      {
        when: "Cancellation · 9:00 slot",
        title: "Waitlist filled",
        detail: "Ana L. booked the open slot in 4 min",
        status: "Filled",
        tone: "violet" as Tone,
        avatar: avatarAna2,
      },
      {
        when: "After visit",
        title: "Feedback request",
        detail: "“How was your visit today?” · 4.9★ avg",
        status: "Scheduled",
        tone: "grey" as Tone,
        avatar: avatarDaniel2,
      },
    ],
    phone: {
      sender: "Brightwater Derm",
      message: "See you Thu at 10:30. Reply C to confirm.",
      reply: "C",
      confirmation: "You’re confirmed ✓",
    },
  },
};

/* --------------------------------------------------- Built for clinics */

export type FeatureArt = "records" | "language" | "handoff" | "calls" | "rules" | "safety";

export const features = {
  heading: {
    eyebrow: { label: "Platform", icon: gridIcon, tone: "violet" as const },
    title: "Built for how clinics work",
    description: "Take everyday tasks off the front desk so your team can focus on the patients in front of them.",
  },
  items: [
    {
      art: "records" as FeatureArt,
      title: "Fits right in",
      description: "Syncs every booking and call note straight to your patient records.",
      background: "#c8defb",
    },
    {
      art: "language" as FeatureArt,
      title: "Speaks their language",
      description: "A warm voice that switches language mid-call when the patient does.",
      background: "#d1c3fb",
    },
    {
      art: "handoff" as FeatureArt,
      title: "Hands off gently",
      description: "Billing, upset callers and medical questions go straight to your staff.",
      background: "#c5eeec",
    },
    {
      art: "calls" as FeatureArt,
      title: "Every call on record",
      description: "Listen back, read the transcript and search every call by patient.",
      background: "#f3f8e0",
    },
    {
      art: "rules" as FeatureArt,
      title: "Follows your rules",
      description: "Set hours and visit rules once. Cancelled slots fill from the waitlist.",
      background: "#f1f2f4",
    },
    {
      art: "safety" as FeatureArt,
      title: "Safe by default",
      description: "No medical advice. Urgent calls go straight to your nurse line or 911.",
      background: "#f5f3ee",
    },
  ],
  /** Text inside the small illustrations of the cards. */
  art: {
    records: {
      record: "Patient record",
      person: { name: "Dr. Patel", detail: "Tue 10:40 AM", avatar: avatarDrPatel },
      notes: "Visit notes",
    },
    language: { badge: "ES", quote: "“Hola, ¿en qué le puedo ayudar hoy?”", detail: "Spanish · detected automatically" },
    handoff: {
      person: { name: "Jess · Front desk", detail: "Billing question", avatar: avatarStaff },
      summary: "Summary passed along",
      status: "Ringing",
    },
    calls: {
      title: "Today’s calls",
      rows: [
        { name: "Maya R. Reschedule", status: "Booked", tone: "blue" as Tone, avatar: avatarCall1 },
        { name: "Daniel K. New patient", status: "Booked", tone: "blue" as Tone, avatar: avatarCall2 },
        { name: "Tom W. Billing", status: "Transferred", tone: "green" as Tone, avatar: avatarCall3 },
      ],
    },
    rules: {
      /** 5 columns × 6 rows: "o" open, "-" taken, "x" cancelled. */
      slots: ["ooooo", "-oooo", "o-ooo", "oxooo", "ooo-o", "ooooo"],
      cancelled: "×",
      person: { name: "Dr. Kim", detail: "Fri 8:50 AM", avatar: avatarStaff },
      badge: "+1 slot filled",
    },
    safety: { quote: "“I’ve had chest pain since this morning”", title: "Nurse line", detail: "Connected now" },
  },
};

/* ---------------------------------------------------------- Integrations */

export const integrations = {
  /** Anchor used by the footer link "/platform#integrations". */
  id: "integrations",
  heading: {
    eyebrow: { label: "Integrations", icon: gridIcon, tone: "violet" as const },
    title: "Works with the systems\n",
    titleMuted: "you already run",
    description: "Halden reads and writes to your scheduling, records and messaging tools, so nothing gets copied by hand.",
  },
  /** Accessible name of the logo list. */
  listLabel: "Supported integrations",
  /** Two rows: the first scrolls left, the second right. Fictional products. */
  rows: [
    [
      { name: "Medrock", category: "EHR & charting", color: "#2c67f6" },
      { name: "Clinicly", category: "Practice management", color: "#0c1a2f" },
      { name: "Northpoint", category: "Scheduling", color: "#d1c3fb" },
      { name: "Kairo", category: "Billing & insurance", color: "#c5eeec" },
      { name: "Sunline", category: "eFax & referrals", color: "#c8defb" },
      { name: "Tidewell", category: "SMS & reminders", color: "#2c67f6" },
    ],
    [
      { name: "Calendo", category: "Calendars", color: "#0c1a2f" },
      { name: "Ledgerly", category: "Payments", color: "#d1c3fb" },
      { name: "Veriscan", category: "Insurance checks", color: "#c5eeec" },
      { name: "Pulsenote", category: "Patient forms", color: "#c8defb" },
      { name: "Carebridge", category: "HL7 & FHIR", color: "#2c67f6" },
      { name: "Dialwell", category: "Phone system", color: "#0c1a2f" },
    ],
  ],
  /** Pixels per second of the scrolling rows. */
  speed: 40,
  /** Labels of the pause button (shown when it gets keyboard focus). */
  pauseLabel: "Pause Integrations Animation",
  playLabel: "Play Integrations Animation",
};

/* ----------------------------------------------------------------- Setup */

export const setup = {
  heading: {
    eyebrow: { label: "Setup", icon: eyebrowIcons.hourglass, tone: "sky" as const },
    title: "Live in about ",
    titleMuted: "two weeks",
  },
  steps: [
    {
      number: "01",
      when: "Week 1",
      title: "Connect your systems",
      description: "We link your EHR, scheduling and phone line, and load your hours, providers and visit types.",
    },
    {
      number: "02",
      when: "Week 2",
      title: "Approve every script",
      description: "Listen to test calls, tweak the rules and decide what always goes to a person.",
    },
    {
      number: "03",
      when: "Day 14",
      title: "Go live, then improve",
      description: "Halden starts answering. Weekly reviews keep it sharp as your clinic changes.",
    },
  ],
};

/* -------------------------------------------------------------- Channels */

/** Channel icons (48×48 tile, stroke paths on a 48 grid). */
export const channelIcons = {
  phone:
    "M17.75 15h4l2 5-2.5 1.5c1.2 2.5 3.1 4.5 5.5 5.7l1.5-2.4 5 1.7v4c0 1.3-1.1 2.5-2.5 2.5-8.8-.6-15.4-7.2-16-16 0-1.1 1.4-2 3-2Z",
  text: "M15 18c0-1.7 1.3-3 3-3h12c1.7 0 3 1.3 3 3v8c0 1.7-1.3 3-3 3h-8l-4 4v-4c-1.7 0-3-1.3-3-3v-8Z",
  web: "M24 15c5 0 9 4 9 9m-9-9c-5 0-9 4-9 9m9-9c-3 3-3 15 0 18m0-18c3 3 3 15 0 18m9-9c0 5-4 9-9 9m9-9H15m9 9c-5 0-9-4-9-9",
  fax: "M19 21v-6h10v6m-10 8h-3c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1h-3m-10-3h10v7H19v-7Z",
} as const;

export const channels = {
  heading: {
    eyebrow: { label: "Channels", icon: gridIcon, tone: "violet" as const },
    title: "One agent,\n",
    titleMuted: "every channel",
    description: "Patients reach you however they like. Halden answers all of it with the same rules and the same voice.",
  },
  items: [
    {
      icon: "phone" as keyof typeof channelIcons,
      title: "Phone calls",
      description: "Answers in one ring, 24/7, in 30+ languages.",
      background: "#c8defb",
    },
    {
      icon: "text" as keyof typeof channelIcons,
      title: "Texts",
      description: "Replies to booking and reminder texts in seconds.",
      background: "#d1c3fb",
    },
    {
      icon: "web" as keyof typeof channelIcons,
      title: "Web chat",
      description: "Books visits straight from your website chat.",
      background: "#c5eeec",
    },
    {
      icon: "fax" as keyof typeof channelIcons,
      title: "Referral eFax",
      description: "Reads referrals and books the first visit for you.",
      background: "#f3f8e0",
    },
  ],
};

/* ---------------------------------------------------------- Testimonials */

export const testimonials = {
  heading: {
    eyebrow: { label: "Results", icon: eyebrowIcons.hourglass, tone: "sky" as const },
    title: "Clinics hear the difference",
  },
  items: [
    {
      quote: "“Our voicemail went quiet in the first week. Patients get booked while they’re still on the phone.”",
      name: "Dr. Lena Ortiz",
      role: "Brightwater Dermatology",
      avatar: testimonialLenaOrtiz,
    },
    {
      quote: "“Spanish-speaking families finally reach us on the first try. That alone changed our reviews.”",
      name: "Rosa Delgado",
      role: "Practice manager, Sunrise Pediatrics",
      avatar: testimonialRosaDelgado,
    },
    {
      quote: "“Two front-desk staff now handle what used to take four. Nobody is burning out at 8am.”",
      name: "Mark Ellison",
      role: "Operations lead, Northside Ortho",
      avatar: testimonialMarkEllison,
    },
  ],
};

/* ------------------------------------------------------------------- FAQ */

export const faq: FaqContent = {
  heading: {
    eyebrow: { label: "FAQ", icon: eyebrowIcons.question, tone: "lime" },
    title: "Platform\n",
    titleMuted: "questions",
    description: "How Halden fits into your clinic, your systems and your team.",
  },
  items: [
    {
      question: "How does Halden learn our clinic?",
      answer: "We load your hours, providers, visit types and rules during setup. You approve every script before it goes live.",
    },
    {
      question: "Can it book directly into our EHR?",
      answer:
        "Yes. Halden books new and returning patients straight into your EHR and writes every call note to the patient record.",
    },
    {
      question: "What happens with calls it can’t handle?",
      answer:
        "Billing questions, upset callers and medical questions go straight to your staff with a summary. Urgent calls go to your nurse line or 911.",
    },
    {
      question: "Does it handle texts and web chat too?",
      answer: "Yes. The same agent answers calls, texts, web chat and referral eFax with one shared set of rules.",
    },
    {
      question: "How many languages does it speak?",
      answer: "More than 30. Halden detects a caller’s language and switches mid-call, with no transfer needed.",
    },
    {
      question: "Can we change scripts later?",
      answer: "Yes. Update hours, rules and scripts any time. Weekly reviews keep Halden sharp as your clinic changes.",
    },
  ],
};
