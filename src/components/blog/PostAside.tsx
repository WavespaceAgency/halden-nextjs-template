import { TocSpy, type TocItem } from "@/components/mdx/TocSpy";
import { postPage } from "@/config/pages/blog";
import { formatDate, type Post } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { AuthorAvatar } from "./AuthorAvatar";
import { ShareLinks } from "./ShareLinks";
import { nbsp } from "./text";

type Props = {
  post: Post;
  /** Absolute URL of the post (for the share links). */
  url: string;
  /** Sections for "On this page" (h2 headings of the post). */
  headings: TocItem[];
};

const label = "font-mono text-xs leading-4 font-medium tracking-[0.08em] text-body uppercase";

/**
 * Left column of a post: "On this page" (desktop only, highlights the section in view),
 * share links and the author. Sticky on desktop; above the article on phones and tablets.
 */
export function PostAside({ post, url, headings }: Props) {
  const p = postPage;
  return (
    <aside className="flex flex-col lg:sticky lg:top-[calc(var(--spacing-nav)+24px)] lg:w-[264px] lg:shrink-0 lg:self-start">
      {headings.length > 0 && (
        <nav aria-labelledby="toc-title" className="hidden flex-col gap-3.5 lg:flex">
          <p id="toc-title" className={label}>
            {p.tocTitle}
          </p>
          <TocSpy items={headings} variant="line" />
        </nav>
      )}

      <div className={cn("flex flex-col gap-3", headings.length > 0 && "lg:mt-3.5 lg:pt-6")}>
        <p className={label}>{p.shareTitle}</p>
        <ShareLinks url={url} title={post.title} />
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#dfe0e0] pt-6 lg:mt-3.5">
        <p className={label}>{p.authorTitle}</p>
        <div className="flex items-center gap-4">
          <AuthorAvatar author={post.author} size={40} className="bg-violet-tint" />
          <div className="flex flex-col gap-0.5">
            <p className="text-base leading-[21px] font-medium text-ink-2">{post.author.name}</p>
            <p className="text-sm leading-[18px] text-body">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {nbsp(post.readingTime)}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
