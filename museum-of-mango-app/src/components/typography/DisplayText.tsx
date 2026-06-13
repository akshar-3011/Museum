/**
 * DisplayText — Chapter titles
 * Maps to: --font-display (Cormorant Garamond)
 * Source: SPEC/02_tokens.md § Typography
 */

import { cn } from "@/lib/cn";

interface DisplayTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function DisplayText({
  children,
  className,
  as: Tag = "h1",
}: DisplayTextProps) {
  return (
    <Tag className={cn("museum-font-display", className)}>
      {children}
    </Tag>
  );
}
