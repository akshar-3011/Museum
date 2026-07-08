"use client";

import { motion } from "framer-motion";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";

export default function FinalScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--color-bg)", // Theme-aware background
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* The final closing line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut", delay: 1 }}
        className="font-serif-human"
        style={{
          color: "var(--color-text-primary)",
          fontSize: "clamp(1rem, 4vw, 1.4rem)",
          letterSpacing: "0.05em",
          textAlign: "center",
          maxWidth: "80%",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
        }}
      >
        {ROOM_05_CONTENT.finalScreen.closingLine}
      </motion.div>

      {/* The archive exhales — one final breath of grain, then silence.
          The grain appears faintly after the text arrives, peaks gently,
          and then fades to nothing as the archive goes still. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 0.10, 0.05, 0],
        }}
        transition={{
          duration: 12,
          delay: 4,
          times: [0, 0.3, 0.5, 0.75, 1],
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          top: "-50%",
          left: "-50%",
          right: "-50%",
          bottom: "-50%",
          width: "200%",
          height: "200%",
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E") repeat`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}
