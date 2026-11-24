import { howItWorks } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { mockCard, pillTone, vars } from "./mock";
import styles from "./HowItWorks.module.css";

/** 03 Verify mockup: insurance coverage card with the payer response. 828×520 panel coordinates. */
export function JobVerify() {
  const v = howItWorks.verify;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className={cn("absolute top-[104px] left-[204px] w-[420px] px-[21px] pt-[19px] pb-[21px]", mockCard)} data-a="s" style={vars({ "--i": 0 })}>
        <div className="flex items-center gap-3">
          <Avatar src={v.avatar} size={32} className="ring-1 ring-[rgb(12_26_47/0.06)]" />
          <span className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="text-sm leading-[17px] font-medium text-ink-2">{v.patient}</span>
            <span className="text-xs leading-[14px] text-subtle">{v.plan}</span>
          </span>
          <span className={cn("rounded-full px-2.5 py-1 text-xs leading-[14px] font-medium", pillTone.green)} data-a="p" style={vars({ "--i": 1 })}>
            {v.status}
          </span>
        </div>
        <div className="mt-4 h-px bg-[rgb(12_26_47/0.08)]" />
        <ul className="mt-4 flex flex-col gap-4">
          {v.rows.map((row, i) => (
            <li key={row.label} className="flex h-[18px] items-center gap-3" data-a="x" style={vars({ "--i": i + 1 })}>
              <svg className="size-[18px] shrink-0" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="9" fill="#e3f3ee" />
                <path d="M5.5 9.2l2.3 2.3 4.7-4.9" stroke="#2f7a6f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="flex-1 text-[13px] leading-4 text-[#3f464d]">{row.label}</span>
              <span className="text-[13px] leading-4 font-medium text-ink-2">{row.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("absolute top-[156px] left-[60px] flex h-9 items-center gap-2 px-[14px]", mockCard)} data-a="s" style={vars({ "--i": 2 })}>
        <span className={cn(styles.dot, "size-[7px] rounded-full bg-[#3e887e]")} />
        <span className="text-[13px] leading-4 font-medium text-ink-2">{v.timer}</span>
      </div>

      <div className={cn("absolute top-[246px] left-[636px] flex h-[42px] items-center gap-2 px-[14px]", mockCard)} data-a="s" style={vars({ "--i": 3 })}>
        <span className="font-mono text-xs leading-[14px] font-medium text-subtle">{v.api.label}</span>
        <span className={cn("rounded-full px-2.5 py-1 text-xs leading-[14px] font-medium", pillTone.blue)} data-a="p" style={vars({ "--i": 4 })}>
          {v.api.status}
        </span>
      </div>

      <div className={cn("absolute top-[398px] left-[83px] flex h-9 items-center gap-2 px-3", mockCard)} data-a="s" style={vars({ "--i": 6 })}>
        <Avatar src={v.avatar} size={18} className="ring-1 ring-[rgb(12_26_47/0.06)]" />
        <span className="text-[13px] leading-4 font-medium text-[#3f464d]">{v.note}</span>
      </div>
    </div>
  );
}
