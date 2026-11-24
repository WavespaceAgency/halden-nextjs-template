import Image, { type StaticImageData } from "next/image";
import type { ComponentType, CSSProperties } from "react";
import { jobs, type PillTone } from "@/config/pages/home";
import { cn } from "@/lib/utils";
import styles from "./HowItWorks.module.css";

/**
 * The four "How it works" mock-ups (Figma "How it works / Job" variants), drawn at 748×383
 * and scaled by JobTabs. When a job becomes active, pieces with data-ji slide in and pills
 * with data-jp pop in, one after the other (the --jd delays below, in document order).
 */
type Props = { id: string };

const a = jobs.answer;
const s = jobs.schedule;
const v = jobs.verify;
const f = jobs.followUp;

const pill: Record<PillTone, string> = {
  blue: "bg-[#ecf3fe] text-brand-deep",
  sky: "bg-sky-soft text-ink-2",
  mint: "bg-[#dff5f1] text-[#316e60]",
  violet: "bg-[#f0ebfd] text-[#563dbd]",
  grey: "bg-[#f3f4f6] text-[#3f464d]",
};
const glass = "absolute rounded-panel border border-ink-2/7 bg-white/92 shadow-[0_1px_2px_0_rgb(12_26_47/0.05),0_12px_32px_0_rgb(12_26_47/0.07)]";
const pillBase = "shrink-0 rounded-full px-2.5 py-1 text-xs leading-4 font-medium";
const softShadow = "shadow-[0_1px_2px_0_rgb(50_25_4/0.05),0_10px_28px_0_rgb(50_25_4/0.07)]";
const convPos = [
  [412, 42],
  [420, 152],
  [420, 262],
];
const H = "M35.808 19A16.808 16.808 0 1 1 2.192 19a16.808 16.808 0 0 1 33.616 0ZM12.423 10.961v16.077M25.577 10.961v16.077M12.423 19h13.154";
const liveBars = [4, 9, 14, 8, 16, 11, 6];
const channelIcons = [
  "M46.167 34.916H49.5l1.5 3.75-2 1.334a8.58 8.58 0 0 0 4.583 4.583l1.334-2 3.75 1.5v3.333a1.25 1.25 0 0 1-1.25 1.25 13.75 13.75 0 0 1-12.5-12.5 1.25 1.25 0 0 1 1.25-1.25Z",
  "M45.333 36.166h13.334v9.167H49.5l-4.167 3.333v-12.5Z",
  "M59.083 42a7.083 7.083 0 1 1-14.166 0 7.083 7.083 0 0 1 14.166 0ZM44.917 42h14.166M52 34.916c2.083 2.167 2.083 12 0 14.167-2.083-2.167-2.083-12 0-14.167Z",
];

/** Entrance delays: rows (data-ji) from 0.1s, 0.07s apart; pills (data-jp) from 0.35s, 0.08s apart. */
function staggers() {
  let ji = 0;
  let jp = 0;
  return {
    ji: () => ({ "data-ji": "", style: { "--jd": `${(0.1 + ji++ * 0.07).toFixed(2)}s` } as CSSProperties }),
    jp: () => ({ "data-jp": "", style: { "--jd": `${(0.35 + jp++ * 0.08).toFixed(2)}s` } as CSSProperties }),
  };
}

function Avatar({ src, size, className }: { src: StaticImageData; size: number; className: string }) {
  return <Image src={src} alt="" width={size} height={size} className={cn("shrink-0 rounded-full object-cover", className)} />;
}

