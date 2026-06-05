"use client";

import { motion } from "framer-motion";
import { ChipPanel } from "./ChipPanel";

const points = [
  {
    title: "Naturally rad-hard",
    body: "Built around physical processes that are far less exposed to charge-driven upset, reducing dependence on heavy shielding.",
    color: "var(--ochre)",
  },
  {
    title: "Power the mission, not the compute",
    body: "Designed to move inference and signal workloads into tiny power envelopes, freeing spacecraft capacity instead of consuming it.",
    color: "var(--rust)",
  },
  {
    title: "Keep it cool, keep it light",
    body: "Less waste heat means less radiator mass, fewer thermal compromises, and more room for the payload that actually matters.",
    color: "var(--teal)",
  },
  {
    title: "No more noise, only signal",
    body: "Turn raw RF, Hyperspectral, EO, SAR and autonomy streams into useful decisions before downlink — low latency processing at the edge.",
    color: "var(--ochre)",
  },
];

export function Product() {
  return (
    <section
      id="what"
      className="wrap pt-16 pb-12 lg:pt-[120px] lg:pb-20"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(280px,0.58fr)_1fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-[390px] lg:mx-0 lg:max-w-[420px]"
        >
          <ChipPanel />
        </motion.div>

        <div>
          <div className="mono mb-6 !text-[12.5px]">Why it matters</div>
          <h2
            className="m-0 font-sans font-extrabold text-ink"
            style={{
              fontSize: "clamp(2.15rem, 4.2vw, 3.65rem)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              textWrap: "balance",
            }}
          >
            The bottleneck in space is not sensing. It's what you can do
            with the data before it leaves orbit.
          </h2>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-7 md:grid-cols-2 lg:mt-16">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="grid grid-cols-[18px_1fr] gap-4 border-t border-hair pt-5"
          >
            <span
              aria-hidden
              className="mt-[7px] block h-[7px] w-[7px] rounded-full"
              style={{
                background: p.color,
                boxShadow: `0 0 20px ${p.color}`,
              }}
            />
            <div>
              <h3 className="m-0 mb-2 text-[17px] font-semibold text-ink">
                {p.title}
              </h3>
              <p
                className="m-0 max-w-[36rem] text-[14.5px] leading-[1.55]"
                style={{ color: "#5a6479" }}
              >
                {p.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
