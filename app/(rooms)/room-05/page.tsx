"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";
import { ClosingSequenceProvider, useClosingSequence } from "@/components/room-05/ClosingSequence";

import CaseFile from "@/components/room-05/CaseFile";
import BraceletObject from "@/components/room-05/BraceletObject";
import UnclassifiedItem from "@/components/room-05/UnclassifiedItem";
import RemainTrueStatements from "@/components/room-05/RemainTrueStatements";
import MissingPage from "@/components/room-05/MissingPage";
import dynamic from "next/dynamic";
const HiddenArchiveDrawer = dynamic(() => import("@/components/room-05/HiddenArchiveDrawer"), {
  ssr: false, // it's a hidden interactive element
});

// A wrapper that handles the staggered fade-out during teardown
function TeardownWrapper({ children, teardownDelay }: { children: React.ReactNode; teardownDelay: number }) {
  const { isClosing } = useClosingSequence();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 1.5, 
        delay: isClosing ? teardownDelay : 0, 
        ease: "easeInOut" 
      }}
      style={{ pointerEvents: isClosing ? "none" : "auto", width: "100%", display: "flex", justifyContent: "center" }}
    >
      {children}
    </motion.div>
  );
}

function Room05Content() {
  const { isClosing, initiateClosing } = useClosingSequence();
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
        transition={{ duration: shouldReduceMotion ? 0.1 : 1.5, delay: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "800px", // sparser room, smaller max-width
          margin: "0 auto",
          padding: "8rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* ── Room Thesis Header ── */}
        <TeardownWrapper teardownDelay={2.0}>
          <div style={{ marginBottom: "12rem", width: "100%", maxWidth: "620px" }}>
            <span
              className="font-mono-system"
              style={{
                color: "var(--color-accent)",
                fontSize: "0.7rem",
                display: "block",
                marginBottom: "2rem",
              }}
            >
              {ROOM_05_CONTENT.threshold.roomTag}
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
              {ROOM_05_CONTENT.threshold.title}
            </h1>
            <p
              className="font-serif-human"
              style={{
                fontSize: "1.1rem",
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              {ROOM_05_CONTENT.threshold.subtitle}
            </p>
          </div>
        </TeardownWrapper>

        {/* ── Sparser Exhibits with staggered teardown delays (bottom-up sequence) ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16rem", // increased pacing for reduced visual density
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* Top of room -> fades out late */}
          <TeardownWrapper teardownDelay={1.6}>
            <CaseFile />
          </TeardownWrapper>

          <TeardownWrapper teardownDelay={1.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
              <BraceletObject />
              <UnclassifiedItem />
            </div>
          </TeardownWrapper>

          <TeardownWrapper teardownDelay={0.8}>
            <RemainTrueStatements />
          </TeardownWrapper>

          <TeardownWrapper teardownDelay={0.4}>
            <MissingPage />
          </TeardownWrapper>

          {/* Bottom of room -> fades out first */}
          <TeardownWrapper teardownDelay={0}>
            <HiddenArchiveDrawer />
          </TeardownWrapper>
        </div>

        {/* ── The Close Archive Action ── */}
        <div style={{ marginTop: "16rem", position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <TeardownWrapper teardownDelay={0}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
              
              {/* Pre-button status label — appears before interaction */}
              {!isClosing && (
                <span
                  className="font-mono-system"
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                  }}
                >
                  ARCHIVE STATUS // OPEN
                </span>
              )}

              {/* The ceremonial close button — modeled on the ink stamp motif */}
              {!isClosing && (
                <button
                  onClick={initiateClosing}
                  className="font-mono-system"
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid rgba(171, 60, 45, 0.55)",
                    padding: "1.1rem 3.5rem",
                    color: "rgba(171, 60, 45, 0.85)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.22em",
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(171, 60, 45, 0.06)";
                    e.currentTarget.style.borderColor = "rgba(171, 60, 45, 0.85)";
                    e.currentTarget.style.color = "#ab3c2d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgba(171, 60, 45, 0.55)";
                    e.currentTarget.style.color = "rgba(171, 60, 45, 0.85)";
                  }}
                >
                  CLOSE ARCHIVE
                </button>
              )}

              {/* Post-interaction status — appears after the seal is pressed */}
              {!isClosing && (
                <span
                  className="font-mono-system"
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.18em",
                  }}
                >
                  THIS ACTION CANNOT BE UNDONE
                </span>
              )}
            </div>
          </TeardownWrapper>

          {/* The Ceremonial Stamp (Appears on Close) */}
          <AnimatePresence>
            {isClosing && (
              <motion.div
                initial={{ scale: 2, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: [0, 0.85, 0.85, 0], rotate: -12 }}
                transition={{ 
                  scale: { type: "spring", damping: 14, stiffness: 200 },
                  opacity: { duration: 3.5, times: [0, 0.1, 0.7, 1], ease: "easeInOut" }
                }}
                className="font-mono-system"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  border: "4px solid #ab3c2d",
                  color: "#ab3c2d",
                  padding: "1rem 2.5rem",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  letterSpacing: "0.2em",
                  pointerEvents: "none",
                  zIndex: 50,
                  boxShadow: "0 0 20px rgba(171, 60, 45, 0.2)",
                  textShadow: "0 0 10px rgba(171, 60, 45, 0.3)",
                  transformOrigin: "center center",
                }}
              >
                SEALED
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}

export default function Room05Page() {
  return (
    <ClosingSequenceProvider>
      <Room05Content />
    </ClosingSequenceProvider>
  );
}
