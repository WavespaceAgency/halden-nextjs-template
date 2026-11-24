import type { ReactNode } from "react";
import type { Job } from "@/config/pages/platform";
import { cn } from "@/lib/utils";
import { ScaledCanvas } from "./ScaledCanvas";
import styles from "./HowItWorks.module.css";

const washes = [
  "-left-[200px] -top-[200px] h-[420px] w-[520px] bg-[rgb(156_225_222/0.95)]",
  "-left-[220px] top-[220px] h-[560px] w-[560px] bg-[rgb(123_175_249/0.95)]",
  "left-[250px] top-[420px] h-[300px] w-[520px] bg-[rgb(127_211_203/0.9)]",
  "left-[528px] -top-[80px] h-[520px] w-[560px] bg-[rgb(224_238_160/0.95)]",
  "left-[180px] top-[80px] h-[320px] w-[460px] bg-[rgb(255_255_255/0.7)]",
];

type WashProps = { className?: string };

/** Soft mint / blue / lime colour wash behind the mockups (blurred circles on the 828×520 canvas). */
export function Wash({ className }: WashProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden rounded-card bg-[#ecf7f1]", className)} aria-hidden="true">
      {washes.map((w) => (
        <span key={w} className={cn("absolute rounded-full blur-[90px]", w)} />
      ))}
    </div>
  );
}

type Props = {
  job: Job;
  /** "Live today" pill in the top right corner. */
  status: string;
  /** The job’s mockup (JobAnswer, JobSchedule, …). */
  children: ReactNode;
};

/**
 * One job panel: its own colour wash (hidden on desktop, where a shared wash stays put),
 * the "01 Answer" label, the status pill and the mockup – all on the scaled 828×520 canvas.
 */
export function JobCanvas({ job, status, children }: Props) {
  return (
    <ScaledCanvas>
      <Wash className={styles.ownBg} />
      <div className="absolute top-10 right-10 left-10 flex items-center justify-between" aria-hidden="true">
        <span className="flex items-center gap-3 text-sm leading-[17px] font-medium tracking-[0.02em] text-ink uppercase">
          <span className="h-4 w-0.5 bg-ink" />
          {job.number} {job.label}
        </span>
        <span className="flex h-7 items-center gap-2 rounded-full bg-canvas px-3 text-[13px] leading-4 text-ink">
          <span className={cn(styles.dot, "size-1.5 rounded-full bg-[#6bb1ff]")} />
          {status}
        </span>
      </div>
      <div className={cn(styles.stage, "absolute inset-0")}>{children}</div>
    </ScaledCanvas>
  );
}
