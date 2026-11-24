import Link from "next/link";
import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/security/SectionIntro";
import { plans, type Plan } from "@/config/pages/pricing";
import { cn } from "@/lib/utils";
import styles from "./Plans.module.css";

/** One plan card. The featured plan is the dark one. Prices with a digit count up in view. */
function PlanCard({ plan }: { plan: Plan }) {
  const dark = plan.featured;
  return (
    <li className={cn(styles.card, "flex flex-col gap-8 rounded-card p-5 sm:p-6 lg:p-10", dark ? cn(styles.dark, "bg-ink") : cn(styles.light, "bg-canvas-2"))}>
      <div className="flex flex-col gap-3">
        <h3 className="flex items-center gap-2">
          <span className={cn("font-mono text-sm leading-[18px] font-normal tracking-[1.2px] uppercase", dark ? "text-sky" : "text-body")}>{plan.name}</span>
          {plan.badge && <span className={cn(styles.badge, "rounded-full px-2.5 py-1 text-[13px] leading-[17px] font-medium text-ink")}>{plan.badge}</span>}
        </h3>
        <p className="flex items-end gap-2">
          <span className={cn("text-h1 font-medium", dark ? "text-canvas" : "text-ink")} data-count={/\d/.test(plan.price) ? plan.price : undefined}>
            {plan.price}
          </span>
          {plan.period && <span className={cn("text-[13px] leading-[17px]", dark ? "text-[#dcebff]" : "text-muted")}>{plan.period}</span>}
        </p>
        <SplitText as="p" mode="words" className={cn("text-base leading-[26px]", dark ? "max-w-[281px] text-[#dcebff]" : "text-muted")}>
          {plan.description}
        </SplitText>
      </div>

      <Link
        href={plan.cta.href}
        className={cn(
          "inline-flex min-h-[52px] items-center justify-center rounded-full px-6 text-base leading-6 font-medium text-ink transition-[background-color,scale] duration-[250ms,450ms] ease-[ease,cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] active:scale-[0.97] motion-reduce:hover:scale-100",
          dark ? "bg-surface hover:bg-sky-tint focus-visible:outline-sky" : "border border-black/16 hover:bg-surface",
        )}
      >
        {plan.cta.label}
        <span className="sr-only"> – {plan.name}</span>
      </Link>

      <ul className="flex flex-col gap-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className={cn("flex items-start gap-3 text-base leading-[26px]", dark ? "text-canvas" : "text-ink")}>
            <svg className="mt-[3px] size-5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect width="20" height="20" rx="10" fill={dark ? "var(--sky)" : "#dcebff"} />
              <path d="M5.5 9.5 8.7 12.5 14.5 6.5" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <SplitText as="span" mode="words">
              {feature}
            </SplitText>
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Figma "Plans" (1440×1140): heading + three plan cards (the featured one is dark). */
export function Plans() {
  const s = plans;
  return (
    <section className="py-20 lg:py-[120px]" aria-labelledby="plans-title">
      <Container>
        <SectionIntro
          id="plans-title"
          eyebrow={s.eyebrow}
          title={s.title}
          titleMuted={s.titleMuted}
          description={s.description}
          descriptionClassName="max-w-[438px]"
        />
        <ul data-stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16 lg:min-h-[602px]">
          {s.items.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
