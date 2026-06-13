/**
 * ArchiveStamp — Circular archive motif
 * Source: SPEC/05_components.md § ArchiveStamp
 *
 * Two states:
 *   Interactive — receives onClick, focusable, focus ring
 *   Passive     — decorative only, not focusable
 *
 * Visual Rules:
 *   Shape:        circle only
 *   Default:      --color-graphite-whisper
 *   Hover/focus:  --color-amber-dusk
 *
 * Accessibility:
 *   role="button" only when interactive
 *   Non-interactive: no role, no tab stop
 */

import { cn } from "@/lib/cn";

interface ArchiveStampProps {
  readonly archiveNumber: string;
  readonly interactive?: boolean;
  readonly ariaLabel?: string;
  readonly onClick?: () => void;
  readonly className?: string;
}

export function ArchiveStamp({
  archiveNumber,
  interactive = false,
  ariaLabel,
  onClick,
  className,
}: ArchiveStampProps) {
  if (interactive) {
    return (
      <button
        type="button"
        className={cn("museum-stamp", "museum-stamp--interactive", className)}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <span className="museum-stamp__label">{archiveNumber}</span>
      </button>
    );
  }

  return (
    <div
      className={cn("museum-stamp", className)}
      aria-hidden="true"
    >
      <span className="museum-stamp__label">{archiveNumber}</span>
    </div>
  );
}
