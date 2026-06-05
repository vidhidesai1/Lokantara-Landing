"use client";

import { motion } from "framer-motion";
import { Backers } from "./Backers";

export function Hero() {
  return (
    <section id="top" className="wrap">
      <div className="mx-auto flex min-h-[calc(100svh-73px)] w-full flex-col justify-between py-10 text-center max-lg:min-h-[calc(100svh-65px)] max-lg:py-8">
        <div aria-hidden className="h-6 max-lg:h-2" />

        <div className="mx-auto flex max-w-[1180px] flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="m-0 mb-6 font-sans font-extrabold leading-[0.98] text-ink"
            style={{
              fontSize: "clamp(3rem, 7.7vw, 5.8rem)",
              letterSpacing: "-0.035em",
            }}
          >
            Space-native compute
            <br />{" "}
            <span
              className="serif-it text-ochre"
              style={{ letterSpacing: "-0.01em", fontWeight: 400 }}
            >
              for orbit.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="m-0 max-w-[56ch] text-[18px] leading-[1.5] md:text-[21px]"
            style={{ color: "#3A4862" }}
          >
            Lokantara Space is building new hardware for satellites that
            need to reason where data is born — radiation resilient, low power,
            low thermal intelligence for missions that cannot wait on Earth.
          </motion.p>
        </div>

        <Backers embedded />
      </div>
    </section>
  );
}
