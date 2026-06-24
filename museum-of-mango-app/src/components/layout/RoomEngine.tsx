/**
 * RoomEngine — Semantic room content wrapper
 * Source: Slice 05C specification (updated from 05A)
 *
 * Purpose:
 *   - Renders a semantic wrapper for room content
 *   - Renders one ArtifactObject per resolved artifact
 *   - Passes observation state and callbacks through to ArtifactObject
 *   - Performs zero transformation on inputs
 *
 * Does NOT render:
 *   - MuseumShell, PaperTexture, AmbientLayer, MuseumSurface,
 *     MuseumContainer (owned by page.tsx / Slice 03)
 *   - Navigation, transitions, animations
 *   - Headers, progress indicators
 *
 * Rules:
 *   - No state machine
 *   - No animation
 *   - No hardcoded strings
 *   - Named export only
 */

import { ArtifactObject } from "@/components/exhibit/ArtifactObject";
import type { RoomVM } from "@/viewmodels/createRoomViewModel";
import type { ArtifactVM } from "@/viewmodels/createArtifactViewModel";
import type { ExhibitState } from "@/hooks/useObservation";

interface RoomEngineProps {
  readonly room: RoomVM;
  readonly artifacts: readonly ArtifactVM[];
  readonly observationState: ExhibitState;
  readonly onObserve: () => void;
  readonly onOpen: () => void;
  readonly onContinue: () => void;
}

export function RoomEngine({
  room,
  artifacts,
  observationState,
  onObserve,
  onOpen,
  onContinue,
}: RoomEngineProps) {
  return (
    <section aria-label={room.title}>
      {artifacts.map((viewModel) => (
        <ArtifactObject
          key={viewModel.id}
          viewModel={viewModel}
          observationState={observationState}
          onObserve={onObserve}
          onOpen={onOpen}
          onContinue={onContinue}
        />
      ))}
    </section>
  );
}
