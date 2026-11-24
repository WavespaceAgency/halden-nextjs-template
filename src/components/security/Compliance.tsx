import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { compliance } from "@/config/pages/security";
import { cn } from "@/lib/utils";
import styles from "./cards.module.css";
import { SectionIntro } from "./SectionIntro";

/** Figma "Compliance" (1440×1006): heading + six numbered control cards (3 / 2 / 1 columns). */
export function Compliance() {
  const c = compliance;
  return (
    <section id={c.id} className="py-20 lg:py-[120px]" aria-labelledby="compliance-title">
      <Container>
        <SectionIntro id="compliance-title" eyebrow={c.eyebrow} title={c.title} titleMuted={c.titleMuted} description={c.description} />
        <ol data-stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <li key={item.title} className={cn(styles.card, "flex flex-col gap-8 rounded-[20px] bg-canvas-2 p-6 sm:p-8 lg:min-h-[240px] lg:gap-12")}>
              <span
                className={cn(styles.number, "flex size-11 items-center justify-center rounded-full bg-sky font-mono text-[11px] text-ink")}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <SplitText as="h3" mode="words" className="text-h4 leading-6 font-medium tracking-[-0.015em] text-ink">
                  {item.title}
                </SplitText>
                <SplitText as="p" mode="words" className="text-base leading-[26px] text-muted">
                  {item.text}
                </SplitText>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
