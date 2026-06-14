/**
 * resolveFieldNote — Extract field note observation text
 * Source: Slice 04D specification
 *
 * Rules:
 *   - Pure function
 *   - Returns the field note observation text for use in ViewModel
 *   - Named export only
 */

import type { FieldNote } from "@/types/domain";

export function resolveFieldNote(fieldNote: FieldNote): string {
  return fieldNote.observation;
}
