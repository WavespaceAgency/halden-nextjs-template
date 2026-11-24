import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { postPage } from "@/config/pages/blog";
import type { Post } from "@/lib/blog";
import { PostCard } from "./PostCard";
import { RelatedPager } from "./RelatedPager";

type Props = {
  /** Other posts, most related first. Shown three at a time with page buttons. */
  posts: Post[];
};

/** "Related Blogs" – more posts under an article, three per page (Figma "Press"). */
export function RelatedPosts({ posts }: Props) {
  const r = postPage.related;
  const pages = Math.min(r.maxPages, Math.ceil(posts.length / r.count));
  const shown = posts.slice(0, pages * r.count);
  return (
    <section aria-labelledby="related-title" className="bg-canvas-2 py-20 lg:pt-[120px] lg:pb-[140px]">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div className="flex flex-col gap-4">
            <Eyebrow {...r.eyebrow} className="[&>span]:font-medium" />
            <h2 id="related-title" className="text-h1 leading-[1.3] font-medium text-ink-2">
              {r.title}
            </h2>
          </div>
          <Button href={r.viewAll.href} variant="outline" size="xl" className="border-black/16! bg-transparent!">
            {r.viewAll.label}
          </Button>
        </div>
        <RelatedPager
          cards={shown.map((post) => ({ slug: post.slug, card: <PostCard post={post} /> }))}
          perPage={r.count}
          paginationLabel={r.paginationLabel}
          pageLabel={r.pageLabel}
        />
      </Container>
    </section>
  );
}
