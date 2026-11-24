import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { trustedBy } from "@/config/pages/about";
import { cn } from "@/lib/utils";
import { SplitText } from "./SplitText";
import styles from "./TrustedBy.module.css";

/**
 * "Trusted by clinic teams" (Figma "Trusted by", 1440×468): twelve coloured name tiles.
 * Motion (Framer): the names un-blur word by word in view, tile after tile. Hover: the tile lifts.
 */
export function TrustedBy() {
  return (
    <section className="py-16 sm:py-24 lg:py-[120px]">
      <Container className="flex flex-col items-center">
        <Eyebrow {...trustedBy.eyebrow} />
        <ul className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-10 lg:grid-cols-6">
          {trustedBy.clinics.map((clinic, i) => (
            <li
              key={clinic.name}
              className={cn(
                styles.tile,
                "flex h-[72px] items-center justify-center rounded-panel px-3 text-center text-base leading-5 font-semibold tracking-[-0.01em]",
                clinic.dark ? "text-ink-2" : "text-body",
              )}
              style={{ background: clinic.bg }}
            >
              <SplitText as="span" text={clinic.name} delay={0.3 + (i % 6) * 0.05 + Math.floor(i / 6) * 0.08} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
