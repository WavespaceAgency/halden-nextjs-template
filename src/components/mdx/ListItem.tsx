import type { ComponentProps } from "react";

/** One item of the blog check list: blue check circle + text. */
export function ListItem({ children }: ComponentProps<"li">) {
  return (
    <li className="flex items-start gap-3 text-[17px] leading-[23px] text-body sm:text-lg">
      <svg className="mt-px size-[22px] shrink-0" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect width="22" height="22" rx="11" className="fill-brand" />
        <path d="M6 11.5 9.5 15 16 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
