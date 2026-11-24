import { howItWorks } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { mockCard, pillTone, vars } from "./mock";
import styles from "./HowItWorks.module.css";

const slotClass = {
  "-": "bg-[#f6f7f9] text-[#656e78]",
  o: "border border-[#c9dbfa] bg-white text-[#2457d6]",
  x: cn(styles.slotBooked, "bg-brand text-white shadow-[0_4px_10px_-2px_rgb(44_103_246/0.28)]"),
} as const;
type Slot = keyof typeof slotClass;

/** 02 Schedule mockup: the provider’s week, the caller’s answer and the booking. 828×520 panel coordinates. */
export function JobSchedule() {
  const s = howItWorks.schedule;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className={cn("absolute top-[112px] left-[40px] w-[440px] px-5 pt-[17px] pb-5", mockCard)} data-a="s" style={vars({ "--i": 0 })}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Avatar src={s.calendarAvatar} size={22} className="ring-1 ring-[rgb(12_26_47/0.06)]" />
            <span className="text-sm leading-[17px] font-medium text-ink-2">{s.calendarTitle}</span>
          </span>
          <span className="flex h-5 items-center gap-1.5 rounded-full bg-[#e7f5f0] px-2">
            <span className={cn(styles.dot, "size-1.5 rounded-full bg-[#3e887e]")} />
            <span className="font-mono text-xs leading-[14px] font-medium text-[#2f6f61]">{s.synced}</span>
          </span>
        </div>
        <div className="mt-[14px] grid grid-cols-5 gap-x-[7.5px]">
          {s.days.map((day, d) => (
            <div key={day} className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] leading-[13px] font-medium text-subtle uppercase">{day}</span>
              {s.times.map((time, t) => (
                <span
                  key={time}
                  className={cn(styles.slot, "flex h-7 items-center rounded-[6px] px-2 font-mono text-[11px] leading-[13px] font-medium", slotClass[(s.slots[d]?.[t] ?? "-") as Slot])}
                >
                  {time}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={cn("absolute top-[136px] left-[520px] flex h-[42px] items-center gap-2 px-3", mockCard)} data-a="s" style={vars({ "--i": 1 })}>
        <Avatar src={s.quoteAvatar} size={22} />
        <span className="text-[13px] leading-4 text-ink-2" data-a="x" style={vars({ "--i": 2 })}>
          {s.quote}
        </span>
      </div>

      <div className={cn("absolute top-[306px] left-[460px] flex h-[61px] w-[326px] items-center gap-3 px-[14px]", mockCard)} data-a="s" style={vars({ "--i": 3 })}>
        <Avatar src={s.booking.avatar} size={32} />
        <span className="flex min-w-0 flex-1 flex-col gap-px">
          <span className="text-sm leading-[17px] font-medium text-ink-2">{s.booking.title}</span>
          <span className="text-xs leading-[14px] text-subtle">{s.booking.detail}</span>
        </span>
        <span className={cn("rounded-full px-2.5 py-1 text-xs leading-[14px] font-medium", pillTone.green)} data-a="p" style={vars({ "--i": 4 })}>
          {s.booking.status}
        </span>
      </div>

      <div className={cn("absolute top-[396px] left-[510px] flex h-10 items-center gap-2 px-[14px]", mockCard)} data-a="s" style={vars({ "--i": 4 })}>
        <svg className="size-4 shrink-0" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="9" fill="#3e887e" />
          <path d="M5.5 9.2l2.3 2.3 4.7-4.9" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs leading-[14px] font-medium text-[#3f464d]" data-a="x" style={vars({ "--i": 5 })}>
          {s.confirmation}
        </span>
      </div>
    </div>
  );
}
