/**
 * MuseumShell — Persistent application wrapper
 * Source: SPEC/05_components.md § MuseumShell
 *
 * Purpose:
 *   - Contains paper texture layer
 *   - Contains ambient light layer
 *   - Renders children
 *   - Never unmounts
 *
 * Rules:
 *   - Named export only
 *   - No business logic
 *   - No routing logic
 *   - No hardcoded content
 *   - Semantic HTML (main element)
 *   - Uses only tokens from SPEC/02_tokens.md
 *
 * Z-index layering:
 *   PaperTexture  → var(--z-paper)
 *   AmbientLayer  → between --z-paper and --z-content
 *   Content       → var(--z-content)
 */

import { cn } from "@/lib/cn";
import { PaperTexture } from "@/components/base/PaperTexture";
import { AmbientLayer } from "@/components/base/AmbientLayer";

interface MuseumShellProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function MuseumShell({ children, className }: MuseumShellProps) {
  return (
    <main className={cn("museum-shell", className)}>
      <PaperTexture />
      <AmbientLayer />
      <div className="museum-shell__content">
        {children}
      </div>
    </main>
  );
}

