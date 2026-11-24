import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

/** /sitemap.xml – every page plus every blog post. Add new routes to `pages`. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/platform", "/security", "/pricing", "/about", "/blog", "/book-a-demo", "/privacy-policy", "/terms-of-service"];
  const posts = await getPosts();
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.date })),
  ];
}
