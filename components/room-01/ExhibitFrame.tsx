"use client";

import React from "react";
import { getArtifactToken, HIERARCHY_MODIFIERS } from "@/lib/design/artifact-tokens";

interface ExhibitFrameProps {
  id: string;
  children: React.ReactNode;
  tag?: string;
}

export default function ExhibitFrame({ id, children, tag }: ExhibitFrameProps) {
  const token = getArtifactToken(id);

  return (
    <div
      style={{
        transform: `rotate(${token.rotation})`,
        boxShadow: token.shadowDepth,
        backgroundColor: "#f5f0e6", // warm aged paper
        color: "#1c1a17", // ink black
        padding: HIERARCHY_MODIFIERS.matPadding, // reduced mat border padding
        borderRadius: "2px 3px 2px 4px", // micro-imperfections in paper cut
        position: "relative",
        width: "100%",
        border: "1px solid rgba(28, 26, 23, 0.07)",
        transition: "transform 0.4s ease-out, box-shadow 0.4s ease-out",
        boxSizing: "border-box",
      }}
      className="font-serif-human"
    >
      {/* Physical overlays based on design system tokens */}
      {token.attachment === "paperclip" && <PaperclipOverlay />}
      {token.attachment === "sticker" && <StickerOverlay text={tag} />}
      {token.attachment === "stamped-corner" && <StampOverlay />}

      {/* Render subtag header if not a sticker overlay */}
      {tag && token.attachment !== "sticker" && (
        <div
          className="font-mono-system"
          style={{
            fontSize: HIERARCHY_MODIFIERS.labelFontSize,
            color: "rgba(28, 26, 23, 0.35)", // quieter label text
            marginBottom: "0.8rem",
            borderBottom: "1px dashed rgba(28, 26, 23, 0.1)",
            paddingBottom: "0.4rem",
            letterSpacing: "0.08em",
          }}
        >
          {tag}
        </div>
      )}

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// Tactile overlays (scaled down to prevent competing with photos):
function PaperclipOverlay() {
  const scale = HIERARCHY_MODIFIERS.attachmentScale;
  return (
    <div
      style={{
        position: "absolute",
        top: "-12px",
        left: "28px",
        width: "16px",
        height: "44px",
        borderRadius: "8px",
        border: "3px solid #8e8a82",
        backgroundColor: "transparent",
        boxShadow: "1px 2px 4px rgba(0,0,0,0.12)",
        zIndex: 10,
        pointerEvents: "none",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "2px",
          width: "6px",
          height: "28px",
          borderRadius: "4px",
          border: "2px solid #8e8a82",
          borderTop: "none",
        }}
      />
    </div>
  );
}

function StickerOverlay({ text }: { text?: string }) {
  const scale = HIERARCHY_MODIFIERS.attachmentScale;
  return (
    <div
      style={{
        position: "absolute",
        top: "-12px",
        left: "18px",
        backgroundColor: "#e3d8be", // darker library tab cardstock
        padding: "0.3rem 0.8rem",
        boxShadow: "1px 1.5px 4px rgba(0,0,0,0.1)",
        transform: `rotate(-1.5deg) scale(${scale})`,
        transformOrigin: "top left",
        border: "1px solid rgba(28, 26, 23, 0.08)",
        fontSize: "0.62rem",
        color: "rgba(28, 26, 23, 0.55)", // quieter sticker text
        zIndex: 5,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
      className="font-mono-system"
    >
      {text ? text.split(" // ")[0] : "ARCHIVE"}
    </div>
  );
}

function StampOverlay() {
  const scale = HIERARCHY_MODIFIERS.attachmentScale;
  return (
    <div
      className="font-mono-system"
      style={{
        position: "absolute",
        top: "14px",
        right: "14px",
        border: "2px dashed #ab3c2d", // red ink stamp
        color: "#ab3c2d",
        padding: "0.25rem 0.6rem",
        fontSize: "0.62rem",
        fontWeight: "bold",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: 0.6, // quieter stamp opacity
        transform: `rotate(8deg) scale(${scale})`,
        transformOrigin: "top right",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 5,
      }}
    >
      ACCEPTED
    </div>
  );
}
