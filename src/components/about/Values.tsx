import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { values } from "@/config/pages/about";
import { cn } from "@/lib/utils";
import { SplitText } from "./SplitText";
import styles from "./Values.module.css";

/**
 * "Our values" (Figma "Our values", 1440×687): heading + four cards with an icon tile.
 * Motion (Framer): heading letters pop in, card titles and texts un-blur word by word.
 * Hover: the card lifts, its shadow softens and the icon tile tilts.
 */
export function Values() {
  return (
    <section className="py-20 sm:py-24 lg:py-[140px]" aria-labelledby="values-title">
      <Container>
        <div className="flex flex-col items-start">
          <Eyebrow {...values.eyebrow} className="mb-4" />
          <SplitText
            as="h2"
            id="values-title"
            mode="chars"
            className="text-h1 font-medium tracking-[-0.0375em] text-balance text-ink"
            text={[{ text: values.title }, { text: values.titleMuted, className: "text-muted" }]}
          />
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {values.items.map((item) => (
            <li
              key={item.title}
              className={cn(styles.card, "flex min-h-[200px] flex-col justify-between gap-14 rounded-card border border-ink-2/10 bg-surface p-5 sm:p-7 lg:min-h-[248px]")}
            >
              <svg className={cn(styles.icon, "size-12 shrink-0")} viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect width="48" height="48" rx="14" fill={item.tile} />
                <path d={item.icon} stroke="#0c1a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <SplitText as="h3" text={item.title} className="text-[22px] leading-[1.2] font-medium tracking-[-0.015em] text-ink-2" />
                <SplitText text={item.text} className="mt-1 text-base leading-[26px] text-body" />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
