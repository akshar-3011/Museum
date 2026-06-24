/**
 * loadNavigation — Static loader for museum navigation order
 * Source: Slice 04D specification
 *
 * Pipeline: CONTENT/navigation.json → loadNavigation() → readonly RoomId[]
 *
 * Rules:
 *   - Synchronous, pure function
 *   - Static ES import only
 *   - Returns the room order from manifest if navigation is empty
 *   - Named export only
 */

import type { RoomId } from "@/types/domain";
import rawNavigation from "../../../CONTENT/navigation.json";

/** Default room order when CONTENT/navigation.json is empty */
const DEFAULT_ORDER: readonly RoomId[] = ["entrance"] as const;

export function loadNavigation(): readonly RoomId[] {
  const navigation = rawNavigation as Record<string, unknown>;
  const keys = Object.keys(navigation);

  if (keys.length === 0) {
    return DEFAULT_ORDER;
  }

  return keys as readonly RoomId[];
}
