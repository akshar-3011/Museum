/**
 * PaperTexture — Paper grain layer
 * Source: SPEC/05_components.md § MuseumShell
 *
 * Rules:
 *   - Full surface, fixed position
 *   - z-index: --z-paper
 *   - opacity <= 0.4
 *   - Never interactive (pointer-events: none)
 */

import { cn } from "@/lib/cn";

interface PaperTextureProps {
  readonly className?: string;
}

export function PaperTexture({ className }: PaperTextureProps) {
  return (
    <div
      className={cn("museum-paper-texture", className)}
      aria-hidden="true"
    />
  );
}
