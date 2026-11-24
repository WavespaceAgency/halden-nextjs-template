import { TocSpy, type TocItem } from "@/components/mdx/TocSpy";
import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { legalPage } from "@/config/pages/legal";
import { formatDate } from "@/lib/blog";
import type { LegalMeta } from "@/lib/legal";
import type { MDXContent } from "mdx/types";
import { legalMdx } from "./index";

type Props = {
  meta: LegalMeta;
  Content: MDXContent;
  /** The "## " sections, for the contents list. */
  sections: TocItem[];
};

/**
 * Shared layout for the Privacy Policy and Terms of Service: gradient header,
 * sticky "Contents" list (highlights the section in view) and the MDX text.
 * On phones and tablets the contents card sits above the text.
 */
export function LegalPage({ meta, Content, sections }: Props) {
  return (
    <>
      <section className="flex flex-col items-center gap-4 px-4 py-14 text-center sm:py-[90px]" style={{ background: legalPage.heroBackground }}>
        <SplitText as="h1" mode="chars" trigger="load" className="text-display leading-[1.05] font-medium tracking-[-0.035em] text-ink-2">
          {meta.title}
        </SplitText>
        <p className="text-[15px] leading-5 font-medium text-body">
          {legalPage.updatedPrefix} <time dateTime={meta.updated}>{formatDate(meta.updated, "long")}</time>
        </p>
      </section>

      <section className="pt-10 pb-20 lg:pt-[72px] lg:pb-[120px]">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-24">
          {sections.length > 0 && (
            <nav
              aria-labelledby="legal-contents"
              className="rounded-[20px] bg-surface p-5 sm:p-6 lg:sticky lg:top-[calc(var(--spacing-nav)+24px)] lg:w-[300px] lg:shrink-0"
            >
              <p id="legal-contents" className="mb-4 font-mono text-xs leading-4 font-medium tracking-[0.08em] text-body uppercase">
                {legalPage.contentsTitle}
              </p>
              <TocSpy items={sections} variant="pill" />
            </nav>
          )}
          <article className="min-w-0 lg:w-[760px]">
            <Content components={legalMdx} />
          </article>
        </Container>
      </section>
    </>
  );
}
