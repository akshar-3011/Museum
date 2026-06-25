"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface SlowLineRevealProps {
  lines: { text: string; delay?: number }[];
  baseDelay?: number;
}

export default function SlowLineReveal({ lines, baseDelay = 0 }: SlowLineRevealProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timers = lines.map((line, idx) => {
      // Default to 700ms between lines if not specified (sped up from 1500)
      const lineDelay = line.delay !== undefined ? line.delay : idx * 700;
      return setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, idx + 1));
      }, baseDelay + lineDelay);
    });

    return () => timers.forEach(clearTimeout);
  }, [lines, baseDelay, hasStarted]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        minHeight: `${lines.length * 3}rem`, // Reserve height to prevent layout shift
      }}
    >
      {lines.slice(0, visibleCount).map((line, index) => {
        // Museum signature: older lines dim slightly as new ones appear
        const isDimmed = index < visibleCount - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 6 }}
            animate={{ opacity: isDimmed ? 0.4 : 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-human"
            style={{
              marginBottom: "1rem",
              lineHeight: 1.6,
              fontSize: "1.15rem"
            }}
          >
            {line.text}
          </motion.div>
        );
      })}
    </div>
  );
}
