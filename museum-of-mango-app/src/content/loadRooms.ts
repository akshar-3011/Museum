/**
 * loadRooms — Static loader for museum rooms
 * Source: Slice 05A specification
 *
 * Pipeline: CONTENT/rooms.json → loadRooms() → readonly Room[]
 *
 * Rules:
 *   - Synchronous, pure function
 *   - Static ES import only
 *   - If the array is empty, returns exactly one demo room
 *   - Demo fixture is a pipeline test object, not museum content
 *   - Named export only
 */

import type { Room } from "@/types/domain";
import rawRooms from "../../../CONTENT/rooms.json";

/** Demo room used when CONTENT/rooms.json is empty */
const DEMO_ROOM: Room = {
  id: "entrance",
  title: "Untitled Observation Room",
  subtitle: "Demo Archive",
  theme: "paper",
  archiveNumber: "00",
  artifacts: ["artifact.demo.001"],
  fieldNotes: ["fieldnote.demo.001"],
  curatorNotes: [],
  ambientAudioId: "paper",
  transitionStyle: "fade-dark",
  estimatedDuration: 120,
};

export function loadRooms(): readonly Room[] {
  const rooms = rawRooms as readonly Room[];

  if (rooms.length === 0) {
    return [DEMO_ROOM] as const;
  }

  return rooms;
}
