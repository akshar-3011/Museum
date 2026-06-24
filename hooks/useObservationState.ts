"use client";

import { useState, useCallback } from "react";

export type DrawerState = "closed" | "opened-this-session";

export function useObservationState(initialIds: string[]) {
  // Initialize all to "closed"
  const [states, setStates] = useState<Record<string, DrawerState>>(() => {
    const init: Record<string, DrawerState> = {};
    initialIds.forEach((id) => {
      init[id] = "closed";
    });
    return init;
  });

  const markOpened = useCallback((id: string) => {
    setStates((prev) => ({
      ...prev,
      [id]: "opened-this-session",
    }));
  }, []);

  return { states, markOpened };
}
