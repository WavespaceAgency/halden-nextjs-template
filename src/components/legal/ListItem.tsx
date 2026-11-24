import type { ComponentProps } from "react";

/** One bullet: 6px blue dot + text. */
export function ListItem({ children }: ComponentProps<"li">) {
  return (
    <li className="flex gap-3 text-[17px] leading-7 text-body">
      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
