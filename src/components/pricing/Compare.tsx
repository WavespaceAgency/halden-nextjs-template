import Link from "next/link";
import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/security/SectionIntro";
import { compare, type ComparePlan, type CompareValue } from "@/config/pages/pricing";
import { cn } from "@/lib/utils";
import styles from "./Compare.module.css";

/** Blue tint of the featured plan's column. */
const columnTint = (plan: ComparePlan | undefined) => (plan?.featured ? "bg-[rgb(200_222_251/0.28)]" : "");

/** One table cell: tick (included), dash (not included) or the text value. */
function Cell({ value }: { value: CompareValue }) {
  const { labels } = compare;
  if (value === true) {
    return (
      <svg className={cn(styles.tick, "mx-auto size-6")} viewBox="0 0 24 24" fill="none" role="img" aria-label={labels.included}>
        <rect width="24" height="24" rx="12" fill="var(--brand)" />
        <path d="M7 12.25 10.5 15.75 17 8.25" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (value === false) {
    return (
      <span className="mx-auto flex size-6 items-center justify-center">
        <span className="h-0.5 w-3 rounded-[1px] bg-[#9ca3aa]" aria-hidden="true" />
        <span className="sr-only">{labels.notIncluded}</span>
      </span>
    );
  }
  return (
    <SplitText as="span" mode="words">
      {value}
    </SplitText>
  );
}

/** Column header of one plan: name (+ badge), price and its button. */
function PlanHeader({ plan }: { plan: ComparePlan }) {
  return (
    <th scope="col" className={cn("px-2 pt-8 pb-7 align-bottom font-normal", columnTint(plan))}>
      <div className="flex flex-col items-center gap-3.5 text-center">
        <p className="flex items-center gap-2">
          <span className="text-h4 leading-[26px] font-medium tracking-[-0.01em] text-ink">{plan.name}</span>
          {plan.badge && (
            <span className={cn(styles.badge, "rounded-full px-2.5 py-1 font-mono text-[11px] leading-[14px] font-medium tracking-[0.06em] text-white uppercase")}>
              {plan.badge}
            </span>
          )}
        </p>
        <p className="flex flex-col items-center gap-0.5">
          <span className="text-[28px] leading-9 font-medium tracking-[-0.015em] text-ink">{plan.price}</span>
          <span className="text-sm leading-[18px] text-muted">{plan.note}</span>
        </p>
        <Link
          href={plan.cta.href}
          className={cn(
            "inline-flex min-h-11 items-center justify-center rounded-button px-[18px] text-[15px] leading-5 font-medium whitespace-nowrap transition-[background-color,scale] duration-[250ms,450ms] ease-[ease,cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] active:scale-[0.97] motion-reduce:hover:scale-100",
            plan.featured ? "bg-brand text-canvas hover:bg-brand-hover" : "border border-ink text-ink hover:bg-canvas-2",
          )}
        >
          {plan.cta.label}
          <span className="sr-only"> – {plan.name}</span>
        </Link>
      </div>
    </th>
  );
}

/**
 * Figma "Compare" (1440×1290): plan comparison as a real <table> (column headers, a row
 * header per feature, one <tbody> per group). On phones the table scrolls sideways inside
 * its own card (the cut-off column shows there is more) with the feature column pinned,
 * so the page itself never scrolls sideways. The scroll area is focusable for keyboard users.
 */
export function Compare() {
  const c = compare;
  return (
    <section className="bg-canvas-2 py-20 lg:py-[120px]" aria-labelledby="compare-title">
      <Container>
        <SectionIntro id="compare-title" eyebrow={c.eyebrow} title={c.title} />

        <div
          className="relative mt-12 overflow-x-auto overscroll-x-contain rounded-card bg-surface lg:mt-16"
          tabIndex={0}
          role="region"
          aria-labelledby="compare-title"
        >
          <table className="w-full min-w-[680px] border-collapse text-left md:min-w-0">
            <caption className="sr-only">{c.title}</caption>
            <colgroup>
              <col className="w-[34%] md:w-[33.65%]" />
              {c.plans.map((plan) => (
                <col key={plan.name} className="w-[22.115%]" />
              ))}
            </colgroup>
            <thead>
              <tr>
                <td className={cn(styles.sticky, "bg-surface px-4 pt-8 pb-7 align-bottom sm:pl-8")}>
                  <p className="text-h4 leading-[26px] font-medium tracking-[-0.01em] text-ink">{c.intro.title}</p>
                  <SplitText as="p" mode="words" className="mt-1.5 text-base leading-6 text-muted">
                    {c.intro.text}
                  </SplitText>
                </td>
                {c.plans.map((plan) => (
                  <PlanHeader key={plan.name} plan={plan} />
                ))}
              </tr>
            </thead>
            {c.groups.map((group) => (
              <tbody key={group.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={c.plans.length + 1}
                    className="border-t border-line bg-canvas-2 px-4 py-3.5 font-mono text-xs leading-4 font-semibold tracking-[0.06em] text-ink-2 uppercase sm:px-8"
                  >
                    <span className={styles.stickyText}>{group.title}</span>
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label} className={cn(styles.row, "border-t border-line")}>
                    <th scope="row" className={cn(styles.sticky, "bg-surface px-4 py-[18px] text-base leading-[21px] font-normal text-body sm:pl-8")}>
                      <SplitText as="span" mode="words">
                        {row.label}
                      </SplitText>
                    </th>
                    {row.values.map((value, i) => (
                      <td key={c.plans[i]?.name ?? i} className={cn("px-2 py-[18px] text-center text-base leading-[21px] font-medium text-ink", columnTint(c.plans[i]))}>
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Container>
    </section>
  );
}
