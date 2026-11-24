import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { PlayIcon } from "@/components/ui/PlayIcon";
import { hero } from "@/config/pages/home";
import { cn, externalProps, isExternal } from "@/lib/utils";
import styles from "./Hero.module.css";
import { HeroCard } from "./HeroCard";
import { HeroFlow } from "./HeroFlow";

/** Waveform bars from Figma: [height, colour]. Each pulses at its own speed. */
const bars: [number, string][] = [
  [4, "#2c67f6"], [8, "#2c67f6"], [14, "#2c67f6"], [10, "#4884f7"], [20, "#4884f7"], [26, "#4884f7"],
  [16, "#64a0f8"], [22, "#64a0f8"], [12, "#6dcde3"], [18, "#6dcde3"], [24, "#6dcde3"], [10, "#6eddc5"],
  [6, "#6eddc5"], [12, "#6eddc5"], [8, "#aadf6f"], [4, "#aadf6f"],
];

const button =
  "inline-flex min-h-[52px] flex-1 items-center justify-center gap-2.5 rounded-[18px] px-5 text-base font-medium whitespace-nowrap text-white transition-[background-color,scale] duration-150 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:scale-100 sm:flex-none sm:px-6";

/** Internal links use next/link, external ones open in a new tab. */
function HeroLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} {...externalProps(href)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Home hero (Figma "V.3 Hero", 1440×1208 incl. header): dark photo card with the two-line
 * heading, animated waveform, buttons and the flow diagram. The card keeps 32px side margins
 * on desktop; text and diagram share one centred column (1248px at 1440, scaled below).
 * Everything here animates in pure CSS from first paint (the photo is the preloaded LCP image).
 * Glows drift and breathe; HeroCard adds the pointer light and parallax on desktop.
 */
export function Hero() {
  const h = hero;
  return (
    <section className="pb-10 sm:pb-16 lg:pb-24 min-[90rem]:pb-[165px]" aria-labelledby="hero-title">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <HeroCard
          className={cn(styles.card, "relative isolate overflow-hidden rounded-card bg-ink-2 px-5 pt-12 pb-8 sm:px-10 sm:pt-14 lg:px-16 lg:pt-16 lg:pb-[max(2rem,calc(72px*var(--flow-s)))]")}
        >
          <Image src={h.image} alt="" fill preload fetchPriority="high" sizes="(min-width: 1024px) calc(100vw - 64px), calc(100vw - 24px)" className={cn(styles.photo, "-z-20 object-cover")} />
          <div className="absolute inset-x-0 -top-[60px] bottom-0 -z-10" aria-hidden="true">
            <span className={cn(styles.layer, styles.shadeV)} />
            <span className={cn(styles.layer, styles.glow, styles.glowBlue)} />
            <span className={cn(styles.layer, styles.glow, styles.glowViolet)} />
            <span className={cn(styles.layer, styles.glow, styles.glowTeal)} />
            <span className={cn(styles.layer, styles.shadeH)} />
          </div>
          <div className={cn(styles.spot, "absolute inset-0 -z-10")} aria-hidden="true" />

          <div className="mx-auto lg:max-w-[calc(1248px*var(--flow-s))]">
            <div className="max-w-[760px]">
              <SplitText as="h1" id="hero-title" trigger="load" delay={0.15} className={cn(styles.title, "text-display font-medium text-white")}>
                {`${h.titleStart} `}
                <span className={styles.wave} aria-hidden="true">
                  {bars.map(([height, color], i) => (
                    <span key={i} style={{ "--h": `${height}px`, "--c": color, "--i": i, "--t": `${(0.9 + ((i * 0.37) % 0.7)).toFixed(2)}s` } as CSSProperties} />
                  ))}
                </span>
                {` ${h.titleEnd} `}
                <br className="hidden md:inline" />
                {h.titleLine2}
              </SplitText>
              <SplitText as="p" mode="words" trigger="load" delay={0.15} className="mt-5 max-w-[663px] text-lead text-white/82">
                {h.description}
              </SplitText>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-[35px]">
                <HeroLink href={h.primary.href} className={cn(button, "bg-[#3465e8] leading-[21px] shadow-[0_8px_28px_0_rgb(123_175_249/0.45)]")}>
                  {h.primary.label}
                </HeroLink>
                <HeroLink href={h.secondary.href} className={cn(button, "border border-white/17 bg-white/8 leading-6 text-canvas hover:bg-white/14")}>
                  <PlayIcon />
                  {h.secondary.label}
                </HeroLink>
              </div>
            </div>
            <HeroFlow />
          </div>
        </HeroCard>
      </div>
    </section>
  );
}
