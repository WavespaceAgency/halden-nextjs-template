import { formatDate, type Post } from "@/lib/blog";
import { AuthorAvatar } from "./AuthorAvatar";
import { nbsp } from "./text";

type Props = {
  post: Post;
};

/** Author avatar · name · date · reading time (Figma "Meta"). */
export function PostMeta({ post }: Props) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-[18px] text-muted">
      <AuthorAvatar author={post.author} />
      <span className="font-medium text-ink">{post.author.name}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{nbsp(post.readingTime)}</span>
    </p>
  );
}
