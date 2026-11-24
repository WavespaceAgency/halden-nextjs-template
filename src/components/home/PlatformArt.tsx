import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { platform } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import styles from "./Platform.module.css";

/**
 * The small HTML mock-ups on the six Platform cards (decorative, drawn at the Figma size).
 * `card` picks the mock-up; Platform.tsx scales it to the card width.
 */
export type PlatformCardKey = keyof typeof platform.cards;

const c = platform.cards;
const badge = "flex shrink-0 items-center justify-center bg-[radial-gradient(circle,#fff_35%,#dfebfd)] shadow-[0_1px_2px_0_rgb(50_25_4/0.05),0_10px_28px_0_rgb(50_25_4/0.07)]";
const shadow = "shadow-[0_1px_2px_0_rgb(50_25_4/0.05),0_10px_28px_0_rgb(50_25_4/0.07)]";
const chip = "rounded-panel bg-canvas";
const nameClass = "block text-[15px] leading-5 font-medium text-ink";
const metaClass = "mt-0.5 block text-[13px] leading-[17px] text-muted";
const logBars = [8, 14, 22, 12, 18, 26, 10, 16, 20, 9, 15, 24, 11, 17];
/** Rules calendar: 6 rows × 5 days. 0 = open, 1 = taken, 2 = cancelled. */
const cal = [
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 2, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
];

/** Halden mark with the sky dot (28 grid). */
function Mark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="#071A31" strokeWidth="2.36" strokeLinecap="round">
      <path d="M26.385 14A12.385 12.385 0 1 1 1.615 14a12.385 12.385 0 0 1 24.77 0Z" />
      <path d="M8.615 7.538v12.924M19.385 7.538v12.924M8.615 14h10.77" />
      <circle cx="19.38" cy="7.53" r="2.8" fill="#C3DFFE" stroke="none" />
    </svg>
  );
}

/** Avatar + name + meta chip. */
function Person({ avatar, name, meta, className, children }: { avatar: StaticImageData; name: string; meta: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn(chip, "flex h-16 items-center gap-3 pr-[18px] pl-3", className)}>
      <Image src={avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
      <span>
        <span className={nameClass}>{name}</span>
        <span className={metaClass}>{meta}</span>
      </span>
      {children}
    </div>
  );
}

function Bars({ widths, className = "bg-line-2" }: { widths: number[]; className?: string }) {
  return widths.map((w) => <span key={w} className={cn("h-2 rounded", className)} style={{ width: w }} />);
}

function Records() {
  return (
    <div className="relative flex h-[230px] w-[394px] items-center">
      <div className="flex h-[190px] w-[150px] flex-col gap-2 rounded-[7px] bg-canvas p-3.5">
        <span className="text-[11px] leading-[14px] font-medium text-ink-2">{c.records.record}</span>
        <Bars widths={[84, 108, 66, 96, 48, 78, 102]} />
      </div>
      <span className={cn(badge, "absolute top-[88px] left-[122px] size-[54px] rounded-panel")}>
        <Mark className="size-7" />
      </span>
      <div className="ml-[44px] flex flex-col gap-2.5">
        <Person avatar={c.records.doctor.avatar} name={c.records.doctor.name} meta={c.records.doctor.time} className={cn("relative w-[200px]", shadow)}>
          <span className={cn("absolute -top-[7.5px] -right-[4px] flex size-[22px] items-center justify-center rounded-full bg-[#6bb1ff]", shadow)}>
            <svg className="size-3" viewBox="7 6 9 8" fill="none" stroke="#FCFBF8" strokeWidth="1.49">
              <path d="M7.45 10.2 9.69 12.45l4.75-4.74" />
            </svg>
          </span>
        </Person>
        <div className={cn(chip, "flex w-[200px] flex-col gap-[7px] px-3.5 pt-3 pb-3.5")}>
          <span className="text-[11px] leading-[14px] font-medium text-ink-2">{c.records.notes}</span>
          <span className="flex flex-col gap-[5px]">
            <Bars widths={[163, 146, 103]} />
          </span>
        </div>
      </div>
    </div>
  );
}

