import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { SplitText } from "@/components/motion/SplitText";
import { resolved as r } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import { ResolvedStage } from "./ResolvedStage";
import styles from "./Resolved.module.css";

/**
 * "98% of routine calls resolved" (Figma Section 295:15338, 1440×1015).
 * Desktop: photos and mini cards float around the number (the Figma composition, scaled on
 * smaller laptops). With motion allowed they are scroll-linked like the Framer site (ResolvedStage).
 * Phones and tablets show the number and text only (as on Framer).
 */
const photoBox = "absolute overflow-hidden rounded-panel shadow-float";
const card = "absolute rounded-chip px-3.5 py-3";
const check = "M5.375 8.188 7.063 9.875l3.562-3.563";
const logo = "M15.077 8A7.077 7.077 0 1 1 .923 8a7.077 7.077 0 0 1 14.154 0ZM4.923 4.308v7.384M11.077 4.308v7.384M4.923 8h6.154";

function Photo({ src, motion, sizes, style }: { src: StaticImageData; motion: string; sizes: string; style: CSSProperties }) {
  return (
    <div className={photoBox} style={style} data-m={motion}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function CheckDot() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#2C67F6" />
      <path d={check} stroke="#FCFBF8" strokeWidth="1.275" />
    </svg>
  );
}

function HaldenMark() {
  return (
    <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="#071A31" strokeWidth="1.477" strokeLinecap="round" aria-hidden="true">
      <path d={logo} />
    </svg>
  );
}

export function Resolved() {
  return (
    <ResolvedStage className={cn(styles.root, "relative")} labelledBy="resolved-title">
      <div className={cn(styles.stage, "relative overflow-hidden lg:sticky lg:top-[-80px]")}>
        <div className={cn(styles.comp, "relative mx-auto")}>
          <div className={cn(styles.items, "hidden lg:block")} aria-hidden="true">
            <Photo src={r.photos.reader} motion="reader" sizes="156px" style={{ left: 36, top: 290, width: 156, height: 190 }} />

            <div className={`${card} w-[230px] bg-[#eff5fe]`} style={{ left: 158.4, top: 250 }} data-m="callLog">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-[13px] leading-[17px] font-medium text-ink">
                  <svg className="size-[22px]" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <rect width="22" height="22" rx="6" fill="#0069FF" />
                    <path d="M7.5 6.75h2l.9 2.25-1.2.8a5.7 5.7 0 0 0 2.75 2.75l.8-1.2 2.25.9v2a.75.75 0 0 1-.75.75A8.33 8.33 0 0 1 6.75 7.5a.75.75 0 0 1 .75-.75Z" stroke="#FCFBF8" />
                  </svg>
                  {r.callLog.name}
                </span>
                <span className="text-xs leading-4 font-medium tracking-[0.02em] text-brand-text">{r.callLog.time}</span>
              </div>
              <ul className="mt-2.5 flex w-[200px] flex-col gap-2">
                {r.callLog.rows.map((row) => (
                  <li key={row.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] leading-[17px] text-ink">
                      <CheckDot />
                      {row.label}
                    </span>
                    <span className="text-xs leading-4 text-muted">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Photo src={r.photos.family} motion="family" sizes="190px" style={{ left: 648, top: 40, width: 190, height: 132 }} />
            <Photo src={r.photos.hands} motion="hands" sizes="156px" style={{ left: 1197.6, top: 410, width: 156, height: 168 }} />

            <div className={`${card} w-[250px] bg-mint-tint`} style={{ left: 1182.8, top: 360 }} data-m="insurance">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-[13px] leading-[17px] text-ink">
                  <HaldenMark />
                  {r.insurance.title}
                </span>
                <span className="text-xs leading-4 text-body">{r.insurance.date}</span>
              </div>
              <span className="mt-2 inline-block rounded-md bg-[#eff5fe] px-2 py-0.5 text-[11px] leading-[14px] font-medium tracking-[0.02em] text-brand-text">
                {r.insurance.badge}
              </span>
              <div className="mt-2.5 flex justify-between gap-4 rounded-lg bg-canvas px-3 py-2.5">
                <span>
                  <span className="block text-[13px] leading-[17px] text-ink">{r.insurance.plan}</span>
                  <span className="mt-0.5 block text-[11px] leading-[14px] font-medium tracking-[0.02em] text-subtle">{r.insurance.member}</span>
                </span>
                <span className="w-11 text-xs leading-4 font-medium tracking-[0.02em] text-ink">{r.insurance.status}</span>
              </div>
            </div>

            <div className={`${card} w-[250px] bg-lime-tint`} style={{ left: 617.2, top: 707 }} data-m="weekly">
              <p className="flex items-center gap-2 text-[13px] leading-[17px] text-ink">
                <HaldenMark />
                {r.weekly.title}
              </p>
              <ul className="mt-2.5 flex w-[220px] flex-col gap-1">
                {r.weekly.rows.map((row) => (
                  <li key={row.label} className="flex justify-between gap-5 rounded-md bg-canvas px-2.5 py-2 text-xs leading-4">
                    <span className="text-ink">{row.label}</span>
                    <span className={`font-medium tracking-[0.02em] ${row.accent ? "text-brand-text" : "text-body"}`}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn(card, styles.refill, "w-[250px]")} style={{ left: 57.6, top: 737 }} data-m="refill">
              <p className="flex items-center gap-2 text-[13px] leading-[17px] text-ink">
                <CheckDot />
                {r.refill.title}
              </p>
              <p className="mt-1 pl-6 text-xs leading-4 text-muted">{r.refill.meta}</p>
            </div>

            <Photo src={r.photos.corridor} motion="corridor" sizes="112px" style={{ left: 1068.8, top: 120, width: 112, height: 132 }} />
          </div>

          <div className={cn(styles.text, "relative mx-auto flex max-w-[718px] flex-col items-center px-4 text-center")}>
            <p className="text-[64px] leading-[1.1] font-medium tracking-[-0.03em] text-[#2d4ebc] lg:text-[104px]" data-count={r.stat}>
              {r.stat}
            </p>
            <SplitText as="h2" id="resolved-title" className="mt-5 text-h1 font-medium text-balance text-ink">
              {r.title}
            </SplitText>
            <SplitText as="p" mode="words" className="mt-2.5 max-w-[504px] text-lead text-muted">
              {r.description}
            </SplitText>
          </div>
        </div>
      </div>
    </ResolvedStage>
  );
}
