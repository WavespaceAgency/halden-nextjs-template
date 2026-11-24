import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { security as s } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import styles from "./Security.module.css";
import { SecuritySteps } from "./SecuritySteps";

/**
 * "Security" (Figma Section 660:10476, 1440×1182): violet→blue panel with four steps
 * (Protect / Limit / Record / Review) that swap the text and the card on top of a fan of
 * glass cards (SecuritySteps), then three numbers.
 */

/** Fan of 15 glass cards: [rotation in degrees (Figma), left, top]. */
const fan = [
  [84, 10.5, 322], [72, 6.4, 264.7], [60, 14.4, 207.8], [48, 34, 153.8], [36, 64.3, 105.1],
  [24, 104.2, 63.7], [12, 151.8, 31.6], [0, 205, 10], [-12, 261.5, 0], [-24, 318.9, 1.9],
  [-36, 374.7, 15.7], [-48, 426.3, 40.9], [-60, 471.6, 76.2], [-72, 508.6, 120.1], [-84, 535.6, 170.8],
];

export function Security() {
  return (
    <section className={cn(styles.root, "rounded-[24px] lg:rounded-[32px]")} aria-labelledby="security-title">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-10 lg:pt-[120px] lg:pb-[112px]">
        <div className="border-l border-canvas/24">
          <div className="mx-auto flex max-w-[731px] flex-col items-center px-4 text-center">
            <Eyebrow {...s.eyebrow} theme="light" />
            <SplitText as="h2" id="security-title" className="mt-4 text-h1 font-medium text-balance text-white">
              {s.title}
              <span className="text-[#d0ecdf]">{s.titleAccent}</span>
            </SplitText>
          </div>

          <SecuritySteps
            steps={s.steps}
            tabsLabel={s.tabsLabel}
            cta={s.cta}
            fan={
              <>
                <div className="absolute top-[104px] left-0 h-[276px] w-[560px] overflow-hidden">
                  {fan.map(([rot, x, y]) => (
                    <span key={rot} className={styles.fan} style={{ left: x, top: y, rotate: `${-rot}deg` }} />
                  ))}
                </div>
                <span className="absolute top-[104px] left-[279px] h-[270px] w-0.5 bg-linear-to-b from-white/6 to-[#c8defb]/28" />
              </>
            }
          />

          <p className="pt-16 pl-5 text-sm leading-[18px] font-medium tracking-[0.02em] text-canvas uppercase lg:pt-24">{s.statsLabel}</p>
          <dl className="mt-7 grid border-y border-canvas/24 md:grid-cols-3">
            {s.stats.map((stat, i) => (
              <div
                key={stat.value}
                className={cn("flex items-center gap-[22px] px-5 py-[30px] md:px-8", i > 0 && "border-t border-canvas/24 md:border-t-0", i < 2 && "md:border-r md:border-canvas/24")}
              >
                <dt className="text-[15px] leading-[21px] whitespace-pre-line text-canvas">{stat.label}</dt>
                <dd className="order-first text-[44px] leading-[1.1] font-medium tracking-[-0.03em] text-canvas" data-count={stat.count ? stat.value : undefined}>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
