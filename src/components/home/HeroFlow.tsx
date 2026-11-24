import type { CSSProperties } from "react";
import { hero } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import { FlowSignals } from "./FlowSignals";
import styles from "./HeroFlow.module.css";

/**
 * Flow diagram in the hero: inputs → three steps → outputs, plus the live call card.
 * Drawn at the Figma size (1248×390) and scaled with --flow-s (set on the hero card) on
 * laptops. Phones and tablets get a compact version (inputs → live call card).
 * The appear sequence is CSS (hero-flow.css); FlowSignals adds the travelling pulses.
 */
const f = hero.flow;
const rows = [48, 96, 144];
const stepX = [236, 506, 776];

/** Framer delays (s), 0.15s later so the diagram follows the heading. */
const at = (s: number) => `${(s + 0.15).toFixed(2)}s`;
const inDelay = [0.3, 0.38, 0.46].map(at);
const stepDelay = [0.62, 0.74, 0.86].map(at);
const outDelay = [0.98, 1.06, 1.14].map(at);

/** Connector paths (Figma coordinates) the pulses travel along: [path, colour, start ms, travel ms]. */
const inPaths = ["M200 66C232.727 66 203.273 115 236 115", "M200 114C232.727 114 203.273 115 236 115", "M200 162C232.727 162 203.273 115 236 115"];
const outPaths = ["M996 115C1041 115 1023 66 1068 66", "M996 115C1041 115 1023 114 1068 114", "M996 115C1041 115 1023 162 1068 162"];
const pulses: [string, string, number, number][] = [
  ...inPaths.map((d, i): [string, string, number, number] => [d, "#7bb0ff", i * 140, 520]),
  ["M456 115H506", "#ffffff", 1100, 380],
  ["M726 115H776", "#ffffff", 1700, 380],
  ...outPaths.map((d, i): [string, string, number, number] => [d, "#c4f08a", 2300 + i * 120, 620]),
];

/** Inline style with the appear delay and start transform. */
const appear = (d: string, from?: string, extra?: CSSProperties) => ({ "--d": d, ...(from ? { "--from": from } : {}), ...extra }) as CSSProperties;

