"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import { HIERARCHY_MODIFIERS } from "@/lib/design/artifact-tokens";

interface DiscoveredVideoProps {
  id: string; // artifact token ID
  imagePath: string;
  label: string;
  quiet?: boolean;
  recoveredText?: string;
}

export default function DiscoveredVideo({ id, imagePath, label, quiet = false, recoveredText }: DiscoveredVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTextRevealed, setIsTextRevealed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const scale = HIERARCHY_MODIFIERS.photoScaleMultiplier;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        if (recoveredText) {
          setIsTextRevealed(true);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <ExhibitFrame id={id}>
      <div 
        style={{ 
          position: "relative", 
          width: "100%", 
          display: "flex", 
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          padding: "1rem 0"
        }}
      >
        
        {/* The physical print/screen border (Polaroid-style white margin) */}
        <div
          className="photo-print-border-tall"
          style={{
            transform: shouldReduceMotion ? "none" : `rotate(calc(-1.2deg * var(--rotation-multiplier)))`,
            width: "100%",
            maxWidth: `${Math.round((quiet ? 280 : 380) * scale)}px`, // Video might be wider/smaller
            position: "relative",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          {/* Record number on bottom margin */}
          <div
            className="font-mono-system"
            style={{
              position: "absolute",
              bottom: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: HIERARCHY_MODIFIERS.labelFontSize,
              color: "rgba(0,0,0,0.35)",
              letterSpacing: "0.04em",
            }}
          >
            {id.toUpperCase()}-MEDIA
          </div>

          {/* The video screen container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "9 / 16",
              backgroundColor: "#111", // darker screen background
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.2)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)", // screen depth
            }}
          >
            <video
              ref={videoRef}
              src={imagePath}
              aria-label={label || "Museum exhibit"}
              playsInline
              loop
              muted
              preload="metadata"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 16'%3E%3Crect width='100%25' height='100%25' fill='%2322201d'/%3E%3C/svg%3E"
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
                backgroundColor: "#22201d", // Dark archival placeholder
                opacity: quiet && !isPlaying ? 0.6 : 1, // quiet video sits darker until played
                transition: "opacity 0.4s ease",
              }}
              onPause={() => setIsPlaying(false)}
              onPlay={() => {
                setIsPlaying(true);
                if (recoveredText) setIsTextRevealed(true);
              }}
            />
          </div>

          {/* The unmissable physical affordance sticker */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            style={{
              position: "absolute",
              bottom: "35px",
              right: "-15px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              minHeight: "var(--touch-target-min)",
              minWidth: "var(--touch-target-min)",
              zIndex: 10,
              transform: "rotate(calc(-3deg * var(--rotation-multiplier)))",
            }}
          >
            {/* Library sticker physical styling */}
            <div className="artifact-sticker">
              <span
                className="font-mono-system"
                style={{
                  fontSize: "0.65rem",
                  color: isPlaying ? "rgba(28, 26, 23, 0.4)" : "#ab3c2d", // red ink for attention
                  letterSpacing: "0.08em",
                  fontWeight: isPlaying ? "normal" : "bold",
                }}
              >
                {label.toUpperCase()}
              </span>

              {/* Small play/pause indicator */}
              <motion.div animate={{ opacity: 0.8 }}>
                {isPlaying ? (
                  <div style={{ display: "flex", gap: "2px" }}>
                    <div style={{ width: "3px", height: "8px", backgroundColor: "rgba(28, 26, 23, 0.6)" }} />
                    <div style={{ width: "3px", height: "8px", backgroundColor: "rgba(28, 26, 23, 0.6)" }} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: "6px solid #ab3c2d",
                    }}
                  />
                )}
              </motion.div>
            </div>
          </button>
        </div>

        {/* Revealed Text Panel and Arrow */}
        {isTextRevealed && recoveredText && (
          <>
            {/* Desktop Dotted Arrow */}
            <div
              className="indicator-arrow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                color: "rgba(28, 26, 23, 0.3)",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>•</span>
              <div style={{ width: "60px", borderTop: "1px dashed rgba(28, 26, 23, 0.3)" }} />
              <span style={{ fontSize: "1rem", transform: "translateX(-2px)" }}>&gt;</span>
            </div>

            {/* Typewriter Text Panel */}
            <TypewrittenPanel text={recoveredText} />
          </>
        )}
      </div>
    </ExhibitFrame>
  );
}

function TypewrittenPanel({ text }: { text: string }) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Split text into paragraphs based on double newlines
  const lines = text.split("\n\n").map(l => l.trim()).filter(Boolean);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let charIndex = 0;
    let currentLineIndex = 0;

    const typeChar = () => {
      if (currentLineIndex >= lines.length) {
        setIsComplete(true);
        return;
      }

      const currentFullLine = lines[currentLineIndex];

      if (charIndex < currentFullLine.length) {
        setTypedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = "";
          }
          newLines[currentLineIndex] = currentFullLine.substring(0, charIndex + 1);
          return newLines;
        });
        charIndex++;
        timer = setTimeout(typeChar, 55); // Typewriter speed
      } else {
        // Line finished, pause before next line
        timer = setTimeout(() => {
          currentLineIndex++;
          setActiveLine(currentLineIndex);
          charIndex = 0;
          typeChar();
        }, 800);
      }
    };

    // Initial delay before typing starts
    timer = setTimeout(typeChar, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]); // re-run if text changes

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        backgroundColor: "#fdfcf9", // Subtle paper
        border: "1px solid rgba(28, 26, 23, 0.1)",
        boxShadow: "1px 3px 8px rgba(0,0,0,0.06)",
        padding: "2rem 2.2rem",
        borderRadius: "2px",
        width: "100%",
        maxWidth: "380px",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div 
        className="font-typewriter-archival" 
        style={{ 
          color: "#2c2a27", 
          fontSize: "1rem", 
          lineHeight: 1.6 
        }}
      >
        {lines.map((_, i) => (
          <div key={i} style={{ marginBottom: i < lines.length - 1 ? "1.2rem" : 0, minHeight: "1.6em" }}>
            {typedLines[i] || ""}
            {activeLine === i && !isComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                style={{ marginLeft: "2px", fontWeight: "normal", color: "#2c2a27" }}
              >
                |
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
