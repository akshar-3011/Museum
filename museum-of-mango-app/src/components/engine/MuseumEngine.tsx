"use client";

/**
 * MuseumEngine — Single orchestration layer
 * Source: Slice 05D specification (Architecture Lock)
 *
 * Architecture:
 *   page.tsx → MuseumShell → MuseumSurface → MuseumContainer
 *     → MuseumEngine → RoomEngine → ArtifactObject
 *
 * Purpose:
 *   - Owns ALL data loading, resolving, and ViewModel creation
 *   - Owns useMuseumRuntime (room, artifact, observation state)
 *   - Passes observation state and callbacks down via RoomEngine props
 *   - Renders exactly one RoomEngine for the current room
 *   - Introduces zero visible UI — the visitor never knows
 *     this component exists
 *
 * Data preparation (module-level, executes once):
 *   loadRooms() → createRoomViewModel()         → roomVMs[]
 *   loadArtifacts() + loadFieldNotes()
 *     → createArtifactViewModel() (per room)    → artifactsByRoom Map
 *   loadNavigation()                            → navigation order
 *
 * All loaders, resolvers, and ViewModel factories are pure
 * functions with static ES-imported JSON inputs. Computing
 * them at module level guarantees they execute exactly once
 * per application lifecycle — never re-run on re-render.
 *
 * useMuseumRuntime() is the only hook that re-runs on every
 * render driven by interaction — it manages observation,
 * drawer, and room/artifact navigation state.
 *
 * Does NOT:
 *   - Render MuseumShell, PaperTexture, AmbientLayer,
 *     MuseumSurface, MuseumContainer (owned by page.tsx)
 *   - Render headers, progress indicators, navigation bars
 *
 * Rules:
 *   - Named export only
 */

import { useMuseumRuntime } from "@/hooks/useMuseumRuntime";
import { RoomEngine } from "@/components/layout/RoomEngine";
import { loadRooms } from "@/content/loadRooms";
import { loadArtifacts } from "@/content/loadArtifacts";
import { loadFieldNotes } from "@/content/loadFieldNotes";
import { loadNavigation } from "@/content/loadNavigation";
import { createRoomViewModel } from "@/viewmodels/createRoomViewModel";
import { createArtifactViewModel } from "@/viewmodels/createArtifactViewModel";
import type { RoomId } from "@/types/domain";
import type { ArtifactVM } from "@/viewmodels/createArtifactViewModel";
import type { RoomVM } from "@/viewmodels/createRoomViewModel";

// ── Module-level data preparation (executes exactly once) ────────────────────
// All loaders are pure, synchronous functions with static ES imports.
// Resolvers and ViewModel factories are pure functions.
// Module-level computation guarantees no re-execution on re-render.

const _rooms = loadRooms();
const _allArtifacts = loadArtifacts();
const _allFieldNotes = loadFieldNotes();
const _navigation = loadNavigation();

// Suppress unused variable lint — _navigation is loaded for
// type-completeness per ENGINE CONTRACT (loadNavigation is owned here).
void _navigation;

const roomVMs: readonly RoomVM[] = _rooms.map((room) => createRoomViewModel(room));

const artifactsByRoom: ReadonlyMap<RoomId, readonly ArtifactVM[]> = (() => {
  const map = new Map<RoomId, readonly ArtifactVM[]>();

  for (const roomVM of roomVMs) {
    const vms = roomVM.artifactIds
      .map((id) => {
        const artifact = _allArtifacts.find((a) => a.id === id);
        if (!artifact) return undefined;
        const fieldNote =
          _allFieldNotes.find((fn) => fn.room === artifact.room) ??
          _allFieldNotes[0];
        return createArtifactViewModel(artifact, fieldNote);
      })
      .filter((vm): vm is NonNullable<typeof vm> => vm !== undefined);

    map.set(roomVM.id, vms);
  }

  return map;
})();

// ── Component ────────────────────────────────────────────────────────────────

export function MuseumEngine() {
  const runtime = useMuseumRuntime(roomVMs, artifactsByRoom);

  const roomArtifacts = artifactsByRoom.get(runtime.currentRoom.id) ?? [];

  return (
    <RoomEngine
      room={runtime.currentRoom}
      artifacts={roomArtifacts}
      observationState={runtime.observationState}
      onObserve={runtime.observe}
      onOpen={runtime.open}
      onContinue={runtime.continue}
    />
  );
}
