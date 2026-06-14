/**
 * loadFieldNotes — Static loader for museum field notes
 * Source: Slice 04D specification
 *
 * Pipeline: CONTENT/fieldnotes.json → loadFieldNotes() → readonly FieldNote[]
 *
 * Rules:
 *   - Synchronous, pure function
 *   - Static ES import only
 *   - If the array is empty, returns exactly one demo field note
 *   - Demo fixture is a pipeline test object, not museum content
 *   - Named export only
 */

import type { FieldNote } from "@/types/domain";
import rawFieldNotes from "../../../CONTENT/fieldnotes.json";

/** Demo field note used when CONTENT/fieldnotes.json is empty */
const DEMO_FIELD_NOTE: FieldNote = {
  id: "fieldnote.demo.001",
  title: "Observation",
  room: "entrance",
  visibility: "primary",
  priority: 1,
  createdAt: "2026-06-01",
  subject: "Structural Verification",
  observation: "This placeholder exists to validate spacing, typography, and reading rhythm.\n\nNo emotional content is present.",
  classification: "verification",
};

export function loadFieldNotes(): readonly FieldNote[] {
  const fieldNotes = rawFieldNotes as readonly FieldNote[];

  if (fieldNotes.length === 0) {
    return [DEMO_FIELD_NOTE] as const;
  }

  return fieldNotes;
}
