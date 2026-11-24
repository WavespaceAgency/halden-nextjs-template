import { Channels } from "@/components/platform/Channels";
import { Features } from "@/components/platform/Features";
import { HowItWorks } from "@/components/platform/HowItWorks";
import { Integrations } from "@/components/platform/Integrations";
import { PlatformHero } from "@/components/platform/PlatformHero";
import { Setup } from "@/components/platform/Setup";
import { Testimonials } from "@/components/platform/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { faq, meta } from "@/config/pages/platform";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/platform" });

/** Platform page: every front-desk job, the clinic features, integrations, setup, channels and results. */
export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <HowItWorks />
      <Features />
      <Integrations />
      <Setup />
      <Channels />
      <Testimonials />
      <Faq content={faq} />
      <CtaBand />
    </>
  );
}
