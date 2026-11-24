import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { jobs as j } from "@/config/pages/home";
import { JobTabs } from "./JobTabs";
import { JobVisual } from "./JobVisual";

/**
 * "How it works" – four jobs (Figma Section 660:10082, 1440×1128).
 * Desktop: tabs on the left, one job visible at a time, switched by scrolling (like Framer),
 * click or arrow keys. Phones, tablets and no-JS: the four jobs are stacked (text + mock-up each).
 */
export function HowItWorks() {
  return (
    <section className="bg-canvas py-20 lg:py-32" aria-labelledby="jobs-title">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow {...j.eyebrow} />
          <SplitText as="h2" id="jobs-title" className="mt-[19px] max-w-[960px] text-h1 font-medium whitespace-pre-line text-balance text-ink">
            {j.title}
            <span className="text-muted">{j.titleMuted}</span>
          </SplitText>
          <SplitText as="p" mode="words" className="mt-[19px] max-w-[620px] text-lead text-muted">
            {j.description}
          </SplitText>
        </div>

        <JobTabs
          jobs={j.items}
          live={j.live}
          tabsLabel={j.tabsLabel}
          visuals={j.items.map((item) => (
            <JobVisual key={item.id} id={item.id} />
          ))}
        />
      </div>
    </section>
  );
}
