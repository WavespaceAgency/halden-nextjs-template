import { postPage } from "@/config/pages/blog";
import type { Author } from "@/lib/blog";
import { AuthorAvatar } from "./AuthorAvatar";

type Props = {
  author: Author;
};

/** "Written by" card at the end of a post. */
export function AuthorBox({ author }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-card bg-surface p-6 sm:flex-row sm:p-7">
      <AuthorAvatar author={author} size={56} />
      <div className="flex flex-col gap-1.5">
        <p className="text-lg leading-[23px] font-medium text-ink-2">
          {postPage.writtenBy} {author.name}
        </p>
        {author.bio && <p className="max-w-[569px] text-base leading-6 text-body">{author.bio}</p>}
      </div>
    </div>
  );
}
