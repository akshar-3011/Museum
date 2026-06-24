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
Component
↓
Render
```

---

## Component Contract

Every component MUST follow this structure.

```text
Purpose
Input
Output
Dependencies
States
Interactions
Animation
Accessibility
Responsive Behaviour
Token Usage
Forbidden Behaviour
Acceptance Checklist
```

No component may define additional sections.

---

# COMPONENT

## MuseumShell

---

### Purpose

Persistent application shell.
Contains museum ambience.
Contains routing engine.
Contains paper texture layer.
Never unmounts.

---

### Input

```typescript
interface MuseumShellProps {
  readonly children: React.ReactNode;
}
```

---

### Output

```text
Paper
↓
Room
↓
Overlay
↓
Ambient Audio
```

---

### Dependencies

```text
Manifest
Theme Tokens
MuseumStore
RoomEngine
```

---

### States

```text
Loading
Ready
Transitioning
```

---

### Interactions

None.

---

### Animation

Uses:

```text
--motion-opening
--ease-entrance
```

---

### Accessibility

Semantic landmark required.
Reduced motion supported.

---

### Responsive Behaviour

Identical hierarchy.
Different spacing only.

---

### Token Usage

Only tokens from `02_tokens.md`.

---

### Forbidden Behaviour

No room content.
No business logic.
No hardcoded assets.

---

### Acceptance Checklist

```text
✓ Never unmounts during room transitions
✓ Uses only --motion-opening and --ease-entrance
✓ Paper texture renders at correct z-index (--z-paper)
✓ Audio engine initializes only after visitor interaction
```

---

# COMPONENT

## RoomEngine

---

### Purpose

Render room data.
Resolve references.
Pass typed props.

---

### Input

```typescript
Room
Artifacts
FieldNotes
CuratorNotes
```

---

### Output

Fully rendered room.

---

### Dependencies

```text
rooms.json
artifacts.json
fieldnotes.json
curator-notes.json
```

---

### States

```text
Idle
Rendering
Complete
```

---

### Interactions

Continue

---

### Animation

`TransitionStyle` only.

---

### Accessibility

Room title must be H1.

---

### Responsive Behaviour

Layout changes only.
Content order immutable.

---

### Render Order

Artifacts render in ascending `priority` order as declared in `rooms.json`.
RoomEngine does not sort. JSON declares order. Engine follows it.

---

### Forbidden Behaviour

No content mutation.
No filtering.
No sorting.

---

# COMPONENT

## ArtifactCard

---

### Purpose

Display one preserved exhibit.

---

### Input

```typescript
Renderable<ArtifactViewModel>
```

> `ArtifactViewModel` is defined in `05A_viewmodels.md`. It is a read-only projection of `Artifact` enriched with Zustand state (e.g. `isDiscovered`). Do not substitute `Renderable<Artifact>` — the raw type does not carry UI state.

---

### Output

```text
Frame
↓
Artifact
↓
Placard
↓
Interaction
```

---

### Dependencies

```text
ArtifactViewModel
FrameVariant
ContentLayer
MuseumStore (read-only, via view model)
```

---

### States

```text
Collapsed  → Layer 1 visible. 2–5 lines. Always present.
Observed   → Layer 2 expanded. 8–12 lines. Triggered by "Observe".
Opened     → Layer 3 revealed. Hidden content. Triggered by "Open".
            Layer 3 may not exist on every artifact.
            If absent, "Open" verb does not appear.
```

---

### Interactions

```text
Observe
↓
Open
↓
Continue
```

---

### Animation

Allowed:

```text
Fade
Paper
Light
```

Forbidden:

```text
Bounce
Spin
Elastic
```

---

### Accessibility

Keyboard operable.
Placard readable.
Focus visible.

---

### Responsive Behaviour

Frame scales.
Content order fixed.

---

### Token Usage

```text
Colours:   02_tokens.md
Motion:    02_tokens.md
Typography: 02_tokens.md
```

---

### Forbidden Behaviour

No inline colours.
No inline spacing.
No inline timing.
No hardcoded captions.

---

### Acceptance Checklist

```text
✓ Typed props via ArtifactViewModel
✓ Layer state drives Collapsed / Observed / Opened
✓ "Open" verb absent when Layer 3 does not exist
✓ No hardcoded content
✓ Uses design tokens only
✓ Supports reduced motion
```

---

# COMPONENT

## FieldNote

---

### Purpose

Read-only field observation.

---

### States

```text
Visible
Hidden
Expanded
```

---

### Animation

Opacity only.
No transform.

---

### Forbidden Behaviour

No interaction verbs beyond Observe.
No editable fields.

---

# COMPONENT

## CuratorNote

---

### Purpose

Margin annotation.

---

### States

```text
Visible
Hidden
```

---

### Animation

Fade only.

---

### Forbidden Behaviour

No interaction beyond visibility toggle.

---

# COMPONENT

## ArchiveDrawer

---

### Purpose

Reveal hidden layer content.
Handles the most significant emotional interactions in the museum — hidden layers, curator notes, poem fragments, letter excerpts.

---

### Input

```typescript
Renderable<Artifact | FieldNote | LetterFragment | PoemFragment>
```

---

### Output

```text
Trigger (always visible)
↓
Drawer Panel (hidden until opened)
↓
Content (typed by data received)
```

---

### Dependencies

```text
MuseumStore
ArchiveDrawer tokens (motion, easing)
ContentLayer
```

---

### States

```text
Closed   → trigger visible, panel hidden
Opening  → panel animating in (--motion-standard)
Open     → panel fully visible, content readable
Closing  → panel animating out (--motion-fast)
```

---

### Interactions

```text
Verb "Open"     → Closed → Opening → Open
Verb "Continue" → Open → Closing → Closed
Keyboard        → Enter / Space on trigger to open
                  Escape to close
