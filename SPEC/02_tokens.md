MUSEUM OF MANGO

Version: 1.1
Status: LOCKED

---

> Pale Gold (#E8C97A) appears in exactly two moments in the experience.
> No component may use `--color-pale-gold` without explicit approval.

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

## 1. Colour Tokens

```css
:root {
  --color-parchment:          #F2EBD9;
  --color-deep-ink:           #1C1810;
  --color-amber-dusk:         #C4853A;
  --color-faded-ochre:        #D4A853;
  --color-washed-linen:       #E8DEC8;
  --color-museum-dusk:        #2C2416;
  --color-faded-terracotta:   #8B4A3A;
  --color-pale-gold:          #E8C97A;
  --color-graphite-whisper:   #8A7E6E;
  --color-bone-white:         #FAF6EE;
}
```

---

## 2. Typography Tokens

```css
--font-display:  var(--font-cormorant);   /* Chapter titles */
--font-label:    var(--font-baskerville); /* Placards, headings */
--font-reading:  var(--font-lora);        /* Body text */
--font-note:     var(--font-caveat);      /* Annotations */
```

---

## 3. Radius Tokens

```css
--radius-xs: 2px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
```

Maximum allowed radius:

```
12px
```

---

## 4. Shadow Tokens

```css
--shadow-placard: 0 1px 4px  rgba(28, 24, 16, .08);
--shadow-exhibit: 0 2px 12px rgba(28, 24, 16, .12);
--shadow-frame:   0 8px 24px rgba(28, 24, 16, .16);
```

---

## 5. Border Tokens

```css
--border-light:  1px solid rgba(28, 24, 16, .08);
--border-medium: 1px solid rgba(28, 24, 16, .12);
--border-frame:  2px solid rgba(28, 24, 16, .18);
```

---

## 6. Spacing Tokens

```css
--space-4:  4px;
--space-8:  8px;
--space-12: 12px;
--space-16: 16px;
--space-24: 24px;
--space-32: 32px;
--space-48: 48px;
--space-64: 64px;
--space-96: 96px;
```

---

## 7. Motion Tokens

```css
--motion-fast:     300ms;
--motion-standard: 500ms;
--motion-room:     900ms;
--motion-opening:  1400ms;
--motion-silence:  2400ms;
```

> `--motion-silence` is the maximum hold duration — used for the final fade and last-sentence reveal in Chapter 5. Do not substitute `--motion-opening`; that token is for the archive sequence.

---

## 8. Easing Tokens

```css
--ease-standard: cubic-bezier(.4,   0,   .2,  1);
--ease-paper:    cubic-bezier(.22, .61,  .36, 1);
--ease-entrance: cubic-bezier(.25,  .1,  .1,  1.0);
```

> `--ease-entrance` is for chapter transitions (darkness between rooms): slow start, gradual arrival, near-imperceptible ease-out. The first two curves are ease-out style; this curve eases *in*.

---

## 9. Layer Tokens

```
base
paper
content
glass
drawer
overlay
modal
```

Mapped values:

```css
--z-base:    0;
--z-paper:   10;
--z-content: 20;
--z-glass:   25;
--z-drawer:  30;
--z-overlay: 40;
--z-modal:   50;
```

> `--z-glass` is reserved for glass case components (Chapter 4, the observation room). It sits above content and below drawer.

---

## 10. Width Tokens

```css
--width-reading: 720px;
--width-gallery: 960px;
--width-room:    1200px;
```

---

## 11. Museum Motion Rules

Allowed:

```
fade
reveal
paper unfold
drawer slide
opacity
light shift
```

Forbidden:

```
bounce
elastic
rotate
shake
spin
marketing parallax
```

---

## 12. Component Vocabulary

Allowed:

```
Observe
Open
Continue
Archive
Field Note
Curator Note
Recovered
Preserved
```

Forbidden:

```
Explore
Discover More
Get Started
Click Here
Learn More
CTA
```

---

## 13. Theme Keywords

```
Paper
Ink
Wood
Archive
Dust
Glass
Warm Light
Quiet
Preserved
Museum
```

Every component must:

- Use only tokens from this document for color, spacing, shadow, and motion
- Contain no inline hex values
- Contain no hardcoded timing values

---

## 14. Acceptance Checklist

```
✓ All colours reference tokens
✓ All spacing references tokens
✓ All shadows reference tokens
✓ No inline values duplicate tokens
✓ Typography uses CSS variables
✓ Motion uses predefined durations
✓ Components share one visual language
✓ Museum vocabulary remains consistent
```
