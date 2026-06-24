"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SystemLogLineProps {
  text: string;
  isDimmed?: boolean;
  opacityOverride?: number;
}

export default function SystemLogLine({
  text,
  isDimmed = false,
  opacityOverride,
}: SystemLogLineProps) {
  const shouldReduceMotion = useReducedMotion();

  // Base opacity from override (e.g. stepping down in Beat 3) or default to 1.0
  const baseOpacity = opacityOverride !== undefined ? opacityOverride : 1.0;
  // If line is dimmed, reduce its active base opacity to 30%
  const targetOpacity = isDimmed ? baseOpacity * 0.3 : baseOpacity;

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
      animate={{ opacity: targetOpacity, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="font-mono-system"
      style={{
        marginBottom: "0.6rem",
        lineHeight: 1.5,
      }}
    >
      {text}
    </motion.div>
  );
}
