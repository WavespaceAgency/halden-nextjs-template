import type { CSSProperties } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { notFound } from "@/config/pages/not-found";
import { DigitsParallax } from "./DigitsParallax";
import { notFoundCss } from "./styles";

/**
 * 404 – "This page missed its appointment". Shown for unknown URLs (app/not-found.tsx)
 * and at /404 so the page can be previewed. Text: src/config/pages/not-found.ts
 */
export function NotFound() {
  const n = notFound;
  return (
    <section
      className="relative isolate flex flex-col items-center gap-6 overflow-hidden px-4 py-20 text-center sm:py-[120px]"
      style={{ background: "radial-gradient(55.6% 41.7% at 50% 58.3%, var(--sky-soft), #eff5fe 45%, var(--canvas) 100%)" }}
    >
      <style href="halden-not-found" precedence="default">
        {notFoundCss}
      </style>
      <DigitsParallax code={n.code} className="flex text-[140px] leading-[0.9] font-medium tracking-[-0.06em] sm:text-[200px] lg:text-[240px]" />
      <div className="flex max-w-[640px] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <SplitText as="h1" mode="chars" trigger="load" className="text-[32px] leading-[1.3] font-medium tracking-[-0.025em] text-ink-2 sm:text-[40px]">
            {n.title}
          </SplitText>
          <SplitText as="p" mode="words" trigger="load" className="max-w-[436px] text-lead text-body">
            {n.description}
          </SplitText>
        </div>
        <div className="hero-reveal flex flex-wrap justify-center gap-3 pt-2" style={{ "--delay": "0.4s" } as CSSProperties}>
          <Button href={n.primary.href} size="xl" className="shadow-none">
            {n.primary.label}
          </Button>
          <Button href={n.secondary.href} variant="outline" size="xl" className="border-ink! bg-transparent!">
            {n.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
