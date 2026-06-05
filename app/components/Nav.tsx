import { Wordmark } from "./Wordmark";

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-40 border-b border-hair"
      style={{
        background: "var(--cream)",
        backdropFilter: "saturate(140%) blur(6px)",
        WebkitBackdropFilter: "saturate(140%) blur(6px)",
      }}
    >
      <div className="wrap flex items-center justify-between py-[18px]">
        <a href="#top" aria-label="Lokantara Space home">
          <Wordmark />
        </a>
        <a
          href="mailto:founders@lokantara.space"
          className="font-mono text-[11.5px] tracking-[0.06em] text-ink/75 hover:text-ink transition-colors"
        >
          founders@lokantara.space
        </a>
      </div>
    </nav>
  );
}
