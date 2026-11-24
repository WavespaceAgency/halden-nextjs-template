import { SplitText } from "@/components/motion/SplitText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/config/pages/platform";
import { FeatureArt } from "./FeatureArt";
import { FeatureCard } from "./FeatureCard";

/**
 * "Built for how clinics work": six coloured cards with small product illustrations
 * (Figma 1440×1505, 3 × 2 grid of 467×496 cards, 8px from the page edge).
 * Motion (from Framer): parts rise / pop in once, then a 5.4s story loops in each card – dashed connectors
 * light up one after another, badges and status pills pop back in, skeleton lines redraw.
 * Hover: the card lifts 4px (as Framer) with a soft shadow and the illustration zooms slightly.
 */
export function Features() {
  return (
    <section aria-labelledby="features-title" className="bg-surface px-2 pt-20 pb-20 lg:pt-[120px] lg:pb-[130px]">
      <div className="mx-auto max-w-[1424px]">
        <SectionHeading
          {...features.heading}
          id="features-title"
          align="center"
          animate
          className="px-2 [&>p:first-child]:mb-2.5!"
          descriptionClassName="mt-2.5! max-w-[504px] text-muted!"
        />
        <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-[88px] lg:grid-cols-3">
          {features.items.map((item) => (
            <FeatureCard key={item.title} className="flex flex-col overflow-hidden rounded-card" style={{ background: item.background }}>
              <div className="flex h-[290px] items-center justify-center p-6 sm:h-[340px]">
                <div className="origin-center max-[419px]:scale-[0.8] sm:max-lg:scale-[0.85] lg:max-xl:scale-[0.8]">
                  <FeatureArt art={item.art} />
                </div>
              </div>
              <div className="px-6 pt-[22px] pb-8 sm:px-10 sm:pb-10">
                <SplitText as="h3" className="text-h3 font-medium text-ink">
                  {item.title}
                </SplitText>
                <SplitText as="p" mode="words" className="mt-1 max-w-[387px] text-lead text-body">
                  {item.description}
                </SplitText>
              </div>
            </FeatureCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
