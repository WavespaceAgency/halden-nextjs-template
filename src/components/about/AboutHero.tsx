import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { PlayIcon } from "@/components/ui/PlayIcon";
import { hero } from "@/config/pages/about";
import { HeroLight } from "./HeroLight";
import { SplitText } from "./SplitText";

/**
 * About hero (Figma "Hero / Content", 1440×700): centred two-tone heading on a soft
 * teal / lime / blue mesh. Letters pop in, the paragraph words un-blur (Framer timings),
 * both on first paint. Drifting glows and the pointer light live in HeroLight.
 */
export function AboutHero() {
  return (
    <HeroLight>
      <div className="mx-auto flex max-w-[928px] flex-col items-start px-4 pt-14 pb-20 text-left sm:items-center sm:px-6 sm:pt-24 sm:pb-28 sm:text-center lg:px-6 lg:py-[176px]">
        <SplitText
          as="h1"
          mode="chars"
          trigger="load"
          delay={0.15}
          stagger={0.03}
          className="text-[clamp(2.75rem,1.78rem+4.13vw,5.5rem)] leading-[1.02] font-normal tracking-[-0.045em] text-subtle lg:tracking-[-0.055em]"
          text={[{ text: hero.titleMuted }, { text: hero.title, className: "font-medium text-ink-2", break: true }]}
        />
        <SplitText
          text={hero.description}
          mode="words"
          trigger="load"
          delay={0.3}
          stagger={0.025}
          className="mt-5 max-w-[670px] text-lg leading-[30px] text-body sm:text-xl sm:leading-8"
        />
        <div
          className="hero-reveal mt-8 flex w-full flex-wrap justify-start gap-3 max-sm:grid max-sm:grid-cols-2 sm:justify-center"
          style={{ "--delay": "0.35s" } as CSSProperties}
        >
          <Button href={hero.primary.href} size="xl" className="shadow-none">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="outline" size="xl" className="rounded-[18px] border-ink-2/25 bg-white/20 text-ink hover:bg-white/50">
            <PlayIcon />
            {hero.secondary.label}
          </Button>
        </div>
      </div>
    </HeroLight>
  );
}
