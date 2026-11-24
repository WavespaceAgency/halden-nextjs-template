"use client";

import { useRef } from "react";

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)"; // smooth, no overshoot
const OPEN_MS = 520;
const CLOSE_MS = 420;

type Item = { question: string; answer: string };

/**
 * Accordion built on <details>/<summary>, so it works before JavaScript loads.
 * With JavaScript the height eases open and shut (both items at the same time), the answer
 * fades and slides in, the icon turns at once, and only one item is open at a time.
 * Styles: "FAQ accordion" in src/app/globals.css.
 */
export function FaqList({ id, items, openFirst }: { id: string; items: Item[]; openFirst: boolean }) {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);
  const anims = useRef(new WeakMap<HTMLDetailsElement, Animation[]>());

  const stop = (d: HTMLDetailsElement) => {
    anims.current.get(d)?.forEach((a) => a.cancel());
    anims.current.delete(d);
  };

  const setOpen = (d: HTMLDetailsElement, open: boolean) => {
    const body = d.querySelector<HTMLElement>("[data-faq-body]");
    const text = body?.firstElementChild as HTMLElement | null;
    if (!body || !text) return;
    if ((d.dataset.state === "open") === open) return;

    // Start from the current on-screen height, even mid-animation.
    const from = d.open ? body.getBoundingClientRect().height : 0;
    const fromMargin = d.open ? getComputedStyle(body).marginTop : "0px";
    stop(d);
    d.dataset.state = open ? "open" : "closed";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      d.open = open;
      return;
    }

    if (open) {
      d.open = true;
      const to = body.scrollHeight;
      const a = body.animate(
        [
          { height: `${from}px`, marginTop: fromMargin },
          { height: `${to}px`, marginTop: "-10px" },
        ],
        { duration: OPEN_MS, easing: EASE },
      );
      const b = text.animate(
        [
          { opacity: 0, transform: "translateY(-6px)", filter: "blur(3px)" },
          { opacity: 1, transform: "none", filter: "blur(0)" },
        ],
        { duration: OPEN_MS, delay: 60, easing: EASE, fill: "backwards" },
      );
      anims.current.set(d, [a, b]);
      a.onfinish = () => anims.current.delete(d);
    } else {
      const a = body.animate(
        [
          { height: `${from}px`, marginTop: fromMargin },
          { height: "0px", marginTop: "0px" },
        ],
        { duration: CLOSE_MS, easing: EASE, fill: "forwards" },
      );
      const b = text.animate([{ opacity: 1 }, { opacity: 0 }], { duration: CLOSE_MS * 0.6, easing: "ease-out", fill: "forwards" });
      anims.current.set(d, [a, b]);
      a.onfinish = () => {
        d.open = false;
        stop(d);
      };
    }
  };

  const onToggleClick = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    const d = refs.current[index];
    if (!d) return;
    const opening = d.dataset.state !== "open";
    if (opening) refs.current.forEach((other) => other && other !== d && setOpen(other, false));
    setOpen(d, opening);
  };

  return (
    <div className="flex flex-col gap-3" data-stagger>
      {items.map((item, i) => {
        const isOpen = openFirst && i === 0;
        return (
          <details
            key={item.question}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="faq-item group rounded-panel bg-surface"
            open={isOpen}
            data-state={isOpen ? "open" : "closed"}
          >
            <summary
              id={`${id}-q${i}`}
              onClick={onToggleClick(i)}
              className="flex list-none items-center gap-6 rounded-panel px-5 py-[22px] outline-offset-[-2px] sm:px-7 [&::-webkit-details-marker]:hidden"
            >
              <span className="faq-q flex-1 text-h4 font-medium tracking-normal text-ink">{item.question}</span>
              <span className="faq-icon relative flex size-7 shrink-0 items-center justify-center rounded-full bg-sky text-ink" aria-hidden="true">
                <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                <span className="absolute h-3 w-[1.5px] rounded-full bg-current" />
              </span>
            </summary>
            <div data-faq-body className="faq-body overflow-hidden">
              <p className="faq-a max-w-[602px] px-5 pb-[22px] text-base leading-[26px] text-muted sm:px-7">{item.answer}</p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
