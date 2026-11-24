import { postPage } from "@/config/pages/blog";
import { cn } from "@/lib/utils";
import { CopyLinkButton } from "./CopyLinkButton";
import styles from "./ShareLinks.module.css";

type Props = {
  /** Absolute URL of the post. */
  url: string;
  title: string;
};

const buttonClass =
  "flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-[background-color,translate] duration-300 hover:bg-sky-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:size-10 lg:border-transparent";

/** LinkedIn / X share links and a "Copy Link" button. */
export function ShareLinks({ url, title }: Props) {
  const fill = (href: string) => href.replace("{url}", encodeURIComponent(url)).replace("{title}", encodeURIComponent(title));
  return (
    <ul className="flex gap-2">
      {postPage.share.map((s) => (
        <li key={s.name}>
          <a href={fill(s.href)} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={cn(styles.button, buttonClass, "text-sm leading-[18px] font-medium")}>
            {s.label}
          </a>
        </li>
      ))}
      <li>
        <CopyLinkButton url={url} label={postPage.copyLink.name} copiedLabel={postPage.copyLink.copied} className={cn(styles.button, buttonClass)} />
      </li>
    </ul>
  );
}
