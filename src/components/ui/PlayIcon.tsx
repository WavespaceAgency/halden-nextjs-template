import { playIcon } from "@/config/pages/shared";

/** Circle-play icon for "Live Demo" buttons (Figma 18×18). Uses currentColor. */
export function PlayIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d={playIcon.circle} stroke="currentColor" strokeWidth="1.25" />
      <path d={playIcon.triangle} fill="currentColor" />
    </svg>
  );
}
