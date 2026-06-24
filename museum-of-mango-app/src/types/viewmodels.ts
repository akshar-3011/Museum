/**
 * Museum of Mango — ViewModel Types
 * Source of truth: SPEC/05A_viewmodels.md v1.1
 *
 * ViewModels transform validated domain data into presentation-ready objects.
 * Presentation components receive ViewModels only.
 */

import type {
  Artifact,
  Photo,
  Video,
  FieldNote,
  CuratorNote,
  PoemFragment,
  LetterFragment,
  Room,
  MuseumManifest,
  MuseumId,
  RoomId,
  ContentLayer,
  FrameVariant,
} from "@/types/domain";

// ─── Rotation Type ───────────────────────────────────────────────────────────

/** Degrees, constrained -3 to 3. Resolver clamps out-of-range values. */
export type Rotation = number;

// ─── ArtifactViewModel ───────────────────────────────────────────────────────

export interface ArtifactViewModel {
  readonly artifact:            Artifact;
  readonly primary?:            string;
  readonly secondary?:          string;
  readonly preservationReason?: string;
  readonly photo?:              Photo;
  readonly video?:              Video;
  readonly fieldNote?:          FieldNote;
  readonly curatorNote?:        CuratorNote;
  readonly poem?:               PoemFragment;
  readonly letter?:             LetterFragment;
  readonly layer:               ContentLayer;
  readonly frameVariant:        FrameVariant;
  readonly rotation:            Rotation;
  readonly isDiscovered:        boolean;
  readonly canObserve:          boolean;
  readonly canOpen:             boolean;
}

// ─── RoomViewModel ───────────────────────────────────────────────────────────

export interface RoomViewModel {
  readonly room:         Room;
  readonly artifacts:    readonly ArtifactViewModel[];
  readonly fieldNotes:   readonly FieldNote[];
  readonly curatorNotes: readonly CuratorNote[];
}

// ─── DrawerViewModel ─────────────────────────────────────────────────────────

/**
 * Content order contract (always this order, regardless of presence):
 *   1. FieldNote
 *   2. CuratorNote
 *   3. PoemFragment
 *   4. LetterFragment
 */
export interface DrawerViewModel {
  readonly id:      MuseumId;
  readonly title:   string;
  readonly content: readonly (
    | FieldNote
    | CuratorNote
    | PoemFragment
    | LetterFragment
  )[];
  readonly isOpen: boolean;
}

// ─── PhotoViewModel ──────────────────────────────────────────────────────────

export interface PhotoViewModel {
  readonly artifact:     Artifact;
  readonly photo:        Photo;
  readonly frameVariant: FrameVariant;
  readonly rotation:     Rotation;
  readonly borderless:   false;   // photos are never borderless — locked in type
}

// ─── VideoViewModel ──────────────────────────────────────────────────────────

export interface VideoViewModel {
  readonly artifact: Artifact;
  readonly video:    Video;
  readonly autoplay: false;   // autoplay is never permitted — locked in type
  readonly muted:    true;    // muted is always required — locked in type
}

// ─── MuseumViewModel ─────────────────────────────────────────────────────────

/**
 * Resolver resolves one room at a time, triggered by room transitions.
 * All other rooms remain unresolved until navigation reaches them.
 */
export interface MuseumViewModel {
  readonly manifest:    MuseumManifest;
  readonly currentRoom: RoomViewModel;  // only the current room is resolved
  readonly nextRoomId:  RoomId | null;  // for prefetch only, not rendered
}
