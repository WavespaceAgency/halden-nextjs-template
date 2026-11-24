"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { lockScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/config/site";
import { buttonClasses } from "@/lib/button";
import { cn, isActivePath } from "@/lib/utils";

const bar = "absolute left-1/2 h-0.5 w-[22px] -translate-x-1/2 rounded-full bg-current transition-[top,rotate] duration-300 ease-out-expo";
const linkClass = "flex min-h-11 items-center text-base text-ink transition-colors hover:text-brand aria-[current=page]:text-brand";
/** Each row fades and rises in one by one while the panel opens (--i = row index). */
const rowClass =
  "motion-safe:-translate-y-1.5 motion-safe:opacity-0 motion-safe:transition-[opacity,translate] motion-safe:duration-[350ms,450ms] motion-safe:ease-[ease-out,cubic-bezier(0.16,1,0.3,1)] group-data-[open]/menu:translate-y-0 group-data-[open]/menu:opacity-100 group-data-[open]/menu:delay-[calc(0.06s+var(--i)*0.035s)]";

/**
 * Menu for screens below 1024px, as on the Framer build: the panel drops down from the header,
 * the two bars turn into ✕ and the links fade in one by one.
 * Closes with Escape, the button, a link click or a tap outside. Focus stays inside while open;
 * the page behind does not scroll.
 */
export function MobileMenu({ pathname, onOpenChange }: { pathname: string; onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const links = siteConfig.nav.main;
  const extra = siteConfig.nav.pages.filter((p) => !links.some((l) => l.href === p.href));

  // Close after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    onOpenChange?.(open);
    lockScroll(open);
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      lockScroll(false);
    };
  }, [open, onOpenChange]);

  let index = 0;
  const i = () => ({ "--i": index++ }) as CSSProperties;

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="group relative -mr-1.5 flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-sky-tint lg:hidden"
      >
        <span className={cn(bar, "top-[17px] group-aria-expanded:top-[21px] group-aria-expanded:rotate-45")} />
        <span className={cn(bar, "top-[25px] group-aria-expanded:top-[21px] group-aria-expanded:-rotate-45")} />
      </button>

      {/* Tap-outside layer, below the panel */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 top-16 z-30 bg-ink/10 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-menu"
        ref={panelRef}
        data-open={open || undefined}
        inert={!open}
        className="group/menu absolute inset-x-0 top-full z-40 grid grid-rows-[0fr] border-b border-transparent bg-surface transition-[grid-template-rows,border-color] duration-500 ease-out-expo data-[open]:grid-rows-[1fr] data-[open]:border-line lg:hidden"
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain px-5 pt-1.5 pb-6">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className={rowClass} style={i()}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActivePath(pathname, link.href) ? "page" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={cn(rowClass, "mt-4 mb-1 font-mono text-xs tracking-[0.06em] text-muted uppercase")} style={i()}>
              {siteConfig.nav.pagesLabel}
            </p>
            <ul className="grid grid-cols-2 gap-x-4">
              {extra.map((link) => (
                <li key={link.href} className={rowClass} style={i()}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActivePath(pathname, link.href) && link.href !== "/404" ? "page" : undefined}
                        // /404 answers with HTTP 404 on purpose – don't prefetch it.
                        prefetch={link.href === "/404" ? false : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={cn(rowClass, "mt-5")} style={i()}>
              <Link
                href={siteConfig.cta.href}
                onClick={() => setOpen(false)}
                className={buttonClasses({ variant: "dark", size: "md", className: "w-full rounded-[14px]" })}
              >
                {siteConfig.cta.label}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
