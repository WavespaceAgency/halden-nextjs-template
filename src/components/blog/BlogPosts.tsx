import { Container } from "@/components/ui/Container";
import { blogPage } from "@/config/pages/blog";
import type { Post } from "@/lib/blog";
import { Newsletter } from "./Newsletter";
import { PostCard } from "./PostCard";
import { PostFilter } from "./PostFilter";

type Props = {
  /** Every post, newest first. Featured posts are hidden under "All" (they are in the hero). */
  posts: Post[];
  /** Posts already shown in the hero. Their grid copies load eagerly: same image URL, so no extra download. */
  heroSlugs: string[];
};

/** "Latest articles": category chips, the post grid with "Load More Posts", then the newsletter card. */
export function BlogPosts({ posts, heroSlugs }: Props) {
  const b = blogPage;
  return (
    <section className="bg-canvas pt-12 pb-20 lg:pt-16 lg:pb-[120px]">
      <Container className="flex flex-col gap-12">
        <PostFilter
          items={posts.map((post) => ({ slug: post.slug, category: post.category, featured: !!post.featured, card: <PostCard post={post} load={heroSlugs.includes(post.slug) ? "eager" : "lazy"} /> }))}
          categories={b.categories}
          filterLabel={b.filterLabel}
          title={b.latestTitle}
          empty={b.empty}
          loadMore={b.loadMore}
          pageSize={b.pageSize}
        />
        <Newsletter />
      </Container>
    </section>
  );
}
