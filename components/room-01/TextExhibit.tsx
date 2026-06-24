"use client";

import { useReducedMotion } from "framer-motion";
import ExhibitFrame from "./ExhibitFrame";
import { ExhibitContent } from "@/lib/room-01/content";

interface TextExhibitProps {
  exhibit: ExhibitContent;
  extraChildren?: React.ReactNode;
}

export default function TextExhibit({ exhibit, extraChildren }: TextExhibitProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ExhibitFrame id={exhibit.id} tag={exhibit.tag}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
        }}
      >
        {/* Render customized visual layouts based on exhibit ID */}
        {exhibit.id === "exhibit2" && <FieldNoteLayout />}
        {exhibit.id === "exhibit3" && <TwoNamesLayout shouldReduceMotion={!!shouldReduceMotion} />}
        {exhibit.id === "exhibit4" && (
          <TypewrittenLayout quote={exhibit.meta?.quote || ""} />
        )}

        {/* Narrative Description */}
        <div style={{ padding: "0.2rem" }}>
          <p
            className="font-serif-human"
            style={{
              fontSize: "1rem",
              lineHeight: 1.68,
              color: "#2c2a27",
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

// Custom Sub-Layouts:

// Exhibit 02: Field Note with hand-drawn strikethrough and permanent stamp
function FieldNoteLayout() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        padding: "1.5rem 1rem",
        backgroundColor: "#fbf9f4",
        border: "1px dashed rgba(28, 26, 23, 0.12)",
        borderRadius: "2px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Old Tag with hand-drawn strikethrough overlay */}
      <div
        className="font-mono-system"
        style={{
          fontSize: "0.95rem",
          color: "rgba(28, 26, 23, 0.4)",
          position: "relative",
          display: "inline-block",
          padding: "0.2rem 0.5rem",
          letterSpacing: "0.12em",
          userSelect: "none",
        }}
      >
        TEMPORARY
        {/* Wiggly strikethrough SVG */}
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: "50%",
            left: "-5%",
            width: "110%",
            height: "14px",
            transform: "translateY(-50%) rotate(-2deg)",
            pointerEvents: "none",
          }}
        >
          <path
            d="M 2 5 Q 22 2, 45 6 T 98 4"
            stroke="#ab3c2d"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Overlapping permanent ink stamp */}
      <div
        className="font-mono-system"
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#ab3c2d", // red ink stamp
          border: "2px solid #ab3c2d",
          borderRadius: "3px",
          padding: "0.3rem 0.8rem",
          letterSpacing: "0.12em",
          transform: "rotate(-5deg) scale(0.85)", // reduced rotation and scale
          boxShadow: "1px 1.5px 3px rgba(171, 60, 45, 0.1)",
          userSelect: "none",
          backgroundColor: "rgba(251, 249, 244, 0.9)",
          zIndex: 2,
          opacity: 0.55, // reduced opacity
        }}
      >
        PERMANENT
      </div>
    </div>
  );
}

// Exhibit 03: Two names represented as physical, slightly misaligned labels
function TwoNamesLayout({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.2rem",
        padding: "1.5rem 1rem",
        backgroundColor: "#fbf9f4",
        border: "1px dashed rgba(28, 26, 23, 0.12)",
        borderRadius: "2px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Label 1: Legal Name */}
      <div
        style={{
          transform: shouldReduceMotion ? "none" : "rotate(-0.8deg)", // reduced rotation
          backgroundColor: "#ffffff",
          border: "1px solid rgba(28, 26, 23, 0.12)",
          padding: "0.6rem 1.4rem",
          fontSize: "1.05rem",
          fontWeight: 400,
          color: "rgba(28, 26, 23, 0.75)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
          borderRadius: "1px",
          userSelect: "none",
        }}
        className="font-serif-human"
      >
        Vidhi
      </div>

      {/* Visual separator */}
      <span style={{ color: "rgba(28, 26, 23, 0.25)", fontSize: "0.8rem" }}>/</span>

      {/* Label 2: Mango Name */}
      <div
        style={{
          transform: shouldReduceMotion ? "none" : "rotate(1.0deg)", // reduced rotation
          backgroundColor: "#ffffff",
          border: "1px solid rgba(217, 160, 91, 0.25)",
          padding: "0.6rem 1.4rem",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "var(--color-accent)", // Mango accent
          boxShadow: "0 2px 8px rgba(217, 160, 91, 0.15)",
          borderRadius: "1px",
          marginTop: "0.2rem",
          userSelect: "none",
        }}
        className="font-serif-human"
      >
        Mango
      </div>
    </div>
  );
}

// Exhibit 04: Transcription formatted with a vintage, irregular typewriter font
interface TypewrittenLayoutProps {
  quote: string;
}

function TypewrittenLayout({ quote }: TypewrittenLayoutProps) {
  return (
    <div
      className="font-typewriter-archival"
      style={{
        backgroundColor: "#fdfcf9", // clean, slightly brighter paper slip
        border: "1px solid rgba(28, 26, 23, 0.1)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.03)",
        padding: "1.5rem 1.8rem",
        borderRadius: "2px",
        fontSize: "0.98rem",
        lineHeight: 1.6,
        color: "#2c2a27",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Typewriter ink smudge effect */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          width: "20px",
          height: "20px",
          backgroundColor: "rgba(0,0,0,0.04)",
          filter: "blur(6px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      &ldquo;{quote}&rdquo;
    </div>
  );
}
