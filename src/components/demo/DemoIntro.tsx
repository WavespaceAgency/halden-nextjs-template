import type { CSSProperties } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { bookDemo } from "@/config/pages/book-a-demo";
import { CheckIcon } from "./CheckIcon";

/** CSS delay for the first-paint fade-up (`hero-reveal`). */
const delay = (seconds: number) => ({ "--delay": `${seconds.toFixed(2)}s` }) as CSSProperties;

/**
 * Book a demo, left column: heading, benefits and the "Trusted by" clinic names.
 * Everything here is above the fold, so it animates in CSS from first paint
 * (heading letters, paragraph words, then the lists fade up one item after another).
 */
export function DemoIntro() {
  const d = bookDemo;
  return (
    <div className="flex flex-col gap-8 lg:gap-10 xl:w-[568px] xl:shrink-0">
      <div className="flex flex-col gap-5">
        <SplitText as="h1" mode="chars" trigger="load" className="text-display leading-[1.06] font-medium tracking-[-0.035em] text-ink">
          {d.title}
          <span className="text-muted">{d.titleMuted}</span>
        </SplitText>
        <SplitText as="p" mode="words" trigger="load" className="max-w-[420px] text-lead text-body">
          {d.description}
        </SplitText>
      </div>

      <ul className="flex flex-col gap-3.5">
        {d.benefits.map((item, i) => (
          <li key={item} className="hero-reveal flex items-center gap-3 text-[17px] leading-[22px] font-medium text-ink" style={delay(0.3 + i * 0.08)}>
            <CheckIcon className="size-6 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 border-t border-black/16 pt-8">
        <p className="font-mono text-xs leading-4 font-semibold tracking-[0.08em] text-ink-2 uppercase">{d.logos.title}</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {d.logos.items.map((name, i) => (
            <li key={name} className="hero-reveal flex" style={delay(0.5 + i * 0.05)}>
              <span className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-surface px-2 text-center text-sm leading-[18px] font-medium tracking-[-0.01em] text-body transition-[translate,box-shadow,color] duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:-translate-y-0.5 hover:text-ink hover:shadow-card motion-reduce:hover:translate-y-0">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
