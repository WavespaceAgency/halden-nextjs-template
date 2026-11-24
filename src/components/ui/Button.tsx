import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/lib/button";
import { externalProps, isExternal } from "@/lib/utils";

type Style = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AsLink = Style & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type AsButton = Style & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

/**
 * A link styled as a button when `href` is set, otherwise a real <button>.
 * Internal links use next/link; external links open in a new tab.
 */
export function Button({ variant, size, className, children, ...props }: AsLink | AsButton) {
  const classes = buttonClasses({ variant, size, className });

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...externalProps(href)} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
