import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";
import { siteConfig, type NavLink } from "@/config/site";
import { externalProps, isExternal } from "@/lib/utils";

const linkClass = "flex w-fit min-h-11 items-center text-[17px] leading-[22px] text-ink-2 transition-colors hover:text-brand md:min-h-0";
const smallLink = "inline-flex min-h-11 items-center text-sm font-medium text-ink-2 transition-colors hover:text-brand";

function FooterLink({ link, className }: { link: NavLink; className: string }) {
  if (isExternal(link.href)) {
    return (
      <a href={link.href} className={className} {...externalProps(link.href)}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

/** Footer: five link columns, big wordmark with soft coloured "hills", copyright and socials. */
export function Footer() {
  const { columns, copyright, credit } = siteConfig.footer;

  return (
    <footer className="relative overflow-hidden bg-surface">
      {/* Link columns: full width with 96px sides (as Framer); 5 × 224px, 32px gap at 1440 */}
      <div className="px-4 pt-16 sm:px-6 lg:px-12 lg:pt-[104px] xl:px-24">
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-h4 font-medium text-brand-deep">{col.title}</h2>
              <ul className="mt-4 flex flex-col md:mt-[42px] md:gap-[18px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} className={linkClass} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Big wordmark with soft coloured "hills" (blurred ellipses) */}
      <div className="relative mt-10 h-[calc(min(20.83vw,300px)+190px)] lg:mt-0 lg:h-[470px]">
        <div
          className="absolute top-[30px] left-1/2 flex -translate-x-1/2 items-center gap-[0.12em] text-[min(20.83vw,300px)] leading-none lg:top-[70px]"
          aria-hidden="true"
        >
          <LogoMark className="size-[0.736em] shrink-0 text-brand" />
          <span className="font-medium tracking-[-0.05em] text-ink-2">{siteConfig.name}</span>
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute top-[64%] left-[-14%] h-[260px] w-[62%] rounded-full bg-mint-tint/95 blur-[80px]" />
          <span className="absolute top-[70%] left-[36%] h-[240px] w-[49%] rounded-full bg-violet-tint/90 blur-[80px]" />
          <span className="absolute top-[60%] left-[69%] h-[280px] w-[56%] rounded-full bg-lime-tint/95 blur-[80px]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 px-4 pt-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12 xl:px-24">
          <p className="text-sm text-ink-2">{copyright}</p>
          <ul className="flex flex-wrap items-center gap-x-6 md:absolute md:left-1/2 md:-translate-x-1/2">
            {siteConfig.socials.map((s) => (
              <li key={s.href}>
                <FooterLink link={s} className={smallLink} />
              </li>
            ))}
            <li>
              <a href={`mailto:${siteConfig.email}`} className={smallLink}>
                {siteConfig.email}
              </a>
            </li>
          </ul>
          {credit && (
            <a
              href={credit.href}
              {...externalProps(credit.href)}
              className="inline-flex min-h-11 items-center rounded-pill bg-surface px-4 py-2 text-sm font-medium text-ink-2 transition-shadow hover:shadow-card md:min-h-[34px]"
            >
              {credit.label}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
