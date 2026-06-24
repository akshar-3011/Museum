/**
 * DrawerPaper — Fixed-height container for ArchiveDrawer
 * Source: Slice 04C specification
 *
 * Purpose:
 *   - Reserves vertical space for the archive drawer content
 *     regardless of visibility state
 *   - Height is fixed: sized to fit the placeholder drawer text
 *     at var(--font-reading) within var(--width-reading)
 *   - Never resizes — identical height whether ArchiveDrawer
 *     is visible (opacity 1) or hidden (opacity 0)
 *   - Same mechanism as ObservationPaper
 *
 * Rules:
 *   - Pure presentation
 *   - Never collapses
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface DrawerPaperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function DrawerPaper({ children, className }: DrawerPaperProps) {
  return (
    <div
      className={cn(
        "h-[14rem]",
        "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
