import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { setup } from "@/config/pages/platform";

/** Setup: "Live in about two weeks" – three numbered step cards (Figma 1440×691). Cards lift on hover. */
export function Setup() {
  return (
    <section aria-labelledby="setup-title" className="bg-canvas-2 py-20 lg:py-[120px]">
      <Container>
        <SectionHeading {...setup.heading} id="setup-title" animate className="[&>p:first-child]:mb-4!" />
        <ol className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {setup.steps.map((step) => (
            <li
              key={step.number}
              className="group flex flex-col gap-10 rounded-card bg-surface p-7 transition-[translate,box-shadow,background-color] duration-[450ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(12_26_47/0.18)] motion-reduce:transition-none lg:min-h-[284px] lg:p-9"
            >
              <p className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-brand font-mono text-sm leading-[18px] font-medium text-white transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] group-hover:scale-110 motion-reduce:transition-none">
                  {step.number}
                </span>
                <span className="font-mono text-sm leading-[18px] font-semibold tracking-[0.06em] text-body uppercase">{step.when}</span>
              </p>
              <div className="flex flex-col gap-2">
                <SplitText as="h3" className="text-h3 font-medium text-ink">
                  {step.title}
                </SplitText>
                <SplitText as="p" mode="words" className="text-lead text-body">
                  {step.description}
                </SplitText>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
