/**
 * EmptyExhibit — Reserve exhibit space before real content arrives
 * Source: Slice 03 specification
 *
 * Purpose:
 *   - Renders a single exhibit composition:
 *     PhotoFrame (studied), MuseumPlacard (empty), ArchiveStamp (passive)
 *   - Reserves physical space in the museum
 *   - Never loads data, never knows JSON, routing, or state
 *   - Never animates
 *
 * Rules:
 *   - Named export only
 *   - No museum content
 *   - No placeholder text
 */

import { cn } from "@/lib/cn";
import { PhotoFrame } from "@/components/base/PhotoFrame";
import { MuseumPlacard } from "@/components/base/MuseumPlacard";
import { ArchiveStamp } from "@/components/base/ArchiveStamp";

interface EmptyExhibitProps {
  readonly className?: string;
}

export function EmptyExhibit({ className }: EmptyExhibitProps) {
  return (
    <section
      className={cn(
        "flex",
        "flex-col",
        "items-center",
        "gap-[var(--space-24)]",
        "pt-[var(--space-96)]",
        className,
      )}
      aria-label="Exhibit"
    >
      <PhotoFrame variant="studied" className="w-full" />
      <MuseumPlacard />
      <ArchiveStamp archiveNumber="" />
    </section>
  );
}
