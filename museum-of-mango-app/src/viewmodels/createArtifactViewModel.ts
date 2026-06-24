/**
 * createArtifactViewModel — Factory for presentation-ready artifact data
 * Source: Slice 04D specification
 *
 * Pipeline position:
 *   Artifact + FieldNote → resolvers → createArtifactViewModel → ArtifactVM
 *
 * The ArtifactVM is the WHAT (content from JSON, via resolver).
 * useObservation state is the HOW MUCH (UI state, owned by component).
 * These two concerns are never merged.
 *
 * Rules:
 *   - Pure function
 *   - Immutable output
 *   - No any, unknown, object
 *   - Named export only
 */

import type { Artifact, FieldNote, MuseumId, FrameVariant } from "@/types/domain";
import type { Rotation } from "@/types/viewmodels";
import { resolveArtifact } from "@/resolvers/resolveArtifact";
import { resolveFieldNote } from "@/resolvers/resolveFieldNote";

/**
 * Presentation-ready flat ViewModel for a single exhibit.
 * Contains ONLY content data — no UI state.
 */
export interface ArtifactVM {
  readonly id: MuseumId;
  readonly title: string;
  readonly subtitle: string;
  readonly date: string;
  readonly caption: string;
  readonly asset: string;
  readonly fieldNote: string;
  readonly drawerText: string;
  readonly drawerContent?: string;
  readonly frameVariant: FrameVariant;
  readonly rotation: Rotation;
}

/** Default drawer text for demo fixtures */
const DEMO_DRAWER_TEXT =
  "Preserved for structural verification only.\n\nNo emotional content exists yet.\n\nArchive integrity verified.";

interface CreateOptions {
  readonly drawerFieldNote?: FieldNote;
  readonly placardSubtitle?: string;
  readonly placardDate?: string;
}

export function createArtifactViewModel(
  artifact: Artifact,
  fieldNote: FieldNote,
  options?: CreateOptions,
): ArtifactVM {
  const resolved = resolveArtifact(artifact, {
    subtitle: options?.placardSubtitle ?? artifact.subtitle,
    date: options?.placardDate,
  });
  const fieldNoteText = resolveFieldNote(fieldNote);

  return {
    id: resolved.id,
    title: resolved.title,
    subtitle: resolved.subtitle,
    date: resolved.date,
    caption: resolved.caption,
    asset: resolved.asset ?? "",
    fieldNote: fieldNoteText,
    drawerText: options?.drawerFieldNote
      ? resolveFieldNote(options.drawerFieldNote)
      : DEMO_DRAWER_TEXT,
    drawerContent: artifact.drawerContent,
    frameVariant: resolved.frameVariant,
    rotation: resolved.rotation,
  };
}

