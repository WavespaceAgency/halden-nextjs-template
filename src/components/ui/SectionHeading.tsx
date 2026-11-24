import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";
import { Eyebrow, type EyebrowContent } from "./Eyebrow";

export type HeadingContent = {
  eyebrow?: EyebrowContent;
  /** Main heading. Use "\n" for the line breaks from the design. */
  title: string;
  /** Optional second part of the heading, shown in the muted colour (Figma two-tone headings). */
  titleMuted?: string;
  description?: string;
};

type Props = HeadingContent & {
  align?: "left" | "center";
  theme?: "dark" | "light";
  /** Heading level. Use "h1" only once per page. */
  as?: "h1" | "h2";
  /** "h1" = 54px, "h2" = 44px (Figma sizes at 1440). */
  size?: "h1" | "h2";
  /** Letter / word reveal effects on the heading and paragraph. */
  animate?: boolean;
  id?: string;
  className?: string;
  descriptionClassName?: string;
};

/** Eyebrow + heading + paragraph block used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  description,
  align = "left",
  theme = "dark",
  as = "h2",
  size = "h1",
  animate = false,
  id,
  className,
  descriptionClassName,
}: Props) {
  const light = theme === "light";
  const headingClass = cn("font-medium whitespace-pre-line text-balance", size === "h1" ? "text-h1" : "text-h2", light ? "text-canvas" : "text-ink");
  const muted = titleMuted ? <span className={light ? "text-white/60" : "text-muted"}>{titleMuted}</span> : null;
  const descClass = cn("mt-5 max-w-[460px] text-lead", light ? "text-canvas" : "text-body", descriptionClassName);
  const Tag = as;

  return (
    <div className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && <Eyebrow {...eyebrow} theme={theme} className="mb-5" />}
      {animate ? (
        <SplitText as={Tag} id={id} mode="chars" className={headingClass}>
          {title}
          {muted}
        </SplitText>
      ) : (
        <Tag id={id} className={headingClass}>
          {title}
          {muted}
        </Tag>
      )}
      {description &&
        (animate ? (
          <SplitText as="p" mode="words" className={descClass}>
            {description}
          </SplitText>
        ) : (
          <p className={descClass}>{description}</p>
        ))}
    </div>
  );
}
