import { useEffect, useState, useRef, useCallback } from "react";

export type Beat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface UsePrologueSequencerProps {
  onComplete: () => void;
}

export function usePrologueSequencer({ onComplete }: UsePrologueSequencerProps) {
  const [beat, setBeat] = useState<Beat>(0);
  const [hasSkipped, setHasSkipped] = useState(false);
  const timerIds = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending timeouts safely
  const clearAllTimers = useCallback(() => {
    timerIds.current.forEach((id) => clearTimeout(id));
    timerIds.current = [];
  }, []);

  // Register a timeout that will be tracked for cleanup
  const registerTimer = useCallback((callback: () => void, delayMs: number) => {
    const id = setTimeout(callback, delayMs);
    timerIds.current.push(id);
    return id;
  }, []);

  // Action: Skip the introduction sequence and go straight to the threshold (Beat 6)
  const skipIntro = useCallback(() => {
    clearAllTimers();
    setHasSkipped(true);
    setBeat(6);
  }, [clearAllTimers]);

  // Action: Trigger activation from Beat 6 (starts the open logs sequence in Beat 7)
  const openArchive = useCallback(() => {
    clearAllTimers();
    setBeat(7);
  }, [clearAllTimers]);

  // Orchestrate automatic transitions per beat
  useEffect(() => {
    // If user has skipped, do not run automatic progression for early beats
    if (hasSkipped && beat < 6) return;

    switch (beat) {
      case 0: // Black: 0.0s - 0.6s
        registerTimer(() => {
          setBeat(1);
        }, 600);
        break;

      case 1: // System Voice Wakes: 0.6s - 2.0s
        registerTimer(() => {
          setBeat(2);
        }, 1400);
        break;

      case 2: // Inventory Scan: 2.0s - 7.0s
        registerTimer(() => {
          setBeat(3);
        }, 5000);
        break;

      case 3: // Failed Attempts: 7.0s - 10.5s
        registerTimer(() => {
          setBeat(4);
        }, 3500);
        break;

      case 4: // The Confession: 10.5s - 25.0s
        registerTimer(() => {
          setBeat(5);
        }, 14500);
        break;

      case 5: // The Reframe: 18.0s - 22.4s
        registerTimer(() => {
          setBeat(6);
        }, 4400);
        break;

      case 6:
        // Wait for user interaction to click "OPEN ARCHIVE"
        break;

      case 7: // Activation: 2.8s
        registerTimer(() => {
          setBeat(8);
        }, 2800);
        break;

      case 8: // The Name: 3.4s (2.4s to animate + 1s hold), then transition to Room 01
        registerTimer(() => {
          onComplete();
        }, 3400);
        break;

      default:
        break;
    }

    return () => {
      // Clean up timers created in this specific beat cycle
      clearAllTimers();
    };
  }, [beat, hasSkipped, registerTimer, clearAllTimers, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return {
    beat,
    skipIntro,
    openArchive,
    showSkip: beat >= 4 && beat < 6,
  };
}
