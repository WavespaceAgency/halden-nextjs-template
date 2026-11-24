import { howItWorks } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { Mark } from "./Mark";
import { mockShadow, mockTile, vars } from "./mock";
import styles from "./HowItWorks.module.css";

const channelIcons = [
  "M4.167 2.917H7.5L9 6.667 7 8a9.17 9.17 0 0 0 4.583 4.583l1.334-2 3.75 1.5v3.334a1.25 1.25 0 0 1-1.25 1.25A13.33 13.33 0 0 1 2.917 4.167a1.25 1.25 0 0 1 1.25-1.25Z",
  "M3.333 4.167h13.334v9.166H7.5l-4.167 3.334v-12.5Z",
  "M10 17.083a7.083 7.083 0 1 0 0-14.166 7.083 7.083 0 0 0 0 14.166ZM2.917 10h14.166M10 2.917c2.083 2.166 2.083 12 0 14.166-2.083-2.166-2.083-12 0-14.166Z",
];
const bars = [4, 9, 14, 8, 16, 11, 6];
const channelTop = [160, 264, 368];
const rowPos = [
  { x: 452, y: 138 },
  { x: 460, y: 248 },
  { x: 460, y: 358 },
];
/** Solid lines = the active path, dashed lines flow while the job is on screen. */
const connectors = [
  { d: "M72 88C150 88 170 192 236 192", flow: false },
  { d: "M72 192H236", flow: true },
  { d: "M72 296C150 296 170 192 236 192", flow: true },
  { d: "M316 192C366 192 370 81 420 81", flow: false },
  { d: "M316 192C366 192 370 191 420 191", flow: true },
  { d: "M316 192C366 192 370 301 420 301", flow: true },
];

/**
 * 01 Answer mockup: three channels flow into the Halden hub, which answers three live conversations.
 * Positioned on the 828×520 panel (Figma "How it works / Answer").
 */
export function JobAnswer() {
  const a = howItWorks.answer;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg className="absolute top-[96px] left-[40px] h-[383px] w-[748px]" viewBox="0 0 748 383" fill="none">
        {connectors.map((c) =>
          c.flow ? (
            <path key={c.d} className={styles.flow} d={c.d} stroke="#626D76" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 5" />
          ) : (
            <path key={c.d} d={c.d} stroke="#0C1A2F" strokeWidth="1.6" strokeLinecap="round" />
          ),
        )}
      </svg>

      {a.channels.map((label, i) => (
        <div key={label} className="absolute left-[64px] flex w-12 flex-col items-center gap-1.5" style={vars({ "--i": i }, { top: channelTop[i] })} data-a="s">
          <span className={cn("flex size-12 items-center justify-center rounded-full", mockShadow, i === 0 ? "bg-brand text-white" : "bg-sky-mist text-ink-2 opacity-55")}>
            <svg className="size-5" viewBox="0 0 20 20" fill="none">
              <path d={channelIcons[i]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={cn("text-[10px] leading-3 font-bold tracking-[0.06em] whitespace-nowrap uppercase", i === 0 ? "text-ink-2" : "text-[#4f5962]")}>{label}</span>
        </div>
      ))}

      <div className={cn("absolute top-[248px] left-[276px] flex size-20 items-center justify-center rounded-[24px]", mockTile, mockShadow)} data-a="s" style={vars({ "--i": 3 })}>
        <Mark className="size-[38px] text-ink" stroke={1.48} />
      </div>
      <div className={cn("absolute top-[342px] left-[277px] flex h-[26px] w-20 items-center gap-1.5 rounded-full bg-white px-2.5", mockShadow)} data-a="s" style={vars({ "--i": 4 })}>
        <span className="flex h-4 items-center gap-0.5">
          {bars.map((h, i) => (
            <span key={i} className={cn(styles.bar, "w-[3px] rounded-[2px] bg-ink-2")} style={vars({ "--b": i }, { height: h })} />
          ))}
        </span>
        <span className="text-[11px] leading-[13px] font-medium text-ink-2">{a.live}</span>
      </div>

      <div className="absolute top-[102px] left-[460px] flex w-[316px] justify-between text-[13px] leading-4 font-medium text-ink-2" data-a="s" style={vars({ "--i": 2 })}>
        <span>{a.listTitle}</span>
        <span>{a.listCount}</span>
      </div>

      {a.conversations.map((c, i) => (
        <div
          key={c.title}
          className="absolute flex h-[78px] w-[316px] items-center gap-3 rounded-[16px] bg-white px-4"
          style={vars({ "--i": i + 3 }, { left: rowPos[i].x, top: rowPos[i].y })}
          data-a="s"
        >
          <Avatar src={c.avatar} size={40} />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[15px] leading-[18px] font-medium tracking-[-0.01em] text-ink-2">{c.title}</span>
            <span className={cn("text-[13px] leading-4", i === 0 ? "text-[#4f5962]" : "text-[#303a43]")}>{c.detail}</span>
          </span>
          <span
            className={cn(styles.status, "rounded-full px-2.5 py-1 text-xs leading-[14px] font-medium text-ink-2", i === 0 ? "bg-[#c8defb]" : "bg-[#f1f6fe]")}
            style={vars({ "--b": i })}
          >
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
}
