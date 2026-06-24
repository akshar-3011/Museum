"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HiddenNoteTriggerProps {
  hiddenText: string;
  children: React.ReactNode;
}

export default function HiddenNoteTrigger({ hiddenText, children }: HiddenNoteTriggerProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* The main exhibit content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>

      {/* The physical corner fold that acts as the trigger */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          aria-expanded={isRevealed}
          aria-label="Fold back corner to reveal hidden note"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            position: "relative",
            width: "60px",
            height: "60px",
            outline: "none",
          }}
        >
          {/* The folded paper corner visual */}
          <motion.div
            animate={{
              borderWidth: isRevealed ? "0 40px 40px 0" : "0 25px 25px 0",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderColor: "transparent #fdfcf9 transparent transparent",
              boxShadow: "-2px 2px 5px rgba(0,0,0,0.15)",
              borderBottomColor: "#ebe6db", // slightly darker back of the paper
              transformOrigin: "top right",
            }}
          />
        </button>
      </div>

      {/* The revealed handwritten note underneath the fold */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="fold-panel-mobile"
            initial={{ opacity: 0, height: 0, scale: 0.9, x: 10, y: -10 }}
            animate={{ opacity: 1, height: "auto", scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, height: 0, scale: 0.9, x: 10, y: -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-20px", 
              width: "450px",
              zIndex: 3,
              pointerEvents: "auto", 
              overflow: "hidden", 
            }}
          >
            <div style={{ padding: "10px" }}>
              <div
                style={{
                  backgroundColor: "#fbf9f4",
                  border: "1px solid rgba(28, 26, 23, 0.15)",
                  boxShadow: "2px 4px 10px rgba(0,0,0,0.15)",
                  padding: "1.2rem",
                  borderRadius: "2px",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <p
                  className="font-typewriter-archival"
                  style={{
                    fontSize: "0.85rem",
                    color: "#2c2a27",
                    lineHeight: 1.6,
                    margin: 0,
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {hiddenText.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i !== hiddenText.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                
                <button
                  onClick={() => setIsRevealed(false)}
                  className="font-mono-system"
                  style={{
                    alignSelf: "flex-end",
                    background: "none",
                    border: "1px solid rgba(28, 26, 23, 0.2)",
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.75rem",
                    color: "rgba(28, 26, 23, 0.7)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Fold
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
