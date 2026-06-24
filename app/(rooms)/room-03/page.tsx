"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import ExitWall from "@/components/shared/ExitWall";
import { ROOM_03_CONTENT } from "@/lib/rooms/room-03-content";

// Room 03 Components
import AtmosphereReport from "@/components/room-03/AtmosphereReport";
import VolumeReductionDocument from "@/components/room-03/VolumeReductionDocument";
import ComfortStudyVideo from "@/components/room-03/ComfortStudyVideo";
import RetentionRecord from "@/components/room-03/RetentionRecord";
import ChangeLog from "@/components/room-03/ChangeLog";
import SecondaryEvidenceVideo from "@/components/room-03/SecondaryEvidenceVideo";

export default function Room03Page() {
  const shouldReduceMotion = useReducedMotion();
  const [showThreshold, setShowThreshold] = useState(true);

  useEffect(() => {
    // 0.6s fade in + 1.2s hold = 1.8s before triggering exit (which takes 0.5s)
    const timer = setTimeout(() => {
      setShowThreshold(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

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
      <AnimatePresence mode="wait">
        {showThreshold ? (
          <motion.div
            key="threshold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <span
              className="font-mono-system"
              style={{
                fontSize: "0.65rem",
                color: "rgba(28,24,18,0.5)",
                letterSpacing: "0.2em",
              }}
            >
              ROOM 03 / FILE 03-A
            </span>
          </motion.div>
        ) : (
          <motion.main
            key="main"
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
            {ROOM_03_CONTENT.threshold.roomTag}
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
            {ROOM_03_CONTENT.threshold.title}
          </h1>
          <p
            className="font-serif-human"
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
            }}
          >
            {ROOM_03_CONTENT.threshold.subtitle}
          </p>
        </div>

        {/* ── Room 03 Content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14rem", // large spacing for museum pacing
            width: "100%",
          }}
        >
          {/* Exhibit 01: Corner-Tab Fold */}
          <section>
            <AtmosphereReport />
          </section>

          {/* Exhibit 02: Margin Note */}
          <section>
            <VolumeReductionDocument />
          </section>

          {/* Exhibit 03: Tucked-Photo */}
          <section>
            <ComfortStudyVideo />
          </section>

          {/* Exhibit 04: Corner-Tab Fold */}
          <section>
            <RetentionRecord />
          </section>

          {/* Exhibit 05: Margin Note */}
          <section>
            <ChangeLog />
          </section>

          {/* Exhibit 06: Tucked-Photo */}
          <section>
            <SecondaryEvidenceVideo />
          </section>
        </div>

        {/* ── Exit Wall ── */}
        <div style={{ marginTop: "14rem" }}>
          <ExitWall
            tag={ROOM_03_CONTENT.exitWall.tag}
            title={ROOM_03_CONTENT.exitWall.title}
            text={ROOM_03_CONTENT.exitWall.text}
            nextRoomLabel={ROOM_03_CONTENT.exitWall.nextRoomLabel}
            nextRoomUrl={ROOM_03_CONTENT.exitWall.nextRoomUrl}
          />
        </div>
      </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
