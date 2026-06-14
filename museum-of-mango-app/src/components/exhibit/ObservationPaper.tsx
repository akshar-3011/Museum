/**
 * ObservationPaper — Fixed-height container for FieldNoteBlock
 * Source: Slice 04A specification
 *
 * Purpose:
 *   - Reserves vertical space for the field note regardless of visibility
 *   - Height is fixed: sized to fit the placeholder text at
 *     var(--font-reading) within var(--width-reading)
 *   - Never resizes — identical height whether FieldNoteBlock
 *     is visible (opacity 1) or hidden (opacity 0)
 *   - This is the mechanism that prevents layout shift
 *
 * Rules:
 *   - Pure presentation
 *   - Never collapses
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface ObservationPaperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ObservationPaper({ children, className }: ObservationPaperProps) {
  return (
    <div
      className={cn(
        "h-[5rem]",
        "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
