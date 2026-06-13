/**
 * HeadingText — Placards, headings
 * Maps to: --font-label (Libre Baskerville)
 * Source: SPEC/02_tokens.md § Typography
 */

import { cn } from "@/lib/cn";

interface HeadingTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

export function HeadingText({
  children,
  className,
  as: Tag = "h2",
}: HeadingTextProps) {
  return (
    <Tag className={cn("museum-font-label", className)}>
      {children}
    </Tag>
  );
}
