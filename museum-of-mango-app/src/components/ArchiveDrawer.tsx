import type { Renderable, Artifact, FieldNote, LetterFragment, PoemFragment } from "@/types";

type ArchiveDrawerContent = Artifact | FieldNote | LetterFragment | PoemFragment;
type ArchiveDrawerProps = Renderable<ArchiveDrawerContent>;

export function ArchiveDrawer({ data: _data }: ArchiveDrawerProps): null {
  return null;
}
