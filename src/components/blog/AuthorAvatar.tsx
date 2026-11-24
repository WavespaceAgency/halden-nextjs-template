import Image from "next/image";
import type { Author } from "@/lib/blog";
import { cn } from "@/lib/utils";

type Props = {
  author: Pick<Author, "name" | "avatar">;
  /** 24, 40 or 56px. */
  size?: 24 | 40 | 56;
  className?: string;
};

const textSize = { 24: "text-[10px]", 40: "text-sm", 56: "text-lg" } as const;

/** "Dr. Lena Ortiz" → "LO" */
function initials(name: string) {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.?\s+/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Author photo, or the initials on a pastel circle when the post has no photo (as in Figma). Decorative – the name is always shown next to it. */
export function AuthorAvatar({ author, size = 24, className }: Props) {
  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-soft font-medium text-ink-2", textSize[size], className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {author.avatar ? <Image src={author.avatar} alt="" fill sizes={`${size}px`} className="object-cover" /> : initials(author.name)}
    </span>
  );
}
