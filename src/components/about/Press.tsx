import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { press } from "@/config/pages/about";
import { formatDate, getPosts, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";
import styles from "./Press.module.css";
import { PressPager } from "./PressPager";
import { SplitText } from "./SplitText";

/** "Dr. Priya Shah" → "PS" (shown when a post's author has no photo). */
function initials(name: string) {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** One news card: photo, author line, title and excerpt; the whole card links to the post. */
function PressCard({ post, n }: { post: Post; n: number }) {
  return (
    <li className={cn(styles.card, "relative flex flex-col")} style={{ "--n": n } as CSSProperties}>
      <div className="relative aspect-[395/270] overflow-hidden rounded-lg">
        <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1440px) 395px, (min-width: 768px) 30vw, 100vw" className={cn(styles.img, "object-cover")} />
      </div>
      <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-[18px] text-muted">
        {post.author.avatar ? (
          <Image src={post.author.avatar} alt="" width={48} height={48} className="size-6 rounded-full object-cover" />
        ) : (
          <span className="flex size-6 items-center justify-center rounded-full bg-[#c8defb] text-[10px] font-medium text-ink-2" aria-hidden="true">
            {initials(post.author.name)}
          </span>
        )}
        <span className="font-medium text-ink">{post.author.name}</span>
        <span className="flex gap-2 whitespace-nowrap">
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="flex gap-2 whitespace-nowrap">
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </span>
      </p>
      <SplitText
        as="h3"
        mode="chars"
        text={post.title}
        className={cn(styles.title, "mt-4 text-[22px] leading-[1.22] font-medium tracking-[-0.015em] text-ink-2 sm:text-2xl")}
      />
      <p className="mt-[7px] max-w-[360px] text-base leading-[26px] text-[#4c565f]">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand" aria-label={post.title} />
    </li>
  );
}

/**
 * "Halden in the news" (Figma "Press", 1440×969): the newest blog posts, three per page.
 * PressPager adds the page buttons and the page-change motion. Heading and card titles
 * pop in letter by letter (Framer). Hover: the card lifts, the photo zooms, the title turns blue.
 */
export async function Press() {
  const posts = (await getPosts()).slice(0, press.perPage * press.maxPages);
  if (posts.length === 0) return null;
  const pages = Array.from({ length: Math.ceil(posts.length / press.perPage) }, (_, p) =>
    posts.slice(p * press.perPage, (p + 1) * press.perPage).map((post, n) => <PressCard key={post.slug} post={post} n={n} />),
  );

  return (
    <section className="bg-surface pt-16 pb-20 sm:pt-24 lg:pt-[120px] lg:pb-[140px]" aria-labelledby="press-title">
      <Container>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow {...press.eyebrow} />
            <SplitText as="h2" id="press-title" mode="chars" text={press.title} className="mt-4 text-h1 leading-[1.3] font-medium tracking-[-0.0375em] text-ink-2" />
          </div>
          <Button href={press.viewAll.href} variant="outline" size="xl" className="border-black/16 bg-transparent text-ink">
            {press.viewAll.label}
          </Button>
        </div>
        <PressPager pages={pages} labels={press.labels} />
      </Container>
    </section>
  );
}
