"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BEAT_4_CONFESSIONS } from "@/lib/prologue/content";

export default function ConfessionBlock() {
  const [visibleCount, setVisibleCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timers = BEAT_4_CONFESSIONS.map((line, idx) => {
      return setTimeout(() => {
        setVisibleCount(idx + 1);
      }, line.delay);
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
        alignItems: "flex-start",
        width: "100%",
        minHeight: "380px", // Reserve height to avoid layout shift
      }}
    >
      {BEAT_4_CONFESSIONS.slice(0, visibleCount).map((line, index) => {
        // Dim older lines in the stack to 30% opacity
        const isDimmed = index < visibleCount - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
            animate={{ opacity: isDimmed ? 0.3 : 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-human"
            style={{
              marginBottom: "1rem",
              lineHeight: 1.75,
              fontSize: "1.15rem",
              // Keep lines structured and left-aligned
              paddingLeft: "0",
            }}
          >
            {line.text}
          </motion.div>
        );
      })}
    </div>
  );
}
