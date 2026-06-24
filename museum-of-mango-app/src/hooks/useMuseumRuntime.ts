"use client";

/**
 * useMuseumRuntime — Single source of truth for museum state
 * Source: Slice 05C specification
 *
 * Subsumes useMuseumNavigation (Slice 05B).
 * Internally uses useObservation (Slice 04C).
 *
 * Owns:
 *   - which room is current (room-level state)
 *   - which artifact is current (artifact-level state)
 *   - that artifact's observation state (collapsed/observed/open)
 *
 * Returns:
 *   observe()        → passthrough to useObservation.observe()
 *   open()           → passthrough to useObservation.open()
 *   continue()       → passthrough to useObservation.close()
 *   nextRoom()       → room-level, no-op in this slice (single room)
 *   nextArtifact()   → artifact-level, no-op in this slice (single artifact)
 *
 * Single-room, single-artifact constraint:
 *   canContinueToNextRoom is always false (one room).
 *   nextRoom() and nextArtifact() are typed no-ops.
 *   This is expected and correct.
 *
 * Rules:
 *   - React useState only — no Zustand, no persistence
 *   - Named export only
 */

import { useState, useCallback } from "react";
import { useObservation } from "@/hooks/useObservation";
import type { ExhibitState } from "@/hooks/useObservation";
import type { RoomVM } from "@/viewmodels/createRoomViewModel";
import type { ArtifactVM } from "@/viewmodels/createArtifactViewModel";
import type { RoomId } from "@/types/domain";

interface UseMuseumRuntimeReturn {
  readonly currentRoom: RoomVM;
  readonly currentArtifact: ArtifactVM;
  readonly observationState: ExhibitState;
  readonly observe: () => void;
  readonly open: () => void;
  readonly continue: () => void;
  readonly canContinueToNextRoom: boolean;
  readonly nextRoom: () => void;
  readonly nextArtifact: () => void;
}

export function useMuseumRuntime(
  rooms: readonly RoomVM[],
  artifactsByRoom: ReadonlyMap<RoomId, readonly ArtifactVM[]>,
): UseMuseumRuntimeReturn {
  // ── Room-level state (from useMuseumNavigation, now subsumed) ──
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  // ── Artifact-level state ──
  const [currentArtifactIndex] = useState(0);

  // ── Observation state (from useObservation, Slice 04C) ──
  const observation = useObservation();

  // ── Derived values ──
  const currentRoom = rooms[currentRoomIndex];
  const roomArtifacts = artifactsByRoom.get(currentRoom.id) ?? [];
  const currentArtifact = roomArtifacts[currentArtifactIndex];

  const canContinueToNextRoom = currentRoomIndex < rooms.length - 1;

  // ── Room-level navigation (no-op in this slice — single room) ──
  const nextRoom = useCallback(() => {
    if (currentRoomIndex < rooms.length - 1) {
      setCurrentRoomIndex((prev) => prev + 1);
    }
  }, [currentRoomIndex, rooms.length]);

  // ── Artifact-level navigation (no-op in this slice — single artifact) ──
  const nextArtifact = useCallback(() => {
    // No-op: single artifact per room in this slice
  }, []);

  return {
    currentRoom,
    currentArtifact,
    observationState: observation.state,
    observe: observation.observe,
    open: observation.open,
    continue: observation.close,
    canContinueToNextRoom,
    nextRoom,
    nextArtifact,
  };
}
