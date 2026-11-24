import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading, type HeadingContent } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { FaqList } from "./FaqList";

export type FaqContent = {
  heading: HeadingContent;
  items: { question: string; answer: string }[];
};

type Props = {
  content: FaqContent;
  /** Open the first question by default (as in Figma). */
  openFirst?: boolean;
  /** Add FAQPage JSON-LD (only one FAQ block per page should do this). */
  schema?: boolean;
  id?: string;
  /** Extra classes for the section, e.g. "bg-canvas" to change the background. */
  className?: string;
};

/**
 * FAQ: heading on the left, accordion on the right (Figma "Section / FAQ").
 * The questions are visible on the page, so the FAQPage JSON-LD is valid.
 */
export function Faq({ content, openFirst = true, schema = true, id = "faq", className }: Props) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(!className?.includes("bg-") && "bg-canvas-2", "py-20 lg:py-[120px]", className)}>
      {schema && <JsonLd data={faqLd} />}
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,474fr)_minmax(0,710fr)] lg:gap-16">
        <div data-reveal>
          <SectionHeading {...content.heading} id={`${id}-title`} descriptionClassName="max-w-[429px]" />
        </div>
        <FaqList id={id} items={content.items} openFirst={openFirst} />
      </Container>
    </section>
  );
}
