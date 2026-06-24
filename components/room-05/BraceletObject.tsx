"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";

export default function BraceletObject() {
  const [isRevealed, setIsRevealed] = useState(false);
  const content = ROOM_05_CONTENT.exhibits.bracelet;

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
        {/* Archival Document Card */}
        <div
          style={{
            backgroundColor: "#f8f5ee",
            border: "1px solid rgba(28, 26, 23, 0.12)",
            boxShadow:
              "inset 0 0 30px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "2.5rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Paper texture grain overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
              pointerEvents: "none",
            }}
          />

          {/* Faded inventory stamp in top-right corner */}
          <div
            className="font-mono-system"
            style={{
              position: "absolute",
              top: "12px",
              right: "14px",
              fontSize: "0.5rem",
              color: "rgba(28, 26, 23, 0.15)",
              letterSpacing: "0.1em",
              transform: "rotate(2deg)",
            }}
          >
            INV-2024-███
          </div>

          {/* Archive card fields */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            {/* Title line */}
            <div
              className="font-mono-system"
              style={{
                fontSize: "0.65rem",
                color: "rgba(28, 26, 23, 0.5)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                paddingBottom: "0.6rem",
                borderBottom: "1px solid rgba(28, 26, 23, 0.08)",
              }}
            >
              {content.title}
            </div>

            {/* Redacted catalog rows */}
            <CatalogRow label="Item Classification" value="Unknown" />
            <CatalogRow label="Acquisition Date" value="[REDACTED]" redacted />
            <CatalogRow label="Material Composition" value="██████████" redacted />
            <CatalogRow label="Dimensions" value="█████ × █████" redacted />
            <CatalogRow label="Disposal Status" value="Failed" />
            <CatalogRow label="Return Status" value="Not applicable" />

            {/* Divider */}
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(28, 26, 23, 0.08)",
                margin: "0.3rem 0",
              }}
            />

            {/* Notes section */}
            <div>
              <span
                className="font-mono-system"
                style={{
                  fontSize: "0.58rem",
                  color: "rgba(28, 26, 23, 0.35)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Notes:
              </span>
              <p
                className="font-serif-human"
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                  color: "rgba(28, 26, 23, 0.75)",
                  marginTop: "0.5rem",
                  marginBottom: 0,
                  fontStyle: "italic",
                }}
              >
                {content.description}
              </p>
            </div>
          </div>

          {/* Faded corner fold */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "28px",
              height: "28px",
              background:
                "linear-gradient(135deg, transparent 50%, rgba(28,26,23,0.04) 50%)",
            }}
          />
        </div>

        {/* Reveal interaction — reflective note */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!isRevealed ? (
            <button
              onClick={() => setIsRevealed(true)}
              aria-expanded={false}
              className="font-mono-system"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(244, 240, 232, 0.15)",
                padding: "0.5rem 1.2rem",
                fontSize: "0.58rem",
                color: "rgba(244, 240, 232, 0.35)",
                cursor: "pointer",
                letterSpacing: "0.12em",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(244, 240, 232, 0.3)";
                e.currentTarget.style.color = "rgba(244, 240, 232, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(244, 240, 232, 0.15)";
                e.currentTarget.style.color = "rgba(244, 240, 232, 0.35)";
              }}
            >
              [ CURATOR&apos;S NOTE ]
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                textAlign: "center",
                maxWidth: "380px",
              }}
            >
              <p
                className="font-serif-human"
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "rgba(244, 240, 232, 0.45)",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {content.hiddenContext}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </ExhibitFrame>
  );
}

/* Catalog row sub-component */
function CatalogRow({
  label,
  value,
  redacted = false,
}: {
  label: string;
  value: string;
  redacted?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "1rem",
      }}
    >
      <span
        className="font-mono-system"
        style={{
          fontSize: "0.58rem",
          color: "rgba(28, 26, 23, 0.35)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        className="font-mono-system"
        style={{
          fontSize: "0.62rem",
          color: redacted
            ? "rgba(28, 26, 23, 0.2)"
            : "rgba(28, 26, 23, 0.55)",
          letterSpacing: "0.05em",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}
