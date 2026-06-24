/**
 * resolveRoom — Transform raw Room into presentation data
 * Source: Slice 05A specification
 *
 * Rules:
 *   - Pure function: no mutation, no sorting, no filtering
 *   - No side effects
 *   - Never creates JSX
 *   - Never imports React
 *   - Named export only
 */

import type { Room, RoomId, ThemeId, MuseumId, TransitionStyle } from "@/types/domain";

/**
 * Flat presentation-ready room data.
 * backgroundTone and transitionStyle are present for type
 * completeness but are NOT applied visually in this slice.
 */
export interface ResolvedRoom {
  readonly id: RoomId;
  readonly title: string;
  readonly subtitle: string;
  readonly backgroundTone: ThemeId;
  readonly artifactIds: readonly MuseumId[];
  readonly transitionStyle: TransitionStyle;
  readonly displayOrder: number;
}

export function resolveRoom(room: Room): ResolvedRoom {
  return {
    id: room.id,
    title: room.title,
    subtitle: room.subtitle,
    backgroundTone: room.theme,
    artifactIds: room.artifacts,
    transitionStyle: room.transitionStyle,
    displayOrder: parseInt(room.archiveNumber, 10) || 0,
  };
}
