"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface MarginNoteTriggerProps {
  highlightedText: string;
  marginNote: string;
  isRightSide?: boolean;
}

export default function MarginNoteTrigger({
  highlightedText,
  marginNote,
  isRightSide = true,
}: MarginNoteTriggerProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* The highlighted text trigger */}
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={isRevealed}
        aria-label={`View margin note for ${highlightedText}`}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: "inherit",
          fontFamily: "inherit",
          fontSize: "inherit",
          position: "relative",
          display: "inline-block",
        }}
      >
        <span style={{ position: "relative", zIndex: 1, fontWeight: isRevealed ? 600 : "inherit" }}>
          {highlightedText}
        </span>
        {/* Yellow highlighter or pen underline effect */}
        <span
          style={{
            position: "absolute",
            bottom: "0px",
            left: "-2px",
            right: "-2px",
            height: "6px",
            backgroundColor: isRevealed ? "rgba(217, 160, 91, 0.4)" : isHovered ? "rgba(217, 160, 91, 0.3)" : "rgba(217, 160, 91, 0.2)", // Mango accent
            transform: "rotate(-1deg)",
            zIndex: 0,
            transition: "background-color 0.2s ease",
          }}
        />
      </button>

      {/* The sliding margin note */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="margin-note-popup"
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : isRightSide ? -10 : 10,
              y: -5,
              rotate: isRightSide ? -2 : 2,
            }}
            animate={{
              opacity: 1,
              x: isRightSide ? 20 : -20,
              y: -10,
              rotate: isRightSide ? 3 : -3,
            }}
            exit={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : isRightSide ? -10 : 10,
              y: -5,
              rotate: 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "100%",
              [isRightSide ? "left" : "right"]: "100%",
              width: "320px",
              zIndex: 50,
              pointerEvents: "none", // Prevent blocking other text
            }}
          >
            {/* The physical scrap of paper */}
            <div
              style={{
                backgroundColor: "#fdfcf9", // clean, slightly brighter paper slip
                border: "1px solid rgba(28, 26, 23, 0.1)",
                boxShadow: "2px 4px 12px rgba(0,0,0,0.12)",
                padding: "0.8rem 1rem",
                borderRadius: "1px",
                position: "relative",
              }}
            >
              {/* Torn edge or tape visual can go here */}
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(2deg)",
                  width: "30px",
                  height: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)", // matte tape
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              />
              
              <p
                className="font-typewriter-archival"
                style={{
                  fontSize: "0.8rem",
                  color: "#2c2a27", // Ink color
                  lineHeight: 1.4,
                  margin: 0,
                  textAlign: "left",
                }}
              >
                <TypewriterText text={marginNote} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20); // Fast typewriter speed

    return () => clearInterval(timer);
  }, [text]);

  return <>{displayedText}</>;
}
