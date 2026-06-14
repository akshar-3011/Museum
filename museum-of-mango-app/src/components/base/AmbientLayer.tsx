/**
 * AmbientLayer — Directional warm museum light
 * Source: Slice 03 specification
 *
 * Purpose:
 *   - Renders warm directional light from above
 *   - CSS only — no JavaScript, no animation
 *   - Position: fixed, inset 0, pointer-events none
 *   - Z-index: between --z-paper (10) and --z-content (20)
 *
 * Background:
 *   radial-gradient(ellipse at 50% 28%, rgba(196,133,58,0.04) 0%, transparent 72%)
 *   Note: rgba(196,133,58,0.04) is --color-amber-dusk at exactly 4% opacity.
 *
 * Rules:
 *   - Maximum amber contribution: 4% opacity
 *   - Never exceeds 6% opacity under any circumstance
 *   - Never animates, moves, pulses
 *   - Never uses images, canvas, or JavaScript
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface AmbientLayerProps {
  readonly className?: string;
}

export function AmbientLayer({ className }: AmbientLayerProps) {
  return (
    <div
      className={cn(
        "fixed",
        "inset-0",
        "pointer-events-none",
        "z-[15]",
        "[background:radial-gradient(ellipse_at_50%_28%,rgba(196,133,58,0.04)_0%,transparent_72%)]",
        className,
      )}
      aria-hidden="true"
    />
  );
}
