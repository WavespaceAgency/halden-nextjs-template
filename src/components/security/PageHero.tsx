import Image from "next/image";
import Link from "next/link";
import { SplitText } from "@/components/motion/SplitText";
import type { PageHeroContent } from "@/config/pages/security";
import { cn } from "@/lib/utils";
import { HeroPointer } from "./HeroPointer";
import styles from "./PageHero.module.css";

type Props = PageHeroContent & {
  /** Max width of the description (the Figma text boxes differ per page). */
  descriptionClassName?: string;
};

/**
 * Page hero for the Security and Pricing pages (Figma "Hero", 1376×600 photo card under the header):
 * dark photo with a teal overlay, centred 64px heading, description and one button.
 * The photo is the LCP element (preloaded); the text animates in pure CSS from first paint.
 * Full width with a 16/24/32px gutter; the space below is a margin, so the section is exactly the card.
 */
export function PageHero({ title, description, cta, image, descriptionClassName }: Props) {
  return (
    <section className="mb-6 px-4 sm:px-6 lg:mb-8 lg:px-8" aria-labelledby="page-hero-title">
      <HeroPointer className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden rounded-card px-5 py-12 sm:min-h-[460px] sm:px-10 lg:h-[600px] lg:py-0">
        <Image
          src={image}
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 1024px) calc(100vw - 64px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
          className={cn(styles.photo, "-z-20 object-cover")}
        />
        <div className={cn(styles.overlay, "absolute inset-x-0 top-0 -z-10 h-[160%]")} aria-hidden="true" />
        <div className={cn(styles.spot, "pointer-events-none absolute inset-0 -z-10")} aria-hidden="true" />

        <div className="flex w-full max-w-[760px] flex-col items-center text-center">
          {/* Framer starts the hero text after hydration, ~0.25s after the first paint. */}
          <SplitText as="h1" id="page-hero-title" mode="chars" trigger="load" delay={0.25} className="text-display font-medium text-white">
            {title}
          </SplitText>
          <SplitText as="p" mode="words" trigger="load" delay={0.25} className={cn("mt-3 max-w-[574px] text-lead text-white/85", descriptionClassName)}>
            {description}
          </SplitText>
          <Link
            href={cta.href}
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[22px] bg-brand px-6 text-base leading-6 font-medium text-canvas shadow-[0_0_24px_0_rgb(44_103_246/0.45)] transition-[background-color,box-shadow,scale] duration-[250ms,300ms,450ms] ease-[ease,ease,cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] hover:bg-brand-hover focus-visible:outline-canvas active:scale-[0.97] motion-reduce:hover:scale-100"
          >
            {cta.label}
          </Link>
        </div>
      </HeroPointer>
    </section>
  );
}
