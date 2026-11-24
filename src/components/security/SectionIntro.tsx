import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow, type EyebrowContent } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: EyebrowContent;
  /** Main heading. "\n" = line break from the design. */
  title: string;
  /** Second part of the heading in the muted colour. */
  titleMuted?: string;
  /** Second part of the heading in the mint accent (dark backgrounds). */
  titleAccent?: string;
  description?: string;
  theme?: "dark" | "light";
  /** Space between eyebrow and heading (Figma: 12px or 16px). */
  gap?: "sm" | "md";
  /** Id of the heading, for the section's aria-labelledby. */
  id: string;
  className?: string;
  descriptionClassName?: string;
};

/**
 * Centred section heading used on the Security and Pricing pages:
 * eyebrow + 54px heading (optional muted / accent second part) + description.
 * The heading letters pop in and the description words un-blur when they scroll into view.
 */
export function SectionIntro({
  eyebrow,
  title,
  titleMuted,
  titleAccent,
  description,
  theme = "dark",
  gap = "md",
  id,
  className,
  descriptionClassName,
}: Props) {
  const light = theme === "light";
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <Eyebrow {...eyebrow} theme={theme} className={gap === "sm" ? "mb-3" : "mb-4"} />
      <SplitText as="h2" id={id} mode="chars" className={cn("text-h1 font-medium text-balance", light ? "text-white" : "text-ink")}>
        {title}
        {titleMuted && <span className="text-subtle">{titleMuted}</span>}
        {titleAccent && <span className="text-[#d0ecdf]">{titleAccent}</span>}
      </SplitText>
      {description && (
        <SplitText as="p" mode="words" className={cn("mt-4 text-lead text-muted", descriptionClassName ?? "max-w-[620px]")}>
          {description}
        </SplitText>
      )}
    </div>
  );
}
