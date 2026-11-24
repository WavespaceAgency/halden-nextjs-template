/**
 * Home page content (route "/").
 * ------------------------------------------------------------
 * Every text, number and image on the home page lives here.
 * Edit the values; the components in src/components/home/ render them.
 * Icons are SVG path data drawn on the grid noted next to each set.
 */
import { eyebrowIcons } from "@/config/pages/shared";
import { siteConfig } from "@/config/site";
import type { FaqContent } from "@/components/sections/Faq";
import heroBackground from "@/assets/images/home/hero-background.png";
import patientOutdoors from "@/assets/images/home/patient-outdoors.jpg";
import grandfatherGrandson from "@/assets/images/home/grandfather-grandson.png";
import clinicCorridor from "@/assets/images/home/clinic-corridor.jpg";
import caregiverHands from "@/assets/images/home/caregiver-hands.png";
import drLenaOrtiz from "@/assets/images/home/dr-lena-ortiz.png";
import avatarMayaCall from "@/assets/images/home/avatar-maya-call.png";
import avatarDanielText from "@/assets/images/home/avatar-daniel-text.png";
import avatarAnaChat from "@/assets/images/home/avatar-ana-chat.png";
import avatarDrPatel from "@/assets/images/home/avatar-dr-patel.jpg";
import avatarMaya from "@/assets/images/home/avatar-maya.jpg";
import avatarDaniel from "@/assets/images/home/avatar-daniel.jpg";
import avatarAna from "@/assets/images/home/avatar-ana.jpg";
import avatarDoctor from "@/assets/images/home/avatar-doctor.png";
import avatarJess from "@/assets/images/home/avatar-jess.png";
import avatarMayaSmall from "@/assets/images/home/avatar-maya-small.png";
import avatarDanielSmall from "@/assets/images/home/avatar-daniel-small.png";
import avatarTom from "@/assets/images/home/avatar-tom.png";

/** Small stroke icons on a 14×14 grid (flow diagram nodes). */
const flowIcons = {
  phone: "M2.917 2.042H5.25L6.3 4.667L4.9 5.6C5.584 6.996 6.713 8.125 8.109 8.809L9.042 7.409L11.667 8.459V10.792C11.667 11.024 11.575 11.247 11.411 11.411C11.247 11.575 11.024 11.667 10.792 11.667C8.558 11.416 6.475 10.414 4.885 8.824C3.295 7.234 2.293 5.151 2.042 2.917C2.042 2.685 2.134 2.462 2.298 2.298C2.462 2.134 2.685 2.042 2.917 2.042Z",
  chat: "M2.333 2.917H11.666V9.334H5.25L2.333 11.667V2.917Z",
  fax: "M3.5 5.25H10.5C11.144 5.25 11.666 5.772 11.666 6.417V9.917C11.666 10.561 11.144 11.083 10.5 11.083H3.5C2.855 11.083 2.333 10.561 2.333 9.917V6.417C2.333 5.772 2.855 5.25 3.5 5.25ZM4.083 5.25V2.333H9.916V5.25M4.666 8.166H9.333",
  plusCircle: "M11.666 7C11.666 9.577 9.577 11.666 7 11.666C4.422 11.666 2.333 9.577 2.333 7C2.333 4.422 4.422 2.333 7 2.333C9.577 2.333 11.666 4.422 11.666 7ZM5.25 7H8.75M7 5.25V8.75",
  calendar: "M3.209 2.917H10.792C11.436 2.917 11.959 3.439 11.959 4.084V10.5C11.959 11.145 11.436 11.667 10.792 11.667H3.209C2.564 11.667 2.042 11.145 2.042 10.5V4.084C2.042 3.439 2.564 2.917 3.209 2.917ZM2.042 5.833H11.959M4.667 1.75V4.083M9.334 1.75V4.083",
  check: "M2.917 7.292L5.542 9.917L11.084 4.375",
  chart: "M3.5 1.75H8.167L10.5 4.083V12.25H3.5V1.75ZM8.167 1.75V4.083H10.5M5.25 7H8.75M5.25 9.333H8.75",
  inbox: "M2.333 7.584L4.083 2.917H9.916L11.666 7.584V11.084H2.333V7.584ZM2.333 7.583H5.25L5.833 8.75H8.166L8.75 7.583H11.666",
} as const;

