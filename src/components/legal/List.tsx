import type { ComponentProps } from "react";

/** Bullet list in legal pages (blue dots). */
export function List({ children }: ComponentProps<"ul">) {
  return <ul className="mt-4 flex flex-col gap-2.5 pl-1">{children}</ul>;
}
