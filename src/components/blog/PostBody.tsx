import type { ReactNode } from "react";
import type { TocItem } from "@/components/mdx/TocSpy";
import { Container } from "@/components/ui/Container";
import { postPage } from "@/config/pages/blog";
import type { Post } from "@/lib/blog";
import { AuthorBox } from "./AuthorBox";
import { PostAside } from "./PostAside";
import { ReadingProgress } from "./ReadingProgress";

type Props = {
  post: Post;
  url: string;
  headings: TocItem[];
  /** The rendered MDX content. */
  children: ReactNode;
};

/** Article body: sticky aside (contents, share, author) + the MDX content, tags and author card. */
export function PostBody({ post, url, headings, children }: Props) {
  return (
    <ReadingProgress className="pt-10 pb-16 lg:pt-20 lg:pb-24">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-24">
        <PostAside post={post} url={url} headings={headings} />
        <div className="flex min-w-0 flex-col gap-6 lg:w-[760px]">
          <div className="flex flex-col gap-6">{children}</div>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-4" aria-label={postPage.tagsLabel}>
              {post.tags.map((tag) => (
                <li key={tag} className="flex min-h-8 items-center rounded-pill border border-ink-2/12 px-3.5 text-sm leading-[18px] font-medium text-body">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <AuthorBox author={post.author} />
        </div>
      </Container>
    </ReadingProgress>
  );
}
