import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getPostMeta, getPostSlugs } from "@/lib/blog";

/**
 * Share image for each post (1200×630, generated at build time): the post title and
 * category on the brand navy, the cover photo on the right and the site mark (app/icon.svg).
 */
export const alt = `${siteConfig.name} blog post`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

/**
 * Everything the image needs, read once at build time ("use cache" keeps the route static):
 * the post, its cover and the site mark as data URLs.
 */
async function getImageData(slug: string) {
  "use cache";
  const root = process.cwd();
  const post = await getPostMeta(slug);
  const type = /\.jpe?g$/.test(post.image) ? "jpeg" : post.image.split(".").pop();
  const [cover, mark] = await Promise.all([readFile(join(root, "public", post.image), "base64"), readFile(join(root, "src/app/icon.svg"), "base64")]);
  return {
    title: post.title,
    category: post.category,
    cover: `data:image/${type};base64,${cover}`,
    mark: `data:image/svg+xml;base64,${mark}`,
  };
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { title, category, cover, mark } = await getImageData(slug);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0c1a2f", padding: 48, gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={mark} width={48} height={48} alt="" />
            <span style={{ fontSize: 34, color: "#fcfbf8", letterSpacing: "-0.02em" }}>{siteConfig.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                background: "#2c67f6",
                color: "#ffffff",
                fontSize: 22,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </span>
            <span style={{ fontSize: title.length > 48 ? 54 : 62, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#fcfbf8" }}>{title}</span>
          </div>
        </div>
        <img src={cover} width={440} height={534} alt="" style={{ objectFit: "cover", borderRadius: 28 }} />
      </div>
    ),
    size,
  );
}
