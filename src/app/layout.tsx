import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Motion } from "@/components/motion/Motion";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { fontMono, fontSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.name} Blog` }] } },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

const orgId = `${siteConfig.url}/#organization`;
const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
      logo: absoluteUrl("/icon.svg"),
      email: siteConfig.email,
      sameAs: siteConfig.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": orgId },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `js` is added before first paint so scroll reveals start hidden only when JavaScript runs.
    <html lang="en" className={cn(fontSans.variable, fontMono.variable, "antialiased")} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-canvas">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to Content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={siteLd} />
        <Motion />
        {siteConfig.smoothScroll && <SmoothScroll />}
      </body>
    </html>
  );
}
