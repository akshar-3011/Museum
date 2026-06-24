"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ExhibitFrame from "@/components/room-01/ExhibitFrame";

interface FoldableDocumentProps {
  id: string; // artifact token ID
  title: string;
  entries: { day: string; note: string }[];
}

export default function FoldableDocument({ id, title, entries }: FoldableDocumentProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <ExhibitFrame id={id}>
      <div className="mobile-full-width" style={{ width: "100%", maxWidth: "420px", margin: "0 auto", position: "relative" }}>
        
        {/* The physical paper document */}
        <div
          style={{
            backgroundColor: "#fdfcf9", // clean, slightly brighter paper
            border: "1px solid rgba(28, 26, 23, 0.1)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.03)",
            padding: "0", // Padding is handled in sections
            borderRadius: "2px",
            width: "100%",
            boxSizing: "border-box",
            position: "relative",
            overflow: "visible", // Changed from hidden to fix Unfold button cutoff
          }}
        >
          {/* Top Half (Always visible) */}
          <button
            onClick={() => setIsUnfolded(!isUnfolded)}
            aria-label={isUnfolded ? `Fold ${title}` : `Unfold ${title}`}
            aria-expanded={isUnfolded}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              padding: "1.5rem 1.8rem",
              position: "relative",
              zIndex: 2, // Sits above bottom half
            }}
          >
            <span
              className="font-mono-system"
              style={{
                fontSize: "0.75rem",
                color: "#1c1a17",
                letterSpacing: "0.1em",
                display: "block",
                fontWeight: 600,
              }}
            >
              {title.toUpperCase()}
            </span>

            {/* Unfold instruction / visual tab */}
            {!isUnfolded && (
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#e3d8be",
                  padding: "2px 8px",
                  border: "1px solid rgba(28, 26, 23, 0.15)",
                  borderRadius: "2px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  className="font-mono-system"
                  style={{
                    fontSize: "0.55rem",
                    color: "rgba(28, 26, 23, 0.6)",
                  }}
                >
                  UNFOLD
                </span>
              </motion.div>
            )}
          </button>

          {/* The Crease Line */}
          <div
            style={{
              width: "100%",
              height: "4px",
              // Simulates the physical shadow of a folded piece of paper
              background: isUnfolded 
                ? "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 100%)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)",
              borderTop: isUnfolded ? "1px solid rgba(28, 26, 23, 0.05)" : "1px solid rgba(28, 26, 23, 0.12)",
              transition: "background 0.5s ease",
            }}
          />

          {/* Bottom Half (Unfolded content) */}
          <AnimatePresence>
            {isUnfolded && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  rotateX: -30, // 3D fold effect
                  transformOrigin: "top center",
                }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  rotateX: 0 
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  rotateX: -30,
                }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: "0 1.8rem 1.5rem 1.8rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  // Very subtle gradient at the bottom simulating paper curl
                  background: "linear-gradient(to top, rgba(0,0,0,0.02) 0%, transparent 20px)",
                }}
              >
                <div style={{ paddingTop: "1.5rem" }} /> {/* Spacing from crease */}
                
                {entries.map((entry, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.1,
                      duration: 0.5,
                    }}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      borderBottom: "1px dotted rgba(28, 26, 23, 0.1)",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <span
                      className="font-mono-system"
                      style={{
                        fontSize: "0.65rem",
                        color: "rgba(28, 26, 23, 0.45)",
                        width: "60px",
                        flexShrink: 0,
                        paddingTop: "0.2rem", // aligns with serif cap height
                      }}
                    >
                      {entry.day.toUpperCase()}
                    </span>
                    <span
                      className="font-serif-human"
                      style={{
                        fontSize: "1rem",
                        color: "#2c2a27",
                        lineHeight: 1.5,
                      }}
                    >
                      {entry.note}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ExhibitFrame>
  );
}
