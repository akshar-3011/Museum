"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ArchiveVideoFrame from "@/components/exhibits/ArchiveVideoFrame";
import PhotoExhibit from "@/components/room-01/PhotoExhibit";
import { ROOM_03_CONTENT } from "@/lib/rooms/room-03-content";
import { getArtifactToken } from "@/lib/design/artifact-tokens";

export default function SecondaryEvidenceVideo() {
  const [isRevealed, setIsRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const content = ROOM_03_CONTENT.exhibits.secondaryEvidence;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: isRevealed ? "3rem" : "0",
      }}
    >
      {/* Main video */}
      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          flex: "1 1 350px",
        }}
      >
        <ArchiveVideoFrame
          id={content.id}
          src={content.imagePath!}
          tag={content.tag}
          videoRotation={getArtifactToken(content.id).rotation}
        />

        {/* Folded folder tab sticking out from behind the video frame */}
        {!isRevealed && (
          <button
            onClick={() => setIsRevealed(true)}
            aria-expanded={isRevealed}
            aria-label="Observe details tucked behind the video"
            className="font-mono-system"
            style={{
              position: "absolute",
              bottom: "40px",
              right: "-10px",
              backgroundColor: "#dcd2b8",
              border: "1px solid rgba(28, 26, 23, 0.12)",
              borderLeft: "none",
              borderRadius: "0 2px 2px 0",
              padding: "0.3rem 0.6rem",
              fontSize: "0.55rem",
              color: "rgba(28, 26, 23, 0.55)",
              opacity: 0.5,
              cursor: "pointer",
              boxShadow: "1px 1px 3px rgba(0,0,0,0.06)",
              transform: "rotate(1.5deg)",
              transition: "transform 0.2s ease, right 0.2s ease, background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.right = "-12px";
              e.currentTarget.style.backgroundColor = "var(--color-accent)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.right = "-10px";
              e.currentTarget.style.backgroundColor = "#dcd2b8";
              e.currentTarget.style.color = "rgba(28, 26, 23, 0.55)";
              e.currentTarget.style.opacity = "0.5";
            }}
          >
            observe tab
          </button>
        )}
      </motion.div>

      {/* Tucked secret photo */}
      <motion.div
        layout
        initial={false}
        animate={{
          rotate: isRevealed ? -1.8 : 1.4,
          opacity: isRevealed ? 1 : 0,
          scale: isRevealed ? 1 : 0.95,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: isRevealed ? "relative" : "absolute",
          zIndex: isRevealed ? 3 : 1,
          width: "100%",
          maxWidth: "480px",
          flex: "1 1 350px",
          pointerEvents: isRevealed ? "auto" : "none",
        }}
      >
        <PhotoExhibit
          exhibit={{
            id: "secret-03-2",
            title: "Secondary Result",
            copy: content.hiddenText!,
            imagePath: content.secretImagePath!,
          }}
          photoRotation={getArtifactToken("secret-03-2").rotation}
        />
      </motion.div>
    </div>
  );
}
