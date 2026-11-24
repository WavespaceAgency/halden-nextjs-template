import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { standards } from "@/config/pages/security";
import { cn } from "@/lib/utils";
import styles from "./cards.module.css";
import { SectionIntro } from "./SectionIntro";

/** Figma "Standards" (1440×571): heading + five badge cards with a shield mark (5 / 3+2 / 1 columns). */
export function Standards() {
  const s = standards;
  return (
    <section id={s.id} className="py-16 lg:py-24" aria-labelledby="standards-title">
      <Container>
        <SectionIntro id="standards-title" eyebrow={s.eyebrow} title={s.title} titleMuted={s.titleMuted} gap="sm" />
        <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-6 lg:mt-12 lg:grid-cols-5">
          {s.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                styles.card,
                "flex flex-col items-center gap-5 rounded-[20px] bg-canvas-2 px-6 py-7 text-center sm:col-span-2 sm:[&:nth-child(n+4)]:col-span-3 lg:col-span-1 lg:[&:nth-child(n+4)]:col-span-1",
              )}
            >
              <svg className={cn(styles.badge, "size-[52px] shrink-0")} viewBox="0 0 52 52" fill="none" aria-hidden="true">
                <rect width="52" height="52" rx="26" fill="var(--ink)" />
                <path d="M26 15.5 35 19v6.5c0 5.5-4 9.5-9 11-5-1.5-9-5.5-9-11V19l9-3.5Z" stroke="var(--sky)" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="m22.45 25.2 2.8 2.8 4.7-5" stroke="var(--sky)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex flex-col gap-1">
                <SplitText as="h3" mode="words" className="text-h4 leading-6 font-medium tracking-[-0.015em] text-ink">
                  {item.title}
                </SplitText>
                <p className="text-[13px] leading-[17px] text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
