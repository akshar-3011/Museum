"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import { HIERARCHY_MODIFIERS } from "@/lib/design/artifact-tokens";

interface FramedPhotoWithTagProps {
  id: string; // artifact token ID
  imagePath: string;
  alt?: string;
  tagText?: string;
  tagPosition?: "bottom-right" | "bottom-left";
  priority?: boolean;
  description?: string;
}

export default function FramedPhotoWithTag({
  id,
  imagePath,
  alt = "Museum photograph",
  tagText,
  tagPosition = "bottom-right",
  priority = false,
  description,
}: FramedPhotoWithTagProps) {
  const [isTagRevealed, setIsTagRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isRight = tagPosition === "bottom-right";
  const scale = HIERARCHY_MODIFIERS.photoScaleMultiplier;

  return (
    <ExhibitFrame id={id}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: description ? "3.5rem" : "0",
          width: "100%",
        }}
      >
        {/* Photo + Sliding Tag Container */}
        <div
          className="photo-container-mobile"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: description ? `${Math.round(340 * scale)}px` : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* The physical print border (Polaroid-style white margin) */}
          <div
            className="photo-print-border-tall"
            style={{
              transform: shouldReduceMotion ? "none" : "rotate(-1deg)",
              width: "100%",
              maxWidth: "480px",
              position: "relative",
              boxSizing: "border-box",
              zIndex: 2, // Sits above the sliding fragment
            }}
          >
            {/* Adhered label code on the print bottom margin */}
            <div className="font-mono-system print-label-text">
              {id.toUpperCase()}-RECORD
            </div>

            {/* The image itself */}
            <div className="photo-aspect-container">
              <Image
                src={imagePath}
                alt={alt}
                fill
                sizes="(max-width: 600px) 100vw, 400px"
                style={{ objectFit: "cover" }}
                priority={priority}
              />
            </div>
          </div>

          {/* The physical tag and sliding fragment */}
          {tagText && (
            <div
              className="photo-tag-container-mobile"
              style={{
                position: description ? "relative" : "absolute",
                bottom: description ? "auto" : "-15px",
                right: description ? "auto" : "-10px",
                left: description ? "auto" : (isRight ? "auto" : "-10px"),
                zIndex: description ? 10 : 1,
                width: description ? "100%" : "auto",
                display: "flex",
                flexDirection: description ? "column-reverse" : "column",
                alignItems: isRight ? "flex-end" : "flex-start",
                gap: "0.5rem", // space between text block and tuck button
                marginTop: description ? "0.8rem" : "0",
              }}
            >
              {/* The sliding physical fragment */}
              <AnimatePresence>
                {isTagRevealed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto", 
                      rotate: isRight ? 2 : -2 
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      backgroundColor: "#fdfcf9",
                      border: "1px solid rgba(28, 26, 23, 0.1)",
                      boxShadow: "1px 3px 8px rgba(0,0,0,0.15)",
                      padding: "1rem 1.2rem",
                      borderRadius: "2px",
                      minWidth: "220px",
                      position: "relative",
                      overflow: "hidden", // needed for height animation
                    }}
                    className="font-typewriter-archival"
                  >
                    {/* Typewriter ink smudge effect */}
                    <div
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        width: "15px",
                        height: "15px",
                        backgroundColor: "rgba(0,0,0,0.03)",
                        filter: "blur(4px)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                      }}
                    />
                    {tagText.split("\n").map((line, i) => (
                      <p
                        key={i}
                        style={{
                           fontSize: "0.9rem",
                           lineHeight: 1.5,
                           color: "#2c2a27",
                           margin: 0,
                           marginBottom: i < tagText.split("\n").length - 1 ? "0.4rem" : 0,
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The physical library tag (always visible, sits at bottom) */}
              <button
                onClick={() => setIsTagRevealed(!isTagRevealed)}
                aria-label={isTagRevealed ? "Tuck note back" : "Pull note"}
                aria-expanded={isTagRevealed}
                className="tuck-button-mobile"
                style={{
                  // No absolute positioning. Relies on flex layout to sit below the text.
                  position: "relative",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  zIndex: 5,
                  minHeight: "var(--touch-target-min)",
                  display: "flex",
                  alignItems: "center",
                  transform: `rotate(${isRight ? "3deg" : "-4deg"})`,
                  transformOrigin: isRight ? "top right" : "top left",
                }}
              >
                {/* Library tab cardstock */}
                <div className="artifact-sticker">
                  {/* Visual staple/attachment */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-2px",
                      [isRight ? "left" : "right"]: "8px",
                      width: "6px",
                      height: "8px",
                      borderLeft: "2px solid #8e8a82",
                      borderTop: "2px solid #8e8a82",
                    }}
                  />
                  <span
                    className="font-mono-system"
                    style={{
                      fontSize: "0.6rem",
                      color: "rgba(28, 26, 23, 0.6)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {isTagRevealed ? "TUCK" : "PULL"}
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Right side: Description text (if present) */}
        {description && (
          <div
            style={{
              flex: "1 1 280px",
              maxWidth: "360px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0.5rem 0",
            }}
          >
            <p
              className="font-serif-human"
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.68,
                color: "#2c2a27",
                opacity: 0.9,
                margin: 0,
                textAlign: "left",
                whiteSpace: "pre-line",
              }}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </ExhibitFrame>
  );
}
