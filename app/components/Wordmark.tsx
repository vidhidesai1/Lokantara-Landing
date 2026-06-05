export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-sans text-[14px] font-semibold tracking-tight text-ink ${className}`}
    >
      LOKANTA
      <span
        aria-hidden
        className="inline-block origin-baseline"
        style={{ fontWeight: 600, transform: "scale(1.18) translateY(0.03em)" }}
      >
        र
      </span>
      <span className="sr-only">र</span>A
    </span>
  );
}
