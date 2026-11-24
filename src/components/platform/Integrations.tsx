import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrations } from "@/config/pages/platform";
import { IntegrationsMarquee } from "./IntegrationsMarquee";

/**
 * Integrations: heading + two endless rows of integration cards (Figma 1440×714).
 * The footer links here (`/platform#integrations`), so keep the id in the config.
 */
export function Integrations() {
  const c = integrations;
  return (
    <section id={c.id} aria-labelledby={`${c.id}-title`} className="bg-canvas py-20 lg:py-[120px]">
      <div className="px-4 sm:px-6">
        <SectionHeading
          {...c.heading}
          id={`${c.id}-title`}
          align="center"
          animate
          className="[&>p:first-child]:mb-4!"
          descriptionClassName="mt-4! max-w-[546px] text-muted!"
        />
      </div>
      <IntegrationsMarquee rows={c.rows} speed={c.speed} listLabel={c.listLabel} pauseLabel={c.pauseLabel} playLabel={c.playLabel} />
    </section>
  );
}
