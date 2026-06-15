/**
 * FieldNoteBlock — Exhibit field note typography
 * Source: Slice 04A specification
 *
 * Purpose:
 *   - Pure typography for field note content
 *   - Uses var(--font-reading) via museum-font-reading class
 *   - Hidden via opacity only — never display or visibility
 *   - Transition: opacity 0→1, filter blur(2px)→blur(0)
 *   - Duration: var(--motion-standard), ease: var(--ease-standard)
 *
 * Rules:
 *   - Never uses display:none or visibility:hidden
 *   - No height/translate/scale animations
 *   - Named export only
 */

import { cn } from "@/lib/cn";

interface FieldNoteBlockProps {
  readonly text: string;
  readonly observed: boolean;
  readonly className?: string;
}

export function FieldNoteBlock({ text, observed, className }: FieldNoteBlockProps) {
  const paragraphs = text.split("\n\n");

  return (
    <div
      className={cn(
        "museum-font-reading",
        "space-y-[var(--space-12)]",
        "[transition-property:opacity,filter]",
        "[transition-duration:var(--motion-standard)]",
        "[transition-timing-function:var(--ease-standard)]",
        observed ? "opacity-100 blur-0" : "opacity-0 blur-[2px] pointer-events-none",
        className,
      )}
      aria-hidden={!observed}
    >
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">{paragraph}</p>
      ))}
    </div>
  );
}
