"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FragmentDrawerProps {
  label: string;
  fragments: string[];
}

export default function FragmentDrawer({ label, fragments }: FragmentDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Deterministic "pile" positions
  const getPileStyle = useCallback((idx: number, total: number) => {
    const offsetX = ((idx * 17 + 3) % 20) - 10;
    const offsetY = ((idx * 13 + 7) % 20) - 10;
    const rotation = ((idx * 7 + 2) % 25) - 12;

    const z = (idx * 3 + 5) % total;
    const isFullyVisible = idx < 12;

    return {
      transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
      zIndex: focusedIndex === idx ? 100 : z,
      opacity: isFullyVisible ? 1 : 0.85, // physical scraps don't become fully transparent
      margin: "-4px -6px", // create overlap in flex layout
    };
  }, [focusedIndex]);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto", position: "relative" }}>
      {/* Archival wooden/paper drawer front (closed state) */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsOpen(true)}
          aria-label={`Open drawer: ${label}`}
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#f5f0e6", // Archival drawer color
              width: "100%",
              padding: "3rem 0",
              borderRadius: "4px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4), inset 0 2px 5px rgba(255,255,255,0.2)",
              border: "1px solid rgba(28, 26, 23, 0.2)",
              borderBottom: "4px solid rgba(28, 26, 23, 0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              transition: shouldReduceMotion ? "none" : "transform 0.2s ease",
            }}
          >
            {/* Cardstock Label */}
            <div
              className="drawer-front-shadow"
              style={{
                backgroundColor: "#e3d8be",
                padding: "0.5rem 1.5rem",
                border: "2px solid #8e8a82",
                borderRadius: "2px",
              }}
            >
              <span
                className="font-mono-system"
                style={{
                  fontSize: "0.65rem",
                  color: "#1c1a17",
                  letterSpacing: "0.12em",
                }}
              >
                {label || "EVIDENCE OF RETURN"}
              </span>
            </div>

            {/* Brass Pull Handle */}
            <div
              style={{
                width: "90px",
                height: "18px",
                borderRadius: "3px",
                backgroundColor: "#b48b59",
                borderTop: "2px solid #d4b58c",
                borderBottom: "3px solid #755530",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              }}
            />
          </div>
        </motion.button>
      )}

      {/* Open drawer — pile of physical fragments */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            {/* The physical interior of the drawer */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "auto", // sizes to content
                backgroundColor: "#0a0908", // dark drawer interior
                boxShadow: "inset 0 15px 30px rgba(0,0,0,0.9)",
                borderRadius: "4px",
                padding: "3rem 2rem", // extra padding for the flex pile
                border: "1px solid rgba(244, 240, 232, 0.05)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {/* Close button moved below the interior container */}

              {fragments.map((text, idx) => {
                const pileStyle = getPileStyle(idx, fragments.length);
                const isFocused = focusedIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{
                      opacity: pileStyle.opacity,
                      scale: isFocused ? 1.15 : 1,
                      y: 0,
                    }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : idx * 0.03,
                      duration: 0.4,
                    }}
                    onClick={() => setFocusedIndex(isFocused ? null : idx)}
                    role="button"
                    aria-expanded={isFocused}
                    tabIndex={0}
                    aria-label={text}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setFocusedIndex(isFocused ? null : idx);
                      }
                    }}
                    style={{
                      position: "relative",
                      transform: isFocused ? "rotate(0deg)" : pileStyle.transform,
                      zIndex: pileStyle.zIndex,
                      margin: pileStyle.margin,
                      cursor: "pointer",
                      backgroundColor: "#fdfcf9",
                      border: "1px solid rgba(28, 26, 23, 0.15)",
                      boxShadow: isFocused 
                        ? "0 10px 20px rgba(0,0,0,0.5), inset 0 1px 3px rgba(0,0,0,0.05)"
                        : "0 3px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.03)",
                      padding: "0.8rem 1.2rem",
                      borderRadius: "1px",
                      maxWidth: "200px",
                      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, z-index 0s",
                    }}
                  >
                    {/* Smudge effect */}
                    <div
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "8px",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "rgba(0,0,0,0.05)",
                        filter: "blur(3px)",
                        borderRadius: "50%",
                        pointerEvents: "none",
                      }}
                    />
                    <span
                      className="font-typewriter-archival"
                      style={{
                        fontSize: "0.85rem",
                        color: "#2c2a27",
                        lineHeight: 1.4,
                        display: "block",
                      }}
                    >
                      {text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Close Button placed outside the pile of fragments */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close drawer"
                role="button"
                tabIndex={0}
                className="font-mono-system"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-text-secondary)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                  padding: "0.5rem 1rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                [CLOSE DRAWER]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
