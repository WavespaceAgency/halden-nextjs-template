import { Compare } from "@/components/pricing/Compare";
import { Included } from "@/components/pricing/Included";
import { Plans } from "@/components/pricing/Plans";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/security/PageHero";
import { faq, hero, meta } from "@/config/pages/pricing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/pricing" });

/** Pricing page: hero, plan cards, comparison table, what every plan includes, FAQ and the closing CTA. */
export default function PricingPage() {
  return (
    <>
      <PageHero {...hero} descriptionClassName="max-w-[474px]" />
      <Plans />
      <Compare />
      <Included />
      {/* Figma: the pricing FAQ sits on the page colour, not the beige band. */}
      <Faq content={faq} className="bg-canvas" />
      <CtaBand />
    </>
  );
}