function Answer() {
  const { ji, jp } = staggers();
  return (
    <>
      <svg className="absolute inset-0" width="748" height="383" viewBox="0 0 748 383" fill="none" strokeLinecap="round">
        <path d="M72 88C150 88 170 192 236 192M316 192C366 192 370 81 420 81" stroke="#0C1A2F" strokeWidth="1.6" />
        <path d="M72 192H236M72 296C150 296 170 192 236 192M316 192C366 192 370 191 420 191M316 192C366 192 370 301 420 301" stroke="#626D76" strokeWidth="1.2" strokeDasharray="1 6" />
      </svg>
      {a.channels.map((label, i) => {
        const { style, ...data } = ji();
        return (
          <div key={label} className="absolute left-6 flex w-12 flex-col items-center gap-1.5" style={{ ...style, top: 64 + i * 104 }} {...data}>
            <span className={cn("flex size-12 items-center justify-center rounded-full", softShadow, i === 0 ? "bg-brand" : "bg-sky-mist opacity-55")}>
              <svg className="size-12" viewBox="28 18 48 48" fill="none" stroke={i === 0 ? "#fff" : "#0C1A2F"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={channelIcons[i]} />
              </svg>
            </span>
            <span className={cn("text-[10px] leading-[13px] font-bold tracking-[0.06em] whitespace-nowrap uppercase", i === 0 ? "text-ink-2" : "text-[#4f5962]")}>{label}</span>
          </div>
        );
      })}
      <div className={cn("absolute top-[152px] left-[236px] flex size-20 items-center justify-center rounded-[24px] bg-[radial-gradient(circle,#fff_35%,#dfebfd)]", softShadow)} {...jp()}>
        <svg className="size-[38px]" viewBox="0 0 38 38" fill="none" stroke="#071A31" strokeWidth="2.338" strokeLinecap="round">
          <path d={H} />
        </svg>
      </div>
      <div className={cn("absolute top-[246px] left-[236px] flex h-[26px] w-20 items-center gap-1.5 rounded-full bg-white px-2.5", softShadow)} {...jp()}>
        <span className={cn(styles.bars, "flex h-4 items-center gap-0.5")}>
          {liveBars.map((h, i) => (
            <span key={i} className="w-[3px] rounded-sm bg-ink-2" style={{ height: h, "--i": i } as CSSProperties} />
          ))}
        </span>
        <span className="text-[11px] leading-[14px] font-medium text-ink-2">{a.live}</span>
      </div>
      <div className="absolute top-1.5 left-[420px] flex w-[316px] justify-between text-[13px] leading-[17px] font-medium text-ink-2" {...ji()}>
        <span>{a.header.title}</span>
        <span>{a.header.meta}</span>
      </div>
      {a.conversations.map((c, i) => {
        const { style, ...data } = ji();
        return (
          <div key={c.name} className="absolute flex h-[78px] w-[316px] items-center gap-3 rounded-panel bg-white px-4" style={{ ...style, left: convPos[i][0], top: convPos[i][1] }} {...data}>
            <Avatar src={c.avatar} size={40} className="size-10" />
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] leading-5 font-medium tracking-[-0.01em] text-ink-2">{c.name}</span>
              <span className={cn("mt-0.5 block text-[13px] leading-[17px]", i === 0 ? "text-[#4f5962]" : "text-[#303a43]")}>{c.text}</span>
            </span>
            <span className={cn(pillBase, i === 0 ? "bg-sky-soft text-ink-2" : "bg-[#f1f6fe] text-ink-2")} {...jp()}>
              {c.status}
            </span>
          </div>
        );
      })}
    </>
  );
}

