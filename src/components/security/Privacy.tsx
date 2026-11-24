import Link from "next/link";
import type { CSSProperties } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { privacy, type PrivacyStep, type StatusTone } from "@/config/pages/security";
import { buttonClasses } from "@/lib/button";
import { cn } from "@/lib/utils";
import styles from "./Privacy.module.css";
import { PrivacyTabs } from "./PrivacyTabs";
import { SectionIntro } from "./SectionIntro";

const statusColor: Record<StatusTone, string> = { ink: "text-ink-2", blue: "text-brand-text", red: "text-[#b03f44]" };

/** Start delay and duration of one piece of the status card's entrance (Framer timings). */
const timing = (delay: number, duration: number) => ({ "--dl": `${delay.toFixed(2)}s`, "--dur": `${duration}s` }) as CSSProperties;

/** Text + button of one step (a tab panel). */
function StepPanel({ step }: { step: PrivacyStep }) {
  const p = privacy;
  return (
    <>
      <div className="flex flex-col gap-[11px]">
        <SplitText as="h3" mode="chars" className="text-h3 font-medium text-canvas">
          {step.title}
        </SplitText>
        <SplitText as="p" mode="words" className="max-w-[321px] text-base leading-[26px] text-canvas">
          {step.text}
        </SplitText>
      </div>
      <Link href={p.cta.href} className={buttonClasses({ variant: "light", className: "bg-canvas focus-visible:outline-canvas" })}>
        {p.cta.label}
      </Link>
    </>
  );
}

/** Status card of one step (decorative copy of the step; the panel text carries the meaning). */
function StatusCard({ card }: { card: PrivacyStep["card"] }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2.5">
          <span className="h-6 w-[3px] bg-brand-bright" />
          <span className={cn(styles.cardAnim, "text-h4 leading-6 font-medium tracking-[-0.015em] text-ink")} style={timing(0.14, 0.45)}>
            {card.title}
          </span>
        </p>
        {card.number && (
          <span className={cn(styles.cardAnim, "text-[11px] font-medium text-muted")} style={timing(0.2, 0.4)}>
            {card.number}
          </span>
        )}
      </div>
      <ul className="flex flex-col gap-1.5 pt-3.5">
        {card.rows.map((row, r) => (
          <li key={row.label} className={cn(styles.row, "flex h-9 items-center justify-between gap-3 rounded-lg bg-canvas-2 px-2.5")}>
            <span className={cn(styles.cardAnim, "flex items-center gap-2 text-[13px] leading-[17px] text-ink")} style={timing(0.22 + r * 0.09, 0.5)}>
              <svg className="size-[18px] shrink-0" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#6bb1ff" />
                <path d="M6.083 9.208 7.958 11.083 11.917 7.125" stroke="var(--canvas)" strokeWidth="1.417" />
              </svg>
              {row.label}
            </span>
            <span
              className={cn(styles.cardAnim, "text-[11px] leading-[14px] font-medium tracking-[0.02em]", statusColor[row.tone])}
              style={timing(0.48 + r * 0.09, 0.35)}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Figma "Section" 660:11184 (1440×1182, purple gradient): heading, four tabs
 * (Protect / Limit / Record / Review) that swap the text and the status card over
 * the glass fan, then the note and the stats row. The tabs are the only client part (PrivacyTabs).
 */
export function Privacy() {
  const p = privacy;
  return (
    <section className={cn(styles.section, "relative overflow-hidden rounded-[24px] lg:rounded-[32px]")} aria-labelledby="privacy-title">
      <div className="mx-auto max-w-[1200px] px-4 pt-16 pb-16 sm:px-6 lg:px-10 lg:pt-[120px] lg:pb-[112px]">
        <div className="border-l border-canvas/24">
          <SectionIntro
            id="privacy-title"
            eyebrow={p.eyebrow}
            title={p.title}
            titleAccent={p.titleAccent}
            theme="light"
            className="mx-auto max-w-[731px] px-4 lg:px-0"
          />

          <PrivacyTabs
            label={p.tabsLabel}
            tabs={p.steps.map((step) => step.tab)}
            panels={p.steps.map((step) => (
              <StepPanel key={step.tab} step={step} />
            ))}
            cards={p.steps.map((step) => (
              <StatusCard key={step.tab} card={step.card} />
            ))}
          />

          <p className="pt-14 pl-5 text-sm leading-[18px] font-medium tracking-[0.02em] text-canvas uppercase lg:pt-[94px]">{p.note}</p>

          <ul className="mt-7 grid border-y border-canvas/24 lg:grid-cols-3">
            {p.stats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center gap-[22px] border-canvas/24 px-5 py-6 not-last:border-b sm:px-8 lg:py-[30px] lg:not-last:border-r lg:not-last:border-b-0 lg:nth-2:mr-[51px]"
              >
                <p
                  className="text-[44px] leading-[1.1] font-medium tracking-[-0.03em] text-canvas"
                  data-count={/\d/.test(stat.value) ? stat.value : undefined}
                >
                  {stat.value}
                </p>
                <p className="text-[15px] leading-[21px] whitespace-pre-line text-canvas">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
