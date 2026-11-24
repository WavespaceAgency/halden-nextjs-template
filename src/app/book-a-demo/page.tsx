import { DemoForm } from "@/components/demo/DemoForm";
import { DemoIntro } from "@/components/demo/DemoIntro";
import { meshBackground } from "@/components/demo/mesh";
import { Container } from "@/components/ui/Container";
import { bookDemo } from "@/config/pages/book-a-demo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: bookDemo.seo.title, description: bookDemo.seo.description, path: "/book-a-demo" });

/** Book a demo: intro and benefits on the left, the request form on the right (stacked below 1280px). Text: src/config/pages/book-a-demo.ts */
export default function BookDemoPage() {
  return (
    <section className="py-12 sm:py-16 lg:py-[120px]" style={{ background: meshBackground }}>
      <Container className="flex flex-col gap-12 xl:flex-row xl:items-start xl:gap-20">
        <DemoIntro />
        <DemoForm content={bookDemo.form} />
      </Container>
    </section>
  );
}
