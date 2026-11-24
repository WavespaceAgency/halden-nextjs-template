import type { MDXComponents } from "mdx/types";

/**
 * Global MDX components (required by @next/mdx). The blog and legal pages pass their own
 * styled elements instead: see src/components/mdx and src/components/legal.
 */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
