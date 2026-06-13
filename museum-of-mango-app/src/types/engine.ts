/**
 * Museum of Mango — Engine Types
 * Source of truth: SPEC/06_engine.md v1.1
 *
 * InteractionFactory creates interaction state per artifact.
 * Rule: if hiddenLayerAvailable is false, "open" must not appear in availableActions.
 */

import type { MuseumId, NavigationVerb, ContentLayer } from "@/types/domain";

// ─── InteractionModel ────────────────────────────────────────────────────────

export interface InteractionModel {
  readonly artifactId:           MuseumId;
  readonly availableActions:     readonly NavigationVerb[];
  readonly defaultAction:        NavigationVerb;
  readonly keyboardShortcuts:    Readonly<Record<string, NavigationVerb>>;
  readonly hiddenLayerAvailable: boolean;
  readonly currentLayer:         ContentLayer;
}
