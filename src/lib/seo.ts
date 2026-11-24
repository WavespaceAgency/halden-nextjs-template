import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Absolute URL for a path on this site. */
export function absoluteUrl(path: string) {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageMetaInput = {
  /** Page title. Rendered as "Title | Site name" by the template in app/layout.tsx. */
  title?: string;
  description?: string;
  /** Route path, e.g. "/pricing" – used for the canonical URL. */
  path: string;
  type?: "website" | "article";
  /** Share image (absolute or root-relative). Leave out to use app/opengraph-image.png. */
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
};

/**
 * Metadata for a page: title, description, canonical, Open Graph and Twitter card.
 * Use it in every page.tsx: `export const metadata = pageMetadata({ ... })`.
 */
export function pageMetadata({ title, description = siteConfig.description, path, type = "website", image, noindex }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
