"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import PhotoExhibit from "@/components/room-01/PhotoExhibit";
import ArchiveVideoFrame from "@/components/exhibits/ArchiveVideoFrame";
import { ObservationContent } from "@/lib/rooms/room-04-content";

interface ObservationDetailProps {
  observation: ObservationContent;
  onClose: () => void;
}

import React from "react";

const ObservationDetail = React.memo(function ObservationDetail({ observation, onClose }: ObservationDetailProps) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const exhibitContent = {
    id: observation.id,
    title: observation.title,
    tag: observation.tag,
    copy: observation.copy,
    imagePath: observation.assetType === "photo" ? observation.assetPath : undefined,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(8, 7, 6, 0.95)", // deep shadow backdrop
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center", // fallback for short content
        justifyContent: "center",
        padding: "4rem 2rem 2rem 2rem", // extra top padding for the fixed close button
        overflowY: "auto",
      }}
      onClick={onClose} // Clicking backdrop closes it
    >
      <motion.div
        initial={{ y: 80, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.95, opacity: 0 }}
        // Heavy wooden friction and mass:
        // delay adds the "stickiness/inertia" before moving
        // high mass + stiff spring + high damping = heavy sluggish slide and a dead-weight "thunk" settle without bounce
        transition={{ type: "spring", mass: 4, stiffness: 200, damping: 50, delay: 0.15 }}
        style={{
          width: "100%",
          maxWidth: "600px",
          position: "relative",
          margin: "auto", // prevents flexbox cutoff when content is taller than viewport
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {/* Close Button / Affordance */}
        <button
          onClick={onClose}
          aria-label="Return to cabinet"
          className="font-mono-system"
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "none",
            border: "none",
            color: "var(--color-text-secondary)",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          [RETURN TO CABINET]
        </button>

        {/* The actual exhibit composition */}
        {observation.assetType === "photo" ? (
          <PhotoExhibit exhibit={exhibitContent} photoRotation="0.5deg" />
        ) : (
          <ArchiveVideoFrame
            id={observation.id}
            src={observation.assetPath}
            tag={observation.tag}
            videoRotation="0.5deg"
            extraChildren={
              <div style={{ padding: "0.2rem" }}>
                <p
                  className="font-serif-human"
                  style={{
                    fontSize: "0.98rem",
                    lineHeight: 1.65,
                    color: "#2c2a27",
                    margin: 0,
                  }}
                >
                  {observation.copy}
                </p>
              </div>
            }
          />
        )}
      </motion.div>
    </motion.div>
  );
});

export default ObservationDetail;
