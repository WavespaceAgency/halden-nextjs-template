import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

/** /rss.xml – the blog feed, built at build time. */
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid>${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <description>${escape(p.excerpt)}</description>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escape(`${siteConfig.name} Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escape(siteConfig.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
