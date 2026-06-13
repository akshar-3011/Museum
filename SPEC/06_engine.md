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
InteractionModel
↓
Component
↓
Render
```

---

## 1. Purpose

MuseumEngine is the single orchestration layer.

MuseumEngine coordinates:

- content loading
- resolver execution
- view model creation
- interaction model creation
- room transitions
- asset preloading

MuseumEngine never renders UI directly.

---

## 2. Pipeline

```text
manifest.json
↓
ContentLoader
↓
TypeValidator
↓
ResolverRegistry
↓
ViewModelFactory
↓
InteractionFactory
↓
MuseumEngine
↓
Presentation Components
↓
Visitor
```

---

## 3. Engine Modules

```text
ContentLoader
TypeValidator
ResolverRegistry
ViewModelFactory
InteractionFactory
AssetPreloader
TransitionController
```

No additional modules permitted without SPEC revision.

---

## 4. ContentLoader

### Purpose

Load validated JSON content for the current room only.

### Loading Sequence

```text
1. Load manifest.json        (synchronous — blocks startup)
2. Load rooms.json           (synchronous — blocks startup)
3. Load navigation.json      (synchronous — blocks startup)
4. Load artifacts.json       (entrance room only, before first render)
5. Load remaining content    (async, during entrance room display)
```

### Input

```text
manifest.json path
```

### Output

```text
typed domain objects for current room
```

### Rules

ContentLoader never loads the complete museum before first render.

Never:
- mutate content
- generate content
- reorder content

---

## 5. TypeValidator

### Purpose

Validate every loaded object.

### Failure

Invalid object prevents render.
No partial rendering.

---

## 6. ResolverRegistry

### Purpose

Resolve references.

### Example

```text
artifact.photoId
↓
Photo
↓
ArtifactViewModel
```

Resolvers never:
- fetch network data
- mutate JSON
- access React

---

## 7. ViewModelFactory

### Purpose

Convert resolved domain objects into presentation models.
Every Presentation Component receives ViewModels only.

---

## 8. InteractionFactory

### Purpose

Create interaction state per artifact.

### InteractionModel Type

```typescript
export interface InteractionModel {
  readonly artifactId:           MuseumId;
  readonly availableActions:     readonly NavigationVerb[];
  readonly defaultAction:        NavigationVerb;
  readonly keyboardShortcuts:    Readonly<Record<string, NavigationVerb>>;
  readonly hiddenLayerAvailable: boolean;
  readonly currentLayer:         ContentLayer;
}
```

> Rule: if `hiddenLayerAvailable` is `false`, the verb `"open"` must not appear
> in `availableActions`. This enforces the Layer 3 contract at the data level,
> not only at the component level.

### Produces

```text
availableActions
defaultAction
keyboardShortcuts
hiddenLayerAvailable
currentLayer
```

InteractionFactory never renders UI.

---

## 9. AssetPreloader

### Purpose

Preload only required assets.

### Policy

```text
Current Room
↓
Next Room
↓
Idle Queue
```

Never preload the complete museum.

---

## 10. TransitionController

### Allowed Transitions

```text
fade-dark
curtain-reveal
light-shift
```

### Transition Behavior

```text
fade-dark:
  Current room fades to --color-museum-dusk over --motion-room (900ms)
  Darkness holds for 400ms
  Next room fades in over --motion-room (900ms)
  Total: ~2200ms

curtain-reveal:
  Current room fades to --color-museum-dusk over --motion-standard (500ms)
  Next room reveals via left-to-right wipe over --motion-room (900ms)
  Total: ~1400ms

light-shift:
  Cross-dissolve with brightness shift
  Duration: --motion-standard (500ms)
  Used only for adjacent thematic rooms
```

### Blocking Rule

TransitionController blocks all interaction during transition.
`"continue"` is disabled until transition completes.

### Duration

Uses token values only.
No inline timing.

---

## 11. Room Lifecycle

```text
Load
↓
Validate
↓
Resolve
↓
ViewModel
↓
Preload Next
↓
Render
↓
Continue
↓
Dispose Previous
```

### Dispose Previous Contract

```text
Discard on room transition:
  - Previous RoomViewModel
  - Previous InteractionModels
  - Previous ArtifactViewModels

Cache (LRU, maximum 2 rooms):
  - Decoded image assets
  - Parsed JSON content
  - Ambient audio buffer (current + previous only)

Never cache:
  - Zustand state (it persists itself)
  - DOM nodes
```

---

## 12. Resolver Rules

Resolvers:

```text
✓ deterministic
✓ pure functions
✓ immutable
```

Resolvers never:

```text
✗ sort
✗ filter
✗ mutate
✗ fetch
✗ render
```

---

## 13. Interaction Rules

```text
Observe  → expand Layer 2
Open     → reveal Layer 3
Continue → advance room
```

No additional interaction verbs permitted.

---

## 14. Performance Rules

Maximum resolved rooms:

```text
1 active
1 prefetched
```

Maximum ViewModels:

```text
current room only
```

Maximum active ambient audio:

```text
1
```

---

## 15. Error Strategy

### Missing content

Fail validation.

### Missing asset

```text
Render placeholder frame:
  - FrameVariant "studied" with no inner content
  - MuseumPlacard displays title from ViewModel
  - Preservation reason displayed if available
  - No error text visible to visitor
  - Console log in development only
  - Never renders broken image icon
  - Never renders loading spinner

An empty frame with a label is a curatorial choice.
A broken image icon is a bug.
```

### Invalid ViewModel

Skip artifact.
Continue room rendering.

### Invalid manifest

Abort application startup.

---

## 16. State Ownership

```text
JSON
↓ immutable

Resolver
↓ pure

ViewModel
↓ immutable

InteractionModel
↓ immutable

Zustand
↓ UI state only
```

---

## 17. Forbidden Behaviour

```text
Component loads JSON
Component resolves ids
Component reads filesystem
Component mutates content
Component sorts artifacts
Component generates museum text
Component fetches remote data
```

---

## 18. Acceptance Checklist

```text
✓ Single engine only
✓ One active room
✓ One prefetched room
✓ Deterministic resolver output
✓ Immutable ViewModels
✓ Pure InteractionModels
✓ Components receive prepared data only
✓ Asset loading follows preload policy
✓ MuseumShell never owns business logic
✓ InteractionModel type defined and enforced
✓ Open verb absent when hiddenLayerAvailable is false
✓ TransitionController blocks interaction during transition
✓ Dispose Previous contract followed on every room transition
✓ ContentLoader never loads complete museum before first render
```

---

End of Document.
