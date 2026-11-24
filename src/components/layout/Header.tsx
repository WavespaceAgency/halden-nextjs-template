"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { cn, isActivePath } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const linkClass =
  "relative flex min-h-11 items-center rounded-xl px-3 text-nav text-ink transition-colors duration-200 hover:text-brand aria-[current=page]:text-brand";

/**
 * Full-width sticky header (as on the Framer build): 72px on desktop, 64px on phones,
 * logo left, links centred, button right. Below 1024px the links move into MobileMenu.
 * Like Framer, it slides away while scrolling down and comes back on any scroll up (320ms).
 */
export function Header() {
  const pathname = usePathname();
  const { main, pages, pagesLabel } = siteConfig.nav;
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the dropdown after navigating. (Adjusting state while rendering, as React recommends.)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Hide on scroll down, show on scroll up (Framer: translateY -110%, 320ms).
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const header = headerRef.current;
      if (!header) return;
      const y = window.scrollY;
      const busy = menuOpen || open || header.contains(document.activeElement);
      if (y <= header.offsetHeight || busy) setHidden(false);
      else if (y > last + 2) setHidden(true);
      else if (y < last - 2) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen, open]);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  // Mouse users open the dropdown on hover; touch and keyboard use the button.
  const timer = useRef<number | undefined>(undefined);
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    timer.current = window.setTimeout(() => setOpen(false), 160);
  };

  return (
    <header
      ref={headerRef}
      data-hidden={hidden || undefined}
      onFocus={() => setHidden(false)}
      className="sticky top-0 z-40 w-full bg-surface transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] data-[hidden]:-translate-y-[110%] motion-reduce:transition-none"
    >
      <div className="relative flex h-16 w-full items-center justify-between px-5 lg:h-[72px] lg:px-8">
        <Logo />

        {/* Desktop navigation (1024px and up), centred */}
        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1">
            <li
              ref={dropdownRef}
              className="relative"
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onKeyDown={(e) => {
                if (e.key === "Escape" && open) {
                  setOpen(false);
                  toggleRef.current?.focus();
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
              }}
            >
              <button
                ref={toggleRef}
                type="button"
                className={cn(linkClass, "gap-1.5 text-ink-2")}
                aria-expanded={open}
                aria-controls="pages-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {pagesLabel}
                <svg
                  className={cn("size-3.5 transition-transform duration-300 ease-out-expo", open && "rotate-180")}
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.63 4.667 7 10.296 1.37 4.667l.83-.829L7 8.645l4.8-4.8.83.822Z" />
                </svg>
              </button>
              <div
                id="pages-menu"
                data-open={open || undefined}
                className="invisible absolute top-full left-1/2 mt-2 w-[440px] -translate-x-1/2 translate-y-2 scale-[0.98] rounded-panel border border-line bg-surface p-2 opacity-0 shadow-lift transition-[opacity,translate,scale,visibility] duration-300 ease-out-expo data-[open]:visible data-[open]:translate-y-0 data-[open]:scale-100 data-[open]:opacity-100"
              >
                <ul className="grid grid-cols-2 gap-0.5">
                  {pages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        aria-current={isActivePath(pathname, page.href) && page.href !== "/404" ? "page" : undefined}
                        // /404 answers with HTTP 404 on purpose – don't prefetch it.
                        prefetch={page.href === "/404" ? false : undefined}
                        className="group/item flex min-h-11 items-center justify-between rounded-chip px-3 text-[15px] text-ink transition-colors duration-200 hover:bg-sky-tint aria-[current=page]:text-brand"
                      >
                        {page.label}
                        <svg
                          className="size-3.5 -translate-x-1 text-brand opacity-0 transition-[opacity,translate] duration-300 ease-out-expo group-hover/item:translate-x-0 group-hover/item:opacity-100"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cn(linkClass, "group/nav")} aria-current={isActivePath(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                  <span
                    className="absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out-expo group-hover/nav:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <Button href={siteConfig.cta.href} variant="dark">
              {siteConfig.cta.label}
            </Button>
          </div>
          <MobileMenu pathname={pathname} onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  );
}
