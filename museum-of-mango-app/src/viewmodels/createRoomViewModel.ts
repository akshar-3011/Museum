/**
 * createRoomViewModel — Factory for presentation-ready room data
 * Source: Slice 05A specification
 *
 * Pipeline position:
 *   Room → resolveRoom → createRoomViewModel → RoomVM
 *
 * backgroundTone and transitionStyle are present for type
 * completeness but are NOT applied visually in this slice.
 * They will be consumed in Slice 06A (Motion).
 *
 * Rules:
 *   - Pure function
 *   - Immutable output
 *   - Named export only
 */

import type { Room } from "@/types/domain";
import { resolveRoom } from "@/resolvers/resolveRoom";
import type { ResolvedRoom } from "@/resolvers/resolveRoom";

/** Re-export the resolved room type as the public ViewModel */
export type RoomVM = ResolvedRoom;

export function createRoomViewModel(room: Room): RoomVM {
  return resolveRoom(room);
}
