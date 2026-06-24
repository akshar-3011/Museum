"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PhotoExhibit from "./PhotoExhibit";
import { EXHIBITS } from "@/lib/room-01/content";

export default function SecretDiscoveryTrigger() {
  const [isRevealed, setIsRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mainExhibit = EXHIBITS.exhibit5;
  const secretExhibit = EXHIBITS.secret;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center", // Center vertically if they wrap
        gap: isRevealed ? "3rem" : "0",
      }}
    >
      {/* Main card in the foreground */}
      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px", // Keeps it reasonable
          flex: "1 1 350px",
        }}
      >
        <PhotoExhibit exhibit={mainExhibit} photoRotation="1.5deg" />

        {/* Folded folder tab sticking out from behind Exhibit 05 (receded) */}
        {!isRevealed && (
          <button
            onClick={() => setIsRevealed(true)}
            aria-expanded={isRevealed}
            aria-label="Observe details tucked behind the card"
            className="font-mono-system"
            style={{
              position: "absolute",
              bottom: "22px",
              right: "-10px",
              backgroundColor: "#dcd2b8",
              border: "1px solid rgba(28, 26, 23, 0.12)",
              borderLeft: "none",
              borderRadius: "0 2px 2px 0",
              padding: "12px 10px", // Increased padding to enforce 44px min tap target
              fontSize: "0.55rem", // smaller font by ~15%
              color: "rgba(28, 26, 23, 0.55)", // quieter text color
              opacity: "var(--hover-affordance-opacity, 0.5)", // quieter initial opacity (higher on touch)
              cursor: "pointer",
              boxShadow: "1px 1px 3px rgba(0,0,0,0.06)",
              transform: "rotate(calc(1.5deg * var(--rotation-multiplier)))",
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

      {/* Tucked secret card */}
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
          // Absolute initially so it sits exactly under the main card's flex position
          position: isRevealed ? "relative" : "absolute",
          zIndex: isRevealed ? 3 : 1,
          width: "100%",
          maxWidth: "480px",
          flex: "1 1 350px",
          pointerEvents: isRevealed ? "auto" : "none",
        }}
      >
        <PhotoExhibit 
          exhibit={secretExhibit} 
          photoRotation="-2.2deg"
          extraChildren={
            <div
              className="font-mono-system"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "15px",
                color: "#ab3c2d", // red ink
                opacity: 0.45, // faded
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                transform: "rotate(-4deg)",
                pointerEvents: "none",
                zIndex: 10,
                border: "1px solid rgba(171, 60, 45, 0.4)",
                padding: "2px 4px",
                borderRadius: "1px",
              }}
            >
              [REF: R-04/SC]
            </div>
          }
        />
      </motion.div>
    </div>
  );
}
