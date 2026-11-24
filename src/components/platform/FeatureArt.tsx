import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";
import { features, type FeatureArt as ArtName } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { Mark } from "./Mark";
import { mockShadow, mockTile, vars } from "./mock";
import styles from "./Features.module.css";

/*
 * Small HTML illustrations of the "Built for how clinics work" cards (Figma / Framer "Composition").
 * Children with data-b animate in when the card is in view (Features.module.css):
 *   data-b="up" fade + rise 12px · data-b="pop" scale 0.6 → 1 · data-b="line" grow from the left.
 * Dashed connectors (conn) light up one after another (--c), badges pop back in (--k).
 */

const t = features.art;
const surface = "bg-canvas";
const person = "flex h-16 items-center gap-3 rounded-[16px] bg-canvas px-3";
const dash = cn(styles.conn, "border-dashed opacity-30");
const check = "M4.6 12 8.75 16.15 17.5 7.4";
const bars = [3, 14, 21, 5, 18, 25, 8, 13, 20, 8, 9, 17, 9, 10];
const slotColor = { o: "bg-[#cbdefc]", "-": "bg-[#d0d3d8]", x: "bg-[#e7f0c1]" } as const;

/** Avatar + name + detail chip. */
function Person({ person: p, className }: { person: { name: string; detail: string; avatar: StaticImageData }; className?: string }) {
  return (
    <>
      <Avatar src={p.avatar} size={40} />
      <span className={cn("flex flex-col gap-0.5", className)}>
        <span className="text-[15px] leading-[19px] font-medium text-ink">{p.name}</span>
        <span className="text-[13px] leading-4 text-muted">{p.detail}</span>
      </span>
    </>
  );
}

function CheckBadgeIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none">
      <path d={check} stroke="#fcfbf8" strokeWidth="1.85" />
    </svg>
  );
}

