import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"div"> & {
  /** "site" = 1248px content column (96px sides at 1440). "wide" = 1376px (32px sides), used by the hero card. */
  size?: "site" | "wide";
};

/** Centred page column with responsive side padding. */
export function Container({ size = "site", className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        size === "site"
          ? "max-w-[calc(var(--container-site)+3rem)] lg:px-12 xl:max-w-site xl:px-0"
          : "max-w-[calc(var(--container-wide)+4rem)] lg:px-8",
        className,
      )}
      {...rest}
    />
  );
}
