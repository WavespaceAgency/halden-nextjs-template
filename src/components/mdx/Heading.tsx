import type { ComponentProps } from "react";
import { SplitText } from "@/components/motion/SplitText";

/** "## Heading" in blog posts. Keeps the id from rehype-slug so the "On this page" links work. Letters pop in when scrolled into view. */
export function Heading({ id, children }: ComponentProps<"h2">) {
  return (
    <SplitText as="h2" id={id} mode="chars" className="mt-[25px] text-[28px] leading-[1.2] font-medium tracking-[-0.02em] text-ink-2 first:mt-0 sm:text-[32px]">
      {children}
    </SplitText>
  );
}
