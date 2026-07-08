"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";

export default function HiddenArchiveDrawer() {
  const { label, fragments } = ROOM_05_CONTENT.hiddenArchive;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#1c1a17", // Archival drawer dark interior
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "2px",
        padding: "3rem 2rem",
        position: "relative",
        boxShadow: "inset 0 10px 30px rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="font-mono-system"
        style={{
          position: "absolute",
          top: "1rem",
          left: "1.5rem",
          color: "rgba(244, 240, 232, 0.3)",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
        }}
      >
        {label}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", marginTop: "1rem" }}>
        {fragments.map((fragment, idx) => (
          <motion.div
            key={fragment.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.9,
              delay: shouldReduceMotion ? 0 : idx * 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              backgroundColor: "#fdfcf9", // pale fragment paper
              border: "1px solid rgba(28, 26, 23, 0.15)",
              padding: "1rem 1.5rem",
              boxShadow: "2px 4px 10px rgba(0,0,0,0.3)",
              transform: `rotate(${(idx % 2 === 0 ? 1 : -1) * (1 + idx * 0.5)}deg) translateX(${idx % 2 === 0 ? -5 : 5}px)`,
              width: "fit-content",
              alignSelf: idx % 2 === 0 ? "flex-start" : "flex-end",
              maxWidth: "85%",
            }}
          >
            <p
              className="font-typewriter-archival"
              style={{
                fontSize: "0.8rem",
                color: "#2c2a27",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {fragment.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
