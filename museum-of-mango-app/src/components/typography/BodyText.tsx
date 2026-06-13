/**
 * BodyText — Body text, reading passages
 * Maps to: --font-reading (Lora)
 * Source: SPEC/02_tokens.md § Typography
 */

import { cn } from "@/lib/cn";

interface BodyTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "p" | "span" | "div";
}

export function BodyText({
  children,
  className,
  as: Tag = "p",
}: BodyTextProps) {
  return (
    <Tag className={cn("museum-font-reading", className)}>
      {children}
    </Tag>
  );
}
