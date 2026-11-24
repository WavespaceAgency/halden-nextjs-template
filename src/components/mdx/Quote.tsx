import type { ReactNode } from "react";

type Props = {
  /** Who said it (name, organisation). */
  cite?: string;
  children: ReactNode;
};

/**
 * Pull quote in blog posts (no import needed in MDX):
 *   <Quote cite="Dr. Lena Ortiz, Brightwater Dermatology">“Quote text”</Quote>
 */
export function Quote({ cite, children }: Props) {
  return (
    <figure className="flex flex-col gap-4 rounded-card bg-sky-soft p-6 sm:p-8">
      <blockquote className="text-xl leading-[1.35] font-medium tracking-[-0.01em] text-ink-2 sm:text-2xl [&_p]:m-0">{children}</blockquote>
      {cite && <figcaption className="text-[15px] leading-5 text-body">{cite}</figcaption>}
    </figure>
  );
}
