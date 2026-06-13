/**
 * HandwrittenText — Annotations, margin notes
 * Maps to: --font-note (Caveat)
 * Source: SPEC/02_tokens.md § Typography
 */

import { cn } from "@/lib/cn";

interface HandwrittenTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "span" | "p" | "div";
}

export function HandwrittenText({
  children,
  className,
  as: Tag = "span",
}: HandwrittenTextProps) {
  return (
    <Tag className={cn("museum-font-note", className)}>
      {children}
    </Tag>
  );
}
