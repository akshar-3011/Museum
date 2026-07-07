"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function NameReveal() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        minHeight: "220px",
      }}
    >
      <motion.h1
        initial={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.98,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4, // Screen holds black a beat longer first
        }}
        className="font-serif-human"
        style={{
          fontSize: "3.2rem",
          fontWeight: 400,
          letterSpacing: "0.06em",
          color: "var(--color-accent)",
          lineHeight: 1.2,
          marginBottom: "1.2rem",
        }}
      >
        MANGO
      </motion.h1>

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.75,
        }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 1.2,
        }}
        className="font-mono-system"
        style={{
          fontSize: "1rem",
          letterSpacing: "0.25em",
          color: "var(--color-text-muted)",
          fontWeight: 400,
        }}
      >
        The name that stayed.
      </motion.p>
    </div>
  );
}
