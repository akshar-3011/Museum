/**
 * MuseumSurface — Physical museum wall surface
 * Source: Slice 03 specification
 *
 * Purpose:
 *   - Provides the physical wall surface of the museum
 *   - Background: var(--color-parchment)
 *   - Min-height: 100vh
 *   - Contains MuseumContainer only
 *
 * Rules:
 *   - No decorative graphics
 *   - No logic
 *   - No animation
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface MuseumSurfaceProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function MuseumSurface({ children, className }: MuseumSurfaceProps) {
  return (
    <div
      className={cn(
        "min-h-screen",
        "bg-[var(--color-parchment)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
