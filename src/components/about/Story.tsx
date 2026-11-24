import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { story } from "@/config/pages/about";
import { cn } from "@/lib/utils";
import { SplitText } from "./SplitText";
import styles from "./Story.module.css";

/**
 * "Our story" (Figma "Story", 1440×996): eyebrow left, three paragraphs right, two photos below.
 * The photos sit just below the fold, so they load eagerly (no lazy-load pop-in).
 * Paragraph words un-blur in view (Framer). Photos rise in and settle from a slight zoom; hover zooms gently.
 */
export function Story() {
  const [wide, tall] = story.photos;
  return (
    <section className="pt-16 pb-6 sm:pt-24 lg:pt-[140px] lg:pb-11">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-24">
          <Eyebrow {...story.eyebrow} className="self-start" />
          <div className="flex flex-col gap-5 text-[17px] leading-[28px] sm:text-lg sm:leading-[30px]">
            {story.paragraphs.map((text) => (
              <SplitText key={text} text={text} className="text-body" />
            ))}
            <SplitText text={story.highlight} className="font-medium text-ink-2" />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-[820fr_412fr] lg:mt-[72px]">
          <div data-reveal className={cn(styles.photo, "relative aspect-[358/340] overflow-hidden rounded-xl bg-surface sm:aspect-auto sm:h-[clamp(300px,32vw,460px)]")}>
            <Image
              src={wide.src}
              alt={wide.alt}
              loading="eager"
              sizes="(min-width: 1440px) 1106px, (min-width: 640px) 77vw, 100vw"
              className={cn(styles.wide, "absolute inset-0 size-full object-cover")}
            />
          </div>
          <div
            data-reveal
            style={{ "--delay": "0.12s" } as CSSProperties}
            className={cn(styles.photo, "relative aspect-[358/400] overflow-hidden rounded-xl sm:aspect-auto sm:h-[clamp(300px,32vw,460px)]")}
          >
            <Image
              src={tall.src}
              alt={tall.alt}
              loading="eager"
              sizes="(min-width: 1440px) 412px, (min-width: 640px) 33vw, 100vw"
              className="absolute inset-0 size-full object-cover object-[50%_10%]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
