/**
 * loadArtifacts — Static loader for museum artifacts
 * Source: Slice 04D specification
 *
 * Pipeline: CONTENT/artifacts.json → loadArtifacts() → readonly Artifact[]
 *
 * Rules:
 *   - Synchronous, pure function
 *   - Static ES import only
 *   - If the array is empty, returns exactly one demo artifact
 *   - Demo fixture is a pipeline test object, not museum content
 *   - Named export only
 */

import type { Artifact } from "@/types/domain";
import rawArtifacts from "../../../CONTENT/artifacts.json";

/** Demo artifact used when CONTENT/artifacts.json is empty */
const DEMO_ARTIFACT: Artifact = {
  id: "artifact.demo.001",
  title: "Untitled Observation",
  room: "entrance",
  visibility: "primary",
  priority: 1,
  createdAt: "2026-06-01",
  type: "object",
  caption: "Preserved for structural verification only.",
  asset: "",
  theme: "paper",
  layer: 1,
  rotation: 0,
  frameVariant: "studied",
};

export function loadArtifacts(): readonly Artifact[] {
  const artifacts = rawArtifacts as readonly Artifact[];

  if (artifacts.length === 0) {
    return [DEMO_ARTIFACT] as const;
  }

  return artifacts;
}
