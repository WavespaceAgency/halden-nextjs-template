/** Blue check circle (Figma "Check"). Decorative. */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect width="22" height="22" rx="11" className="fill-brand" />
      <path d="M6 11.5 9.5 15 16 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
