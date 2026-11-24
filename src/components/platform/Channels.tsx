import { SplitText } from "@/components/motion/SplitText";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { channelIcons, channels } from "@/config/pages/platform";

/** Channels: "One agent, every channel" – four coloured cards with a navy icon tile (Figma 1440×804). */
export function Channels() {
  return (
    <section aria-labelledby="channels-title" className="bg-surface py-20 lg:py-[120px]">
      <Container>
        <SectionHeading
          {...channels.heading}
          id="channels-title"
          align="center"
          animate
          className="[&>p:first-child]:mb-4!"
          descriptionClassName="mt-4! max-w-[484px] text-muted!"
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {channels.items.map((item) => (
            <li
              key={item.title}
              className="group flex min-h-[230px] flex-col justify-between gap-14 rounded-card p-8 transition-[translate,box-shadow,background-color] duration-[450ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(12_26_47/0.22)] motion-reduce:transition-none lg:min-h-[266px]"
              style={{ background: item.background }}
            >
              <svg
                className="size-12 transition-transform duration-500 ease-[cubic-bezier(0.34,1.45,0.64,1)] group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <rect width="48" height="48" rx="14" fill="#071A31" />
                <path d={channelIcons[item.icon]} stroke={item.background} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex flex-col gap-2">
                <SplitText as="h3" className="text-h3 font-medium text-ink">
                  {item.title}
                </SplitText>
                <SplitText as="p" mode="words" className="text-lead text-body">
                  {item.description}
                </SplitText>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
