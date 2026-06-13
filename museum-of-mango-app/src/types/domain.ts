/**
 * Museum of Mango — Domain Types
 * Source of truth: SPEC/03_types.md v1.1
 *
 * Rules:
 *   - No any, unknown, object, Record<string, any>
 *   - No mutable arrays or entity fields
 *   - Every entity extends BaseEntity where applicable
 *   - Every identifier uses union types
 */

// ─── 1. Primitive Types ──────────────────────────────────────────────────────

export type MuseumId  = string;
export type ISODate   = string;
export type AssetPath = string;

// ─── 2. Navigation ───────────────────────────────────────────────────────────

export type NavigationVerb =
  | "observe"
  | "open"
  | "continue";

// ─── 3. Visibility ───────────────────────────────────────────────────────────

export type Visibility =
  | "primary"
  | "secondary"
  | "hidden";

// ─── 4. Room Identifier ──────────────────────────────────────────────────────

export type RoomId =
  | "entrance"
  | "identity"
  | "staying"
  | "impact"
  | "observation"
  | "unfinished"
  | "exit";

// ─── 5. Theme Identifier ─────────────────────────────────────────────────────

export type ThemeId =
  | "paper"
  | "archive"
  | "observation"
  | "memory"
  | "silence";

// ─── 6. Artifact Type ────────────────────────────────────────────────────────

export type ArtifactType =
  | "photo"
  | "video"
  | "field-note"
  | "curator-note"
  | "poem"
  | "letter"
  | "chat"
  | "object";

// ─── 7. Content Layer ────────────────────────────────────────────────────────

/**
 * Layer 1 = always visible.
 * Layer 2 = expand.
 * Layer 3–4 = hidden depth.
 * Every Artifact belongs to exactly one layer.
 */
export type ContentLayer = 1 | 2 | 3 | 4;

// ─── 8. Frame Variant ────────────────────────────────────────────────────────

export type FrameVariant =
  | "studied"   // precise, complete, heavy weight
  | "working"   // thinner, slightly imprecise
  | "open";     // three sides only, unfinished

// ─── 9. Transition Style ─────────────────────────────────────────────────────

export type TransitionStyle =
  | "fade-dark"
  | "curtain-reveal"
  | "light-shift";

// ─── 10. Base Entity ─────────────────────────────────────────────────────────

export interface BaseEntity {
  readonly id:         MuseumId;
  readonly title:      string;
  readonly room:       RoomId;
  readonly visibility: Visibility;
  readonly priority:   number;
  readonly createdAt:  ISODate;
}

// ─── 11. Artifact ────────────────────────────────────────────────────────────

export interface Artifact extends BaseEntity {
  readonly type:                ArtifactType;
  readonly caption:             string;
  readonly asset:               AssetPath;
  readonly theme:               ThemeId;
  readonly layer:               ContentLayer;
  readonly rotation?:           number;         // -3 to 3 degrees, optional
  readonly frameVariant:        FrameVariant;
  readonly primary?:            string;         // chat artifact: raw emoji/phrase
  readonly preservationReason?: string;         // chat artifact: placard text
}

// ─── 12. Field Note ──────────────────────────────────────────────────────────

export interface FieldNote extends BaseEntity {
  readonly subject:        string;
  readonly observation:    string;
  readonly classification: string;
}

// ─── 13. Curator Note ────────────────────────────────────────────────────────

export interface CuratorNote extends BaseEntity {
  readonly text: string;
}

// ─── 14. Photo ───────────────────────────────────────────────────────────────

export interface Photo extends BaseEntity {
  readonly src:     AssetPath;
  readonly alt:     string;
  readonly caption: string;
}

// ─── 15. Video ───────────────────────────────────────────────────────────────

export interface Video extends BaseEntity {
  readonly src:    AssetPath;
  readonly poster: AssetPath;
  readonly loop:   boolean;
  readonly muted:  boolean;
}

// ─── 16. Poem Fragment ───────────────────────────────────────────────────────

export interface PoemFragment extends BaseEntity {
  readonly text:   string;
  readonly source: string;
}

// ─── 17. Letter Fragment ─────────────────────────────────────────────────────

export interface LetterFragment extends BaseEntity {
  readonly text:   string;
  readonly source: string;
}

// ─── 18. Room ────────────────────────────────────────────────────────────────

export interface Room {
  readonly id:                RoomId;
  readonly title:             string;
  readonly subtitle:          string;
  readonly theme:             ThemeId;
  readonly archiveNumber:     string;              // "01", "02", etc.
  readonly artifacts:         readonly MuseumId[];
  readonly fieldNotes:        readonly MuseumId[];
  readonly curatorNotes:      readonly MuseumId[];
  readonly ambientAudioId:    string;
  readonly transitionStyle:   TransitionStyle;
  readonly estimatedDuration: number;              // seconds
}

// ─── 19. Manifest ────────────────────────────────────────────────────────────

export interface MuseumManifest {
  readonly title:           string;
  readonly tagline:         string;
  readonly version:         string;
  readonly openingDuration: number;
  readonly defaultAudio:    boolean;
  readonly defaultTheme:    ThemeId;
  readonly roomOrder:       readonly RoomId[];
}

// ─── 20. Store ───────────────────────────────────────────────────────────────

export interface MuseumState {
  currentRoom:       RoomId;
  openedDrawer:      MuseumId | null;
  audioEnabled:      boolean;
  visitedRooms:      readonly RoomId[];
  visitedArtifacts:  readonly MuseumId[];
  discoveredLayer3:  readonly MuseumId[];
  theme:             ThemeId;
}

// ─── 21. Component Contract ──────────────────────────────────────────────────

export interface Renderable<T> {
  readonly data:       T;
  readonly className?: string;  // layout only — never visual identity
}
