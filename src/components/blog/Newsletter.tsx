import { blogPage } from "@/config/pages/blog";
import { NewsletterForm } from "./NewsletterForm";

/** "Get new posts in your inbox" card at the end of the blog grid. */
export function Newsletter() {
  const n = blogPage.newsletter;
  return (
    <div className="flex flex-col gap-6 rounded-card bg-sky-soft p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:py-10 lg:pr-10 lg:pl-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-[28px] leading-[1.3] font-medium tracking-[-0.02em] text-ink sm:text-[32px]">
          {n.title}
        </h2>
        <p className="text-base leading-[21px] text-body">{n.description}</p>
      </div>
      <NewsletterForm content={n} />
    </div>
  );
}
