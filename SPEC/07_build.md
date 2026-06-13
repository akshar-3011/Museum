# 07_build.md

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

## Build Philosophy

Implementation follows vertical slices.

No slice may begin until the previous slice satisfies its acceptance checklist.

No slice may redefine architecture.

No slice may generate museum content.

---

## Slice 01 — Foundation

### Goal

Create the project foundation.

### Implement

```text
Next.js
TypeScript
Tailwind
Fonts
Tokens
Folder structure
ESLint
Prettier
Vitest
@testing-library/react
```

### Editable

```text
app/
styles/
tailwind.config.ts
globals.css
package.json
```

### Locked

```text
content/
types/
SPEC/
```

### Done

```text
✓ Project builds
✓ Tokens available
✓ Fonts loaded
✓ Zero TypeScript errors
✓ Test runner executes successfully
```

---

## Slice 02 — Domain Layer

### Goal

Implement immutable domain model.

### Implement

```text
Types
JSON schemas
Validation
Manifest
Navigation
```

### Editable

```text
types/
content/
validators/
```

### Forbidden

```text
components/
engine/
animations/
```

### Done

```text
✓ Every JSON validates
✓ No any
✓ No mutable objects
```

---

## Slice 03 — Resolver Layer

### Goal

Convert domain objects into presentation objects.

### Implement

```text
Resolvers
ViewModels
InteractionModels
```

### Editable

```text
engine/resolvers/
engine/viewmodels/
engine/interactions/
```

### Forbidden

```text
components/
pages/
ui/
```

### Done

```text
✓ No React imports
✓ Pure functions
✓ Immutable output
✓ Snapshot tests pass
```

---

## Slice 04 — Infrastructure

### Goal

Implement MuseumEngine infrastructure.

### Implement

```text
MuseumEngine
ContentLoader
AssetPreloader
TransitionController
AudioManager
```

### Editable

```text
engine/
hooks/
store/
```

### Done

```text
✓ One active room
✓ One prefetched room
✓ Audio initializes after visitor interaction
✓ Transition blocks interaction
```

---

## Slice 05 — Presentation

### Goal

Implement reusable presentation components.

### Implement

```text
MuseumShell
RoomEngine
ArtifactCard
ArchiveDrawer
PhotoFrame
VideoExhibit
FieldNote
CuratorNote
ArchiveStamp
```

### Rules

Every component:

```text
Receives ViewModels
Uses tokens only
Uses semantic HTML
Supports reduced motion
Contains no content
```

### Done

```text
✓ No raw JSON
✓ No inline hex
✓ No inline timing
✓ No hardcoded copy
```

---

## Slice 06 — Room Assembly

### Goal

Compose rooms from content.

### Implement

```text
Entrance
Identity
Staying
Impact
Observation
Unfinished
Exit
```

### Rules

RoomEngine renders exactly the order received.
RoomEngine never sorts.
RoomEngine never filters.
RoomEngine never mutates.

### Done

```text
✓ Room order matches manifest
✓ Layer behavior correct
✓ Archive drawers functional
✓ Navigation uses Observe/Open/Continue only
```

### Human Review Required

Before marking Slice 06 complete, a full human walkthrough is required. Checklist alone is insufficient.

```text
□ One full walkthrough at intended pace (18–22 minutes)
□ Visitor never sees chapter numbers or progress indicators
□ Silence moment in exit room works correctly
□ Bracelet reveal has no animation
□ Layer 3 content is genuinely difficult to find

Human approval required to proceed to Slice 07.
```

---

## Slice 07 — Motion & Audio

### Goal

Connect transitions and ambience.

### Rules

Allowed:

```text
fade-dark
curtain-reveal
light-shift
```

Forbidden:

```text
bounce
elastic
marketing parallax
autoplay audio
```

### Done

```text
✓ Motion uses tokens
✓ Audio respects visitor interaction
✓ Silence duration uses --motion-silence
```

---

## Slice 08 — Optimization

### Goal

Prepare production build.

### Verify

```text
Lazy loading
Image optimization
Accessibility
Bundle size
Reduced motion
Performance
```

### Done

```text
✓ Lighthouse Performance:      90+
✓ Lighthouse Accessibility:    100  (non-negotiable)
✓ Lighthouse Best Practices:   95+
✓ Lighthouse SEO:              not applicable (private, single visitor)
✓ No console errors
✓ No hydration warnings
✓ No accessibility violations
```

> Accessibility at 100 is the hard requirement. This museum is built for one specific person.
> If it fails accessibility on her device or browser, the entire project fails.

---

## AI Execution Rules

Every implementation agent must read every document in order before generating code:

```text
00_README
↓
01_overview
↓
02_tokens
↓
03_types
↓
04_content
↓
05_components
↓
05A_viewmodels
↓
06_engine
↓
07_build
```

---

## Forbidden Global Actions

```text
Rename rooms
Rename navigation verbs
Generate museum content
Replace tokens
Move business logic into components
Load JSON inside React
Duplicate content
Invent architecture
```

---

## Definition of Complete

The implementation is complete when:

```text
✓ Every screen is driven by JSON
✓ Every component receives ViewModels
✓ Every interaction receives InteractionModels
✓ Every color references tokens
✓ Every transition references tokens
✓ Every room matches manifest order
✓ Every artifact preserves human-authored content
✓ The visitor experiences an archive rather than a website
✓ A person who has never heard of this project
  can read manifest.json and understand what is preserved
  without reading a single component file
```

---

## Museum OS v1.0

```text
Author
↓
JSON
↓
Types
↓
Resolvers
↓
ViewModels
↓
InteractionModels
↓
Presentation
↓
Infrastructure
↓
Visitor
```

---

End of Document.
