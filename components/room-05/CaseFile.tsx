"use client";

import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";

export default function CaseFile() {
  const content = ROOM_05_CONTENT.exhibits.caseFile;

  return (
    <ExhibitFrame id={content.id} tag={content.tag}>
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Partially-closed folder visual using pure CSS structure */}
        <div
          style={{
            width: "100%",
            height: "120px",
            backgroundColor: "#dcd2b8", // folder manila
            border: "1px solid rgba(28, 26, 23, 0.15)",
            borderTopRightRadius: "4px",
            position: "relative",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {/* Folder Tab */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: 0,
              width: "120px",
              height: "20px",
              backgroundColor: "#dcd2b8",
              border: "1px solid rgba(28, 26, 23, 0.15)",
              borderBottom: "none",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          />
          
          {/* Paper inside sticking out */}
          <div
            style={{
              position: "absolute",
              top: "-5px",
              left: "10px",
              right: "20px",
              height: "100%",
              backgroundColor: "#fdfcf9",
              border: "1px solid rgba(28, 26, 23, 0.1)",
              zIndex: -1,
              transform: "rotate(1deg)",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.05)",
            }}
          />
          
          <div
            className="font-mono-system"
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              color: "#ab3c2d", // red ink
              fontSize: "0.85rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              border: "2px solid #ab3c2d",
              padding: "0.2rem 0.5rem",
              transform: "rotate(-3deg)",
            }}
          >
            STATUS: OPEN
          </div>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h3
            className="font-serif-human"
            style={{
              fontSize: "1.4rem",
              color: "#1c1a17",
              marginBottom: "1rem",
              fontWeight: 400,
            }}
          >
            {content.title}
          </h3>
          <p
            className="font-serif-human"
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "rgba(28, 26, 23, 0.8)",
              whiteSpace: "pre-line",
            }}
          >
            {content.copy}
          </p>
        </div>
      </div>
    </ExhibitFrame>
  );
}
