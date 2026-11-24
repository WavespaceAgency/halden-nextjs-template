import { AboutHero } from "@/components/about/AboutHero";
import { History } from "@/components/about/History";
import { Press } from "@/components/about/Press";
import { Story } from "@/components/about/Story";
import { TrustedBy } from "@/components/about/TrustedBy";
import { Values } from "@/components/about/Values";
import { CtaBand } from "@/components/sections/CtaBand";
import { meta } from "@/config/pages/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/about" });

/** About: hero, story, values, company history, clinic names, newest posts and the closing CTA. Text: src/config/pages/about.ts */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <History />
      <TrustedBy />
      <Press />
      <CtaBand />
    </>
  );
}
