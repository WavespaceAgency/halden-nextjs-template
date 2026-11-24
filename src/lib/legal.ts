import type { MDXContent } from "mdx/types";

/**
 * Legal pages live in src/content/legal as .mdx files (privacy.mdx, terms.mdx).
 * They are sample texts – replace them with policies reviewed by your own lawyer.
 */
export type LegalMeta = {
  title: string;
  /** Meta description. */
  description: string;
  /** "Last updated" date (YYYY-MM-DD). */
  updated: string;
};

export async function getLegalPage(name: "privacy" | "terms"): Promise<{ meta: LegalMeta; Content: MDXContent }> {
  const mod = (await import(`@/content/legal/${name}.mdx`)) as { default: MDXContent; frontmatter: LegalMeta };
  const { title, description, updated } = mod.frontmatter;
  if (!title || !description || !/^\d{4}-\d{2}-\d{2}$/.test(updated)) {
    throw new Error(`Legal page "${name}": frontmatter needs title, description and updated (YYYY-MM-DD).`);
  }
  return { meta: mod.frontmatter, Content: mod.default };
}
