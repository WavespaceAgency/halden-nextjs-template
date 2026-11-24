import { cn } from "@/lib/utils";

type Props = {
  items: { value: string; label: string }[];
};

const tints = ["bg-sky-soft", "bg-violet-tint", "bg-mint-tint"];

/**
 * Row of result numbers in blog posts (no import needed in MDX). The cards rise in one by one
 * and the numbers count up when scrolled into view (data-stagger / data-count, see Motion.tsx):
 *   <Stats items={[{ value: "94%", label: "calls handled end to end" }]} />
 * Cards cycle through the sky, violet and mint tints.
 */
export function Stats({ items }: Props) {
  return (
    <dl className="grid gap-3 sm:grid-cols-3 sm:gap-4" data-stagger>
      {items.map((item, i) => (
        <div key={item.label} className={cn("flex flex-col-reverse gap-2 rounded-[20px] p-6", tints[i % tints.length])}>
          <dt className="text-[15px] leading-[22px] text-body">{item.label}</dt>
          <dd className="text-[40px] leading-[57px] font-medium tracking-[-0.03em] text-ink-2 sm:text-[44px]" data-count={item.value}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
