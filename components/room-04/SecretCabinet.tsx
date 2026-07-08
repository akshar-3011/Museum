"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROOM_04_CONTENT } from "@/lib/rooms/room-04-content";

export default function SecretCabinet() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { label, microObservations } = ROOM_04_CONTENT.secretCabinet;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* The false-bottom slat */}
      <button
        className="drawer-btn"
        onClick={() => setIsUnlocked(!isUnlocked)}
        aria-label="Investigate cabinet base"
        aria-expanded={isUnlocked}
        style={{
          width: "100%",
          maxWidth: "400px",
          minHeight: "var(--touch-target-min, 24px)",
          height: "24px",
          backgroundColor: "var(--color-cabinet-frame)", // Dark wood/structural shadow color
          border: "none",
          borderTop: "2px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.8)",
          cursor: "pointer",
          marginTop: "4px",
          position: "relative",
        }}
      >
        {/* Very subtle hint that it's interactive (a faint seam) */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "1px",
          }}
        />
        
        {/* Surprise A: The Tucked Metadata Payoff */}
        <div
          className="font-mono-system"
          style={{
            position: "absolute",
            top: "8px",
            left: "calc(50% + 30px)", // Right beside the faint seam
            color: "#ab3c2d", // red ink
            opacity: 0.25, // very faded on the dark wood
            fontSize: "0.45rem",
            letterSpacing: "0.15em",
            pointerEvents: "none",
          }}
        >
          [REF: R-04/SC]
        </div>
      </button>

      {/* The revealed compartment */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: "100%", overflow: "hidden" }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                marginTop: "1rem",
                backgroundColor: "#0a0908", // dark internal compartment
                border: "1px solid rgba(244, 240, 232, 0.05)",
                borderRadius: "2px",
                padding: "3rem 2rem",
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                justifyContent: "center",
                boxShadow: "inset 0 20px 40px rgba(0,0,0,0.9)",
              }}
            >
              {/* Compartment Label */}
              <div
                className="font-mono-system"
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1.5rem",
                  fontSize: "0.6rem",
                  color: "rgba(244, 240, 232, 0.3)",
                  letterSpacing: "0.2em",
                }}
              >
                {label}
              </div>

              {/* The scatter of micro-observations */}
              {microObservations.map((obs, idx) => {
                // Determine a fixed pseudo-random rotation and offset for each scrap
                const rotation = ((idx * 13 + 7) % 20) - 10;
                const offsetY = ((idx * 7 + 3) % 15) - 7;
                
                return (
                  <MicroScrap
                    key={idx}
                    text={obs}
                    rotation={rotation}
                    offsetY={offsetY}
                    delay={idx * 0.05}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for individual interactive scraps
import React from "react";
const MicroScrap = React.memo(function MicroScrap({ text, rotation, offsetY, delay }: { text: string; rotation: number; offsetY: number; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.button
      className="micro-obs-btn"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onClick={() => setIsFlipped(!isFlipped)}
      aria-label="Read unfiled fragment"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        position: "relative",
        transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        outline: "none",
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 28 }}
        style={{
          width: "200px",
          minHeight: "110px",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front (Blank paper back) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#ebeae6", // slightly darker back of paper
            border: "1px solid rgba(28, 26, 23, 0.1)",
            boxShadow: "2px 4px 8px rgba(0,0,0,0.2)",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Subtle tape mark on back */}
          <div style={{ width: "20px", height: "10px", backgroundColor: "rgba(0,0,0,0.04)", transform: "rotate(-10deg)" }} />
        </div>

        {/* Back (The actual observation text) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#fdfcf9",
            border: "1px solid rgba(28, 26, 23, 0.15)",
            boxShadow: "-2px 4px 8px rgba(0,0,0,0.2)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "0.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Smudge */}
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: "4px",
              width: "12px",
              height: "12px",
              backgroundColor: "rgba(0,0,0,0.03)",
              filter: "blur(2px)",
              borderRadius: "50%",
            }}
          />
          <span
            className="font-typewriter-archival"
            style={{
              fontSize: "0.75rem",
              lineHeight: 1.4,
              color: "#2c2a27",
              textAlign: "left",
            }}
          >
            {text}
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
});
