import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/config/pages/platform";
import { Avatar } from "./Avatar";

/** Results: three customer quotes on the navy band (Figma 1440×633). Cards lift on hover. */
export function Testimonials() {
  return (
    <section aria-labelledby="results-title" className="bg-ink py-20 lg:py-[120px]">
      <Container>
        <SectionHeading {...testimonials.heading} id="results-title" theme="light" animate className="[&>p:first-child]:mb-4!" />
        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {testimonials.items.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-[20px] bg-white/6 p-6 transition-[translate,box-shadow,background-color] duration-[450ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:-translate-y-1 hover:bg-white/10 motion-reduce:transition-none sm:p-10">
                <blockquote className="text-h4 leading-[1.2] font-medium tracking-[-0.015em] text-canvas">
                  <SplitText as="p" mode="words">
                    {item.quote}
                  </SplitText>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar src={item.avatar} size={40} />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[15px] leading-5 font-medium text-canvas">{item.name}</span>
                    <span className="text-[13px] leading-[17px] text-[#dcebff]">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
