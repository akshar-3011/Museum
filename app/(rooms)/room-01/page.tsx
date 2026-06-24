"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PhotoExhibit from "@/components/room-01/PhotoExhibit";
import TextExhibit from "@/components/room-01/TextExhibit";
import SecretDiscoveryTrigger from "@/components/room-01/SecretDiscoveryTrigger";
import { EXHIBITS, ROOM_01_HEADER, EXIT_WALL } from "@/lib/room-01/content";
import { getArtifactToken } from "@/lib/design/artifact-tokens";
import ExitWall from "@/components/shared/ExitWall";

export default function Room01Page() {
  const [isThresholdActive, setIsThresholdActive] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // 1.5s threshold window for "opening the archive door"
    const timer = setTimeout(() => {
      setIsThresholdActive(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const thresholdToken = getArtifactToken("threshold");

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
        {isThresholdActive ? (
          /* CINEMATIC ENTRANCE THRESHOLD */
          <motion.div
            key="threshold"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--color-bg)",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
          >
            {/* The folder tag/index card label */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                transform: shouldReduceMotion
                  ? "none"
                  : `rotate(${thresholdToken.rotation})`,
                backgroundColor: "#e8dcbe", // cardstock color
                padding: "1.5rem 2.5rem",
                boxShadow: thresholdToken.shadowDepth,
                border: "1px solid rgba(28, 26, 23, 0.12)",
                borderRadius: "3px 4px 2px 3px",
                maxWidth: "420px",
                width: "100%",
                color: "#1c1a17",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span className="font-mono-system" style={{ fontSize: "0.65rem", opacity: 0.6, color: "inherit" }}>
                {ROOM_01_HEADER.roomTag}
              </span>
              <h2
                className="font-serif-human"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  color: "inherit",
                }}
              >
                {ROOM_01_HEADER.title}
              </h2>
            </motion.div>
          </motion.div>
        ) : (
          /* ACTIVE ROOM DESK CONTAINER */
          <motion.main
            key="room-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: "880px", // Desk boundary box
              margin: "0 auto",
              padding: "6rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
          >
            {/* Header Placard */}
            <div
              style={{
                marginBottom: "7rem",
                maxWidth: "580px",
                alignSelf: "flex-start",
                paddingLeft: "1rem",
              }}
            >
              <span
                className="font-mono-system"
                style={{
                  color: "var(--color-accent)",
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {ROOM_01_HEADER.roomTag}
              </span>
              <h1
                className="font-serif-human"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                  letterSpacing: "0.02em",
                  lineHeight: 1.25,
                }}
              >
                {ROOM_01_HEADER.title}
              </h1>
              <p
                className="font-serif-human"
                style={{
                  fontSize: "1.08rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                {ROOM_01_HEADER.subtitle}
              </p>
            </div>

            {/* Exhibits Grid (Tactile Desk Arrangement) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8rem", // large space between items to read them separately
                width: "100%",
              }}
            >
              {/* Exhibit 01: Hero Photograph (Left-aligned) */}
              <div
                style={{
                  alignSelf: "flex-start",
                  width: "100%",
                  maxWidth: "480px",
                  marginLeft: "1rem",
                }}
              >
                <PhotoExhibit exhibit={EXHIBITS.exhibit1} photoRotation="-2deg" />
              </div>

              {/* Exhibit 02: Field Note (Right-aligned) */}
              <div
                style={{
                  alignSelf: "flex-end",
                  width: "100%",
                  maxWidth: "480px",
                  marginRight: "1rem",
                }}
              >
                <TextExhibit exhibit={EXHIBITS.exhibit2} />
              </div>

              {/* Exhibit 03: Two Names comparative layout (Left-aligned, slightly more indented) */}
              <div
                style={{
                  alignSelf: "flex-start",
                  width: "100%",
                  maxWidth: "480px",
                  marginLeft: "3rem",
                }}
              >
                <TextExhibit exhibit={EXHIBITS.exhibit3} />
              </div>

              {/* Exhibit 04: Transcribed Observation (Right-aligned, clean typewriter card) */}
              <div
                style={{
                  alignSelf: "flex-end",
                  width: "100%",
                  maxWidth: "500px",
                  marginRight: "2rem",
                }}
              >
                <TextExhibit exhibit={EXHIBITS.exhibit4} />
              </div>

              {/* Exhibit 05: Sofa candid + Hidden balcony reveal trigger (Centered on desk) */}
              <div
                style={{
                  alignSelf: "center",
                  width: "100%",
                  maxWidth: "480px",
                  zIndex: 10,
                }}
              >
                <SecretDiscoveryTrigger />
              </div>

              {/* Final Exhibit: Resolution (Straightened, centered, flat) */}
              <div
                style={{
                  alignSelf: "center",
                  width: "100%",
                  maxWidth: "520px",
                  marginTop: "6rem",
                }}
              >
                <PhotoExhibit exhibit={EXHIBITS.final} photoRotation="0deg" />
              </div>
            </div>

            {/* EXIT WALL PLACARD */}
            <div style={{ marginTop: "12rem" }}>
              <ExitWall
                tag={EXIT_WALL.tag}
                title={EXIT_WALL.title}
                text={EXIT_WALL.text}
                nextRoomLabel={EXIT_WALL.nextRoomLabel}
                nextRoomUrl={EXIT_WALL.nextRoomUrl}
              />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
