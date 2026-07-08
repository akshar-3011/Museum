"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import FinalScreen from "./FinalScreen";

interface ClosingSequenceContextType {
  isClosing: boolean;
  initiateClosing: () => void;
}

const ClosingSequenceContext = createContext<ClosingSequenceContextType | null>(null);

export function useClosingSequence() {
  const context = useContext(ClosingSequenceContext);
  if (!context) {
    throw new Error("useClosingSequence must be used within ClosingSequenceProvider");
  }
  return context;
}

export function ClosingSequenceProvider({ children }: { children: React.ReactNode }) {
  const [isClosing, setIsClosing] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  useEffect(() => {
    if (isClosing) {
      window.dispatchEvent(new CustomEvent("set-theme-toggle-visible", { detail: false }));
    }
  }, [isClosing]);

  const initiateClosing = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      // The teardown sequence finishes fading around 3.5 seconds now.
      // We cut to the Final Screen immediately after.
      const timer = setTimeout(() => {
        setShowFinalScreen(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  if (showFinalScreen) {
    return <FinalScreen />;
  }

  return (
    <ClosingSequenceContext.Provider value={{ isClosing, initiateClosing }}>
      {children}
    </ClosingSequenceContext.Provider>
  );
}
