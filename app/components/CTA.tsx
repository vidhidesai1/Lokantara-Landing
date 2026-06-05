/**
 * Big footer with annotated Lokantara wordmark, Sanskrit etymology,
 * tagline and a meta strip anchored by an ochre dot.
 */
export function CTA() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        marginTop: 80,
        padding: "96px 0 28px",
      }}
    >
      {/* dot grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(242,235,220,0.05) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      <div
        className="relative flex flex-col items-center"
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 clamp(22px, 6vw, 48px)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 flex justify-center"
          style={{
            zIndex: 0,
            left: "50%",
            width: "100vw",
            transform: "translateX(-50%)",
            overflow: "visible",
          }}
        >
          <div
            className="font-sans inline-flex select-none items-baseline whitespace-nowrap"
            style={{
              fontWeight: 300,
              fontSize: "clamp(74px, 18vw, 260px)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: "rgba(242,235,220,0.02)",
              textShadow: "0 0 64px rgba(242,235,220,0.014)",
            }}
          >
            LOKANTA
            <span
              className="inline-block origin-baseline"
              style={{
                fontWeight: 500,
                transform: "scale(1.08) translateY(0.02em)",
              }}
            >
              र
            </span>
            A
          </div>
        </div>

        {/* annotated wordmark */}
        <div
          className="relative inline-block text-center"
          style={{ zIndex: 1 }}
        >
          {/* Pronunciation row: Devanagari + transliteration + part-of-speech */}
          <div
            className="serif-it"
            style={{
              fontSize: "clamp(34px, 4.6vw, 62px)",
              color: "var(--ochre)",
              marginTop: 8,
              letterSpacing: "0.025em",
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontStyle: "normal",
                // Use a solid pre-blended cream so Devanagari glyph overlaps do
                // not accumulate alpha and appear brighter at joins.
                color: "#d0ccc3",
                letterSpacing: "0.01em",
                fontSize: "1em",
                lineHeight: 1,
              }}
            >
              लोकान्तर
            </span>
            <span
              style={{
                color: "rgba(242,235,220,0.35)",
                fontStyle: "normal",
              }}
            >
              ·
            </span>
            <span style={{ fontSize: "1em", lineHeight: 1 }}>lok·ān·ta·ra</span>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(242,235,220,0.42)",
              marginTop: 12,
            }}
          >
            n. Sanskrit
          </div>

          {/* Etymology notes */}
          <div
            className="relative flex justify-center items-start max-md:flex-col max-md:items-center gap-5 md:gap-[clamp(20px,5vw,80px)]"
            style={{
              marginTop: 28,
              paddingTop: 22,
            }}
          >
            <span
              aria-hidden
              className="absolute hidden md:block"
              style={{
                left: "50%",
                top: 0,
                width: 1,
                height: 10,
                background: "rgba(242,235,220,0.25)",
              }}
            />
            <Annot
              side="left"
              prefix="loka"
              title="world, realm"
            />
            <Annot
              side="right"
              prefix="antara"
              title="the space between"
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className="font-mono"
          style={{
            fontSize: 12.5,
            lineHeight: 1.55,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(242,235,220,0.6)",
            margin: "56px auto 0",
            textAlign: "center",
            maxWidth: "60ch",
          }}
        >
          Bridging the Space between Worlds
        </p>

        {/* Bottom meta with ochre dot anchor */}
        <div
          className="relative w-full flex justify-between items-center max-md:flex-col max-md:items-center max-md:gap-3 max-md:text-center"
          style={{
            paddingTop: 24,
            marginTop: 72,
            borderTop: "1px solid rgba(242,235,220,0.12)",
            color: "rgba(242,235,220,0.5)",
          }}
        >
          <span
            aria-hidden
            className="absolute"
            style={{
              left: "50%",
              top: -5,
              transform: "translateX(-50%)",
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--ochre)",
              boxShadow:
                "0 0 0 5px var(--ink), 0 0 0 6px rgba(242,235,220,0.14)",
            }}
          />
          <a
            href="mailto:founders@lokantara.space"
            className="mono hover:text-ochre transition-colors"
            style={{ color: "rgba(242,235,220,0.85)" }}
          >
            founders@lokantara.space
          </a>
          <span className="mono" style={{ color: "rgba(242,235,220,0.5)" }}>
            © {new Date().getFullYear()} Lokantara Space
          </span>
        </div>
      </div>
    </footer>
  );
}

function Annot({
  side,
  prefix,
  title,
}: {
  side: "left" | "right";
  prefix: string;
  title: string;
}) {
  return (
    <div
      className="max-md:!text-center w-full md:flex-[0_1_280px]"
      style={{
        textAlign: side === "right" ? "right" : "left",
      }}
    >
      <div
        className="serif-it"
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 6,
          whiteSpace: "nowrap",
          fontSize: "clamp(18px, 5vw, 21px)",
          color: "var(--ochre)",
          marginBottom: 0,
        }}
      >
        <span
          className="font-mono"
          style={{
            fontStyle: "normal",
            color: "rgba(242,235,220,0.55)",
            fontSize: 12.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {prefix} —
        </span>
        {title}
      </div>
    </div>
  );
}
