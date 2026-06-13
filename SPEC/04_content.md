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

Content files contain human-authored material only.

---

## 1. Content Directory

```text
src/
  content/
    manifest.json
    rooms.json
    artifacts.json
    fieldnotes.json
    curator-notes.json
    poems.json
    letters.json
    photos.json
    videos.json
    navigation.json
```

No additional content files permitted without SPEC revision.

---

## 2. Global Rules

Every JSON file:

- contains an array or object matching its TypeScript type
- uses UTF-8 encoding
- uses 2-space indentation
- contains stable ids
- contains no HTML
- contains no Markdown
- contains no AI-generated text

### File Responsibility

Each content file has a single, exclusive responsibility:

```text
artifacts.json      → interactive exhibit artifacts (chat, object, poem, letter, video, field-note, curator-note)
photos.json         → standalone photographic room environment images only
fieldnotes.json     → field observations
curator-notes.json  → curator commentary
poems.json          → poem fragments
letters.json        → letter fragments
videos.json         → video exhibits
```

> A photo that is a framed exhibit artifact (with placard and layer assignment) lives in `artifacts.json` with `type: "photo"`.
> A photo that is a standalone room environment image lives in `photos.json`.
> The same image must never appear in both files. One file is the source of truth per image.

---

## 3. manifest.json

Schema

```json
{
  "title": "Museum of Mango",
  "tagline": "An archive where ordinary moments were preserved until they quietly became extraordinary.",
  "version": "1.0.0",
  "openingDuration": 1400,
  "defaultAudio": true,
  "defaultTheme": "paper",
  "roomOrder": [
    "entrance",
    "identity",
    "staying",
    "impact",
    "observation",
    "unfinished",
    "exit"
  ]
}
```

Exactly one manifest exists.

---

## 4. rooms.json

Schema

```json
[
  {
    "id": "identity",
    "title": "The Girl Behind The Name",
    "subtitle": "Archive 01",
    "theme": "paper",
    "archiveNumber": "01",
    "artifacts": [
      "artifact.identity.001"
    ],
    "fieldNotes": [
      "field.identity.001"
    ],
    "curatorNotes": [
      "curator.identity.001"
    ],
    "ambientAudioId": "paper",
    "transitionStyle": "fade-dark",
    "estimatedDuration": 120
  }
]
```

---

## 5. artifacts.json

Schema — photo artifact

```json
[
  {
    "id": "artifact.identity.001",
    "title": "Identity Card",
    "room": "identity",
    "visibility": "primary",
    "priority": 1,
    "createdAt": "2026-06-01",
    "type": "photo",
    "caption": "Museum Identity Card",
    "asset": "/photos/identity.jpg",
    "theme": "paper",
    "layer": 1,
    "rotation": 0,
    "frameVariant": "studied"
  }
]
```

Schema — chat artifact

```json
[
  {
    "id": "artifact.identity.002",
    "title": "Recovered Expression",
    "room": "identity",
    "visibility": "primary",
    "priority": 2,
    "createdAt": "2026-06-01",
    "type": "chat",
    "caption": "Sent when she wanted the conversation to continue. Not annoyance. Permission.",
    "asset": "",
    "primary": "😒",
    "preservationReason": "Repeated enough to become language.",
    "theme": "paper",
    "layer": 1,
    "rotation": -1.5,
    "frameVariant": "working"
  }
]
```

> `primary` — the raw artifact: the emoji, phrase, or word being preserved.
> `preservationReason` — placard text explaining why this artifact was collected.
> Both are optional fields on the `Artifact` type in `03_types.md`. Required for all `type: "chat"` entries.

---

## 6. fieldnotes.json

Schema

```json
[
  {
    "id": "field.identity.001",
    "title": "Observation",
    "room": "identity",
    "visibility": "primary",
    "priority": 1,
    "createdAt": "2026-06-01",
    "subject": "Mango",
    "observation": "Subject continues conversations after goodbye.",
    "classification": "behaviour"
  }
]
```

---

## 7. curator-notes.json

Schema

```json
[
  {
    "id": "curator.identity.001",
    "title": "Curator Note",
    "room": "identity",
    "visibility": "secondary",
    "priority": 1,
    "createdAt": "2026-06-01",
    "text": "Research ongoing."
  }
]
```

---

## 8. poems.json

Schema

```json
[
  {
    "id": "poem.001",
    "title": "Fragment",
    "room": "impact",
    "visibility": "secondary",
    "priority": 1,
    "createdAt": "2026-06-01",
    "text": "Human authored fragment.",
    "source": "Booklet Chapter"
  }
]
```

Only extracted fragments permitted.
Full poems prohibited.

---

## 9. letters.json

Schema

```json
[
  {
    "id": "letter.001",
    "title": "Letter Fragment",
    "room": "unfinished",
    "visibility": "hidden",
    "priority": 1,
    "createdAt": "2026-06-01",
    "text": "Human authored fragment.",
    "source": "Letter Archive"
  }
]
```

Only excerpts permitted.
Full letters prohibited.

---

## 10. photos.json

Schema

```json
[
  {
    "id": "photo.001",
    "title": "Portrait",
    "room": "identity",
    "visibility": "primary",
    "priority": 1,
    "createdAt": "2026-06-01",
    "src": "/photos/photo001.jpg",
    "alt": "Museum portrait",
    "caption": "Archive photograph"
  }
]
```

> Standalone room environment images only. For framed exhibit photos with placard, layer, and frameVariant — use `artifacts.json` with `type: "photo"`.

---

## 11. videos.json

Schema

```json
[
  {
    "id": "video.001",
    "title": "Memory Clip",
    "room": "impact",
    "visibility": "primary",
    "priority": 1,
    "createdAt": "2026-06-01",
    "src": "/videos/video001.mp4",
    "poster": "/videos/video001.jpg",
    "loop": true,
    "muted": true
  }
]
```

---

## 12. navigation.json

Schema

```json
{
  "entrance": {
    "continue": "identity"
  },
  "identity": {
    "continue": "staying"
  },
  "staying": {
    "continue": "impact"
  },
  "impact": {
    "continue": "observation"
  },
  "observation": {
    "continue": "unfinished"
  },
  "unfinished": {
    "continue": "exit"
  }
}
```

`navigation.json` controls room-to-room routing only.
`"observe"` and `"open"` are component-level verbs handled in `05_components.md`.

Only the verb `"continue"` is permitted in this file.

---

## 13. Content Restrictions

Forbidden:

```text
AI generated poems
AI generated letters
inline JSX content
HTML strings
Markdown strings
duplicate ids
mutable content
```

---

## 14. Content Lifecycle

```text
Author
↓
JSON
↓
Type Validation
↓
Component
↓
Render
↓
Museum
```

Content never bypasses validation.

---

## 15. Acceptance Checklist

```text
✓ Every JSON validates against TypeScript
✓ Every entity contains stable ids
✓ Every artifact declares layer
✓ Every artifact declares frameVariant
✓ Every room declares transitionStyle
✓ Manifest matches room order
✓ No AI generated museum content
✓ Components consume typed JSON only
✓ Chat artifact schema present and includes primary and preservationReason
✓ No image appears in both artifacts.json and photos.json
```

---

End of Document.
