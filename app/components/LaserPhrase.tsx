"use client";

import { motion, useInView, type Easing } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Reveals its children with a horizontal high-energy sweep.
 */
export function LaserPhrase({
  children,
  duration = 1.2,
}: {
  children: ReactNode;
  duration?: number;
}) {
  const ease: Easing = [0.22, 1, 0.36, 1];
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.55,
    margin: "0px 0px -12% 0px",
  });

  return (
    <span
      ref={ref}
      style={{
        position: "relative",
        display: "inline-block",
        isolation: "isolate",
        whiteSpace: "nowrap",
      }}
    >
      {/* Actual text: clipped closed until the footer scrolls into view. */}
      <motion.span
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.9 }}
        animate={
          inView
            ? {
                clipPath: "inset(0 0% 0 0)",
                opacity: 1,
                textShadow: [
                  "0 0 0 rgba(201,154,74,0)",
                  "0 0 22px rgba(201,154,74,0.95)",
                  "0 0 0 rgba(201,154,74,0)",
                ],
              }
            : undefined
        }
        transition={{
          duration,
          ease,
          textShadow: { duration: duration * 1.05, ease: "easeOut" },
        }}
        style={{
          position: "relative",
          display: "inline-block",
          zIndex: 2,
          willChange: "clip-path, opacity",
        }}
      >
        {children}
      </motion.span>

      {/* Horizontal hot core left behind by the sweep. */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          inView
            ? {
                scaleX: [0, 1, 1],
                opacity: [0, 1, 0],
              }
            : undefined
        }
        transition={{ duration, ease, times: [0, 0.86, 1] }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "0.03em",
          height: "0.12em",
          transformOrigin: "left center",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,245,225,0.8) 18%, var(--ochre) 52%, rgba(255,245,225,0.8) 82%, transparent 100%)",
          boxShadow:
            "0 0 16px rgba(230,180,106,0.95), 0 0 48px rgba(230,180,106,0.45)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Vertical beam riding the reveal edge. */}
      <motion.span
        aria-hidden
        initial={{ left: "0%", opacity: 0 }}
        animate={
          inView
            ? {
                left: "100%",
                opacity: [0, 1, 1, 0],
              }
            : undefined
        }
        transition={{
          duration,
          ease,
          opacity: {
            duration,
            ease: "linear",
            times: [0, 0.08, 0.86, 1],
          },
        }}
        style={{
          position: "absolute",
          top: "-0.5em",
          bottom: "-0.45em",
          width: "4px",
          marginLeft: "-2px",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,245,225,0.9) 25%, var(--ochre) 50%, rgba(255,245,225,0.9) 75%, transparent 100%)",
          boxShadow:
            "0 0 18px rgba(230,180,106,1), 0 0 44px rgba(230,180,106,0.75), 0 0 90px rgba(230,180,106,0.38)",
          pointerEvents: "none",
          willChange: "left, opacity",
          zIndex: 3,
        }}
      />
    </span>
  );
}
