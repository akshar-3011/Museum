"use client";

import { motion } from "framer-motion";

interface SkipAffordanceProps {
  onSkip: () => void;
}

export default function SkipAffordance({ onSkip }: SkipAffordanceProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 100,
      }}
    >
      <button
        onClick={onSkip}
        className="font-mono-system"
        style={{
          background: "none",
          borderBottom: "1px solid transparent",
          color: "var(--color-text-primary)",
          opacity: 0.6,
          cursor: "pointer",
          fontSize: "0.68rem",
          letterSpacing: "0.15em",
          textTransform: "lowercase",
          padding: "0.5rem 1rem",
          minHeight: "var(--touch-target-min)",
          display: "flex",
          alignItems: "center",
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.8";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        aria-label="Skip introduction"
      >
        skip intro
      </button>
    </motion.div>
  );
}
