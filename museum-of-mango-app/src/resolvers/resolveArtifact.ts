/**
 * resolveArtifact — Transform raw Artifact into presentation data
 * Source: Slice 04D specification
 *
 * Rules:
 *   - Pure function: no mutation, no sorting, no filtering
 *   - Clamps rotation to -3..3 per SPEC/05A_viewmodels.md
 *   - Never renders JSX
 *   - Named export only
 */

import type { Artifact, FrameVariant } from "@/types/domain";
import type { Rotation } from "@/types/viewmodels";

/** Clamp rotation to the -3 to 3 degree range per spec */
function clampRotation(value: number | undefined): Rotation {
  if (value === undefined) return 0;
  return Math.max(-3, Math.min(3, value));
}

interface ResolvedArtifact {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly date: string;
  readonly caption: string;
  readonly asset: string;
  readonly frameVariant: FrameVariant;
  readonly rotation: Rotation;
}

interface ResolveOptions {
  readonly subtitle?: string;
  readonly date?: string;
}

export function resolveArtifact(
  artifact: Artifact,
  options?: ResolveOptions,
): ResolvedArtifact {
  return {
    id: artifact.id,
    title: artifact.title,
    subtitle: options?.subtitle ?? "Archive Entry",
    date: options?.date ?? artifact.createdAt.slice(0, 4),
    caption: artifact.caption,
    asset: artifact.asset,
    frameVariant: artifact.frameVariant,
    rotation: clampRotation(artifact.rotation),
  };
}
