"use client";

import { motion } from "framer-motion";
import React from "react";
import { DrawerState } from "@/hooks/useObservationState";
import { ObservationContent } from "@/lib/rooms/room-04-content";

interface DrawerFrontProps {
  observation: ObservationContent;
  state: DrawerState;
  onClick: () => void;
}

const DrawerFront = React.memo(function DrawerFront({ observation, state, onClick }: DrawerFrontProps) {
  const isOpened = state === "opened-this-session";
  const isLarge = observation.gridSpan === "large";
  const isMedium = observation.gridSpan === "medium";

  return (
    <button
      className="drawer-span drawer-btn"
      onClick={onClick}
      aria-label={`Open ${observation.title}`}
      role="button"
      tabIndex={0}
      style={{
        // CSS Grid spans mapped directly to the props
        gridColumn: isLarge ? "span 2" : isMedium ? "span 2" : "span 1",
        gridRow: isLarge ? "span 2" : "span 1",
        
        // Physical Drawer Styling
        backgroundColor: "#f5f0e6", // Archival drawer color
        borderRadius: "4px",
        boxShadow: isOpened 
          ? "0 4px 10px rgba(0,0,0,0.2), inset 0 2px 5px rgba(255,255,255,0.1)"
          : "0 8px 20px rgba(0,0,0,0.4), inset 0 2px 5px rgba(255,255,255,0.2)",
        border: "1px solid rgba(28, 26, 23, 0.2)",
        borderBottom: "4px solid rgba(28, 26, 23, 0.5)",
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isLarge ? "3rem" : "1.5rem",
        padding: isLarge ? "4rem" : "2rem",
        cursor: "pointer",
        position: "relative",
        opacity: isOpened ? 0.85 : 1, // Dimmed if opened
        transition: "opacity 0.4s ease, box-shadow 0.2s ease",
        height: "100%", // Fill grid cell
        width: "100%",

      }}
    >
      {/* Cardstock Label Holder */}
      <div
        style={{
          backgroundColor: "#e3d8be",
          padding: isLarge ? "0.8rem 2.5rem" : "0.5rem 1.2rem",
          border: "2px solid #8e8a82",
          borderRadius: "2px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Thumbprint artifact (revisit mark) */}
        {isOpened && (
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: "25px",
              height: "35px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(142, 138, 130, 0.15) 0%, rgba(142, 138, 130, 0) 70%)",
              border: "1px dashed rgba(142, 138, 130, 0.1)",
              transform: "rotate(-15deg)",
              pointerEvents: "none",
            }}
          />
        )}
        <span
          className="font-mono-system"
          style={{
            fontSize: isLarge ? "0.75rem" : "0.55rem",
            color: "rgba(28, 26, 23, 0.6)",
            letterSpacing: "0.12em",
            marginBottom: "0.2rem",
          }}
        >
          {observation.tag}
        </span>
        <span
          className="font-serif-human"
          style={{
            fontSize: isLarge ? "1.4rem" : "0.95rem",
            color: "#1c1a17", // dark ink on physical cardstock
            fontWeight: isLarge ? 500 : 400,
          }}
        >
          {observation.title}
        </span>

        {/* Opened State: Red Ink Stamp Overlay */}
        {isOpened && (
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="font-mono-system"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-8deg)",
              border: "2px solid #ab3c2d", // red ink
              color: "#ab3c2d",
              padding: "0.2rem 0.6rem",
              fontSize: isLarge ? "0.8rem" : "0.6rem",
              fontWeight: "bold",
              letterSpacing: "0.15em",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            REVIEWED
          </motion.div>
        )}
      </div>

      {/* Brass Pull Handle */}
      <div
        style={{
          width: isLarge ? "120px" : "70px",
          height: isLarge ? "24px" : "14px",
          borderRadius: "3px",
          backgroundColor: "#b48b59", // brass
          borderTop: "2px solid #d4b58c",
          borderBottom: "3px solid #755530",
          boxShadow: isOpened ? "0 2px 4px rgba(0,0,0,0.2)" : "0 4px 6px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
});

export default DrawerFront;
