import { LegalPage } from "@/components/legal/LegalPage";
import { getMdxHeadings } from "@/lib/blog";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { meta } = await getLegalPage("privacy");
  return pageMetadata({ title: meta.title, description: meta.description, path: "/privacy-policy" });
}

/** /privacy-policy – Privacy Policy. Text: src/content/legal/privacy.mdx. */
export default async function Page() {
  const [{ meta, Content }, sections] = await Promise.all([getLegalPage("privacy"), getMdxHeadings("legal", "privacy")]);
  return <LegalPage meta={meta} Content={Content} sections={sections} />;
}
