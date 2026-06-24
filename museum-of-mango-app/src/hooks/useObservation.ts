"use client";

/**
 * useObservation — Exhibit state machine
 * Source: Slice 04C specification
 *
 * State transitions:
 *   collapsed → observed (observe)
 *   observed  → open     (open)
 *   open      → observed (close)
 *
 * Rules:
 *   - collapsed → observed is irreversible (no un-observe)
 *   - close() returns to observed, never to collapsed
 *   - React useState only — no Zustand, no persistence
 *   - Named export only
 */

import { useState, useCallback } from "react";

export type ExhibitState = "collapsed" | "observed" | "open";

interface UseObservationReturn {
  readonly state: ExhibitState;
  readonly observe: () => void;
  readonly open: () => void;
  readonly close: () => void;
}

export function useObservation(): UseObservationReturn {
  const [state, setState] = useState<ExhibitState>("collapsed");

  const observe = useCallback(() => {
    setState((prev) => (prev === "collapsed" ? "observed" : prev));
  }, []);

  const open = useCallback(() => {
    setState((prev) => (prev === "observed" ? "open" : prev));
  }, []);

  const close = useCallback(() => {
    setState((prev) => (prev === "open" ? "observed" : prev));
  }, []);

  return { state, observe, open, close };
}
