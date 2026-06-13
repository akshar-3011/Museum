# 05A_viewmodels.md

# Museum of Mango

Version: 1.1
Status: LOCKED

---

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
Resolver
↓
ViewModel
↓
Component
↓
Render
```

> This document supersedes the pipeline defined in `05_components.md`.
> `05_components.md` pipeline will be updated to match before handoff.

---

## Purpose

ViewModels transform validated domain data into presentation-ready objects.
Presentation components receive ViewModels only.
Presentation components never resolve references.
Presentation components never access JSON directly.

---

## Resolver Contract

Resolvers:

- receive typed domain objects
- resolve references
- merge related entities
- read UI state
- return immutable ViewModels

Resolvers never render UI.

---

## Rotation Type

```typescript
export type Rotation = number; // degrees, constrained -3 to 3
```

> Resolver rule: Rotation values outside `-3` to `3` are clamped to the nearest bound.
> A value of `4` becomes `3`. A value of `-5` becomes `-3`. Never passed through unclamped.

---

## ArtifactViewModel

```typescript
export interface ArtifactViewModel {
  readonly artifact:           Artifact;
  readonly primary?:           string;
  readonly secondary?:         string;
  readonly preservationReason?: string;
  readonly photo?:             Photo;
  readonly video?:             Video;
  readonly fieldNote?:         FieldNote;
  readonly curatorNote?:       CuratorNote;
  readonly poem?:              PoemFragment;
  readonly letter?:            LetterFragment;
  readonly layer:              ContentLayer;
  readonly frameVariant:       FrameVariant;
  readonly rotation:           Rotation;
  readonly isDiscovered:       boolean;
  readonly canObserve:         boolean;
  readonly canOpen:            boolean;
}
```

---

## Layer Contract

```text
Collapsed
↓
Layer 1 — Always visible. 2–5 lines.

Observed
↓
Layer 2 — Expanded. 8–12 lines. Triggered by: Observe.

Opened
↓
Layer 3 — Hidden archive. Triggered by: Open. Optional.
          If absent, canOpen is false. "Open" verb does not appear.

Layer 4 — Curator archive. Internal museum metadata.
          Never rendered directly.
```

---

## RoomViewModel

```typescript
export interface RoomViewModel {
  readonly room:         Room;
  readonly artifacts:   readonly ArtifactViewModel[];
  readonly fieldNotes:  readonly FieldNote[];
  readonly curatorNotes: readonly CuratorNote[];
}
```

---

## DrawerViewModel

```typescript
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
```

### Content Order Contract

```text
DrawerViewModel content renders in this fixed order:
  1. FieldNote       (if present)
  2. CuratorNote     (if present)
  3. PoemFragment    (if present)
  4. LetterFragment  (if present)

Order is always the same regardless of content presence.
Resolver assembles content in this order.
ArchiveDrawer renders content in received order. Never reorders.
```

---

## PhotoViewModel

```typescript
export interface PhotoViewModel {
  readonly artifact:     Artifact;
  readonly photo:        Photo;
  readonly frameVariant: FrameVariant;
  readonly rotation:     Rotation;
  readonly borderless:   false;   // photos are never borderless — locked in type
}
```

---

## VideoViewModel

```typescript
export interface VideoViewModel {
  readonly artifact: Artifact;
  readonly video:    Video;
  readonly autoplay: false;   // autoplay is never permitted — locked in type
  readonly muted:    true;    // muted is always required — locked in type
}
```

---

## MuseumViewModel

```typescript
export interface MuseumViewModel {
  readonly manifest:    MuseumManifest;
  readonly currentRoom: RoomViewModel;  // only the current room is resolved
  readonly nextRoomId:  RoomId | null;  // for prefetch only, not rendered
}
```

> Resolver resolves one room at a time, triggered by room transitions.
> All other rooms remain unresolved until navigation reaches them.
> This aligns with `currentRoom` in Zustand state and avoids loading all
> artifacts, photos, and references at application start.

---

## Resolver Rules

Resolvers:

```text
✓ resolve ids
✓ merge references
✓ create ViewModels
✓ read Zustand UI state
✓ clamp Rotation to -3 to 3
✓ assemble DrawerViewModel content in declared order
✓ resolve one room at a time
```

Resolvers never:

```text
✗ mutate content
✗ generate content
✗ sort content
✗ filter content
✗ render content
✗ resolve rooms eagerly
```

---

## Presentation Rules

Presentation components:

```text
receive ViewModels
render ViewModels
emit interactions
```

Presentation components never:

```text
access JSON
resolve IDs
read store
load assets
```

---

## Acceptance Checklist

```text
✓ Components receive ViewModels only
✓ JSON never reaches presentation
✓ Resolver owns transformation
✓ ViewModels are immutable
✓ Layer system is explicit
✓ Archive state is represented
✓ Components remain stateless
✓ Rotation type defined and clamped by resolver
✓ DrawerViewModel content order declared and fixed
✓ MuseumViewModel resolves one room at a time
✓ borderless: false enforced in PhotoViewModel type
```

---

End of Document.