export const hero = {
  /** The heading is split in two lines; the animated waveform sits between "titleStart" and "titleEnd". */
  titleStart: "Patient calls",
  titleEnd: "handled",
  titleLine2: "without the hold music",
  description:
    "Halden is a new kind of front desk: an AI agent that answers, triages and books every patient request, then writes it straight into your clinic’s systems.",
  primary: { label: "Book a Demo", href: siteConfig.cta.href },
  secondary: siteConfig.liveDemo,
  /** Background photo (src/assets/images/home) – the LCP image, preloaded. */
  image: heroBackground,

  /** The flow diagram under the buttons (desktop and tablet). */
  flow: {
    label: "How Halden handles a patient request",
    note: "Most requests resolved\nin a single call",
    inputs: [
      { label: "Phone calls", icon: flowIcons.phone },
      { label: "Texts & web chat", icon: flowIcons.chat },
      { label: "Referral faxes", icon: flowIcons.fax },
    ],
    steps: [
      { label: "Understand & triage", icon: flowIcons.plusCircle },
      { label: "Book in your EHR", icon: flowIcons.calendar },
      { label: "Confirm & follow up", icon: flowIcons.check },
    ],
    outputs: [
      { label: "Your schedule", icon: flowIcons.calendar },
      { label: "Patient chart", icon: flowIcons.chart },
      { label: "Team inbox", icon: flowIcons.inbox },
    ],
    call: {
      name: "Halden",
      status: "Calling Maya R. reminder",
      live: "LIVE",
      message: "Hi Maya, your visit with Dr. Patel is tomorrow at 10:40. Want to keep it?",
      replies: ["Yes, keep it", "Reschedule"],
    },
  },
};

/** "98% resolved" section: big number in the middle, photos and mini cards around it. */
export const resolved = {
  stat: "98%",
  title: "Of routine patient calls resolved without a wait",
  description: "Bookings, reminders and insurance checks happen instantly, so your team has more time for patients.",
  /** Photos around the number (decorative, so no alt text needed). */
  photos: {
    reader: patientOutdoors,
    family: grandfatherGrandson,
    corridor: clinicCorridor,
    hands: caregiverHands,
  },
  callLog: {
    name: "Maya R.",
    time: "0:01",
    rows: [
      { label: "Answered", time: "Mon 9:02" },
      { label: "Booked", time: "Tue 10:40" },
    ],
  },
  insurance: {
    title: "Checking insurance…",
    date: "Today",
    badge: "Verified",
    plan: "PPO plan",
    member: "Member ··· 4471",
    status: "Active",
  },
  weekly: {
    title: "Reviewing this week…",
    rows: [
      { label: "Calls answered", value: "412", accent: true },
      { label: "No-shows", value: "−31%", accent: true },
      { label: "Staff time saved", value: "2 hrs / day", accent: true },
      { label: "Flagged for your team", value: "6", accent: false },
    ],
  },
  refill: { title: "Refill request sent to Dr. Kim", meta: "Priya S. · 2:17 am" },
};

/** "Results" band: testimonial + four numbers on the blue gradient. */
export const results = {
  eyebrow: { label: "Results", icon: eyebrowIcons.hourglass, tone: "white" as const },
  title: "Clinics hear the difference\n",
  titleMuted: "from the first week",
  quote: {
    /** The quote is split in three parts; `highlight` is shown in light blue. */
    before: "“In our first month Halden ",
    highlight: "answered 4,200 calls and booked 610 visits",
    after: " that would have gone straight to voicemail. My front desk finally gets to look up from the phone.”",
    name: "Dr. Lena Ortiz",
    role: "Practice owner, Brightwater Dermatology",
    image: drLenaOrtiz,
    imageAlt: "Portrait of Dr. Lena Ortiz",
  },
  /** Numbers count up when they scroll into view (prefix and suffix are kept). */
  stats: [
    { value: "24/7", label: "Calls answered, nights\nand weekends", count: false },
    { value: "$12k", label: "Recovered per location\nevery month", count: true },
    { value: "30+", label: "Languages patients\ncan book in", count: true },
    { value: "94%", label: "Calls handled\nend to end", count: true },
  ],
};

