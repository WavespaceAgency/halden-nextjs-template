import { Children, cloneElement, isValidElement, type CSSProperties, type ElementType, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Framer text effects for headings and paragraphs, rendered on the server.
 *   mode="chars"  each letter pops in (scale 0.1 → 1, spring, 0.03s apart) – headings
 *   mode="words"  each word un-blurs and rises 12px (0.025s apart) – paragraphs
 *   trigger="view" plays when half of the element is in view (Motion.tsx adds data-split-play)
 *   trigger="load" plays on first paint in pure CSS – use for text above the fold
 *
 * Children can be plain text with "\n" line breaks and simple inline elements
 * (e.g. <span className="text-muted">…</span> for two-tone headings).
 * With "reduce motion" or without JS the text is shown as normal.
 *
 * Accessibility: in "chars" mode the element gets an aria-label with the plain
 * text and the letter spans are hidden from screen readers. Words stay real
 * text separated by spaces, so "words" mode needs no extra labels.
 */
type Props = {
  as?: ElementType;
  mode?: "chars" | "words";
  trigger?: "view" | "load";
  /** Extra delay in seconds before the first piece starts. */
  delay?: number;
  /** Seconds between pieces (default 0.03 for chars, 0.025 for words). */
  step?: number;
  className?: string;
  id?: string;
  children: ReactNode;
};

type ElementWithChildren = ReactElement<{ children?: ReactNode; className?: string }>;

/** Plain text of a React tree ("\n" becomes a space). */
function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement(node)) return plainText((node as ElementWithChildren).props.children);
  return "";
}

export function SplitText({ as: Tag = "p", mode = "chars", trigger = "view", delay = 0, step: stepProp, className, id, children }: Props) {
  const step = stepProp ?? (mode === "chars" ? 0.03 : 0.025);
  const start = (mode === "chars" ? 0.15 : 0.3) + delay;
  let i = 0;
  let key = 0;

  const splitString = (text: string): ReactNode[] => {
    const out: ReactNode[] = [];
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        if (mode === "chars") i++; // Framer counts spaces in the letter delay
        const breaks = part.split("\n").length - 1;
        if (breaks > 0) for (let b = 0; b < breaks; b++) out.push(<br key={key++} />);
        else out.push(" ");
        continue;
      }
      if (mode === "words") {
        out.push(
          <span key={key++} className="split-w" style={{ "--d": `${(start + i++ * step).toFixed(3)}s` } as CSSProperties}>
            {part}
          </span>,
        );
      } else {
        out.push(
          <span key={key++} className="split-word">
            {Array.from(part).map((ch) => (
              <span key={key++} className="split-c" style={{ "--d": `${(start + i++ * step).toFixed(3)}s` } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>,
        );
      }
    }
    return out;
  };

  const walk = (node: ReactNode): ReactNode => {
    if (typeof node === "string" || typeof node === "number") return splitString(String(node));
    if (Array.isArray(node)) return node.map(walk);
    if (isValidElement(node)) {
      const el = node as ElementWithChildren;
      return cloneElement(el, { key: key++ }, ...Children.toArray(el.props.children).map(walk));
    }
    return node;
  };

  const label = plainText(children).replace(/\s+/g, " ").trim();
  const pieces = walk(children);
  // Headings can carry an aria-label; other elements (p, span) get a visually hidden copy instead.
  const isHeading = typeof Tag === "string" && /^h[1-6]$/.test(Tag);

  if (mode === "words") {
    return (
      <Tag id={id} className={cn(className)} data-split={mode} data-trigger={trigger}>
        {pieces}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={cn(className)} data-split={mode} data-trigger={trigger} {...(isHeading ? { "aria-label": label } : {})}>
      {!isHeading && <span className="sr-only">{label}</span>}
      <span aria-hidden="true">{pieces}</span>
    </Tag>
  );
}
