/**
 * MuseumPlacard — Museum label system
 * Source: SPEC/05_components.md, SPEC/06_engine.md § Error Strategy
 *
 * Rules:
 *   - Semantic markup
 *   - Font uses label token (--font-label)
 *   - Never interactive
 */

import { cn } from "@/lib/cn";

interface MuseumPlacardProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly date?: string;
  readonly className?: string;
}

export function MuseumPlacard({
  title,
  subtitle,
  date,
  className,
}: MuseumPlacardProps) {
  if (!title && !subtitle && !date) {
    return null;
  }

  return (
    <aside className={cn("museum-placard", className)} aria-label="Museum placard">
      {title && (
        <p className="museum-placard__title">{title}</p>
      )}
      {subtitle && (
        <p className="museum-placard__subtitle">{subtitle}</p>
      )}
      {date && (
        <time className="museum-placard__date">{date}</time>
      )}
    </aside>
  );
}
