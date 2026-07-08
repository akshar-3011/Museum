"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExhibitFrame from "@/components/room-01/ExhibitFrame";

export default function UnclassifiedItem() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <ExhibitFrame id="unclassified-mount" tag="CONSERVATION MOUNT // EMPTY">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem 1rem",
          alignItems: "center",
        }}
      >
        {/* The Conservation Mount */}
        <div
          style={{
            position: "relative",
            width: "280px",
            height: "340px",
            backgroundColor: "var(--color-bg)",
            border: "1px solid color-mix(in srgb, var(--color-text-primary) 10%, transparent)",
            borderRadius: "4px",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.05)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* The Impression Rectangle where the object used to sit */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120px",
              height: "120px",
              border: "1px dashed color-mix(in srgb, var(--color-text-primary) 20%, transparent)",
              borderRadius: "50%",
              opacity: 0.6,
            }}
          />

          {/* The dashed string tying it to the tag */}
          <svg
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100px",
              height: "100px",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            <path
              d="M 60 60 C 80 80, 80 100, 70 140"
              fill="transparent"
              stroke="color-mix(in srgb, var(--color-text-primary) 30%, transparent)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>

          {/* The Conservation Tag */}
          <button
            onClick={() => setIsRevealed(!isRevealed)}
            aria-expanded={isRevealed}
            aria-label="Toggle conservation tag details"
            style={{
              position: "absolute",
              bottom: "40px",
              right: "30px",
              backgroundColor: "var(--color-cardstock)",
              padding: "0.8rem",
              border: "1px solid rgba(28, 26, 23, 0.2)",
              borderRadius: "2px",
              boxShadow: "2px 4px 10px rgba(0,0,0,0.1)",
              transform: "rotate(6deg)",
              cursor: "pointer",
              textAlign: "left",

            }}
          >
            <div
              className="font-mono-system"
              style={{
                fontSize: "0.55rem",
                color: "#1c1a17",
                letterSpacing: "0.1em",
                marginBottom: "0.4rem",
              }}
            >
              TAG-883
            </div>
            <div
              className="font-serif-human"
              style={{
                fontSize: "0.8rem",
                color: "#1c1a17",
                fontStyle: "italic",
              }}
            >
              Missing Object
            </div>
          </button>
        </div>

        {/* The hidden reveal */}
        <div style={{ height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                style={{
                  textAlign: "center",
                  maxWidth: "300px",
                }}
              >
                <p
                  className="font-serif-human"
                  style={{
                    fontSize: "1.1rem",
                    color: "#1c1a17",
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  It is waiting.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ExhibitFrame>
  );
}
