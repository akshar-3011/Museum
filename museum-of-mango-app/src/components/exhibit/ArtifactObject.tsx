"use client";

/**
 * ArtifactObject — Preserved museum exhibit
 * Source: Slice 04A + 04B + 04C + 04D + 05C specification
 *
 * Purpose:
 *   - Single exhibit composition: frame, caption, placard,
 *     observation paper (field note), drawer paper (archive),
 *     museum verb controls, archive stamp
 *   - NOT a card. NOT a website component.
 *   - A preserved museum exhibit.
 *
 * Data model (Slice 04D):
 *   - TWO separate inputs, never merged:
 *     1. viewModel: ArtifactVM (content — from resolver pipeline)
 *     2. observation state + callbacks (from MuseumEngine via props)
 *
 * Interaction model (Slice 05C):
 *   - Observation state and callbacks are received as props
 *   - ArtifactObject does NOT call useObservation directly
 *   - MuseumEngine owns observation state via useMuseumRuntime
 *   - Three states: collapsed, observed, open
 *   - Observe: collapsed → observed (field note fades in)
 *   - Open:    observed → open (drawer content fades in)
 *   - Continue: open → observed (drawer content fades out)
 *   - ArchiveStamp is passive/decorative — no interaction
 *   - Museum verb controls follow placard typography style
 *
 * Layout order:
 *   PhotoFrame          (from viewModel.frameVariant)
 *   24px gap            (--space-24)
 *   CaptionBlock        (from viewModel.caption)
 *   16px gap            (--space-16)
 *   MuseumPlacard       (from viewModel.title, subtitle, date)
 *   16px gap            (--space-16)
 *   ObservationPaper
 *     └── FieldNoteBlock (from viewModel.fieldNote)
 *   16px gap            (--space-16)
 *   DrawerPaper
 *     └── ArchiveDrawer  (from viewModel.drawerText)
 *   24px gap            (--space-24)
 *   Museum verb controls (Observe / Open / Continue)
 *   24px gap            (--space-24)
 *   ArchiveStamp        (passive)
 *
 * Rules:
 *   - No hardcoded museum strings
 *   - Semantic section element
 *   - Named export only
 */

import { cn } from "@/lib/cn";
import { PhotoFrame } from "@/components/base/PhotoFrame";
import { MuseumPlacard } from "@/components/base/MuseumPlacard";
import { ArchiveStamp } from "@/components/base/ArchiveStamp";
import { CaptionBlock } from "@/components/exhibit/CaptionBlock";
import { ObservationPaper } from "@/components/exhibit/ObservationPaper";
import { FieldNoteBlock } from "@/components/exhibit/FieldNoteBlock";
import { DrawerPaper } from "@/components/exhibit/DrawerPaper";
import { ArchiveDrawer } from "@/components/exhibit/ArchiveDrawer";
import type { ArtifactVM } from "@/viewmodels/createArtifactViewModel";
import type { ExhibitState } from "@/hooks/useObservation";

/**
 * Museum verb control base styles.
 * Visually stripped of all button affordances — looks like
 * a museum placard that happens to be interactive.
 * Typography: var(--font-label), matching MuseumPlacard style.
 * Hover/focus: text color shifts to var(--color-amber-dusk).
 */
const VERB_CONTROL = cn(
  "museum-font-label",
  "bg-transparent",
  "border-0",
  "p-0",
  "shadow-none",
  "rounded-none",
  "cursor-pointer",
  "text-[var(--color-deep-ink)]",
  "hover:text-[var(--color-amber-dusk)]",
  "focus-visible:text-[var(--color-amber-dusk)]",
  "[transition-property:opacity,filter,color]",
  "[transition-duration:var(--motion-standard)]",
  "[transition-timing-function:var(--ease-standard)]",
);

interface ArtifactObjectProps {
  readonly viewModel: ArtifactVM;
  readonly observationState: ExhibitState;
  readonly onObserve: () => void;
  readonly onOpen: () => void;
  readonly onContinue: () => void;
  readonly className?: string;
}

export function ArtifactObject({
  viewModel,
  observationState,
  onObserve,
  onOpen,
  onContinue,
  className,
}: ArtifactObjectProps) {
  const isCollapsed = observationState === "collapsed";
  const isObserved = observationState === "observed";
  const isOpen = observationState === "open";

  return (
    <section
      className={cn("flex", "flex-col", className)}
      aria-label="Preserved exhibit"
    >
      <PhotoFrame variant={viewModel.frameVariant} className="w-full">
        {viewModel.asset && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={viewModel.asset}
            alt={viewModel.title}
            className="museum-frame__asset"
          />
        )}
      </PhotoFrame>

      <CaptionBlock
        text={viewModel.caption}
        className="mt-[var(--space-24)]"
      />

      <MuseumPlacard
        title={viewModel.title}
        subtitle={viewModel.subtitle}
        date={viewModel.date}
        className="mt-[var(--space-16)] self-start"
      />

      <ObservationPaper className="mt-[var(--space-16)]">
        <FieldNoteBlock
          text={viewModel.fieldNote}
          observed={!isCollapsed}
        />
      </ObservationPaper>

      <DrawerPaper className="mt-[var(--space-16)]">
        <ArchiveDrawer
          text={viewModel.drawerText}
          isOpen={isOpen}
        />
      </DrawerPaper>

      {/* Museum verb controls */}
      <div className="flex flex-col items-center gap-[var(--space-8)] mt-[var(--space-24)]">
        {/* Observe — visible only in collapsed state */}
        <button
          type="button"
          className={cn(
            VERB_CONTROL,
            isCollapsed
              ? "opacity-100 blur-0"
              : "opacity-0 blur-[2px] pointer-events-none",
          )}
          onClick={onObserve}
          aria-label="Observe"
          tabIndex={isCollapsed ? 0 : -1}
          aria-hidden={!isCollapsed || undefined}
        >
          Observe
        </button>

        {/* Open — visible from observed state onward */}
        <button
          type="button"
          className={cn(
            VERB_CONTROL,
            !isCollapsed
              ? "opacity-100 blur-0"
              : "opacity-0 blur-[2px] pointer-events-none",
            isOpen && "pointer-events-none cursor-default",
          )}
          onClick={isObserved ? onOpen : undefined}
          aria-label="Open"
          aria-disabled={isOpen || undefined}
          tabIndex={isObserved ? 0 : -1}
          aria-hidden={isCollapsed || undefined}
        >
          Open
        </button>

        {/* Continue — visible only in open state */}
        <button
          type="button"
          className={cn(
            VERB_CONTROL,
            isOpen
              ? "opacity-100 blur-0"
              : "opacity-0 blur-[2px] pointer-events-none",
          )}
          onClick={onContinue}
          aria-label="Continue"
          tabIndex={isOpen ? 0 : -1}
          aria-hidden={!isOpen || undefined}
        >
          Continue
        </button>
      </div>

      <ArchiveStamp
        archiveNumber=""
        className="mt-[var(--space-24)] self-center"
      />
    </section>
  );
}
