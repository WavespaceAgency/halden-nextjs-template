import Link from "next/link";
import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { postPage } from "@/config/pages/blog";
import type { Post } from "@/lib/blog";

type Props = {
  post: Post;
};

/** Breadcrumb, title and intro at the top of a post (Figma "Article hero"). */
export function PostHero({ post }: Props) {
  const p = postPage;
  return (
    <section className="pt-10 pb-10 lg:pt-[72px] lg:pb-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <nav aria-label={p.breadcrumbLabel}>
          <ol className="flex items-center gap-2 text-sm leading-[18px] text-body">
            <li>
              <Link href={p.breadcrumb.href} className="rounded-sm font-medium text-brand-deep hover:underline">
                {p.breadcrumb.label}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{post.category}</li>
          </ol>
        </nav>
        <div className="flex max-w-[838px] flex-col items-center gap-5">
          <SplitText as="h1" mode="chars" trigger="load" className="text-[40px] leading-[1.08] font-medium tracking-[-0.03em] text-ink-2 sm:text-5xl lg:text-[56px]">
            {post.title}
          </SplitText>
          <p className="max-w-[630px] text-lg leading-[1.5] text-body sm:text-xl sm:leading-[30px]">{post.subtitle ?? post.excerpt}</p>
        </div>
      </Container>
    </section>
  );
}
