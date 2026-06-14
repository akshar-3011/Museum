/**
 * CaptionBlock — Exhibit caption typography
 * Source: Slice 04A specification
 *
 * Purpose:
 *   - Pure typography component for exhibit captions
 *   - Uses var(--font-reading) via museum-font-reading class
 *   - Italic style distinguishes it from field note body text
 *
 * Rules:
 *   - No business logic
 *   - No interaction
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface CaptionBlockProps {
  readonly text: string;
  readonly className?: string;
}

export function CaptionBlock({ text, className }: CaptionBlockProps) {
  return (
    <p className={cn("museum-font-reading", "italic", className)}>
      {text}
    </p>
  );
}