function Records() {
  return (
    <div className="relative h-[190px] w-[394px]">
      <div className={cn("absolute top-0 left-0 h-[190px] w-[150px] rounded-[7px] p-[14px]", surface)} data-b="up" style={vars({ "--i": 0 })}>
        <p className="text-[11px] leading-[14px] font-medium text-ink-2">{t.records.record}</p>
        <div className="mt-2 flex flex-col gap-2">
          {[84, 108, 66, 96, 48, 78, 102].map((w, i) => (
            <span key={i} className="h-2 rounded-[4px] bg-line-2" style={vars({ "--i": i * 0.5 + 1 }, { width: w })} data-b="line" />
          ))}
        </div>
      </div>
      <div
        className={cn("absolute top-[68px] left-[122px] z-10 flex size-[54px] items-center justify-center rounded-[16px]", mockTile, mockShadow)}
        data-b="pop"
        style={vars({ "--i": 2 })}
      >
        <Mark className="size-7 text-ink" stroke={1.9} />
      </div>
      <div className={cn("absolute top-[19px] left-[194px] w-[200px]", person, mockShadow)} data-b="up" style={vars({ "--i": 3 })}>
        <Person person={t.records.person} />
        <span
          className={cn(styles.badge, "absolute -top-[7px] right-[10px] flex size-[22px] items-center justify-center rounded-full bg-[#6bb1ff]", mockShadow)}
          data-b="pop"
          style={vars({ "--i": 5, "--k": 1 })}
        >
          <CheckBadgeIcon className="size-3" />
        </span>
      </div>
      <div className={cn("absolute top-[93px] left-[194px] h-[79px] w-[200px] rounded-[16px] px-[14px] pt-3", surface)} data-b="up" style={vars({ "--i": 4 })}>
        <p className="text-[11px] leading-[14px] font-medium text-ink-2">{t.records.notes}</p>
        <div className="mt-[7px] flex flex-col gap-[5px]">
          {[163, 146, 103].map((w, i) => (
            <span key={i} className="h-2 rounded-[4px] bg-line-2" style={vars({ "--i": i * 0.5 + 5 }, { width: w })} data-b="line" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Language() {
  return (
    <div className="relative h-[210px] w-[356px]">
      <span className="absolute top-[26px] left-0 flex size-[52px] items-center justify-center rounded-full bg-brand-bright" data-b="pop" style={vars({ "--i": 1 })}>
        <svg className="size-[22px]" viewBox="0 0 22 22" fill="none">
          <path
            d="M4.583 3.709H8.25l1.65 4.125-2.2 1.467a10.08 10.08 0 0 0 5.042 5.041l1.466-2.2 4.125 1.65v3.667a1.375 1.375 0 0 1-1.375 1.375A14.67 14.67 0 0 1 3.208 5.084a1.375 1.375 0 0 1 1.375-1.375Z"
            stroke="#fcfbf8"
            strokeWidth="1.467"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={cn("absolute top-[51px] left-[62px] w-[54px] border-t-[3px] border-[#988abf]", dash)} style={vars({ "--c": 0 })} />
      <div className={cn("absolute top-0 left-[126px] flex size-[104px] items-center justify-center rounded-[24px]", mockTile, mockShadow)} data-b="pop" style={vars({ "--i": 0 })}>
        <svg className="size-[54px]" viewBox="0 0 54 54" fill="none">
          <circle cx="27" cy="27.5" r="23.885" stroke="#071A31" strokeWidth="4.569" />
          <path d="M16.615 15.039v24.923M37.385 15.039v24.923M16.615 27.5h20.77" stroke="#071A31" strokeWidth="4.569" strokeLinecap="round" />
          <circle cx="37.4" cy="16.45" r="5.4" fill="#C3DFFE" />
        </svg>
      </div>
      <span className={cn("absolute top-[51px] left-[240px] w-[54px] border-t-[3px] border-[#988abf]", dash)} style={vars({ "--c": 1 })} />
      <span
        className="absolute top-[26px] left-[304px] flex size-[52px] items-center justify-center rounded-full bg-brand text-[15px] leading-[19px] font-semibold text-canvas"
        data-b="pop"
        style={vars({ "--i": 2 })}
      >
        {t.language.badge}
      </span>
      <span className={cn("absolute top-[104px] left-[176px] h-10 border-l-[3px] border-[#988abf]", dash)} style={vars({ "--c": 2 })} />
      <div
        className={cn("absolute top-[144px] left-[29px] flex h-[66px] w-[297px] flex-col justify-center gap-1 rounded-[16px] px-[18px]", surface)}
        data-b="up"
        style={vars({ "--i": 3 })}
      >
        <span className="text-[15px] leading-[19px] font-medium tracking-[-0.015em] text-ink">{t.language.quote}</span>
        <span className="text-xs leading-[15px] text-body">{t.language.detail}</span>
      </div>
    </div>
  );
}

function Handoff() {
  return (
    <div className="relative h-[166px] w-[401px]">
      <div className={cn("absolute top-0 left-0 flex size-16 items-center justify-center rounded-[24px]", mockTile, mockShadow)} data-b="pop" style={vars({ "--i": 0 })}>
        <Mark className="size-8 text-ink" stroke={1.9} />
      </div>
      <span className={cn("absolute top-[31px] left-[74px] w-[22px] border-t-[3px] border-[#96c4c1]", dash)} style={vars({ "--c": 0 })} />
      <div className={cn("absolute top-0 left-[106px] w-[201px]", person)} data-b="up" style={vars({ "--i": 1 })}>
        <Person person={t.handoff.person} />
      </div>
      <span className={cn("absolute top-[31px] left-[317px] w-[22px] border-t-[3px] border-[#96c4c1]", dash)} style={vars({ "--c": 1 })} />
      <span
        className={cn(styles.badge, "absolute top-1.5 left-[349px] flex size-[52px] items-center justify-center rounded-full bg-brand", mockShadow)}
        data-b="pop"
        style={vars({ "--i": 3, "--k": 1.5 })}
      >
        <CheckBadgeIcon className="size-[22px]" />
      </span>
      <span className={cn("absolute top-16 left-[199px] h-8 border-l-[3px] border-[#96c4c1]", dash)} style={vars({ "--c": 2 })} />
      <div className={cn("absolute top-24 left-[60px] h-[70px] w-[281px] rounded-[16px] px-4 pt-3", surface)} data-b="up" style={vars({ "--i": 2 })}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] leading-[14px] font-medium text-ink-2">{t.handoff.summary}</span>
          <span
            className={cn(styles.ring, "flex h-5 items-center rounded-full bg-[#f6f9e8] px-2 text-[11px] leading-[14px] font-medium text-[#4d5c12]")}
            data-b="pop"
            style={vars({ "--i": 4 })}
          >
            {t.handoff.status}
          </span>
        </div>
        <span className="mt-2 block h-2 w-[224px] rounded-[4px] bg-line-2" data-b="line" style={vars({ "--i": 4 })} />
        <span className="mt-0.5 block h-2 w-[174px] rounded-[4px] bg-line-2" data-b="line" style={vars({ "--i": 5 })} />
      </div>
    </div>
  );
}

function Calls() {
  return (
    <div className="relative h-[194px] w-[330px]">
      <div className={cn("absolute inset-0 overflow-hidden rounded-[24px]", surface)}>
        <div className="flex h-[50px] items-center justify-between border-b border-line px-[14px]" data-b="up" style={vars({ "--i": 0 })}>
          <span className="text-xs leading-[15px] font-medium text-ink-2">{t.calls.title}</span>
          <span className="mr-[2px] flex h-[26px] items-center gap-[3px]">
            {bars.map((h, i) => (
              <span key={i} className={cn(styles.bar, "w-[3px] rounded-[2px] bg-brand-bright")} style={vars({ "--b": i }, { height: h })} />
            ))}
          </span>
        </div>
        {t.calls.rows.map((row, i) => (
          <div
            key={row.name}
            className={cn("flex h-12 items-center justify-between px-[14px]", i < t.calls.rows.length - 1 && "border-b border-line")}
            data-b="up"
            style={vars({ "--i": i + 1 })}
          >
            <span className="flex items-center gap-2.5">
              <Avatar src={row.avatar} size={28} />
              <span className="text-[13px] leading-4 text-ink">{row.name}</span>
            </span>
            <span
              className={cn(
                styles.badge,
                "flex h-[18px] items-center rounded-full px-2 text-[11px] leading-[14px]",
                row.tone === "blue" ? "bg-[#eef5ff] text-brand-text" : "bg-[#eef6dc] text-[#4d5c12]",
              )}
              data-b="pop"
              style={vars({ "--i": i + 2, "--k": i })}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
      <div
        className={cn("absolute -top-[26px] left-[296px] flex size-14 items-center justify-center rounded-[16px]", mockTile, mockShadow)}
        data-b="pop"
        style={vars({ "--i": 1 })}
      >
        <Mark className="size-7 text-ink" stroke={1.9} />
      </div>
    </div>
  );
}

function Rules() {
  return (
    <div className="flex h-[184px] w-[392px] items-center gap-2.5">
      <div className={cn("h-[184px] w-[124px] shrink-0 rounded-[12px] p-2.5", surface)} data-b="up" style={vars({ "--i": 0 })}>
        <span className="block h-[7px] w-[63px] rounded-[4px] bg-line-2" />
        <div className="mt-2.5 grid grid-cols-5 gap-x-[3.5px] gap-y-[3px]">
          {t.rules.slots.flatMap((row, r) =>
            [...row].map((s, c) => (
              <span
                key={`${r}-${c}`}
                className={cn("flex h-[22px] items-center justify-center text-[11px] leading-[14px] text-[#c2185b]", slotColor[s as keyof typeof slotColor])}
              >
                {s === "x" ? t.rules.cancelled : null}
              </span>
            )),
          )}
        </div>
      </div>
      <span className={cn("w-3.5 shrink-0 border-t-[3px] border-[#c8cbd1]", dash)} style={vars({ "--c": 0 })} />
      <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-[16px]", mockTile, mockShadow)} data-b="pop" style={vars({ "--i": 1 })}>
        <Mark className="size-6 text-ink" stroke={1.9} />
      </div>
      <span className={cn("w-3.5 shrink-0 border-t-[3px] border-[#c8cbd1]", dash)} style={vars({ "--c": 1 })} />
      <div className={cn("relative w-[152px] shrink-0", person)} data-b="up" style={vars({ "--i": 2 })}>
        <Person person={t.rules.person} />
        <span
          className={cn(
            styles.badge,
            "absolute -top-3 left-[75px] flex h-[21px] items-center rounded-full bg-[#dfecfd] px-2 text-xs leading-[15px] font-semibold whitespace-nowrap text-brand-text",
          )}
          data-b="pop"
          style={vars({ "--i": 4, "--k": 2 })}
        >
          {t.rules.badge}
        </span>
      </div>
    </div>
  );
}

function Safety() {
  return (
    <div className="relative h-[156px] w-[313px]">
      <div className={cn("absolute top-0 left-2 flex h-[42px] w-[298px] items-center gap-2 rounded-[16px] px-4", surface)} data-b="up" style={vars({ "--i": 0 })}>
        <span className={cn(styles.dot, "size-2 shrink-0 rounded-full bg-brand")} />
        <span className="text-sm leading-[18px] whitespace-nowrap text-ink">{t.safety.quote}</span>
      </div>
      <span className={cn("absolute top-[42px] left-[155px] h-[30px] border-l-[3px] border-[#a7a7a5]", dash)} style={vars({ "--c": 0 })} />
      <div
        className={cn(
          "absolute top-[72px] left-0 flex size-[84px] items-center justify-center rounded-[24px] shadow-[0_1px_3.5px_0_rgb(50_25_4/0.05),0_2px_15.5px_0_rgb(50_25_4/0.05)]",
          mockTile,
        )}
        data-b="pop"
        style={vars({ "--i": 1 })}
      >
        <svg className="size-[38px]" viewBox="0 0 38 38" fill="none">
          <path
            d="M19 5.25 7.125 10v8.709c0 7.283 5.067 13.142 11.875 15.041 6.808-1.9 11.875-7.758 11.875-15.041V10L19 5.25Z"
            stroke="#071A31"
            strokeWidth="2.375"
            strokeLinejoin="round"
          />
          <path d="m13.933 19.5 3.484 3.484 6.808-6.967" stroke="#071A31" strokeWidth="2.375" />
        </svg>
      </div>
      <span className={cn("absolute top-[112px] left-[94px] w-10 border-t-[3px] border-[#a7a7a5]", dash)} style={vars({ "--c": 1 })} />
      <div
        className={cn("absolute top-[83px] left-[144px] flex h-[61px] w-[169px] items-center gap-2.5 rounded-[16px] px-3", surface)}
        data-b="up"
        style={vars({ "--i": 2 })}
      >
        <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-2", mockShadow)} data-b="pop" style={vars({ "--i": 3 })}>
          <svg className="size-[18px]" viewBox="0 0 18 18" fill="none">
            <path d="M9 4.25v10.5M3.75 9.5h10.5" stroke="#FCFBF8" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px] leading-[19px] font-medium text-ink">{t.safety.title}</span>
          <span className="text-[13px] leading-4 text-muted">{t.safety.detail}</span>
        </span>
      </div>
    </div>
  );
}

const arts: Record<ArtName, ComponentType> = {
  records: Records,
  language: Language,
  handoff: Handoff,
  calls: Calls,
  rules: Rules,
  safety: Safety,
};

type Props = { art: ArtName };

/** The illustration of one feature card (decorative – the card title and text carry the meaning). */
export function FeatureArt({ art }: Props) {
  const Art = arts[art];
  return (
    <div className={cn(styles.art, "relative shrink-0")} aria-hidden="true">
      <Art />
    </div>
  );
}
