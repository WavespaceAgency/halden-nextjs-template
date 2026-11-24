import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

/** Logo mark + site name. Links to the home page. Replace LogoMark.tsx with your own mark. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex min-h-11 items-center gap-[11px] rounded-lg", className)} aria-label={`${siteConfig.name} – Home`}>
      <LogoMark className="size-6 text-brand-bright" />
      <span className="text-[21px] leading-[27px] font-semibold tracking-[-0.02em] text-ink">{siteConfig.name}</span>
    </Link>
  );
}
