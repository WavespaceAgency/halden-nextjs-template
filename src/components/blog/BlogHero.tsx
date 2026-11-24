import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { blogPage } from "@/config/pages/blog";
import type { Post } from "@/lib/blog";
import { PostCard } from "./PostCard";

type Props = {
  /** The two featured posts (first one gets the short image, second the tall one). */
  posts: Post[];
};

/** Top of /blog: page title on the left, the two featured posts on the right (stacked below xl). */
export function BlogHero({ posts }: Props) {
  const { hero } = blogPage;
  return (
    <section className="bg-surface pt-10 pb-14 lg:pt-20 lg:pb-[74px]">
      <Container size="wide" className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex max-w-[368px] flex-col gap-5">
          <SplitText as="h1" mode="chars" trigger="load" className="text-display leading-[1.04] font-medium tracking-[-0.035em] whitespace-pre-line text-ink-2">
            {hero.title}
          </SplitText>
          <SplitText as="p" mode="words" trigger="load" className="text-lead text-body">
            {hero.description}
          </SplitText>
        </div>
        <div className="grid gap-10 md:grid-cols-2 md:gap-6 xl:w-[808px] xl:shrink-0">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} variant={i === 1 ? "featured-tall" : "featured"} load="preload" titleTrigger="load" />
          ))}
        </div>
      </Container>
    </section>
  );
}
