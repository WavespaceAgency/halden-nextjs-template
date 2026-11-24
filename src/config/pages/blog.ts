/**
 * Blog content (routes "/blog" and "/blog/[slug]").
 * ------------------------------------------------------------
 * Posts themselves live in src/content/blog/*.mdx – this file holds
 * the page text around them: headings, tabs, newsletter and labels.
 */
import type { EyebrowContent } from "@/components/ui/Eyebrow";

export const blogPage = {
  seo: {
    title: "Blog",
    description: "Playbooks, product news and front-desk lessons from clinics running Halden.",
  },
  hero: {
    title: "The Halden\nblogs",
    description: "Playbooks, product news and front-desk lessons from clinics running Halden.",
  },
  /**
   * Category tabs. The first one shows every post; the others match the
   * `category` field in the post frontmatter.
   */
  categories: ["All", "Playbooks", "Product", "Compliance", "Stories"],
  filterLabel: "Filter posts by category",
  latestTitle: "Latest articles",
  /** Posts shown in the grid before "Load More Posts". */
  pageSize: 6,
  loadMore: "Load More Posts",
  empty: "No posts in this category yet.",
  newsletter: {
    title: "Get new posts in your inbox",
    description: "One email a month. Unsubscribe any time.",
    label: "Email address",
    placeholder: "you@example.com…",
    button: "Subscribe",
    success: "Thanks! You’re on the list – look out for our next email.",
    error: "Please enter a valid email address.",
  },
};

export type ShareLink = {
  /** Short visible label ("in", "X"). */
  label: string;
  /** Accessible name. */
  name: string;
  /** {url} and {title} are replaced with the post URL and title. */
  href: string;
};

export const postPage = {
  breadcrumb: { label: "Blog", href: "/blog" },
  breadcrumbLabel: "Breadcrumb",
  tocTitle: "On this page",
  shareTitle: "Share",
  share: [
    { label: "in", name: "Share on LinkedIn", href: "https://www.linkedin.com/sharing/share-offsite/?url={url}" },
    { label: "X", name: "Share on X", href: "https://x.com/intent/post?url={url}&text={title}" },
  ] satisfies ShareLink[],
  copyLink: { name: "Copy Link", copied: "Link copied" },
  authorTitle: "Author",
  writtenBy: "Written by",
  tagsLabel: "Tags",
  related: {
    eyebrow: {
      label: "News & press",
      tone: "violet",
      icon: "M8.875 8.875h4.1v4.1h-4.1v-4.1Zm6.15 0h4.1v4.1h-4.1v-4.1Zm-6.15 6.15h4.1v4.1h-4.1v-4.1Zm6.15 0h4.1v4.1h-4.1v-4.1Z",
    } satisfies EyebrowContent,
    title: "Related Blogs",
    viewAll: { label: "View All", href: "/blog" },
    /** Posts per page and the most page buttons shown. */
    count: 3,
    maxPages: 5,
    paginationLabel: "Related posts pages",
    pageLabel: "Page",
  },
};