```

---

### Animation

```text
Open:  --motion-standard, --ease-paper
Close: --motion-fast,     --ease-paper
```

Never uses: bounce, elastic, transform on trigger.

---

### Accessibility

```text
aria-expanded on trigger
aria-controls pointing to panel id
Focus moves into panel on open
Focus returns to trigger on close
```

---

### Responsive Behaviour

Panel spans full width on small viewports.
Content reflows, order immutable.

---

### Token Usage

```text
--motion-standard (open)
--motion-fast (close)
--ease-paper (both directions)
```

---

### Forbidden Behaviour

No bounce on open.
No elastic easing.
No transform on trigger element.
No content rendered outside typed input.

---

### Acceptance Checklist

```text
✓ Typed input union
✓ States cycle correctly
✓ Focus management correct
✓ Uses only specified motion tokens
✓ No bounce or elastic easing
```

---

# COMPONENT

## ArchiveStamp

---

### Purpose

Visual circle motif and archive interaction trigger.
Appears in every room as a consistent shape.
Connects visually to the bracelet reveal in the exit room.

---

### Input

```typescript
Renderable<{ archiveNumber: string; contentId: MuseumId | null }>
```

---

### Output

```text
Circle motif
↓
Archive label (if interactive)
```

---

### Dependencies

```text
MuseumStore (content discovery state)
```

---

### States

```text
Motif      → no associated content, renders as shape only
Interactive → associated content exists, activates on trigger
Activated  → content opened, visual state updates
```

---

### Interaction

```text
On activate:  opens associated hidden archive content
If no hidden content exists: renders as motif only, non-interactive
Must never appear as a button with no associated content
```

---

### Animation

```text
--motion-standard on activate
--ease-paper
```

---

### Visual Rule

```text
Shape: circle only
Size:  fixed by token, never scaled for decoration
Color: --color-graphite-whisper (default)
       --color-amber-dusk (hover / focus)
```

---

### Accessibility

```text
role="button" only when interactive
aria-label describes the archive content it reveals
Non-interactive instance has no role, no tab stop
```

---

### Forbidden Behaviour

No free scaling.
No non-circular shape.
No button role without associated content.
No decorative use when content exists.

---

### Acceptance Checklist

```text
✓ Renders as motif only when no content
✓ Interactive only when content exists
✓ Correct color tokens on hover/focus
✓ Circle shape immutable
```

---

# COMPONENT

## PhotoFrame

---

### Purpose

Display preserved photograph.
`FrameVariant` controls all rendering.
Never borderless.

---

### Input

```typescript
Renderable<Photo>
```

---

### Output

```text
Frame (variant-driven)
↓
Image
↓
Caption
```

---

### Dependencies

```text
FrameVariant
Border tokens
```

---

### States

```text
Loading
Loaded
Error (caption only)
```

---

### Frame Variants

```text
studied → precise border, --border-frame weight, complete on all four sides
working → --border-medium weight, 1–2 degree rotation, slightly imprecise
open    → three sides only, fourth edge absent, used for unfinished chapter
```

---

### Rules

```text
FrameVariant is always determined by data, never by component logic.
Component renders the variant it receives. Nothing else.
```

---

### Animation

```text
--motion-standard on load reveal
--ease-paper
```

---

### Accessibility

```text
img alt required
caption as figcaption
```

---

### Responsive Behaviour

Frame scales proportionally.
Variant never changes on resize.

---

### Forbidden Behaviour

No borderless rendering.
No variant override in component logic.
No inline border values.

---

### Acceptance Checklist

```text
✓ FrameVariant sourced from data only
✓ All three variants render distinctly
✓ "open" variant renders three sides only
✓ No inline border values
✓ alt text present
```

---

# COMPONENT

## VideoExhibit

---

### Purpose

Display preserved motion.

---

### Input

```typescript
Renderable<Video>
```

---

### Rules

```text
muted:          required
loop:           required
poster:         required
autoplay audio: prohibited
```

---

### Forbidden Behaviour

No autoplay audio.
No controls visible by default.
No inline video attributes.

---

# Global Component Rules

Every component:

```text
Receives typed props
Receives no raw JSON
Uses design tokens only
Uses semantic HTML
Supports reduced motion
Contains zero museum content
```

---

# Forbidden

```text
useEffect for content loading
Inline styles
Inline hex values
Inline timing values
Hardcoded copy
Marketing UI
CTA buttons
Hero sections
```

---

# Acceptance Checklist

```text
✓ Every component receives typed data
✓ Every component uses tokens
✓ Every component remains reusable
✓ Every component is content agnostic
✓ Every component supports accessibility
✓ Every component follows museum vocabulary
```

---

End of Document.
