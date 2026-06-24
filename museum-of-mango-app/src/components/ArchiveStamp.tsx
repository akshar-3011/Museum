import type { Renderable, MuseumId } from "@/types";

interface ArchiveStampData {
  readonly archiveNumber: string;
  readonly contentId:     MuseumId | null;
}

type ArchiveStampProps = Renderable<ArchiveStampData>;

export function ArchiveStamp({ data: _data }: ArchiveStampProps): null {
  return null;
}