function Schedule() {
  const { ji, jp } = staggers();
  return (
    <>
      <div className={cn(glass, "top-4 left-0 w-[440px] px-5 pt-[18px] pb-5")} {...ji()}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm leading-[18px] font-medium text-ink-2">
            <Avatar src={s.doctorAvatar} size={22} className="size-[22px] border border-ink-2/6" />
            {s.calendar}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[#e7f5f0] px-2 py-[3px] font-mono text-xs leading-4 font-medium text-[#2f6f61]">
            <span className="size-1.5 rounded-full bg-[#3e887e]" />
            {s.synced}
          </span>
        </div>
        <div className="mt-3.5 grid grid-cols-5 gap-2">
          {s.days.map((day, d) => (
            <div key={day} className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.06em] text-subtle uppercase">{day}</span>
              {s.times.map((t, i) => {
                const state = s.slots[d][i];
                return (
                  <span
                    key={t}
                    className={cn(
                      "rounded-md px-2 py-[7px] font-mono text-[11px] leading-[14px] font-medium",
                      state === 0 && "bg-[#f6f7f9] text-[#656e78]",
                      state === 1 && "border border-[#c9dbfa] bg-white text-[#2457d6]",
                      state === 2 && "bg-brand text-white shadow-[0_4px_10px_0_rgb(43_102_245/0.28)]",
                    )}
                    {...(state === 2 ? jp() : {})}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={cn(glass, "top-10 left-[480px] flex w-[258px] items-center gap-2 py-2.5 pr-3.5 pl-3")} {...ji()}>
        <Avatar src={s.patientAvatar} size={22} className="size-[22px] border border-ink-2/6" />
        <span className="text-[13px] leading-[17px] text-ink-2">{s.quote}</span>
      </div>
      <div className={cn(glass, "top-[210px] left-[420px] flex w-[329px] items-center gap-3 py-3.5 pr-4 pl-3.5")} {...ji()}>
        <Avatar src={s.patientAvatar} size={32} className="size-8 border-[1.5px] border-white" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm leading-[18px] font-medium text-ink-2">{s.booked.title}</span>
          <span className="mt-0.5 block text-xs leading-4 text-subtle">{s.booked.meta}</span>
        </span>
        <span className={cn(pillBase, pill.mint)} {...jp()}>
          {s.booked.status}
        </span>
      </div>
      <div className={cn(glass, "top-[300px] left-[470px] flex w-[266px] items-center gap-2 px-3.5 py-3")} {...ji()}>
        <svg className="size-4 shrink-0" viewBox="0 0 16 16" fill="none">
          <rect width="16" height="16" rx="8" fill="#3E887E" />
          <path d="m3.5 8.25 3 3 6-6.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs leading-4 font-medium whitespace-nowrap text-[#3f464d]">{s.sms}</span>
      </div>
    </>
  );
}

function Verify() {
  const { ji, jp } = staggers();
  return (
    <>
      <div className={cn(glass, "top-2 left-[164px] w-[420px] px-[22px] pt-5 pb-[22px]")} {...ji()}>
        <div className="flex items-center gap-3">
          <Avatar src={v.patient.avatar} size={32} className="size-8 border-[1.5px] border-white" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm leading-[18px] font-medium text-ink-2">{v.patient.name}</span>
            <span className="mt-0.5 block text-xs leading-4 text-subtle">{v.patient.plan}</span>
          </span>
          <span className={cn(pillBase, pill.mint)} {...jp()}>
            {v.patient.status}
          </span>
        </div>
        <div className="my-4 h-px bg-ink-2/8" />
        <ul className="flex flex-col gap-4">
          {v.rows.map((row) => (
            <li key={row.label} className="flex items-center gap-3 text-[13px] leading-[17px]" {...ji()}>
              <svg className="size-[18px] shrink-0" viewBox="0 0 18 18" fill="none">
                <rect width="18" height="18" rx="9" fill="#E3F3EE" />
                <path d="m4.5 9.25 3 3 6-6.5" stroke="#2F7A6F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="flex-1 text-[#3f464d]">{row.label}</span>
              <span className="font-medium text-ink-2">{row.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn(glass, "top-[60px] left-5 flex items-center gap-2 px-3.5 py-2.5")} {...ji()}>
        <span className="size-[7px] rounded-full bg-[#3e887e]" />
        <span className="text-[13px] leading-[17px] font-medium whitespace-nowrap text-ink-2">{v.timer}</span>
      </div>
      <div className={cn(glass, "top-[150px] left-[600px] flex items-center gap-2 px-3.5 py-2.5")} {...ji()}>
        <span className="font-mono text-xs leading-4 font-medium whitespace-nowrap text-subtle">{v.payer.label}</span>
        <span className={cn(pillBase, pill.blue)} {...jp()}>
          {v.payer.status}
        </span>
      </div>
      <div className={cn(glass, "top-[300px] left-[30px] flex items-center gap-2 py-2.5 pr-3.5 pl-[15px]")} {...ji()}>
        <Avatar src={v.patient.avatar} size={20} className="size-5 border border-ink-2/6" />
        <span className="ml-1 text-[13px] leading-[17px] font-medium whitespace-nowrap text-[#3f464d]">{v.note}</span>
      </div>
    </>
  );
}

function FollowUp() {
  const { ji, jp } = staggers();
  return (
    <>
      <ul className="absolute top-3 left-6 flex w-[400px] flex-col gap-3.5">
        {f.timeline.map((item) => (
          <li key={item.title} className={cn(glass, "relative flex items-center gap-3 px-3.5 py-3")} {...ji()}>
            <Avatar src={item.avatar} size={32} className="size-8 border border-ink-2/6" />
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[10px] leading-[13px] font-medium tracking-[0.06em] text-subtle uppercase">{item.tag}</span>
              <span className="mt-[3px] block text-sm leading-[18px] font-medium text-ink-2">{item.title}</span>
              <span className="mt-[3px] block text-xs leading-4 text-subtle">{item.text}</span>
            </span>
            <span className={cn(pillBase, pill[item.tone])} {...jp()}>
              {item.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="absolute top-5 left-[500px] h-[340px] w-[220px] rounded-[32px] border-[6px] border-white/60 bg-ink-2 shadow-[0_1px_2px_0_rgb(12_26_47/0.05),0_12px_32px_0_rgb(12_26_47/0.07)]" {...ji()}>
        <div className="flex h-full flex-col gap-2.5 rounded-[26px] bg-[#f5f7fb] px-4 pt-11 pb-4">
          <span className="font-mono text-[11px] leading-[14px] font-medium text-subtle">{f.phone.sender}</span>
          <span className="w-40 rounded-panel rounded-bl-[4px] bg-white px-3 py-2.5 text-xs leading-[17px] text-ink-2" {...ji()}>
            {f.phone.incoming}
          </span>
          <span className="self-end rounded-[14px_14px_4px_14px] bg-brand px-3.5 py-[7px] text-xs leading-4 font-medium text-white" {...ji()}>
            {f.phone.reply}
          </span>
          <span className="w-40 rounded-panel rounded-bl-[4px] bg-white px-3 py-2.5 text-xs leading-4 font-medium text-[#316e60]" {...ji()}>
            {f.phone.confirmed}
          </span>
        </div>
      </div>
    </>
  );
}

const visuals: Record<string, ComponentType> = { answer: Answer, schedule: Schedule, verify: Verify, "follow-up": FollowUp };

export function JobVisual({ id }: Props) {
  const Visual = visuals[id];
  return <div className="relative h-[383px] w-[748px]">{Visual && <Visual />}</div>;
}
