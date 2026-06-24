"use client";

import { motion, useReducedMotion } from "framer-motion";
import ExitWall from "@/components/shared/ExitWall";
import { ROOM_04_CONTENT } from "@/lib/rooms/room-04-content";
import ObservationCabinet from "@/components/room-04/ObservationCabinet";

export default function Room04Page() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "var(--color-text-primary)",
      }}
    >
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.1 : 1.5, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "8rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* ── Room Thesis Header ── */}
        <div style={{ marginBottom: "10rem", maxWidth: "620px", paddingLeft: "2rem" }}>
          <span
            className="font-mono-system"
            style={{
              color: "var(--color-accent)",
              fontSize: "0.7rem",
              display: "block",
              marginBottom: "2rem",
            }}
          >
            {ROOM_04_CONTENT.threshold.roomTag}
          </span>
          <h1
            className="font-serif-human"
            style={{
              fontSize: "2.2rem",
              fontWeight: 300,
              lineHeight: 1.35,
              marginBottom: "1rem",
            }}
          >
            {ROOM_04_CONTENT.threshold.title}
          </h1>
          <p
            className="font-serif-human"
            style={{
              fontSize: "1.1rem",
              color: "rgba(244, 240, 232, 0.7)",
              lineHeight: 1.6,
            }}
          >
            {ROOM_04_CONTENT.threshold.subtitle}
          </p>
        </div>

        {/* ── Room 04 Non-Linear Content: The Cabinet ── */}
        <section style={{ marginBottom: "14rem" }}>
          <ObservationCabinet />
        </section>

        {/* ── Exit Wall ── */}
        <div style={{ marginTop: "14rem" }}>
          <ExitWall
            tag={ROOM_04_CONTENT.exitWall.tag}
            title={ROOM_04_CONTENT.exitWall.title}
            text={ROOM_04_CONTENT.exitWall.text}
            nextRoomLabel={ROOM_04_CONTENT.exitWall.nextRoomLabel}
            nextRoomUrl={ROOM_04_CONTENT.exitWall.nextRoomUrl}
          />
        </div>
      </motion.main>
    </div>
  );
}