function Language() {
  return (
    <div className="flex w-[356px] flex-col items-center">
      <div className="flex h-[104px] items-center gap-2.5">
        <span className="flex size-[52px] items-center justify-center rounded-full bg-brand-bright">
          <svg className="size-[22px]" viewBox="0 0 22 22" fill="none" stroke="#FCFBF8" strokeWidth="1.46" strokeLinejoin="round">
            <path d="M4.58 3.7h3.66l1.65 4.13-2.2 1.47a10.08 10.08 0 0 0 5.05 5.04l1.46-2.2 4.13 1.65v3.66a1.38 1.38 0 0 1-1.38 1.38A15.13 15.13 0 0 1 3.2 5.08 1.38 1.38 0 0 1 4.58 3.7Z" />
          </svg>
        </span>
        <span className={cn(styles.dash, "w-[54px] text-[#988abf]")} />
        <span className={cn(badge, "size-[104px] rounded-[24px]")}>
          <Mark className="size-[54px]" />
        </span>
        <span className={cn(styles.dash, "w-[54px] text-[#988abf]")} />
        <span className="flex size-[52px] items-center justify-center rounded-full bg-brand text-[15px] leading-5 font-semibold text-canvas">{c.language.code}</span>
      </div>
      <span className={cn(styles.vdash, "h-10 text-[#988abf]")} />
      <div className={cn(chip, "w-[297px] px-[18px] py-3.5")}>
        <span className="block text-[15px] leading-[18px] font-medium tracking-[-0.015em] text-ink">{c.language.quote}</span>
        <span className="mt-1 block text-xs leading-4 text-body">{c.language.meta}</span>
      </div>
    </div>
  );
}

function Handoff() {
  return (
    <div className="flex w-[403px] flex-col items-center">
      <div className="flex items-center gap-2.5">
        <span className={cn(badge, "size-16 rounded-[24px]")}>
          <Mark className="size-8" />
        </span>
        <span className={cn(styles.dash, "w-[22px] text-[#96c4c1]")} />
        <Person avatar={c.handoff.person.avatar} name={c.handoff.person.name} meta={c.handoff.person.topic} className="w-[202px]" />
        <span className={cn(styles.dash, "w-[22px] text-[#96c4c1]")} />
        <span className={cn("flex size-[52px] items-center justify-center rounded-full bg-brand", shadow)}>
          <svg className="size-[22px]" viewBox="0 0 23 23" fill="none" stroke="#FCFBF8" strokeWidth="1.84">
            <path d="m4.6 12.01 4.14 4.14 8.75-8.75" />
          </svg>
        </span>
      </div>
      <span className={cn(styles.vdash, "h-8 text-[#96c4c1]")} />
      <div className={cn(chip, "w-[281px] px-4 py-3")}>
        <span className="flex items-center justify-between">
          <span className="text-[11px] leading-5 font-medium text-ink-2">{c.handoff.summary}</span>
          <span className={cn(styles.ring, "rounded-full bg-[#f6f9e8] px-2 py-[3px] text-[11px] leading-[14px] font-medium text-[#4d5c12]")}>{c.handoff.status}</span>
        </span>
        <span className="mt-2 flex flex-col gap-0.5">
          <Bars widths={[224, 174]} className="bg-[#e6e5e5]" />
        </span>
      </div>
    </div>
  );
}

function Log() {
  return (
    <div className="relative w-[330px]">
      <div className="overflow-hidden rounded-[24px] bg-canvas">
        <div className="flex items-center justify-between border-b border-line px-3.5 py-3">
          <span className="text-xs leading-4 font-medium text-ink-2">{c.log.heading}</span>
          <span className={cn(styles.bars, "flex h-[26px] w-[81px] items-center gap-[3px]")}>
            {logBars.map((h, i) => (
              <span key={i} className="w-[3px] rounded-sm bg-brand-bright" style={{ height: h, "--i": i } as CSSProperties} />
            ))}
          </span>
        </div>
        {c.log.calls.map((call, i) => (
          <div key={call.name} className={cn("flex items-center justify-between px-3.5 py-2.5", i < c.log.calls.length - 1 && "border-b border-line")}>
            <span className="flex items-center gap-2.5 text-[13px] leading-[17px] text-ink">
              <Image src={call.avatar} alt="" width={28} height={28} className="size-7 rounded-full object-cover" />
              {call.name} {call.topic}
            </span>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] leading-[14px]", call.transferred ? "bg-[#f6fae8] text-[#4d5c12]" : "bg-sky-tint text-brand-text")}>
              {call.status}
            </span>
          </div>
        ))}
      </div>
      <span className={cn(badge, "absolute -top-[25.5px] left-[296px] size-14 rounded-panel")}>
        <Mark className="size-7" />
      </span>
    </div>
  );
}

