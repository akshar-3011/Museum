/**
 * loadManifest — Static loader for museum manifest
 * Source: Slice 04D specification
 *
 * Pipeline: CONTENT/manifest.json → loadManifest() → MuseumManifest
 *
 * Rules:
 *   - Synchronous, pure function
 *   - Static ES import only (no fetch, no API, no dynamic import)
 *   - Named export only
 */

import type { MuseumManifest, ThemeId, RoomId } from "@/types/domain";
import rawManifest from "../../../CONTENT/manifest.json";

/** Default manifest used when CONTENT/manifest.json is empty */
const DEFAULT_MANIFEST: MuseumManifest = {
  title: "Museum of Mango",
  tagline: "An archive where ordinary moments were preserved until they quietly became extraordinary.",
  version: "1.0.0",
  openingDuration: 1400,
  defaultAudio: true,
  defaultTheme: "paper" as ThemeId,
  roomOrder: ["entrance"] as readonly RoomId[],
};

export function loadManifest(): MuseumManifest {
  const manifest = rawManifest as Record<string, unknown>;

  // Empty manifest (CONTENT/manifest.json is `{}`)
  if (!manifest.title) {
    return DEFAULT_MANIFEST;
  }

  return manifest as unknown as MuseumManifest;
}
