import { Fragment } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { history } from "@/config/pages/about";
import { cn } from "@/lib/utils";
import styles from "./History.module.css";
import { HistoryCarousel } from "./HistoryCarousel";
import { SplitText } from "./SplitText";

/** Bars in each progress meter (Figma: 42 bars, 6.4px apart). */
const BARS = 42;

/**
 * "Company History" (Figma "History", 1440×976): heading over a dial and a timeline of
 * milestone cards. The cards are rendered here (server) and handed to HistoryCarousel,
 * which moves them. Text motion (Framer): heading letters pop, subtitle and card texts
 * un-blur, card titles pop. Without JavaScript the start card is centred.
 */
export function History() {
  const h = history;
  const cards = h.milestones.map((m) => (
    <Fragment key={m.title}>
      <p className="self-start rounded-lg border-[1.5px] border-ink-2/12 px-3 py-[5px] font-mono text-[15px] leading-5 font-medium tracking-[0.04em] text-ink-2">{m.year}</p>
      <SplitText as="h3" text={m.title} mode="chars" className="mt-[18px] text-[24px] leading-[1.2] font-medium tracking-[-0.015em] text-ink-2 sm:text-[26px]" />
      <SplitText text={m.text} className="mt-[18px] mb-[18px] text-base leading-[26px] tracking-[-0.01em] text-body" />
      <div className={cn(styles.progress, "relative mt-auto h-[52px] shrink-0 rounded-[14px] bg-ink-2/5")} aria-hidden="true">
        <span className={cn(styles.bars, "absolute inset-y-[14px] left-[14px] w-[264px] opacity-25")} />
        <span className={cn(styles.barsOn, "absolute inset-y-[14px] left-[14px]")} style={{ width: `${Math.round(m.progress * BARS) * 6.4 - 4.9}px` }} />
      </div>
    </Fragment>
  ));

  return (
    <section className={cn(styles.history, "relative isolate overflow-hidden")} aria-labelledby="history-title">
      <div className={cn(styles.glow, "-top-[120px] -left-[200px] h-[520px] w-[760px] bg-[#7baff9] opacity-45")} aria-hidden="true" />
      <div className={cn(styles.glow, "top-[380px] left-[calc(50%-300px)] h-[420px] w-[600px] bg-brand opacity-25")} aria-hidden="true" />
      <div className={cn(styles.glow, "top-[520px] left-[calc(50%+180px)] h-[560px] w-[760px] bg-violet-tint opacity-45")} aria-hidden="true" />

      <div className="relative flex flex-col items-center px-4 pt-12 text-center sm:px-6 lg:pt-[66px]">
        <Eyebrow {...h.eyebrow} />
        <SplitText as="h2" id="history-title" mode="chars" text={h.title} className="mt-4 text-display leading-[1.3] font-medium tracking-[-0.042em] text-ink-2" />
        <SplitText text={h.description} className="mt-[3px] text-lg leading-[23px] text-body" />
      </div>

      <HistoryCarousel cards={cards} start={h.start} autoplay={h.autoplay} labels={h.labels} />
    </section>
  );
}
