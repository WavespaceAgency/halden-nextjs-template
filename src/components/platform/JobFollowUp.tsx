import { howItWorks } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { mockCard, pillTone, vars } from "./mock";

/** 04 Follow up mockup: automatic messages on the left, the patient’s phone on the right. 828×520 panel coordinates. */
export function JobFollowUp() {
  const f = howItWorks.followUp;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute top-[104px] left-[64px] flex h-[343px] w-[400px] flex-col justify-between" data-a="s" style={vars({ "--i": 0 })}>
        {f.events.map((e, i) => (
          <div key={e.title} className={cn("flex items-center gap-3 py-3 pr-[14px] pl-[14px]", mockCard)}>
            <Avatar src={e.avatar} size={32} className="ring-1 ring-[rgb(12_26_47/0.06)]" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-mono text-[10px] leading-3 font-medium text-subtle uppercase">{e.when}</span>
              <span className="mt-[3px] text-sm leading-[17px] font-medium text-ink-2">{e.title}</span>
              <span className="mt-0.5 text-xs leading-[14px] text-subtle">{e.detail}</span>
            </span>
            <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs leading-[14px] font-medium", pillTone[e.tone])} data-a="p" style={vars({ "--i": i + 1 })}>
              {e.status}
            </span>
          </div>
        ))}
      </div>

      <div
        className="absolute top-[116px] left-[540px] h-[340px] w-[220px] rounded-[32px] bg-ink-2 p-1.5 shadow-[0_1px_2px_0_rgb(12_26_47/0.05),0_12px_32px_-8px_rgb(12_26_47/0.08)]"
        data-a="s"
        style={vars({ "--i": 1 })}
      >
        <div className="flex h-full flex-col gap-2.5 rounded-[26px] bg-[#f5f7fb] px-4 pt-11">
          <span className="font-mono text-[11px] leading-[13px] font-medium text-subtle">{f.phone.sender}</span>
          <span className="w-40 rounded-[16px_16px_16px_4px] bg-white px-3 py-2.5 text-xs leading-[14px] text-ink-2" data-a="x" style={vars({ "--i": 3 })}>
            {f.phone.message}
          </span>
          <span className="flex justify-end" data-a="x" style={vars({ "--i": 5 })}>
            <span className="flex h-7 w-[37px] items-center justify-center rounded-[14px_14px_4px_14px] bg-brand text-xs font-medium text-white">{f.phone.reply}</span>
          </span>
          <span className="w-fit rounded-[16px_16px_16px_4px] bg-white px-3 py-2.5 text-xs leading-[14px] font-medium text-[#316e60]" data-a="x" style={vars({ "--i": 7 })}>
            {f.phone.confirmation}
          </span>
        </div>
      </div>
    </div>
  );
}
