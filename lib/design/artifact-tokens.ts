export type AttachmentStyle = "paperclip" | "sticker" | "stamped-corner" | "none";

export interface ArtifactStyleToken {
  rotation: string; // e.g. "0.6deg"
  alignment: "left" | "right" | "center";
  attachment: AttachmentStyle;
  shadowDepth: string; // Softened CSS values for box-shadow
}

// Global modifiers for the threshold/exhibit/observation hierarchy refinement pass
export const HIERARCHY_MODIFIERS = {
  photoScaleMultiplier: 1.18, // Primary photo dimensions multiplier
  matPadding: "1.6rem 1.6rem 1.6rem 1.6rem", // Standard archival mat border padding
  labelFontSize: "0.62rem", // Standard system tag font size
  attachmentScale: 0.8, // Standard attachment scale (paperclips, stickers, stamps)
};

// Deterministic design tokens for Room 01 thresholds, exhibits, and observations
export const ROOM_01_TOKENS: Record<string, ArtifactStyleToken> = {
  threshold: {
    rotation: "0.5deg",
    alignment: "left",
    attachment: "none",
    shadowDepth: "0 1px 4px rgba(0,0,0,0.15)",
  },
  exhibit1: {
    rotation: "0.6deg",
    alignment: "left",
    attachment: "sticker",
    shadowDepth: "0 4px 12px rgba(0,0,0,0.22)",
  },
  exhibit2: {
    rotation: "-0.4deg",
    alignment: "right",
    attachment: "stamped-corner",
    shadowDepth: "0 3px 10px rgba(0,0,0,0.2)",
  },
  exhibit3: {
    rotation: "0.5deg",
    alignment: "left",
    attachment: "paperclip",
    shadowDepth: "0 3px 9px rgba(0,0,0,0.18)",
  },
  exhibit4: {
    rotation: "-0.5deg",
    alignment: "right",
    attachment: "none",
    shadowDepth: "0 3px 10px rgba(0,0,0,0.2)",
  },
  exhibit5: {
    rotation: "0.7deg",
    alignment: "left",
    attachment: "none",
    shadowDepth: "0 4px 14px rgba(0,0,0,0.22)",
  },
  secret: {
    rotation: "-0.8deg",
    alignment: "center",
    attachment: "none",
    shadowDepth: "0 6px 18px rgba(0,0,0,0.28)",
  },
  final: {
    rotation: "0deg",
    alignment: "center",
    attachment: "none",
    shadowDepth: "0 2px 6px rgba(0,0,0,0.15)",
  },
};

// Deterministic hash function for consistent per-exhibit styling
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = Math.imul(31, hash) + str.charCodeAt(i) | 0;
  }
  return Math.abs(hash);
}

// Returns a safe, deterministic styling token based on exhibit name/id
export function getArtifactToken(id: string): ArtifactStyleToken {
  if (ROOM_01_TOKENS[id]) {
    return ROOM_01_TOKENS[id];
  }

  // Extend token system deterministically for Rooms 02-05
  const hash = hashString(id);
  const rotations = ["0.5deg", "-0.4deg", "0.6deg", "-0.5deg", "0.7deg", "-0.6deg", "0.4deg", "-0.7deg"];
  const alignments = ["left", "right", "center"] as const;
  const attachments = ["none", "sticker", "paperclip", "stamped-corner", "none", "none"] as const; // skew toward 'none'
  const shadows = [
    "0 1px 4px rgba(0,0,0,0.15)",
    "0 3px 9px rgba(0,0,0,0.18)",
    "0 3px 10px rgba(0,0,0,0.2)",
    "0 4px 12px rgba(0,0,0,0.22)",
    "0 4px 14px rgba(0,0,0,0.22)",
  ];

  return {
    rotation: rotations[hash % rotations.length],
    alignment: alignments[hash % alignments.length],
    attachment: attachments[hash % attachments.length],
    shadowDepth: shadows[hash % shadows.length],
  };
}
