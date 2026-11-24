import Image from "next/image";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { hero } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { ParallaxCard } from "./ParallaxCard";
import styles from "./PlatformHero.module.css";

/**
 * Platform hero: rounded photo card (Figma 1376×600) with a centred heading and one button.
 * Like Framer, the card spans the viewport with 32px side margins (1376 at 1440, 1856 at 1920).
 * The photo is the LCP image (preloaded); the text plays in CSS on first paint.
 */
export function PlatformHero() {
  return (
    <section aria-labelledby="platform-hero-title" className="pt-3 pb-[18px] sm:pb-6 lg:pt-0 lg:pb-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <ParallaxCard className="relative isolate flex min-h-[410px] items-center justify-center overflow-hidden rounded-card px-5 py-10 sm:min-h-[480px] lg:h-[600px] lg:py-0">
          <Image
            src={hero.image}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) calc(100vw - 64px), calc(100vw - 32px)"
            className={cn(styles.photo, "-z-20 object-cover")}
          />
          {/* Figma overlay is 962px tall on a 600px card, so only its top 62% shows */}
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(9_20_20/0.62)_0%,rgb(19_44_52/0.35)_88%,rgb(21_49_56/0.355)_100%)]"
            aria-hidden="true"
          />

          <div className="flex max-w-[760px] flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <SplitText as="h1" id="platform-hero-title" trigger="load" delay={0.05} step={0.046} className="text-display font-medium text-balance text-white">
                {hero.title}
              </SplitText>
              <SplitText as="p" mode="words" trigger="load" delay={0.15} className="max-w-[574px] text-lead text-white/85">
                {hero.description}
              </SplitText>
            </div>
            <Button href={hero.cta.href} size="lg" className="rounded-[22px] text-base shadow-[0_0_24px_0_rgb(44_103_246/0.45)]">
              {hero.cta.label}
            </Button>
          </div>
        </ParallaxCard>
      </div>
    </section>
  );
}
