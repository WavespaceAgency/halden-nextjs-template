/**
 * Security page content (route "/security").
 * ------------------------------------------------------------
 * Every text, number and image on the Security page lives here.
 * Edit the values; the components in src/components/security/ render them.
 */
import type { StaticImageData } from "next/image";
import heroImage from "@/assets/images/security/hero.png";
import type { FaqContent } from "@/components/sections/Faq";
import type { EyebrowContent } from "@/components/ui/Eyebrow";
import { eyebrowIcons } from "@/config/pages/shared";
import { siteConfig } from "@/config/site";

/** Shield + tick on the 28×28 eyebrow grid. */
export const shieldIcon =
  "M11.786 13.959l1.64 1.64 2.952-3.116M14 8.055l5.33 2.05v3.69c0 3.116-2.296 5.248-5.33 6.15-3.034-.902-5.33-3.034-5.33-6.15v-3.69L14 8.055Z";

/** Content of the photo hero shared by the Security and Pricing pages. */
export type PageHeroContent = {
  /** Use "\n" for the line break from the design. */
  title: string;
  description: string;
  cta: { label: string; href: string };
  /** Background photo (imported from src/assets/images, so its size is known). */
  image: StaticImageData;
};

export const meta = {
  title: "Security",
  description:
    "Every call, text and record is encrypted, access-controlled and logged. Halden is built for HIPAA from the first ring.",
};

export const hero: PageHeroContent = {
  title: "Patient data,\nlocked down",
  description: "Every call, text and record is encrypted, access-controlled and logged. Halden is built for HIPAA from the first ring.",
  cta: { label: "Book a Demo", href: siteConfig.cta.href },
  image: heroImage,
};

export const standards = {
  /** Anchor used by the footer ("SOC 2" → /security#standards). */
  id: "standards",
  eyebrow: { label: "Standards", icon: shieldIcon, tone: "mint" } satisfies EyebrowContent,
  title: "Built on standards your\n",
  titleMuted: "compliance team already knows",
  items: [
    { title: "HIPAA", text: "Privacy & Security Rules" },
    { title: "BAA", text: "Signed with every clinic" },
    { title: "SOC 2 Type II", text: "Independent audit" },
    { title: "AES-256", text: "Encryption at rest" },
    { title: "TLS 1.3", text: "Encryption in transit" },
  ],
};

/** Status colours used in the privacy cards. */
export type StatusTone = "ink" | "blue" | "red";

export type PrivacyStep = {
  /** Tab label. */
  tab: string;
  /** Use "\n" for the line break from the design. */
  title: string;
  text: string;
  /** Status card shown over the glass fan while this step is selected. */
  card: {
    title: string;
    /** Small step number in the card corner (leave empty for none). */
    number: string;
    rows: { label: string; status: string; tone: StatusTone }[];
  };
};

