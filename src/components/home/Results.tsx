import Image from "next/image";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { results as r } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import styles from "./Results.module.css";

/**
 * "Results" band (Figma "Stats — bento", 1440×1070): blue→violet gradient panel with a
 * testimonial and four numbers. Numbers count up via data-count (Motion.tsx).
 */
const corners = ["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "right-6 bottom-6"];

export function Results() {
  return (
    <section className={cn(styles.root, "rounded-[24px] px-4 py-16 sm:px-6 md:py-24 lg:rounded-[32px] lg:px-12 lg:py-[120px] xl:px-24")} aria-labelledby="results-title">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col items-center text-center">
          <Eyebrow {...r.eyebrow} theme="light" />
          <SplitText as="h2" id="results-title" className="mt-4 text-h1 font-medium whitespace-pre-line text-balance text-white">
            {r.title}
            <span className="text-white/78">{r.titleMuted}</span>
          </SplitText>
        </div>

        <div className="mt-10 border border-[#8884c6] lg:mt-14">
          <figure className="relative flex flex-col gap-10 px-5 py-8 sm:px-10 sm:py-12 md:flex-row md:items-end md:justify-between md:gap-12 lg:gap-16 lg:pt-14 lg:pr-14 lg:pb-14 lg:pl-16">
            {corners.map((c) => (
              <span key={c} className={`absolute hidden size-2.5 bg-[#7baff9] md:block ${c}`} aria-hidden="true" />
            ))}
            <div className="max-w-[784px]">
              <blockquote className="text-[22px] leading-[1.27] tracking-[-0.025em] text-white sm:text-[28px] lg:text-[36px] lg:leading-[1.18]">
                <SplitText as="p" mode="words">
                  {r.quote.before}
                  <strong className="font-medium text-sky-soft underline decoration-2 underline-offset-[6px]">{r.quote.highlight}</strong>
                  {r.quote.after}
                </SplitText>
              </blockquote>
              <figcaption className="mt-8 lg:mt-14">
                <span className="block text-lg leading-[23px] font-medium text-white">{r.quote.name}</span>
                <span className="mt-1 block text-base leading-[21px] text-[#f1f1f1]">{r.quote.role}</span>
              </figcaption>
            </div>
            <Image
              src={r.quote.image}
              alt={r.quote.imageAlt}
              sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 100vw"
              className={cn(styles.photo, "aspect-[260/320] w-full shrink-0 rounded-[20px] object-cover md:w-[220px] lg:w-[260px]")}
            />
          </figure>

          <dl className="grid grid-cols-2 border-t border-white/30 md:grid-cols-4">
            {r.stats.map((s, i) => (
              <div
                key={s.value}
                className={cn(
                  styles.stat, "flex flex-col-reverse items-center justify-center gap-3 px-3 py-8 text-center sm:px-8",
                  i % 2 === 1 && "border-l border-white/30",
                  i > 1 && "border-t border-white/30 md:border-t-0",
                  i === 2 && "md:border-l",
                )}
              >
                <dt className={cn("text-[15px] leading-[22px] whitespace-pre-line", i === 3 ? "text-[#dde8fd]" : "text-[#f1f1f1]")}>{s.label}</dt>
                <dd className="text-[36px] leading-[1.3] font-medium tracking-[-0.03em] text-white lg:text-[44px]" data-count={s.count ? s.value : undefined}>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
