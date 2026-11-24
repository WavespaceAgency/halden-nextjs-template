import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { PostBody } from "@/components/blog/PostBody";
import { PostCover } from "@/components/blog/PostCover";
import { PostHero } from "@/components/blog/PostHero";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { blogMdx } from "@/components/mdx";
import { CtaBand } from "@/components/sections/CtaBand";
import { postPage } from "@/config/pages/blog";
import { siteConfig } from "@/config/site";
import { getPost, getPostHeadings, getPostSlugs, getPosts } from "@/lib/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

/** Every post is prerendered at build time. Unknown slugs get the 404 page. */
export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

async function findPost(slug: string) {
  if (!(await getPostSlugs()).includes(slug)) notFound();
  return getPost(slug);
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { post } = await findPost(slug);
  // The share image comes from ./opengraph-image.tsx.
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}`, type: "article" });
}

/**
 * Every post is prerendered at build time, so the route may block on its params: this keeps
 * `notFound()` before the first byte (a real 404 status) instead of streaming it.
 */
export const instant = false;

/** /blog/[slug] – one post from src/content/blog/<slug>.mdx. */
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [{ post, Content }, headings, posts] = await Promise.all([findPost(slug), getPostHeadings(slug), getPosts()]);
  const url = absoluteUrl(`/blog/${slug}`);

  // Related: same category first, then the newest of the rest.
  const others = posts.filter((p) => p.slug !== slug);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)];

  const articleLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: absoluteUrl(post.image),
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        keywords: post.tags.join(", "),
        mainEntityOfPage: url,
        author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: postPage.breadcrumb.label, item: absoluteUrl(postPage.breadcrumb.href) },
          { "@type": "ListItem", position: 2, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <PostHero post={post} />
      <PostCover post={post} />
      <PostBody post={post} url={url} headings={headings}>
        <Content components={blogMdx} />
      </PostBody>
      <RelatedPosts posts={related} />
      {/* Framer caps the closing CTA card at 1440px on articles (full width on the other pages). */}
      <div className="mx-auto w-full max-w-[1440px]">
        <CtaBand />
      </div>
    </>
  );
}
