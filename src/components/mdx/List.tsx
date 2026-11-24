import type { ComponentProps } from "react";

/** Bullet list in blog posts – shown as a check list (Figma "List"). */
export function List({ children }: ComponentProps<"ul">) {
  return <ul className="flex flex-col gap-3.5">{children}</ul>;
}
