import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { platform as p } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import { LoopZone } from "./LoopZone";
import { PlatformArt, type PlatformCardKey } from "./PlatformArt";
import styles from "./Platform.module.css";

/**
 * "Built for how clinics work" – six feature cards (Figma Container 295:15518, 1440×1505).
 * Each card has a small HTML mock-up (340px area) and a title + description.
 * Mock-ups shrink inside narrow cards with a container query.
 */
const backgrounds: Record<PlatformCardKey, string> = {
  records: "bg-[#c8defb]",
  language: "bg-violet-tint",
  handoff: "bg-mint-tint",
  log: "bg-lime-tint",
  rules: "bg-[#f1f2f4]",
  safety: "bg-canvas-2",
};
const order = Object.keys(backgrounds) as PlatformCardKey[];

export function Platform() {
  return (
    <section className="bg-white px-2 py-20 lg:pt-[120px] lg:pb-[130px]" aria-labelledby="platform-title">
      <div className="flex flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <Eyebrow {...p.eyebrow} />
        <SplitText as="h2" id="platform-title" className="mt-2.5 text-h1 font-medium text-balance text-ink">
          {p.title}
        </SplitText>
        <SplitText as="p" mode="words" className="mt-2.5 max-w-[504px] text-lead text-muted">
          {p.description}
        </SplitText>
      </div>

      <LoopZone>
        <ul className="mx-auto mt-12 grid max-w-[1424px] gap-3 md:grid-cols-2 lg:mt-[88px] lg:grid-cols-3">
          {order.map((key) => {
            const card = p.cards[key];
            return (
              <li key={key} className={cn(styles.card, "@container flex flex-col overflow-hidden rounded-card", backgrounds[key])}>
                <div className="flex h-[300px] items-center justify-center overflow-hidden @[400px]:h-[340px]" aria-hidden="true">
                  <div className={cn(styles.art, "origin-center scale-[0.72] @[330px]:scale-[0.8] @[360px]:scale-90 @[430px]:scale-100")}>
                    <PlatformArt card={key} />
                  </div>
                </div>
                <div className="px-6 pt-[22px] pb-10 sm:px-10">
                  <SplitText as="h3" className="text-h3 font-medium text-ink">
                    {card.title}
                  </SplitText>
                  <SplitText as="p" mode="words" className="mt-1 text-lead text-body">
                    {card.description}
                  </SplitText>
                </div>
              </li>
            );
          })}
        </ul>
      </LoopZone>
    </section>
  );
}
