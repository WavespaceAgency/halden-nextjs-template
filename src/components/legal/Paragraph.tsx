import type { ComponentProps } from "react";

/** Paragraph in legal pages (Figma: 17/28). */
export function Paragraph({ children }: ComponentProps<"p">) {
  return <p className="mt-2 text-[17px] leading-7 text-body">{children}</p>;
}
