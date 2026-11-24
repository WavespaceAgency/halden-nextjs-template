import type { Metadata } from "next";
import { NotFound } from "@/components/not-found/NotFound";
import { notFound } from "@/config/pages/not-found";

export const metadata: Metadata = {
  title: notFound.seo.title,
  description: notFound.seo.description,
  robots: { index: false, follow: true },
  // No canonical: the layout's "/" canonical must not be inherited by missing pages.
  alternates: { canonical: null },
};

/**
 * Shown (with HTTP 404) for every URL that has no page – and at /404, which Next.js
 * reserves for this page, so the "Pages" menu link previews it without an extra route.
 */
export default function NotFoundPage() {
  return <NotFound />;
}
