"use client";

/**
 * useMuseumNavigation — Room navigation state hook
 * Source: Slice 05B specification
 *
 * Purpose:
 *   - Owns currentRoomIndex as React useState
 *   - Provides currentRoom, canContinue, continueToNextRoom
 *   - MuseumEngine calls this hook exclusively
 *   - RoomEngine and ArtifactObject never call this hook
 *
 * Single-room constraint (this slice):
 *   With exactly one room, canContinue is always false
 *   and continueToNextRoom is a typed no-op.
 *   This is expected — the architecture is being validated,
 *   not the navigation experience.
 *
 * Rules:
 *   - React useState only — no Zustand, no persistence
 *   - Named export only
 */

import { useState, useCallback } from "react";
import type { RoomVM } from "@/viewmodels/createRoomViewModel";

interface UseMuseumNavigationReturn {
  readonly currentIndex: number;
  readonly currentRoom: RoomVM;
  readonly canContinue: boolean;
  readonly continueToNextRoom: () => void;
}

export function useMuseumNavigation(
  rooms: readonly RoomVM[],
): UseMuseumNavigationReturn {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canContinue = currentIndex < rooms.length - 1;

  const continueToNextRoom = useCallback(() => {
    if (currentIndex < rooms.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, rooms.length]);

  return {
    currentIndex,
    currentRoom: rooms[currentIndex],
    canContinue,
    continueToNextRoom,
  };
}
