"use client";

import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";

export default function MissingPage() {
  const content = ROOM_05_CONTENT.exhibits.missingPage;

  return (
    <ExhibitFrame id={content.id} tag={content.tag}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "1rem",
        }}
      >
        <h3
          className="font-serif-human"
          style={{
            fontSize: "1.2rem",
            color: "#1c1a17",
            fontWeight: 400,
            margin: 0,
          }}
        >
          {content.title}
        </h3>
        
        {/* The Blank Page Visual */}
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#fdfcf9",
            border: "1px solid rgba(28, 26, 23, 0.05)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Subtle watermark indicating emptiness */}
          <span
            className="font-mono-system"
            style={{
              color: "rgba(28, 26, 23, 0.15)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              transform: "rotate(-2deg)",
            }}
          >
            [ NOT YET RECORDED ]
          </span>
        </div>

        <p
          className="font-serif-human"
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "rgba(28, 26, 23, 0.8)",
            margin: 0,
          }}
        >
          {content.copy}
        </p>
      </div>
    </ExhibitFrame>
  );
}
