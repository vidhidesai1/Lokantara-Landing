"use client";

import { motion } from "framer-motion";

type Member = {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  x?: string;
};

const team: Member[] = [
  {
    name: "Tanmay Gupta",
    role: "CEO & Co-founder",
    bio: "Space instrumentation & hardware\nEx-NASA JPL, Caltech, ZEISS, Planet",
    linkedin: "https://www.linkedin.com/in/tanmay-gupta-/",
  },
  {
    name: "Vidhi Desai",
    role: "CTO & Co-founder",
    bio: "Spacecraft systems & machine learning\nEx-Viasat, Cranfield Rocketry",
    linkedin: "https://www.linkedin.com/in/vidhidesai6/",
    x: "https://x.com/_vidhidesai_",
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="wrap pt-12 pb-20 lg:pt-20 lg:pb-[120px]"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
        <motion.figure
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative m-0 overflow-hidden rounded-[8px] border border-hair-2"
          style={{
            boxShadow:
              "0 28px 70px -54px rgba(14,30,54,0.72), inset 0 1px 0 rgba(255,255,255,0.32)",
          }}
        >
          <div className="relative aspect-[1.08/1] min-h-[360px] overflow-hidden sm:aspect-[1.18/1] lg:aspect-[1.04/1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/founders.jpeg"
              alt="Tanmay Gupta and Vidhi Desai, co-founders of Lokantara Space"
              className="h-full w-full object-cover"
              style={{
                filter:
                  "saturate(0.72) contrast(0.98) brightness(1.02) sepia(0.04)",
                objectPosition: "50% 45%",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(250,245,234,0.24) 0%, rgba(250,245,234,0.06) 38%, rgba(14,30,54,0.16) 100%)",
                mixBlendMode: "soft-light",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 76% 18%, rgba(201,154,74,0.16), transparent 34%), linear-gradient(180deg, rgba(14,30,54,0), rgba(14,30,54,0.1))",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(250,245,234,0.58) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
          </div>
        </motion.figure>

        <div>
          <div className="mono mb-8 !text-[12.5px]">Team</div>
          <div className="space-y-0">
            {team.map((member, index) => (
              <Bio key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bio({ member, index }: { member: Member; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="border-t border-hair py-6"
    >
      <div className="mb-3 flex items-start justify-between gap-5">
        <div>
          <h3
            className="m-0 mb-1 text-[21px] font-semibold text-ink sm:text-[24px]"
            style={{ letterSpacing: "-0.025em" }}
          >
            {member.name}
          </h3>
          <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            {member.role}
          </div>
        </div>
        <Socials linkedin={member.linkedin} x={member.x} />
      </div>
      <p className="m-0 max-w-[34rem] whitespace-pre-line text-[14.5px] leading-[1.58] text-[#5a6479]">
        {member.bio}
      </p>
    </motion.article>
  );
}

function Socials({ linkedin, x }: { linkedin: string; x?: string }) {
  const linkClass =
    "h-[34px] w-[34px] inline-flex shrink-0 items-center justify-center rounded-full border border-hair-2 bg-[rgba(255,255,255,0.42)] text-ink transition-all hover:-translate-y-px hover:border-ink/25 hover:bg-ink hover:text-cream";

  return (
    <div className="flex gap-2">
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkClass}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="block h-[14px] w-[14px]"
          aria-hidden
        >
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.55 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.99V22h-4.56v-6.18c0-1.47-.03-3.36-2.05-3.36-2.05 0-2.37 1.6-2.37 3.25V22H7.77V8z" />
        </svg>
      </a>
      {x ? (
        <a
          href={x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className={linkClass}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="block h-[14px] w-[14px]"
            aria-hidden
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      ) : null}
    </div>
  );
}