/** Status pill colours used in the "How it works" mock-ups. */
export type PillTone = "blue" | "sky" | "mint" | "violet" | "grey";

/** "How it works": four jobs, switched by tabs (and by scrolling on desktop). */
export const jobs = {
  eyebrow: { label: "How it works", icon: eyebrowIcons.hourglass, tone: "sky" as const },
  title: "Four jobs off your plate.\n",
  titleMuted: "Done for you, day and night.",
  description:
    "Your phones ring faster than your team can answer, and every missed call can mean a lost patient. Start with one job, or turn on all four.",
  live: "Live today",
  tabsLabel: "Halden jobs",
  items: [
    {
      id: "answer",
      label: "Answer",
      title: "Every call picked up.",
      description: "Halden answers calls, texts and website chats right away, day or night, in the patient’s own language.",
    },
    {
      id: "schedule",
      label: "Schedule",
      title: "Booked straight into your EHR.",
      description: "Halden finds the right provider, visit type and open slot, then books it while the patient is still on the line.",
    },
    {
      id: "verify",
      label: "Verify",
      title: "Insurance checked before they arrive.",
      description: "Eligibility, copays and referrals are confirmed in seconds, so there are no surprises at the front desk.",
    },
    {
      id: "follow-up",
      label: "Follow Up",
      title: "No patient falls through the cracks.",
      description: "Reminders, confirmations and waitlist fills go out on their own, and every reply lands with your team.",
    },
  ],

  /** Mock-up content for each job (illustrations built in HTML/CSS). */
  answer: {
    channels: ["Call", "Text", "Web chat"],
    live: "Live",
    header: { title: "Conversations right now", meta: "3 active · 0 on hold" },
    conversations: [
      { name: "Call · Maya R.", text: "Wants to reschedule", status: "Answering", avatar: avatarMayaCall },
      { name: "Text · Daniel K.", text: "New patient question", status: "Replied", avatar: avatarDanielText },
      { name: "Web chat · Ana L.", text: "Saturday hours?", status: "Answered", avatar: avatarAnaChat },
    ],
  },
  schedule: {
    calendar: "Dr. Patel · Week of Nov 16",
    doctorAvatar: avatarDrPatel,
    synced: "EHR synced",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    times: ["9:00", "9:30", "10:00", "10:30", "11:00"],
    /** Slot state per day and time: 0 = taken, 1 = open, 2 = just booked. */
    slots: [
      [0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 2, 1],
      [1, 0, 0, 1, 0],
    ],
    quote: "“Thursday morning works for me.”",
    booked: { title: "Maya R. · Follow-up visit", meta: "Thu, Nov 19 · 10:30 AM · Dr. Patel", status: "Booked" },
    sms: "Confirmation text sent to (415) ··· 0192",
    patientAvatar: avatarMaya,
  },
  verify: {
    patient: { name: "Daniel K. · New patient", plan: "Aetna PPO · Member ID ···· 4821", status: "Verified", avatar: avatarDaniel },
    rows: [
      { label: "Eligibility", value: "Active" },
      { label: "Specialist copay", value: "$35" },
      { label: "Deductible met", value: "$1,240 / $1,500" },
      { label: "Prior authorization", value: "Not required" },
      { label: "Referral on file", value: "Received via eFax" },
    ],
    timer: "Checked in 8 seconds",
    payer: { label: "Payer API", status: "200 OK" },
    note: "Copay shared with patient by text",
  },
  followUp: {
    timeline: [
      { tag: "48h before", title: "Reminder sent", text: "“See you Thursday at 10:30, Maya. Reply C to confirm.”", status: "Sent", tone: "blue" as PillTone, avatar: avatarMaya },
      { tag: "Patient replied", title: "Appointment confirmed", text: "Confirmed by text", status: "Confirmed", tone: "mint" as PillTone, avatar: avatarMaya },
      { tag: "Cancellation · 9:00 slot", title: "Waitlist filled", text: "Ana L. booked the open slot in 4 min", status: "Filled", tone: "violet" as PillTone, avatar: avatarAna },
      { tag: "After visit", title: "Feedback request", text: "“How was your visit today?” · 4.9★ avg", status: "Scheduled", tone: "grey" as PillTone, avatar: avatarDaniel },
    ],
    phone: {
      sender: "Brightwater Derm",
      incoming: "See you Thu at 10:30. Reply C to confirm.",
      reply: "C",
      confirmed: "You’re confirmed ✓",
    },
  },
};

