"use client";

import { motion } from "framer-motion";

const backers = [
  { name: "DIHP", sub: "Grant Award · 2026" },
  { name: "Fraunhofer IOF", sub: "Hardware Prototyping · Jena" },
  { name: "Entrepreneurs First", sub: "Deep Tech · 2026 Cohort" },
];

export function Backers({ embedded = false }: { embedded?: boolean }) {
  return (
    <section className={embedded ? "w-full" : "wrap"}>
      <div
        className={`grid grid-cols-1 items-start gap-x-12 gap-y-6 border-y border-hair sm:grid-cols-2 sm:items-center lg:grid-cols-[220px_1fr_1fr_1fr] ${
          embedded ? "py-5" : "mt-[31px] py-6"
        }`}
      >
        <div className="mono">Backed by · Building with</div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="contents"
        >
          {backers.map((b) => (
            <div key={b.name} className="flex flex-col gap-1.5">
              <div className="text-[15px] font-semibold text-ink">{b.name}</div>
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
                {b.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
