/** The Halden mark (exported from Figma). Uses currentColor – set the colour with a text-* class. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M22.615 12c0 5.863-4.752 10.616-10.615 10.616S1.385 17.863 1.385 12 6.137 1.385 12 1.385 22.615 6.137 22.615 12Z"
        stroke="currentColor"
        strokeWidth="1.846"
      />
      <path d="M7.385 6.462v11.077M16.615 6.462v11.077M7.385 12h9.23" stroke="currentColor" strokeWidth="1.846" strokeLinecap="round" />
      <path d="M16.4 8.8a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" fill="currentColor" />
    </svg>
  );
}
