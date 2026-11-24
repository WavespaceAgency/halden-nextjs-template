import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Compliance } from "@/components/security/Compliance";
import { PageHero } from "@/components/security/PageHero";
import { Privacy } from "@/components/security/Privacy";
import { Standards } from "@/components/security/Standards";
import { faq, hero, meta } from "@/config/pages/security";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: meta.title, description: meta.description, path: "/security" });

/** Security page: hero, standards, privacy tabs, compliance controls, FAQ and the closing CTA. */
export default function SecurityPage() {
  return (
    <>
      <PageHero {...hero} />
      <Standards />
      <Privacy />
      <Compliance />
      <Faq content={faq} />
      <CtaBand />
    </>
  );
}
