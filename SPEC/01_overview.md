# Museum of Mango

Version: 1.0

Status: LOCKED

---

# 1. Project Identity

Name:

```
Museum of Mango
```

Tagline:

```
An archive where ordinary moments were preserved
until they quietly became extraordinary.
```

Project Type:

```
Interactive Digital Museum
```

---

# 2. Primary Goal

Build an interactive museum experience that presents photographs, videos, field notes, poems, letters, and preserved observations as curated exhibits.

The visitor must feel they are discovering an archive rather than navigating a website.

---

# 3. Core Principles

The implementation must follow these principles.

```
Preserve

Observe

Reveal

Continue
```

Every interaction must reinforce preservation instead of consumption.

---

# 4. Global Rules

Navigation verbs:

```
Observe

Open

Continue
```

No other navigation vocabulary is permitted.

---

State Management:

```
Zustand contains UI state only.

Zustand never contains museum content.
```

---

Rendering Pipeline:

```
JSON

↓

Type

↓

Component

↓

Render
```

Every artefact follows this order.

---

Content Policy:

```
Human authored only.

AI may organize.

AI must never invent museum content.
```

---

# 5. Experience Goals

Visitors must experience the following:

```
Curiosity

↓

Recognition

↓

Observation

↓

Understanding

↓

Quiet Nostalgia

↓

Gratitude
```

The experience must never rely on explicit emotional explanation.

---

# 6. Museum Structure

Fixed order:

```
Entrance

↓

The Girl Behind The Name

↓

The Art Of Staying

↓

The Impact Of Her

↓

Things She Never Notices

↓

The Unfinished Chapter

↓

Exit
```

Room order is immutable.

---

# 7. Content Layers

Every room contains one or more of:

```
Primary Exhibit

↓

Field Note

↓

Curator Note

↓

Hidden Archive
```

Each layer must remain visually distinct.

---

# 8. Design Language

Keywords:

```
Paper

Ink

Archive

Wood

Glass

Dust

Warm Light

Museum Label

Handwritten Note
```

Avoid:

```
Glassmorphism

Neon

Startup Gradients

Marketing Cards

Dashboard UI
```

---

# 9. Interaction Rules

Artefacts:

```
Observe

↓

Open

↓

Close

↓

Continue
```

Drawers:

```
Closed

↓

Open

↓

Close
```

Transitions:

```
Fade

Reveal

Paper

Light
```

No bounce.

No elastic motion.

No aggressive parallax.

---

# 10. Content Rules

Components must never contain:

```
Hardcoded poems

Hardcoded letters

Hardcoded captions

Hardcoded field notes
```

Components render typed JSON only.

---

# 11. Architecture Rules

The project uses:

```
Next.js App Router

↓

Engine

↓

Reusable Components

↓

JSON Content

↓

Museum Experience
```

No room-specific business logic inside reusable components.

---

# 12. Accessibility

Every exhibit must provide:

```
Semantic HTML

Keyboard navigation

Reduced motion support

Accessible labels

Readable contrast
```

Audio must never autoplay without user permission.

---

# 13. Performance Targets

Initial load:

```
< 2 seconds
```

Animation:

```
60 FPS target
```

Content:

```
Lazy loaded

Progressively revealed
```

Images:

```
Optimized

Responsive

Non-blocking
```

---

# 14. Non-goals

The project will not become the following:

```
Portfolio

Landing Page

Photo Gallery

Marketing Site

Timeline Website

Blog
```

---

# 15. Success Criteria

A successful implementation satisfies:

```
Visitor understands the person
without being directly told.

Every artifact has a reason
for preservation.

The museum feels cohesive.

Content remains data-driven.

Future updates require JSON edits
instead of component rewrites.
```

---

# 16. Acceptance Checklist

Implementation must satisfy:

```
✓ Navigation uses Observe/Open/Continue only

✓ Zustand contains UI state only

✓ Components contain no hardcoded content

✓ Rendering pipeline is JSON → Type → Component → Render

✓ Room order matches specification

✓ Museum vocabulary is preserved

✓ Content remains human authored

✓ Experience feels archival instead of promotional
```

End of Document.
