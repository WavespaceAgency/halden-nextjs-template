/**
 * 404 page content (src/app/not-found.tsx and the /404 preview route).
 */
import { siteConfig } from "@/config/site";

export const notFound = {
  seo: {
    title: "Page Not Found",
    description: "The page you are looking for may have moved. Head back home or book a demo.",
  },
  code: "404",
  title: "This page missed its appointment",
  description: "The link may be old or the page has moved. Halden still answers every call, though.",
  primary: { label: "Back to Home", href: "/" },
  secondary: siteConfig.cta,
};
