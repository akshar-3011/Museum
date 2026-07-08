"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ArchiveButtonProps {
  onClick: () => void;
}

export default function ArchiveButton({ onClick }: ArchiveButtonProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [idle, setIdle] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdle = () => {
    setIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIdle(true), 5000);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => setIdle(true), 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={resetIdle}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "4rem",
        marginBottom: "4rem",
      }}
    >
      <motion.button
        animate={idle && !shouldReduceMotion ? { filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"] } : { filter: "brightness(1)" }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        onClick={() => {
          setIsNavigating(true);
          onClick();
        }}
        className="font-mono-system"
        style={{
          background: "none",
          border: "none",
          color: "var(--color-accent)",
          cursor: "pointer",
          padding: "1rem 2.2rem",
          fontSize: "0.8rem",
          letterSpacing: "0.22em",
          fontWeight: 500,
          textTransform: "uppercase",
          transition: "opacity 0.3s ease, border-color 0.3s ease",
          borderBottom: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = "var(--color-accent)";
          e.currentTarget.style.opacity = "0.8";
          resetIdle();
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = "color-mix(in srgb, var(--color-accent) 20%, transparent)";
          e.currentTarget.style.opacity = "1";
        }}
      >
        {isNavigating ? "ACCESSING..." : "OPEN ARCHIVE"}
      </motion.button>
    </motion.div>
  );
}
