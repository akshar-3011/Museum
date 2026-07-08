"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import { HIERARCHY_MODIFIERS } from "@/lib/design/artifact-tokens";

interface ArchiveVideoFrameProps {
  id: string; // artifact token ID
  src: string;
  tag?: string;
  videoRotation?: string;
  extraChildren?: React.ReactNode;
}

export default function ArchiveVideoFrame({
  id,
  src,
  tag,
  videoRotation = "-0.6deg", // lowered rotation range matching Room 01 PhotoExhibit
  extraChildren,
}: ArchiveVideoFrameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const scale = HIERARCHY_MODIFIERS.photoScaleMultiplier;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <ExhibitFrame id={id} tag={tag}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Video container behaving like a photo print */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "0.2rem",
          }}
        >
          <div
            className="photo-print-border"
            style={{
              transform: shouldReduceMotion ? "none" : `rotate(calc(${videoRotation} * var(--rotation-multiplier)))`,
              width: "100%",
              // Constrain width by viewport height so the 9:16 video doesn't overflow screen height
              maxWidth: `min(${Math.round(380 * scale)}px, 42vh)`,
              position: "relative",
            }}
          >
            {/* Record ID label on bottom margin */}
            <div
              className="font-mono-system"
              style={{
                position: "absolute",
                bottom: "4px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: HIERARCHY_MODIFIERS.labelFontSize,
                color: "rgba(0,0,0,0.35)",
                letterSpacing: "0.04em",
              }}
            >
              {id.toUpperCase()}-MEDIA
            </div>

            {/* Video Screen */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "9 / 16",
                backgroundColor: "#0a0a0a", // deep screen black
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.2)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6)", // screen depth inside the mat
                cursor: "pointer",
              }}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={src}
                aria-label={tag || "Museum exhibit"}
                playsInline
                loop
                muted
                preload="metadata"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 16'%3E%3Crect width='100%25' height='100%25' fill='%2322201d'/%3E%3C/svg%3E"
                style={{
                  width: "100%",
                  maxHeight: "75vh", // Added to ensure it doesn't overflow
                  objectFit: "contain",
                  display: "block",
                  backgroundColor: "#22201d", // Dark archival placeholder matching the screen off state
                  opacity: 0.85, // physical screen look, not glowing
                filter: "contrast(1.05) brightness(0.95)",
              }}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onError={() => setHasError(true)}
            />
            {hasError && (
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                zIndex: 5,
              }} className="font-mono-system">
                [ TAPE CORRUPTED ]
              </div>
            )}
          </div>

            {/* The Physical Sticker Overlay Play Affordance */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              style={{
                position: "absolute",
                bottom: "20px",
                right: "-10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                zIndex: 10,
                transform: "rotate(-4deg)",
              }}
            >
              {/* Library sticker physical styling */}
              <div className="artifact-sticker">
                <span
                  className="font-mono-system"
                  style={{
                    fontSize: "0.6rem",
                    color: isPlaying ? "rgba(28, 26, 23, 0.5)" : "#ab3c2d", // red ink for attention when paused
                    letterSpacing: "0.08em",
                    fontWeight: isPlaying ? "normal" : "bold",
                  }}
                >
                  {isPlaying ? "PAUSE" : "PLAY MEDIA"}
                </span>

                {/* Small play/pause indicator */}
                <motion.div animate={{ opacity: 0.8 }}>
                  {isPlaying ? (
                    <div style={{ display: "flex", gap: "2px" }}>
                      <div style={{ width: "3px", height: "8px", backgroundColor: "rgba(28, 26, 23, 0.6)" }} />
                      <div style={{ width: "3px", height: "8px", backgroundColor: "rgba(28, 26, 23, 0.6)" }} />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                        borderLeft: "6px solid #ab3c2d",
                      }}
                    />
                  )}
                </motion.div>
              </div>
            </button>
          </div>
        </div>

        {extraChildren}
      </div>
    </ExhibitFrame>
  );
}
