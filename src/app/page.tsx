import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Platform } from "@/components/home/Platform";
import { Resolved } from "@/components/home/Resolved";
import { Results } from "@/components/home/Results";
import { Security } from "@/components/home/Security";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { faq } from "@/config/pages/home";
import { pageMetadata } from "@/lib/seo";

// No title: the home page uses the default title from app/layout.tsx.
export const metadata = pageMetadata({ path: "/" });

/** Home page. Text and data: src/config/pages/home.ts. Sections: src/components/home/. */
export default function Home() {
  return (
    <>
      <Hero />
      <Resolved />
      <Results />
      <HowItWorks />
      <Platform />
      <Security />
      <Faq content={faq} />
      <CtaBand />
    </>
  );
}
