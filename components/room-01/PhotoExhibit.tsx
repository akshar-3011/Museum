"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ExhibitFrame from "./ExhibitFrame";
import { ExhibitContent } from "@/lib/room-01/content";
import { HIERARCHY_MODIFIERS } from "@/lib/design/artifact-tokens";

interface PhotoExhibitProps {
  exhibit: ExhibitContent;
  photoRotation?: string; // e.g. "-0.6deg"
  extraChildren?: React.ReactNode;
}

export default function PhotoExhibit({
  exhibit,
  photoRotation = "-0.6deg", // lowered rotation range
  extraChildren,
}: PhotoExhibitProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasError, setHasError] = useState(false);
  const scale = HIERARCHY_MODIFIERS.photoScaleMultiplier;

  return (
    <ExhibitFrame id={exhibit.id} tag={exhibit.tag}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Photo print container */}
        {exhibit.imagePath && (
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
                transform: shouldReduceMotion ? "none" : `rotate(calc(${photoRotation} * var(--rotation-multiplier)))`,
                width: "100%",
                maxWidth: `${Math.round(340 * scale)}px`, // increased photo width bounds by ~18%
                position: "relative",
                boxSizing: "border-box",
                transition: "transform 0.4s ease",
              }}
            >
              {/* Adhered label code on the print bottom margin */}
              <div
                className="font-mono-system"
                style={{
                  position: "absolute",
                  bottom: "4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: HIERARCHY_MODIFIERS.labelFontSize, // smaller tag
                  color: "rgba(0,0,0,0.35)", // quieter label opacity
                  letterSpacing: "0.04em",
                }}
              >
                {exhibit.id.toUpperCase()}-RECORD
              </div>

              {/* Image box */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "0",
                  paddingBottom: "110%", // photographic ratio
                  overflow: "hidden",
                  backgroundColor: "#ebeae6",
                }}
              >
                <Image
                  src={exhibit.imagePath}
                  alt={exhibit.title || "Museum exhibit"}
                  fill
                  sizes="(max-width: 600px) 100vw, 400px"
                  style={{
                    objectFit: "cover",
                    opacity: hasError ? 0 : 1,
                    transition: "opacity 0.3s",
                  }}
                  priority={exhibit.id === "exhibit1"} // Load hero photo immediately
                  onError={() => setHasError(true)}
                />
                {hasError && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(28, 26, 23, 0.4)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                  }} className="font-mono-system">
                    [ RECORD MISSING ]
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Narrative Description */}
        <div style={{ padding: "0.1rem" }}>
          <p
            className="font-serif-human"
            style={{
              fontSize: "0.98rem",
              lineHeight: 1.65,
              color: "#2c2a27",
              whiteSpace: "pre-line",
            }}
          >
            {exhibit.copy}
          </p>
        </div>

        {extraChildren}
      </div>
    </ExhibitFrame>
  );
}
