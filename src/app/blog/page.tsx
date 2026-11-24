import { BlogHero } from "@/components/blog/BlogHero";
import { BlogPosts } from "@/components/blog/BlogPosts";
import { CtaBand } from "@/components/sections/CtaBand";
import { blogPage } from "@/config/pages/blog";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: blogPage.seo.title, description: blogPage.seo.description, path: "/blog" });

/** /blog – featured posts, the filterable post grid and the newsletter. Posts: src/content/blog/*.mdx. */
export default async function BlogPage() {
  const posts = await getPosts();
  // The two newest featured posts go in the hero (falls back to the two newest posts).
  const featured = posts.filter((p) => p.featured).slice(0, 2);
  const heroPosts = featured.length === 2 ? featured : posts.slice(0, 2);
  return (
    <>
      <BlogHero posts={heroPosts} />
      <BlogPosts posts={posts} heroSlugs={heroPosts.map((p) => p.slug)} />
      <CtaBand />
    </>
  );
}
