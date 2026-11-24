import fs from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";

/**
 * Blog posts live in src/content/blog as .mdx files. The file name is the URL:
 * src/content/blog/my-post.mdx → /blog/my-post. Images go in public/images/blog.
 * The frontmatter (the block between the --- lines) is checked when the site builds,
 * so a missing field gives a clear error instead of a broken page.
 * Data loaders use "use cache", so every post is read once at build time.
 */

export type Author = {
  name: string;
  role: string;
  bio?: string;
  /** Optional photo (public path). Without it the initials are shown. */
  avatar?: string;
};

export type PostMeta = {
  title: string;
  /** Short summary for cards, RSS and the meta description. */
  excerpt: string;
  /** Optional longer intro under the post title (defaults to the excerpt). */
  subtitle?: string;
  /** Must match one of the tabs in src/config/pages/blog.ts. */
  category: string;
  /** Extra tags shown at the end of the post. */
  tags: string[];
  /** YYYY-MM-DD */
  date: string;
  readingTime: string;
  /** Cover image (public path, e.g. "/images/blog/my-post.png"). 1600×1000 or larger works best. */
  image: string;
  imageAlt: string;
  author: Author;
  /** Shown large at the top of the blog page. */
  featured?: boolean;
};

export type Post = PostMeta & { slug: string };
export type Heading = { id: string; text: string };

const dir = path.join(process.cwd(), "src/content/blog");

function check(slug: string, data: Record<string, unknown>): PostMeta {
  const need = (key: string, type: "string" | "object") => {
    if (typeof data[key] !== type) throw new Error(`Blog post "${slug}": frontmatter "${key}" must be a ${type}.`);
  };
  ["title", "excerpt", "category", "date", "readingTime", "image", "imageAlt"].forEach((k) => need(k, "string"));
  need("author", "object");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) throw new Error(`Blog post "${slug}": "date" must look like 2026-01-31.`);
  return { tags: [], ...data } as unknown as PostMeta;
}

/** Slugs of every post (file names without .mdx). */
export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  const files = await fs.readdir(dir);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

/** One post's frontmatter. */
export async function getPostMeta(slug: string): Promise<Post> {
  "use cache";
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as { frontmatter: Record<string, unknown> };
  return { slug, ...check(slug, mod.frontmatter) };
}

/** One post's frontmatter and MDX content component. */
export async function getPost(slug: string): Promise<{ post: Post; Content: MDXContent }> {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as { default: MDXContent; frontmatter: Record<string, unknown> };
  return { post: { slug, ...check(slug, mod.frontmatter) }, Content: mod.default };
}

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  "use cache";
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(getPostMeta));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * The "## " headings of an MDX file in src/content/<folder>, for a table of contents.
 * Ids follow the same rule as rehype-slug, so links match the rendered headings.
 */
export async function getMdxHeadings(folder: "blog" | "legal", name: string): Promise<Heading[]> {
  "use cache";
  const source = await fs.readFile(path.join(process.cwd(), "src/content", folder, `${name}.mdx`), "utf8");
  const seen = new Map<string, number>();
  return [...source.matchAll(/^##\s+(.+)$/gm)].map((m) => {
    const text = m[1].trim();
    const base = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s/g, "-");
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return { id: n ? `${base}-${n}` : base, text };
  });
}

/** The "## " headings of a blog post. */
export const getPostHeadings = (slug: string) => getMdxHeadings("blog", slug);

/** "2026-09-02" → "Sep 2, 2026" */
export function formatDate(iso: string, month: "short" | "long" = "short") {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" });
}
