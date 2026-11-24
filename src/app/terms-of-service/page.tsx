import { LegalPage } from "@/components/legal/LegalPage";
import { getMdxHeadings } from "@/lib/blog";
import { getLegalPage } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const { meta } = await getLegalPage("terms");
  return pageMetadata({ title: meta.title, description: meta.description, path: "/terms-of-service" });
}

/** /terms-of-service – Terms of Service. Text: src/content/legal/terms.mdx. */
export default async function Page() {
  const [{ meta, Content }, sections] = await Promise.all([getLegalPage("terms"), getMdxHeadings("legal", "terms")]);
  return <LegalPage meta={meta} Content={Content} sections={sections} />;
}
