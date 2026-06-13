# 00_README.md

# Museum of Mango

Version: 1.0
Status: LOCKED

---

## What This Is

A personal digital museum preserving one relationship — built for one person, experienced once, remembered always.

---

## What This Is Not

- A portfolio project
- A marketing website
- A component showcase
- An AI-generated experience
- Anything that should feel like a product

---

## Who This Is For

**Mango.**
One person. Named. Known. Every decision answers to her, not to convention.

---

## The Single Most Important Rule

```
No component contains hardcoded content.
```

The museum lives in the JSON files.
The components are the building, not the exhibit.
If you find yourself typing a caption, a poem, a label, or a name inside a `.tsx` file — stop. It belongs in a content file.

---

## The One Question for Every Decision

```
Does this make Mango feel more deeply seen?
```

If yes: proceed.
If no: do not build it.
If unsure: stop and ask.

---

## Reading Order

Read every document before generating any code.

```
00_README          ← you are here
↓
01_overview        ← project structure and architecture
↓
02_tokens          ← all design values (color, spacing, motion)
↓
03_types           ← all TypeScript types
↓
04_content         ← JSON schemas and content rules
↓
05_components      ← component contracts
↓
05A_viewmodels     ← ViewModel and resolver contracts
↓
06_engine          ← orchestration and engine modules
↓
07_build           ← vertical slices and build sequence
```

Do not skip documents. Do not start from the middle.

---

## Navigation Verbs

Three verbs. No others permitted.

```
Observe    → expand an artifact
Open       → reveal a hidden layer
Continue   → advance to the next room
```

These are the only interaction verbs in the entire museum.

---

## Emergency Stop

If you are confused about what to build, what a rule means, or how two documents relate — **stop and ask**.

Do not invent behavior.
Do not fill gaps with assumptions.
Do not proceed past uncertainty.

An invention that feels correct will still be wrong if it isn't in the spec.
A question takes seconds. A wrong implementation costs hours.

---

End of Document.
