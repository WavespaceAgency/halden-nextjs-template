import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** /manifest.webmanifest */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfbf8",
    theme_color: "#2c67f6",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
