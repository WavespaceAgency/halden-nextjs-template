import Link from "next/link";
import type { ComponentProps } from "react";
import { externalProps, isExternal } from "@/lib/utils";

const classes = "rounded-sm font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand";

/** Links inside legal text: next/link for pages on this site, a plain <a> for email and web links. */
export function TextLink({ href = "", children }: ComponentProps<"a">) {
  if (isExternal(href) || href.startsWith("#")) {
    return (
      <a href={href} className={classes} {...externalProps(href)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
