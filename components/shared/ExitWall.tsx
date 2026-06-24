"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export interface ExitWallProps {
  tag: string;
  title: string;
  text: string;
  nextRoomLabel: string;
  nextRoomUrl: string;
}

export default function ExitWall({ tag, title, text, nextRoomLabel, nextRoomUrl }: ExitWallProps) {
  const shouldReduceMotion = useReducedMotion();
  const lines = text.split("\n");

  return (
    <div
      style={{
        paddingTop: "6rem",
        borderTop: "1px solid rgba(244, 240, 232, 0.1)",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.span
        className="font-mono-system"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          color: "var(--color-text-muted)",
          fontSize: "0.72rem",
          marginBottom: "1.2rem",
        }}
      >
        {tag}
      </motion.span>
      <motion.h2
        className="font-serif-human"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{
          fontSize: "2rem",
          fontWeight: 300,
          marginBottom: "1.5rem",
          color: "var(--color-accent)",
          lineHeight: 1.2,
        }}
      >
        {title}
      </motion.h2>
      <div
        className="font-serif-human"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-text-muted)",
          letterSpacing: "0.15em",
          lineHeight: 1.7,
          marginBottom: "3.5rem",
          maxWidth: "480px",
        }}
      >
        {lines.map((line, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.0 + index * 0.4,
            }}
            style={{ display: "block", minHeight: line.trim() === "" ? "1.7rem" : "auto" }}
          >
            {line}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.5 + lines.length * 0.2 }}
      >
        <Link
          href={nextRoomUrl}
          className="font-mono-system"
          style={{
            display: "inline-block",
            padding: "0.8rem 2rem",
            fontSize: "0.75rem",
            color: "var(--color-accent)",
            border: "1px solid rgba(217, 160, 91, 0.3)",
            borderRadius: "2px",
            letterSpacing: "0.15em",
            transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-bg)";
            e.currentTarget.style.borderColor = "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--color-accent)";
            e.currentTarget.style.borderColor = "rgba(217, 160, 91, 0.3)";
          }}
        >
          {nextRoomLabel}
        </Link>
      </motion.div>
    </div>
  );
}
