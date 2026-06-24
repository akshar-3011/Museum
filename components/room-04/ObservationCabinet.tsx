"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ROOM_04_CONTENT, ObservationContent } from "@/lib/rooms/room-04-content";
import { useObservationState } from "@/hooks/useObservationState";
import DrawerFront from "./DrawerFront";
import ObservationDetail from "./ObservationDetail";
import SecretCabinet from "./SecretCabinet";

export default function ObservationCabinet() {
  const observations = ROOM_04_CONTENT.observations;
  const { states, markOpened } = useObservationState(observations.map(o => o.id));
  const [activeObservation, setActiveObservation] = useState<ObservationContent | null>(null);

  const handleOpenDrawer = (obs: ObservationContent) => {
    markOpened(obs.id);
    setActiveObservation(obs);
  };

  const handleCloseDrawer = () => {
    setActiveObservation(null);
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* The Main Cabinet Grid Wrapper for Mobile Scroll */}
      <div style={{ width: "100%", overflowX: "auto", paddingBottom: "1rem", display: "flex", justifyContent: "center" }}>
        <div
          className="cabinet-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px", // tight gaps for physical cabinet look
            width: "100%",
            minWidth: "700px", // Ensures the 3-column grid doesn't crush on desktop
            maxWidth: "900px", // width of the physical cabinet desk
            backgroundColor: "#1c1a17", // dark wood cabinet frame behind drawers
            padding: "12px",
            borderRadius: "4px 4px 0 0", // flat bottom
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.05)",
            border: "2px solid rgba(255,255,255,0.05)",
            borderBottom: "none",
          }}
        >
        {/* We arrange the 7 observations in the grid.
            Grid structure (3 cols):
            Row 1: [Obs 1] [Obs 2 spans 2]
            Row 2: [Obs 3] [Obs 6 spans 2x2]
            Row 3: [Obs 4 spans 2] (Obs 6 spans into col 3)
            Row 4: [Obs 5] [Obs 7 spans 2]
            We just rely on auto-placement and CSS Grid row spans.
            Obs 6 is 'large' so it spans 2x2.
        */}
        {observations.map((obs) => (
          <DrawerFront
            key={obs.id}
            observation={obs}
            state={states[obs.id]}
            onClick={() => handleOpenDrawer(obs)}
          />
        ))}
        </div>
      </div>

      {/* The false-bottom secret cabinet */}
      <SecretCabinet />

      {/* The opened observation modal/desk view */}
      <AnimatePresence>
        {activeObservation && (
          <ObservationDetail
            key="detail"
            observation={activeObservation}
            onClose={handleCloseDrawer}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
