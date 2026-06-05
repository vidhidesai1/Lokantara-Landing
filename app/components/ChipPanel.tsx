"use client";

import { motion } from "framer-motion";

/**
 * Abstract orbital scan visual for the public landing page.
 * It feels like a mission image, but deliberately avoids exposing the
 * underlying compute architecture.
 */
export function ChipPanel() {
  return (
    <div className="relative w-full">
      <div
        className="relative overflow-hidden rounded-2xl border border-hair-2"
        style={{
          background:
            "radial-gradient(100% 90% at 22% 18%, rgba(201,154,74,0.18) 0%, transparent 42%), linear-gradient(145deg, #102033 0%, #0b1928 58%, #06111d 100%)",
          aspectRatio: "1 / 1.02",
          boxShadow:
            "0 34px 90px -34px rgba(0,0,0,0.82), inset 0 1px 0 rgba(242,235,220,0.08)",
        }}
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span>LKN-O1 · MISSION WINDOW</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ochre" />
            LEO PASS 04
          </span>
        </div>

        <OrbitalScan />

        <div className="absolute inset-x-5 bottom-0 z-10 px-2 py-4 text-center font-mono text-[8.5px] uppercase tracking-[0.12em] text-[rgba(242,235,220,0.48)] sm:text-[9.5px] sm:tracking-[0.14em]">
          <span className="whitespace-nowrap">
            rad-hard · low power · low thermal · low latency
          </span>
        </div>
      </div>
    </div>
  );
}

function OrbitalScan() {
  const scanPath =
    "M 74 470 C 176 330, 338 250, 574 250 C 654 250, 724 268, 792 304";
  const horizonPath =
    "M -42 468 C 122 356, 342 314, 728 418";
  const shadowPath =
    "M -20 514 C 170 432, 384 430, 744 548 L 744 760 L -20 760 Z";

  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 720 720"
      fill="none"
    >
      <defs>
        <linearGradient id="scan-horizon" x1="56" x2="692" y1="364" y2="512">
          <stop offset="0%" stopColor="#C99A4A" stopOpacity="0" />
          <stop offset="38%" stopColor="#C99A4A" stopOpacity="0.72" />
          <stop offset="68%" stopColor="#2F7A7A" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#2F7A7A" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="earth-shadow" x1="142" x2="552" y1="400" y2="704">
          <stop offset="0%" stopColor="#F2EBDC" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#2F7A7A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#07111C" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id="scan-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#C99A4A" stopOpacity="0" />
          <stop offset="44%" stopColor="#C99A4A" stopOpacity="0.86" />
          <stop offset="74%" stopColor="#F2EBDC" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#2F7A7A" stopOpacity="0" />
        </linearGradient>
        <filter id="scan-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="fine-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="8"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.14" />
          </feComponentTransfer>
        </filter>
        <clipPath id="swath-clip">
          <path d="M 152 164 L 648 316 L 492 626 L -4 474 Z" />
        </clipPath>
      </defs>

      <rect width="720" height="720" fill="transparent" />
      <rect width="720" height="720" filter="url(#fine-noise)" opacity="0.4" />

      {[
        [96, 138, 1.1, 0.32],
        [162, 82, 0.9, 0.28],
        [640, 104, 1.2, 0.36],
        [612, 514, 1, 0.22],
        [428, 112, 0.8, 0.25],
        [280, 196, 1, 0.3],
      ].map(([cx, cy, r, opacity]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="#F2EBDC"
          opacity={opacity}
        />
      ))}

      <path d={shadowPath} fill="url(#earth-shadow)" />
      <path
        d={horizonPath}
        stroke="url(#scan-horizon)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#scan-glow)"
      />

      <g clipPath="url(#swath-clip)">
        <path
          d="M 118 198 L 670 368 L 504 636 L -48 466 Z"
          fill="rgba(242,235,220,0.035)"
        />
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.path
            key={`swath-${i}`}
            d={`M ${-60 + i * 48} 510 L ${164 + i * 48} 116`}
            stroke="#F2EBDC"
            strokeOpacity={i % 4 === 0 ? 0.16 : 0.06}
            strokeWidth={i % 4 === 0 ? 1.2 : 0.8}
            animate={{ opacity: [0.28, 0.72, 0.28] }}
            transition={{
              duration: 5.2,
              delay: i * 0.08,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <path
            key={`terrain-${i}`}
            d={`M ${-20 + i * 72} 628 C ${48 + i * 72} 572, ${52 + i * 72} 496, ${120 + i * 72} 438`}
            stroke={i % 2 === 0 ? "#2F7A7A" : "#C99A4A"}
            strokeOpacity="0.08"
          />
        ))}
      </g>

      <path
        d={scanPath}
        stroke="#F2EBDC"
        strokeOpacity="0.11"
        strokeWidth="1"
        strokeDasharray="3 8"
      />
      <motion.path
        d={scanPath}
        stroke="url(#scan-beam)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="74 760"
        initial={{ strokeDashoffset: 0, opacity: 0.24 }}
        animate={{ strokeDashoffset: [0, -834], opacity: [0.12, 0.52, 0.12] }}
        transition={{ duration: 9.6, repeat: Infinity, ease: "linear" }}
        filter="url(#scan-glow)"
      />

      <motion.g
        initial={{ opacity: 0.64, x: 0, y: 0 }}
        animate={{ opacity: [0.5, 0.86, 0.5], x: [0, -7, 0], y: [0, 5, 0] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M 548 182 L 586 196 L 552 214 L 514 200 Z"
          fill="rgba(242,235,220,0.14)"
          stroke="rgba(242,235,220,0.22)"
        />
        <path
          d="M 552 214 L 546 252 M 586 196 L 620 184 M 514 200 L 480 186"
          stroke="rgba(242,235,220,0.18)"
          strokeLinecap="round"
        />
        <motion.path
          d="M 552 214 L 478 426"
          stroke="#C99A4A"
          strokeOpacity="0.42"
          strokeWidth="1"
          strokeDasharray="4 7"
          animate={{ opacity: [0.18, 0.56, 0.18] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      <motion.circle
        cx="552"
        cy="214"
        r="5"
        fill="#C99A4A"
        filter="url(#scan-glow)"
        animate={{ scale: [0.8, 1.38, 0.8], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <path
        d="M 66 120 H 154 M 66 600 H 154 M 566 120 H 654 M 566 600 H 654"
        stroke="#F2EBDC"
        strokeOpacity="0.1"
      />
      <path
        d="M 66 120 V 208 M 654 120 V 208 M 66 512 V 600 M 654 512 V 600"
        stroke="#F2EBDC"
        strokeOpacity="0.1"
      />
    </svg>
  );
}
