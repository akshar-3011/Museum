# 03_types.md
Museum of Mango
Version: 1.1
Status: LOCKED

## Header Rules

Navigation verbs:

```
Observe
Open
Continue
```

Zustand contains UI state only.
No component contains hardcoded content.

Rendering pipeline:

```
JSON
↓
Type
↓
Component
↓
Render
```

---

## 1. Primitive Types

```typescript
export type MuseumId  = string;
export type ISODate   = string;
export type AssetPath = string;
```

---

## 2. Navigation

```typescript
export type NavigationVerb =
  | "observe"
  | "open"
  | "continue";
```

---

## 3. Visibility

```typescript
export type Visibility =
  | "primary"
  | "secondary"
  | "hidden";
```

---

## 4. Room Identifier

```typescript
export type RoomId =
  | "entrance"
  | "identity"
  | "staying"
  | "impact"
  | "observation"
  | "unfinished"
  | "exit";
```

---

## 5. Theme Identifier

```typescript
export type ThemeId =
  | "paper"
  | "archive"
  | "observation"
  | "memory"
  | "silence";
```

---

## 6. Artifact Type

```typescript
export type ArtifactType =
  | "photo"
  | "video"
  | "field-note"
  | "curator-note"
  | "poem"
  | "letter"
  | "chat"
  | "object";
```

---

## 7. Content Layer

```typescript
export type ContentLayer = 1 | 2 | 3 | 4;
```

> Layer 1 = always visible. Layer 2 = expand. Layer 3–4 = hidden depth. Every `Artifact` belongs to exactly one layer. This is the contract for the layer system — do not substitute `Visibility` for this purpose.

---

## 8. Frame Variant

```typescript
export type FrameVariant =
  | "studied"   // precise, complete, heavy weight
  | "working"   // thinner, slightly imprecise
  | "open";     // three sides only, unfinished
```

> All three variants are required. Agents building `ArtifactFrame.tsx` must use this union — no ad-hoc string values.

---

## 9. Transition Style

```typescript
export type TransitionStyle =
  | "fade-dark"
  | "curtain-reveal"
  | "light-shift";
```

---

## 10. Base Entity

```typescript
export interface BaseEntity {
  readonly id:         MuseumId;
  readonly title:      string;
  readonly room:       RoomId;
  readonly visibility: Visibility;
  readonly priority:   number;
  readonly createdAt:  ISODate;
}
```

---

## 11. Artifact

```typescript
export interface Artifact extends BaseEntity {
  readonly type:          ArtifactType;
  readonly caption:       string;
  readonly asset:         AssetPath;
  readonly theme:         ThemeId;
  readonly layer:         ContentLayer;   // which layer this content belongs to
  readonly rotation?:     number;         // -3 to 3 degrees, optional
  readonly frameVariant:  FrameVariant;   // studied | working | open
}
```

---

## 12. Field Note

```typescript
export interface FieldNote extends BaseEntity {
  readonly subject:        string;
  readonly observation:    string;
  readonly classification: string;
}
```

---

## 13. Curator Note

```typescript
export interface CuratorNote extends BaseEntity {
  readonly text: string;
}
```

---

## 14. Photo

```typescript
export interface Photo extends BaseEntity {
  readonly src:     AssetPath;
  readonly alt:     string;
  readonly caption: string;
}
```

---

## 15. Video

```typescript
export interface Video extends BaseEntity {
  readonly src:    AssetPath;
  readonly poster: AssetPath;
  readonly loop:   boolean;
  readonly muted:  boolean;
}
```

---

## 16. Poem Fragment

```typescript
export interface PoemFragment extends BaseEntity {
  readonly text:   string;
  readonly source: string;
}
```

---

## 17. Letter Fragment

```typescript
export interface LetterFragment extends BaseEntity {
  readonly text:   string;
  readonly source: string;
}
```

---

## 18. Room

```typescript
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
```

---

## 19. Manifest

```typescript
export interface MuseumManifest {
  readonly title:           string;
  readonly tagline:         string;        // experience subtitle shown on opening
  readonly version:         string;
  readonly openingDuration: number;
  readonly defaultAudio:    boolean;
  readonly defaultTheme:    ThemeId;       // applied before user interaction
  readonly roomOrder:       readonly RoomId[];
}
```

---

## 20. Store

```typescript
export interface MuseumState {
  currentRoom:       RoomId;
  openedDrawer:      MuseumId | null;
  audioEnabled:      boolean;
  visitedRooms:      readonly RoomId[];    // tracks chapter progression
  visitedArtifacts:  readonly MuseumId[];
  discoveredLayer3:  readonly MuseumId[]; // tracks hidden layer discoveries
  theme:             ThemeId;
}
```

---

## 21. Component Contract

```typescript
export interface Renderable<T> {
  readonly data:       T;
  readonly className?: string;  // layout only — never visual identity
}
```

All museum components receive typed data.
No component receives raw JSON.

---

## 22. Forbidden Types

Forbidden:

```typescript
any
unknown
object
Record<string, any>
```

Application code must not expose these types.

> `object` is forbidden for the same reason as `any` — agents will reach for it when handling JSON parsing. Use a named interface instead.

---

## 23. Acceptance Checklist

```
✓ Every entity extends BaseEntity where applicable
✓ Every identifier uses union types
✓ Every component receives typed props
✓ No component consumes raw JSON
✓ No any types
✓ No mutable arrays
✓ No mutable entity fields
✓ Domain remains framework independent
✓ ContentLayer exists and is used in Artifact
✓ FrameVariant exists and is used in Artifact
```