export const privacy = {
  eyebrow: { label: "Security", icon: shieldIcon, tone: "white" } satisfies EyebrowContent,
  title: "Privacy built into every call. ",
  titleAccent: "Protected from ring to chart.",
  /** Accessible name of the tab list. */
  tabsLabel: "How Halden protects patient data",
  cta: { label: "Book a Demo", href: siteConfig.cta.href },
  steps: [
    {
      tab: "Protect",
      title: "Locked down from\nthe first ring",
      text: "Calls, texts and records are encrypted while they move and while they rest. Patient data is never used to train AI models.",
      card: {
        title: "Encrypted",
        number: "",
        rows: [
          { label: "Call recording · Maya", status: "Locked", tone: "ink" },
          { label: "Insurance details", status: "Locked", tone: "ink" },
          { label: "Visit notes", status: "Locked", tone: "ink" },
        ],
      },
    },
    {
      tab: "Limit",
      title: "Only the right people\nsee it",
      text: "Front desk, nurses and billing each see only what their job needs. Every login uses SSO and two-factor.",
      card: {
        title: "Access",
        number: "02",
        rows: [
          { label: "Front desk · Schedule", status: "Allowed", tone: "blue" },
          { label: "Nurse · Visit notes", status: "Allowed", tone: "blue" },
          { label: "Billing · Call audio", status: "Blocked", tone: "red" },
        ],
      },
    },
    {
      tab: "Record",
      title: "Every action leaves a\ntrail",
      text: "Each call, booking and record view is logged with who, what and when, so you can answer any audit question in minutes.",
      card: {
        title: "Audit log",
        number: "03",
        rows: [
          { label: "09:41 · Booking created", status: "Logged", tone: "blue" },
          { label: "09:43 · Notes viewed", status: "Logged", tone: "blue" },
          { label: "09:52 · Data export", status: "Logged", tone: "blue" },
        ],
      },
    },
    {
      tab: "Review",
      title: "Ready when\ncompliance asks",
      text: "Export audit trails, access reports and your signed BAA any time. We renew our SOC 2 Type II audit every year.",
      card: {
        title: "Compliance",
        number: "04",
        rows: [
          { label: "SOC 2 Type II report", status: "Current", tone: "ink" },
          { label: "Signed BAA", status: "On file", tone: "ink" },
          { label: "Access review · Q4", status: "Ready", tone: "ink" },
        ],
      },
    },
  ] satisfies PrivacyStep[],
  note: "Private by default. Ready for your compliance team.",
  /** Values with a digit count up when they scroll into view. */
  stats: [
    { value: "0", label: "Patient records used\nto train AI" },
    { value: "100%", label: "Of calls encrypted\nand logged" },
    { value: "BAA", label: "Signed with every clinic\nbefore go-live" },
  ],
};

export const compliance = {
  /** Anchor used by the footer ("HIPAA", "BAA" → /security#compliance). */
  id: "compliance",
  eyebrow: { label: "Compliance", icon: shieldIcon, tone: "mint" } satisfies EyebrowContent,
  title: "Ready for your\n",
  titleMuted: "compliance review",
  description: "The controls your privacy officer will ask about, already in place on day one.",
  items: [
    { title: "HIPAA-ready by design", text: "Built to follow the HIPAA Privacy and Security Rules for every call and record." },
    { title: "BAA with every clinic", text: "We sign a Business Associate Agreement before any patient data is shared." },
    { title: "Encrypted end to end", text: "Calls, texts and records are encrypted in transit and at rest." },
    { title: "Role-based access", text: "Staff only see what their role needs. Every login is tracked." },
    { title: "Full audit trail", text: "Every call, edit and export is logged and searchable for review." },
    { title: "No training on patient data", text: "Your patients’ data is never used to train AI models. Ever." },
  ],
};

export const faq: FaqContent = {
  heading: {
    eyebrow: { label: "FAQ", icon: eyebrowIcons.question, tone: "lime" },
    title: "Security\n",
    titleMuted: "questions",
    description: "What your privacy officer will want to know before go-live.",
  },
  items: [
    {
      question: "Is Halden HIPAA compliant?",
      answer: "Halden is built to follow HIPAA, and we sign a BAA with every clinic before go-live.",
    },
    {
      question: "Where is patient data stored?",
      answer:
        "In secure cloud storage run by vetted sub-processors, each bound by a BAA. Data is encrypted at rest with AES-256 and in transit with TLS 1.3.",
    },
    {
      question: "Who at Halden can see our data?",
      answer: "Only trained, authorised staff, and only what their role needs. Every access is logged and searchable for review.",
    },
    {
      question: "Is our data used to train AI?",
      answer: "No. Your patients’ data is never used to train AI models, and one clinic’s data is never used for another.",
    },
    {
      question: "Can we export or delete our data?",
      answer: "Yes. Export or delete your clinic’s data at any time. Deleted data is removed from backups within 30 days.",
    },
  ],
};
