import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/security/SectionIntro";
import { included, type IncludedTone } from "@/config/pages/pricing";
import { cn } from "@/lib/utils";
import styles from "./Included.module.css";

const tiles: Record<IncludedTone, string> = { sky: "bg-[#c8defb]", violet: "bg-violet-tint", mint: "bg-mint-tint", lime: "bg-lime-tint" };

/** Figma "Included" (1440×927, light blue): "Every plan includes" – eight white cards with an icon tile. */
export function Included() {
  const s = included;
  return (
    <section className="bg-sky-tint py-20 lg:py-[120px]" aria-labelledby="included-title">
      <Container>
        <SectionIntro id="included-title" eyebrow={s.eyebrow} title={s.title} description={s.description} />
        <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {s.items.map((item) => (
            <li key={item.title} className={cn(styles.card, "flex flex-col gap-6 rounded-card bg-surface p-5 sm:p-7 lg:min-h-[230px] lg:gap-[46px]")}>
              <span className={cn(styles.tile, "size-12 shrink-0 rounded-[14px]", tiles[item.tone])} aria-hidden="true">
                <svg className="size-12" viewBox="0 0 48 48" fill="none">
                  <path d={item.icon} stroke="var(--ink-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="flex flex-col gap-1">
                <SplitText as="h3" mode="words" className="text-h4 leading-6 font-medium text-ink">
                  {item.title}
                </SplitText>
                <SplitText as="p" mode="words" className="text-base leading-[26px] text-body">
                  {item.text}
                </SplitText>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
