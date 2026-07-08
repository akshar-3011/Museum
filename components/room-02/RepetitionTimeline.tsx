"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { HIERARCHY_MODIFIERS } from "@/lib/design/artifact-tokens";

interface TimelineTick {
  label: string;
  fragment: string | null;
}

interface RepetitionTimelineProps {
  ticks: TimelineTick[];
}

export default function RepetitionTimeline({ ticks }: RepetitionTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedTick, setRevealedTick] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // The vertical line draws as you scroll
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      
      {/* The Ledger Strip Backdrop (Archival substrate) */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fbf9f4", // aged paper ledger
          borderLeft: "1px solid rgba(28, 26, 23, 0.1)",
          borderRight: "1px solid rgba(28, 26, 23, 0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15), inset 0 0 40px rgba(0,0,0,0.02)",
          position: "relative",
          padding: "4rem 0",
          backgroundImage: "repeating-linear-gradient(transparent, transparent 19px, rgba(28, 26, 23, 0.03) 20px)", // ledger lines
        }}
        ref={containerRef}
      >
        {/* The imperfect vertical ink line */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            marginLeft: "-1px",
            backgroundColor: "rgba(28, 26, 23, 0.2)", // dark ink
            transformOrigin: "top center",
            scaleY: shouldReduceMotion ? 1 : lineScaleY,
          }}
        />

        {/* Tick marks distributed vertically */}
        <div style={{ position: "relative", width: "100%", minHeight: `${ticks.length * 8}vh` }}>
          {ticks.map((tick, index) => {
            const isLeft = index % 2 === 0;
            const hasMicroDiscovery = tick.fragment !== null;
            const isRevealed = revealedTick === index;

            const tickProgress = index / ticks.length;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const tickOpacity = useTransform(
              scrollYProgress,
              [Math.max(0, tickProgress - 0.05), tickProgress, 1],
              [0, 1, 1]
            );

            // Imperfect horizontal positioning
            const wobble = ((index * 7 + 3) % 5) - 2; 

            return (
              <motion.div
                key={index}
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: `${4 + (index % 3)}vh`, // uneven vertical spacing
                  opacity: shouldReduceMotion ? 1 : tickOpacity,
                }}
              >
                {/* Tick content */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.8rem",
                    flexDirection: isLeft ? "row-reverse" : "row",
                    position: "relative",
                    left: `${wobble}px`,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {/* Ink tick mark */}
                  <div
                    style={{
                      width: `${12 + (index % 4) * 2}px`, // hand-drawn varying width
                      height: "2px", // thick ink
                      backgroundColor: "rgba(28, 26, 23, 0.3)",
                      marginTop: "6px", // align with text
                    }}
                  />

                  {/* Label / Interaction */}
                  <div 
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: isLeft ? "flex-end" : "flex-start",
                      width: "140px" // fixed width so they align cleanly against the center
                    }}
                  >
                    {hasMicroDiscovery ? (
                      <button
                        onClick={() => setRevealedTick(isRevealed ? null : index)}
                        aria-label={`Reveal observation at ${tick.label}`}
                        aria-expanded={isRevealed}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "2px 4px",
                          minHeight: "var(--touch-target-min)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          // Physical tag visual for the interactive tick
                          backgroundColor: isRevealed ? "#e3d8be" : "transparent",
                          borderBottom: isRevealed ? "none" : "1px dashed rgba(28, 26, 23, 0.3)",
                          borderRadius: "1px",
                          transition: shouldReduceMotion ? "none" : "background-color 0.2s ease",
                        }}
                      >
                        <span
                          className="font-mono-system"
                          style={{
                            fontSize: HIERARCHY_MODIFIERS.labelFontSize,
                            color: "#1c1a17",
                            fontWeight: isRevealed ? 600 : 400,
                          }}
                        >
                          {tick.label.toUpperCase()}
                        </span>
                      </button>
                    ) : (
                      <span
                        className="font-mono-system"
                        style={{
                          fontSize: HIERARCHY_MODIFIERS.labelFontSize,
                          color: "rgba(28, 26, 23, 0.5)",
                          padding: "2px 4px",
                        }}
                      >
                        {tick.label.toUpperCase()}
                      </span>
                    )}

                    {/* Micro-discovery fragment — physical paper scrap slides out */}
                    <AnimatePresence>
                      {isRevealed && tick.fragment && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: -10, rotate: isLeft ? -2 : 2 }}
                          animate={{ opacity: 1, scale: 1, y: 0, rotate: isLeft ? 3 : -3 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10, rotate: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          style={{ 
                            marginTop: "0.8rem",
                            // Physical scrap styling
                            backgroundColor: "#fdfcf9",
                            border: "1px solid rgba(28, 26, 23, 0.15)",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                            padding: "0.6rem 0.8rem",
                            borderRadius: "1px",
                            position: "absolute",
                            top: "100%",
                            [isLeft ? "right" : "left"]: 0,
                            zIndex: 10,
                            width: "200px"
                          }}
                        >
                          <p
                            className="font-typewriter-archival"
                            style={{
                              fontSize: "0.85rem",
                              color: "#2c2a27",
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {tick.fragment}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
