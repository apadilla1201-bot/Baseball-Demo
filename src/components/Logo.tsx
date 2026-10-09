export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  // Pitcher's rubber on the mound slope. One color, reads at 16px.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect width="32" height="32" fill="currentColor" />
      <rect x="7" y="9" width="12" height="3.2" fill="var(--color-paper)" />
      <path d="M19 12.2 L32 32 L25.5 32 L15.5 12.2 Z" fill="var(--color-paper)" />
    </svg>
  );
}

export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark />
      <span className="leading-none">
        <span className="display block text-[1.45rem] tracking-[-0.01em]">Rivas</span>
        {!compact && (
          <span className="eyebrow block -mt-0.5 text-[0.6rem] tracking-[0.18em] text-stone">
            Pitching Co. · Miami
          </span>
        )}
      </span>
    </span>
  );
}
