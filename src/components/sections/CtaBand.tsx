import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlayIcon } from "@/components/ui/PlayIcon";
import { ctaBand } from "@/config/pages/shared";

/**
 * Closing call to action above the footer (Figma "Frame 10/11", 1440×660).
 * Dark photo with blue / violet / teal glows. Text lives in src/config/pages/shared.ts.
 */
export function CtaBand() {
  const c = ctaBand;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden rounded-[24px] lg:rounded-[32px]">
      <Image src={c.image} alt="" fill sizes="100vw" quality={75} className="-z-20 object-cover" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 70% at 85% 15%, rgb(44 103 246 / .55), rgb(44 103 246 / .2) 50%, transparent),
      radial-gradient(50% 60% at 80% 95%, rgb(118 93 246 / .45), rgb(118 93 246 / .15) 50%, transparent),
      radial-gradient(45% 55% at 10% 95%, rgb(87 191 179 / .35), rgb(87 191 179 / .1) 55%, transparent),
      radial-gradient(50% 60% at 15% 20%, rgb(5 16 30 / .5), rgb(5 16 30 / .2) 60%, transparent),
      linear-gradient(180deg, rgb(12 26 47 / .55), rgb(12 26 47 / .35) 50%, rgb(5 16 30 / .6))`,
        }}
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-[900px] flex-col items-center px-4 py-24 text-center sm:px-6 lg:py-[171px]" data-reveal>
        <Eyebrow {...c.eyebrow} theme="light" />
        <h2 id="cta-title" className="mt-4 text-h1 font-medium whitespace-pre-line text-balance text-canvas">
          {c.title}
        </h2>
        <p className="mt-4 max-w-[460px] text-lead text-canvas">{c.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={c.primary.href} size="xl" className="rounded-[22px] shadow-[0_1px_2px_0_rgb(44_103_246/0.3),0_0_24px_0_rgb(44_103_246/0.55)]">
            {c.primary.label}
          </Button>
          <Button href={c.secondary.href} variant="glass" size="xl" className="rounded-[22px] border-white/55 bg-white/8">
            <PlayIcon />
            {c.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
