/**
 * PhotoFrame — Framed exhibit container
 * Source: SPEC/05_components.md § PhotoFrame
 *
 * Variants (from SPEC/03_types.md § FrameVariant):
 *   studied  — precise border, --border-frame, complete four sides
 *   working  — --border-medium, 1–2° rotation, slightly imprecise
 *   open     — three sides only, fourth edge absent
 *
 * Rules:
 *   - FrameVariant always from props, never internal logic
 *   - Never borderless
 *   - No external images in Slice 02 — placeholder via token colors
 */

import type { FrameVariant } from "@/types";
import { cn } from "@/lib/cn";

interface PhotoFrameProps {
  readonly variant: FrameVariant;
  readonly alt?: string;
  readonly caption?: string;
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export function PhotoFrame({
  variant,
  alt,
  caption,
  className,
  children,
}: PhotoFrameProps) {
  const variantClass =
    variant === "studied"
      ? "museum-frame--studied"
      : variant === "working"
        ? "museum-frame--working"
        : "museum-frame--open";

  return (
    <figure className={cn("museum-frame", variantClass, className)}>
      <div
        className="museum-frame__image-area"
        role="img"
        aria-label={alt ?? "Exhibit placeholder"}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="museum-frame__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
