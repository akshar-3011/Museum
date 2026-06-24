/**
 * MuseumContainer — Reading column, centers content
 * Source: Slice 03 specification
 *
 * Purpose:
 *   - Constrains content to reading width
 *   - Centers horizontally via margin-inline auto
 *   - Vertical padding: var(--space-48)
 *   - Horizontal padding: var(--space-24)
 *
 * Rules:
 *   - Never knows current room
 *   - Never knows museum state
 *   - Contains children only
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface MuseumContainerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function MuseumContainer({ children, className }: MuseumContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto",
        "max-w-[var(--width-reading)]",
        "py-[var(--space-48)]",
        "px-[var(--space-24)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