function Rules() {
  return (
    <div className="flex w-[393px] items-center gap-2.5">
      <div className="rounded-xl bg-canvas p-2.5">
        <span className="block h-[7px] w-[63px] rounded bg-[#e6e5e5]" />
        <span className="mt-2.5 grid grid-cols-[repeat(5,18.4px)] gap-x-[3.1px] gap-y-[3px]">
          {cal.flat().map((cell, i) => (
            <span
              key={i}
              className={cn(
                "flex h-[22.1px] items-center justify-center text-[11px] leading-[14px] text-[#c2185b]",
                cell === 0 && "bg-sky-soft",
                cell === 1 && "bg-[#d0d3d8]",
                cell === 2 && "bg-[#e7f0c1]",
              )}
            >
              {cell === 2 ? "×" : ""}
            </span>
          ))}
        </span>
      </div>
      <span className={cn(styles.dash, "w-3.5 text-[#c8cbd1]")} />
      <span className={cn(badge, "size-12 rounded-panel")}>
        <Mark className="size-6" />
      </span>
      <span className={cn(styles.dash, "w-3.5 text-[#c8cbd1]")} />
      <Person avatar={c.rules.doctor.avatar} name={c.rules.doctor.name} meta={c.rules.doctor.time} className="relative w-[152px]">
        <span className="absolute -top-[11.5px] left-[75px] rounded-full bg-[#dfecfd] px-2 py-[3px] text-xs leading-4 font-semibold whitespace-nowrap text-brand-text">{c.rules.filled}</span>
      </Person>
    </div>
  );
}

function Safety() {
  return (
    <div className="flex w-[314px] flex-col items-center">
      <div className={cn(chip, "flex w-[298px] items-center gap-2 px-4 py-3")}>
        <span className={cn(styles.ring, "size-2 shrink-0 rounded-full bg-brand")} />
        <span className="text-sm leading-[18px] whitespace-nowrap text-ink">{c.safety.quote}</span>
      </div>
      <span className={cn(styles.vdash, "h-[30px] text-[#a7a7a5]")} />
      <div className="flex w-full items-center gap-2.5">
        <span className="flex size-[84px] shrink-0 items-center justify-center rounded-[24px] bg-[radial-gradient(circle,#fff_35%,#dfebfd)] shadow-[0_1px_7px_0_rgb(50_25_4/0.05),0_2px_31px_0_rgb(50_25_4/0.05)]">
          <svg className="size-[38px]" viewBox="0 0 38 38" fill="none" stroke="#071A31" strokeWidth="2.37" strokeLinejoin="round">
            <path d="M19 5.25 7.12 10v8.7c0 7.29 5.07 13.15 11.88 15.05 6.8-1.9 11.87-7.76 11.87-15.05V10L19 5.25Z" />
            <path d="m13.93 19.5 3.48 3.48 6.81-6.97" />
          </svg>
        </span>
        <span className={cn(styles.dash, "w-10 text-[#a7a7a5]")} />
        <div className={cn(chip, "flex w-[170px] items-center gap-2.5 py-3 pr-[18px] pl-3")}>
          <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-2", shadow)}>
            <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="#FCFBF8" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 .75v10.5M.75 6h10.5" />
            </svg>
          </span>
          <span>
            <span className={nameClass}>{c.safety.line.name}</span>
            <span className={metaClass}>{c.safety.line.status}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

const arts: Record<PlatformCardKey, () => ReactNode> = { records: Records, language: Language, handoff: Handoff, log: Log, rules: Rules, safety: Safety };

export function PlatformArt({ card }: { card: PlatformCardKey }) {
  const Art = arts[card];
  return <Art />;
}
