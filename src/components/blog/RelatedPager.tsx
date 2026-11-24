"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  cards: { slug: string; card: ReactNode }[];
  perPage: number;
  paginationLabel: string;
  /** "Page" → "Page 2" for screen readers. */
  pageLabel: string;
};

/** Related posts grid with numbered page buttons. All cards are in the server HTML; the new page's cards rise in one by one. */
export function RelatedPager({ cards, perPage, paginationLabel, pageLabel }: Props) {
  const [page, setPage] = useState(0);
  const changed = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pages = Math.ceil(cards.length / perPage);

  useLayoutEffect(() => {
    if (!changed.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    changed.current = false;
    const items = Array.from(listRef.current?.querySelectorAll<HTMLLIElement>(":scope > li:not([hidden])") ?? []);
    items.forEach((li, i) =>
      li.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 500, delay: i * 80, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      ),
    );
  }, [page]);

  return (
    <>
      <ul ref={listRef} id="related-posts" className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ slug, card }, i) => (
          <li key={slug} hidden={Math.floor(i / perPage) !== page}>
            {card}
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <nav aria-label={paginationLabel}>
          <ul className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  aria-controls="related-posts"
                  aria-current={i === page ? "true" : undefined}
                  aria-label={`${pageLabel} ${i + 1}`}
                  onClick={() => {
                    if (i === page) return;
                    changed.current = true;
                    setPage(i);
                  }}
                  className="flex size-11 items-center justify-center rounded-full border border-ink-2/12 bg-surface text-[15px] leading-5 font-medium text-ink-2 transition-colors hover:bg-sky-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[current=true]:border-brand-bright aria-[current=true]:bg-brand-bright aria-[current=true]:text-white lg:size-10"
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
