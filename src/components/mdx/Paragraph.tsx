import type { ComponentProps } from "react";

/** Body paragraph in blog posts (Figma: Geist 18/30). */
export function Paragraph({ children }: ComponentProps<"p">) {
  return <p className="text-[17px] leading-[1.75] text-body sm:text-lg sm:leading-[30px]">{children}</p>;
}
