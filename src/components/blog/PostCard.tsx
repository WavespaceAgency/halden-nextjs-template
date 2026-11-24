import Image from "next/image";
import Link from "next/link";
import { SplitText } from "@/components/motion/SplitText";
import type { Post } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { PostMeta } from "./PostMeta";
import styles from "./PostCard.module.css";

type Props = {
  post: Post;
  /** "grid" = 270px image (blog grid, related posts). "featured" / "featured-tall" = the two hero cards. */
  variant?: "grid" | "featured" | "featured-tall";
  /** Cover loading: "preload" for cards above the fold (LCP candidates), "eager" for copies of them further down. Default lazy. */
  load?: "preload" | "eager" | "lazy";
  /** "load" for cards above the fold (title letters pop in on first paint), "view" elsewhere. */
  titleTrigger?: "load" | "view";
  className?: string;
};

const cover = {
  grid: "aspect-[395/270] rounded-lg",
  featured: "aspect-[392/248] rounded-xl",
  "featured-tall": "aspect-[392/248] rounded-xl md:aspect-[392/420] md:rounded-[20px]",
};

/** Blog post card: cover, meta, title, excerpt. The whole card is one link (the title link is stretched over it). */
export function PostCard({ post, variant = "grid", load = "lazy", titleTrigger = "view", className }: Props) {
  // Hero cards sit right under the page h1, so they use h2; grid cards sit under a section h2.
  const Heading = variant === "grid" ? "h3" : "h2";
  return (
    <article className={cn(styles.card, "relative flex flex-col", className)}>
      <div className={cn(styles.cover, "relative overflow-hidden bg-canvas-2", cover[variant])}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className={cn(styles.image, "object-cover")}
          preload={load === "preload"}
          fetchPriority={load === "preload" ? "high" : undefined}
          loading={load === "eager" ? "eager" : undefined}
        />
      </div>
      <div className={cn("flex flex-col gap-4", variant === "featured-tall" ? "mt-8 md:mt-[34px]" : "mt-8")}>
        <PostMeta post={post} />
        <div className="flex flex-col gap-[7px]">
          <Heading className={cn(styles.title, "text-[22px] leading-[1.22] font-medium tracking-[-0.015em] text-pretty text-ink-2 sm:text-2xl")}>
            <Link href={`/blog/${post.slug}`} className={cn(styles.link, "rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none")}>
              <SplitText as="span" mode="chars" trigger={titleTrigger}>
                {post.title}
              </SplitText>
            </Link>
          </Heading>
          <p className={cn("text-base leading-[26px] text-body", variant === "grid" && "max-w-[372px]")}>{post.excerpt}</p>
        </div>
      </div>
    </article>
  );
}
