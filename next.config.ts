import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Every page is prerendered at build time. Cached and static content only, no request-time work.
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    // The CSS is small (Tailwind + a few CSS Modules), so it ships inside the HTML: no render-blocking
    // stylesheet request on first load, and no stylesheet preloads when other pages are prefetched.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      // Tailwind runs on global stylesheets only. CSS Modules (*.module.css) are left to
      // Next.js' built-in CSS Modules support, so their class names stay scoped.
      "*.css": {
        condition: { not: { path: "*.module.css" } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

/**
 * MDX for the blog and legal pages (src/content). Frontmatter (the YAML block at the
 * top of a post) is exported as `frontmatter`; headings get ids for the table of contents.
 * Plugin names are strings so they also work with Turbopack.
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", ["remark-mdx-frontmatter", { name: "frontmatter" }]],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
