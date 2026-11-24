import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { Post } from "@/lib/blog";

type Props = {
  post: Post;
};

/** Large cover photo under the post title (Figma "Cover", 1248×680). The LCP image – preloaded. */
export function PostCover({ post }: Props) {
  return (
    <div className="pb-5">
      <Container>
        <div className="relative aspect-[358/220] overflow-hidden rounded-[20px] bg-canvas-2 sm:aspect-[1248/680] lg:rounded-[28px]">
          <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1344px) 1248px, calc(100vw - 32px)" preload fetchPriority="high" className="object-cover" />
        </div>
      </Container>
    </div>
  );
}