function NodeIcon({ d, color, className = "size-3.5" }: { d: string; color: string; className?: string }) {
  return (
    <svg className={cn(className, "shrink-0")} viewBox="0 0 14 14" fill="none" stroke={color} strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** "Halden is calling Maya" card with the message bubble and reply chips. */
function CallCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={cn(styles.in, styles.glass, "rounded-xl px-4 py-3.5", className)} style={style} data-kind="card">
      <div className="flex items-center gap-2.5">
        <svg className="size-8 shrink-0 overflow-visible" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="16" fill="#2C67F6" />
          <path d="M12.923 12.308v7.384M19.077 12.308v7.384M12.923 16h6.154" stroke="#fff" strokeWidth="1.723" strokeLinecap="round" />
          <circle cx="28" cy="28" r="6" fill="#fff" />
          <circle cx="28" cy="28" r="3" fill="#AADF6F" />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-[17px] text-white">{f.call.name}</p>
          <p className="mt-0.5 text-xs leading-4 text-white/77">{f.call.status}</p>
        </div>
        <span className={cn(styles.live, "font-mono text-[11px] leading-[14px] font-medium text-lime")}>{f.call.live}</span>
      </div>
      <p
        className={cn(styles.in, "mt-3 rounded-[12px_12px_12px_4px] bg-[#c6b9fa] px-[13px] py-[11px] text-sm leading-[19.6px] text-ink-2")}
        style={appear(at(1.55), "translateY(8px) scale(0.97)")}
        data-kind="pop"
      >
        {f.call.message}
      </p>
      <div className="mt-2 flex gap-1.5">
        {f.call.replies.map((r) => (
          <span key={r} className="rounded-full border border-white/25 px-2.5 py-[5px] text-xs leading-4 text-white">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroFlow() {
  return (
    <>
      {/* Desktop: the full diagram. Screen readers get one label for the whole picture. */}
      <div className="relative mt-[calc(132px*var(--flow-s))] hidden h-[calc(390px*var(--flow-s))] lg:block" role="img" aria-label={f.label} data-hero-flow>
        <FlowSignals className="absolute top-0 left-0 h-[390px] w-[1248px] origin-top-left scale-(--flow-s)">
          <svg className={cn(styles.in, "absolute inset-0")} style={appear(at(0.5))} width="1248" height="390" viewBox="0 0 1248 390" fill="none" data-kind="fade">
            <g stroke="#64A0F8" strokeWidth="1.4">
              {inPaths.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <path d="M456 115H506M726 115H776" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
            <g stroke="#AADF6F" strokeWidth="1.4">
              {outPaths.map((d) => (
                <path key={d} d={d} />
              ))}
              <path d="M266 6v90" strokeDasharray="2 4" strokeDashoffset="-1" />
            </g>
            <path d="M266 134v82" stroke="#6EDDC5" strokeWidth="1.4" strokeDasharray="1.95 3.9" />
            <defs>
              <linearGradient id="flow-dot" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#7BAFF9" />
                <stop offset="1" stopColor="#C8DEFB" />
              </linearGradient>
            </defs>
            {rows.map((y) => (
              <circle key={y} cx="1068" cy={y + 18} r="2.5" fill="url(#flow-dot)" />
            ))}
          </svg>

          {pulses.map(([d, c, start, travel]) => (
            <span key={d} className={styles.pulse} style={{ offsetPath: `path("${d}")`, "--c": c } as CSSProperties} data-pulse data-start={start} data-travel={travel} />
          ))}

          <p className={cn(styles.in, "absolute top-0 left-[276px] text-xs leading-[16.8px] whitespace-pre-line text-mint")} style={appear(at(1.05), "translateY(6px)")} data-kind="tween">
            {f.note}
          </p>

          {f.inputs.map((item, i) => (
            <div key={item.label} className={cn(styles.in, styles.node, "absolute left-0 h-9 w-[200px]")} style={appear(inDelay[i], "translateX(-16px)", { top: rows[i] })}>
              <NodeIcon d={item.icon} color="#64A0F8" />
              {item.label}
            </div>
          ))}

          {f.steps.map((item, i) => (
            <div key={item.label} className={cn(styles.in, "absolute top-24 h-[38px] w-[220px]")} style={appear(stepDelay[i], "scale(0.92)", { left: stepX[i] })} data-kind="pop">
              {i > 0 && <span className={styles.flash} style={{ "--c": "#a28cf8" } as CSSProperties} data-flash data-at={[0, 1480, 2080][i]} />}
              <div className={cn(styles.node, i === 0 && styles.active, "size-full")}>
                <NodeIcon d={item.icon} color={i === 0 ? "#6EDDC5" : "#A28CF8"} />
                {item.label}
              </div>
            </div>
          ))}

          {f.outputs.map((item, i) => (
            <div key={item.label} className={cn(styles.in, styles.node, "absolute left-[1068px] h-9 w-[180px]")} style={appear(outDelay[i], "translateX(16px)", { top: rows[i] })}>
              <span className={styles.flash} style={{ "--c": "#aadf6f", "--inset": "-1px" } as CSSProperties} data-flash data-at={2920 + i * 120} />
              <NodeIcon d={item.icon} color="#AADF6F" />
              {item.label}
            </div>
          ))}

          <CallCard className="absolute top-[216px] left-[236px] w-[300px]" style={appear(at(1.25), "translateY(24px) scale(0.96)")} />
        </FlowSignals>
      </div>

      {/* Phones and tablets: inputs → live call card (decorative, the heading says it all). */}
      <div className="mx-auto mt-8 w-full max-w-[360px] lg:hidden" aria-hidden="true" data-hero-flow>
        <div className="flex flex-wrap justify-center gap-1.5">
          {f.inputs.map((item, i) => (
            <div key={item.label} className={cn(styles.in, styles.node, styles.chip, "h-8")} style={appear(at(0.9 + i * 0.08), "translateY(10px) scale(0.92)")} data-kind="pop">
              <NodeIcon d={item.icon} color="#64A0F8" className="size-3" />
              {item.label}
            </div>
          ))}
        </div>
        <div className={cn(styles.in, "mx-auto h-5 w-px border-l border-dashed border-mint/80")} style={appear(at(1.15))} data-kind="fade" />
        <CallCard style={appear(at(1.25), "translateY(24px) scale(0.96)")} />
      </div>
    </>
  );
}
