import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: StaticImageData;
  /** Rendered size in px (square). */
  size: number;
  className?: string;
  /** Leave empty for decorative avatars next to a visible name. */
  alt?: string;
};

/** Round avatar photo used in the product mockups and testimonials (1× and 2× sources, lazy). */
export function Avatar({ src, size, className, alt = "" }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}
