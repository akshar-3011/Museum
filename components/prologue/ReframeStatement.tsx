"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BEAT_5_REFRAME } from "@/lib/prologue/content";

export default function ReframeStatement() {
  const [visibleCount, setVisibleCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timers = BEAT_5_REFRAME.map((_, idx) => {
      // Stagger delays: 0ms, 800ms, 1600ms, 2600ms (longer pause), 3600ms, 5800ms
      const delay = idx < 3 ? idx * 800 : idx === 3 ? 2600 : idx === 4 ? 3600 : 5800;
      return setTimeout(() => {
        setVisibleCount(idx + 1);
      }, delay);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        minHeight: "320px", // Reserve height to prevent layout shifts
      }}
    >
      {BEAT_5_REFRAME.slice(0, visibleCount).map((line, index) => {
        const isThesis = index >= 3;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
            animate={{ opacity: index === 5 ? 0.7 : 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-human"
            style={{
              marginBottom: isThesis ? "1.5rem" : "0.75rem",
              lineHeight: 1.8,
              fontSize: index === 3 ? "2.2rem" : "1.6rem",
              color: index === 3 ? "var(--color-accent)" : "var(--color-text-primary)",
              fontWeight: index === 3 ? 400 : 300,
              maxWidth: "500px",
            }}
          >
            {line}
          </motion.div>
        );
      })}
    </div>
  );
}
