import { SplitText } from "@/components/motion/SplitText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorks } from "@/config/pages/platform";
import { HowItWorksJobs } from "./HowItWorksJobs";
import { JobAnswer } from "./JobAnswer";
import { JobCanvas, Wash } from "./JobCanvas";
import { JobFollowUp } from "./JobFollowUp";
import { JobSchedule } from "./JobSchedule";
import { JobVerify } from "./JobVerify";
import { ScaledCanvas } from "./ScaledCanvas";
import styles from "./HowItWorks.module.css";

const mockups = [JobAnswer, JobSchedule, JobVerify, JobFollowUp];

/**
 * "How it works": four jobs with a product mockup each (Figma 1440×1128, Framer "HowItWorks").
 * The mockups and texts are rendered here on the server; HowItWorksJobs pins the job row while
 * you scroll, cross-fades the jobs and runs the desktop tabs.
 * Mockups are drawn on an 828×520 canvas and scaled down to fit narrower columns.
 */
export function HowItWorks() {
  const h = howItWorks;
  const jobs = h.jobs.map((job, i) => {
    const Mockup = mockups[i];
    return {
      id: job.id,
      number: job.number,
      label: job.label,
      art: (
        <JobCanvas job={job} status={h.status}>
          <Mockup />
        </JobCanvas>
      ),
      detail: (
        <div className={styles.detail}>
          <SplitText as="h3" trigger="load" className="text-h3 font-medium text-ink">
            {job.title}
          </SplitText>
          <SplitText as="p" mode="words" trigger="load" className="mt-2 text-lead text-muted">
            {job.description}
          </SplitText>
        </div>
      ),
    };
  });

  return (
    <section id={h.id} aria-labelledby={`${h.id}-title`} className="bg-canvas">
      <div className="mx-auto max-w-[1360px] px-4 pt-20 pb-20 sm:px-6 lg:px-10 lg:pt-32 lg:pb-32">
        <SectionHeading
          {...h.heading}
          id={`${h.id}-title`}
          align="center"
          animate
          className="[&>p:first-child]:mb-[19px]!"
          descriptionClassName="mt-[19px]! max-w-[620px] text-muted!"
        />
        <HowItWorksJobs
          jobs={jobs}
          tabsLabel={h.tabsLabel}
          background={
            <ScaledCanvas>
              <Wash />
            </ScaledCanvas>
          }
        />
      </div>
    </section>
  );
}