/** "Built for how clinics work": six feature cards, each with a small mock-up. */
export const platform = {
  eyebrow: {
    label: "Platform",
    icon: "M8.87 8.87h4.1v4.1h-4.1v-4.1Zm6.15 0h4.1v4.1h-4.1v-4.1Zm-6.15 6.15h4.1v4.1h-4.1v-4.1Zm6.15 0h4.1v4.1h-4.1v-4.1Z",
    tone: "violet" as const,
  },
  title: "Built for how clinics work",
  description: "Take everyday tasks off the front desk so your team can focus on the patients in front of them.",
  /** Card order = grid order (left to right, top to bottom). */
  cards: {
    records: {
      title: "Fits right in",
      description: "Syncs every booking and call note straight to your patient records.",
      record: "Patient record",
      doctor: { name: "Dr. Patel", time: "Tue 10:40 AM", avatar: avatarDoctor },
      notes: "Visit notes",
    },
    language: {
      title: "Speaks their language",
      description: "A warm voice that switches language mid-call when the patient does.",
      code: "ES",
      quote: "“Hola, ¿en qué le puedo ayudar hoy?”",
      meta: "Spanish · detected automatically",
    },
    handoff: {
      title: "Hands off gently",
      description: "Billing, upset callers and medical questions go straight to your staff.",
      person: { name: "Jess · Front desk", topic: "Billing question", avatar: avatarJess },
      summary: "Summary passed along",
      status: "Ringing",
    },
    log: {
      title: "Every call on record",
      description: "Listen back, read the transcript and search every call by patient.",
      heading: "Today’s calls",
      calls: [
        { name: "Maya R.", topic: "Reschedule", status: "Booked", transferred: false, avatar: avatarMayaSmall },
        { name: "Daniel K.", topic: "New patient", status: "Booked", transferred: false, avatar: avatarDanielSmall },
        { name: "Tom W.", topic: "Billing", status: "Transferred", transferred: true, avatar: avatarTom },
      ],
    },
    rules: {
      title: "Follows your rules",
      description: "Set hours and visit rules once. Cancelled slots fill from the waitlist.",
      filled: "+1 slot filled",
      doctor: { name: "Dr. Kim", time: "Fri 8:50 AM", avatar: avatarDoctor },
    },
    safety: {
      title: "Safe by default",
      description: "No medical advice. Urgent calls go straight to your nurse line or 911.",
      quote: "“I’ve had chest pain since this morning”",
      line: { name: "Nurse line", status: "Connected now" },
    },
  },
};

