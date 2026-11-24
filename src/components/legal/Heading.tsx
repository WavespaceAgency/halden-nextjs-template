import type { ComponentProps } from "react";
import { SplitText } from "@/components/motion/SplitText";

/** "## Heading" in legal pages. rehype-slug gives it an id (e.g. #your-rights-and-choices). */
export function Heading({ id, children }: ComponentProps<"h2">) {
  return (
    <SplitText as="h2" id={id} mode="chars" className="mt-12 text-2xl leading-[1.2] font-medium tracking-[-0.015em] text-ink-2 first:mt-0 sm:text-[28px]">
      {children}
    </SplitText>
  );
}