/** "Security": four steps (tabs) with a card each, then three numbers. */
export const security = {
  eyebrow: {
    label: "Security",
    icon: "M11.78 13.95l1.64 1.64 2.95-3.11M13.99 8.05l5.33 2.05v3.69c0 3.12-2.29 5.25-5.33 6.15-3.03-.9-5.33-3.03-5.33-6.15V10.1l5.33-2.05Z",
    tone: "white" as const,
  },
  title: "Privacy built into every call. ",
  titleAccent: "Protected from ring to chart.",
  tabsLabel: "How Halden protects patient data",
  cta: { label: "Book a Demo", href: siteConfig.cta.href },
  steps: [
    {
      label: "Protect",
      title: "Locked down from\nthe first ring",
      description: "Calls, texts and records are encrypted while they move and while they rest. Patient data is never used to train AI models.",
      card: {
        title: "Encrypted",
        number: "",
        rows: [
          { label: "Call recording · Maya", status: "Locked", blocked: false },
          { label: "Insurance details", status: "Locked", blocked: false },
          { label: "Visit notes", status: "Locked", blocked: false },
        ],
      },
    },
    {
      label: "Limit",
      title: "Only the right people\nsee it",
      description: "Front desk, nurses and billing each see only what their job needs. Every login uses SSO and two-factor.",
      card: {
        title: "Access",
        number: "02",
        rows: [
          { label: "Front desk · Schedule", status: "Allowed", blocked: false },
          { label: "Nurse · Visit notes", status: "Allowed", blocked: false },
          { label: "Billing · Call audio", status: "Blocked", blocked: true },
        ],
      },
    },
    {
      label: "Record",
      title: "Every action leaves a\ntrail",
      description: "Each call, booking and record view is logged with who, what and when, so you can answer any audit question in minutes.",
      card: {
        title: "Audit log",
        number: "03",
        rows: [
          { label: "09:41 · Booking created", status: "Logged", blocked: false },
          { label: "09:43 · Notes viewed", status: "Logged", blocked: false },
          { label: "09:52 · Data export", status: "Logged", blocked: false },
        ],
      },
    },
    {
      label: "Review",
      title: "Ready when\ncompliance asks",
      description: "Export audit trails, access reports and your signed BAA any time. We renew our SOC 2 Type II audit every year.",
      card: {
        title: "Compliance",
        number: "04",
        rows: [
          { label: "SOC 2 Type II report", status: "Current", blocked: false },
          { label: "Signed BAA", status: "On file", blocked: false },
          { label: "Access review · Q4", status: "Ready", blocked: false },
        ],
      },
    },
  ],
  statsLabel: "Private by default. Ready for your compliance team.",
  stats: [
    { value: "0", label: "Patient records used\nto train AI", count: false },
    { value: "100%", label: "Of calls encrypted\nand logged", count: true },
    { value: "BAA", label: "Signed with every clinic\nbefore go-live", count: false },
  ],
};

/** FAQ (shared Faq component; also used for the FAQPage JSON-LD). */
export const faq: FaqContent = {
  heading: {
    eyebrow: { label: "FAQ", icon: eyebrowIcons.question, tone: "lime" },
    title: "Frequently asked\n",
    titleMuted: "questions",
    description: "Straight answers about setup, safety and how Halden works with your team.",
  },
  items: [
    {
      question: "Will patients know they’re talking to AI?",
      answer: "Yes. Halden says it’s the clinic’s virtual assistant, and patients can ask for a person at any time.",
    },
    {
      question: "Does Halden give medical advice?",
      answer: "No. Halden never gives medical advice. Urgent calls go straight to your nurse line or 911.",
    },
    {
      question: "Which systems does it work with?",
      answer: "Halden syncs every booking and call note straight to your patient records, so your schedule and charts stay up to date.",
    },
    {
      question: "Is it HIPAA compliant?",
      answer: "Calls, texts and records are encrypted while they move and while they rest, and a BAA is signed with every clinic before go-live.",
    },
    {
      question: "How long does setup take?",
      answer: "Most clinics start with one job, like answering calls, and turn on more when they’re ready.",
    },
    {
      question: "What if Halden can’t help a caller?",
      answer: "Billing questions, upset callers and medical questions go straight to your staff, and patients can ask for a person at any time.",
    },
  ],
};
