"use client";

import { useEffect, useState } from "react";
import SystemLogLine from "./SystemLogLine";
import { LogLine } from "@/lib/prologue/content";

interface SystemLogSequenceProps {
  lines: LogLine[];
}

export default function SystemLogSequence({ lines }: SystemLogSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = lines.map((line, idx) => {
      return setTimeout(() => {
        setVisibleCount(idx + 1);
      }, line.delay);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [lines]);

  return (
    <div
      aria-live="polite"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        minHeight: "120px", // reserve vertical space to avoid CLS
      }}
    >
      {lines.slice(0, visibleCount).map((line, index) => {
        let opacityOverride = undefined;
        if (line.emphasis === "normal") opacityOverride = 1.0;
        else if (line.emphasis === "dim") opacityOverride = 0.7;
        else if (line.emphasis === "strong") opacityOverride = 0.45;

        // Dim older lines in the stack (keep only the latest line fully active)
        const isDimmed = index < visibleCount - 1;

        return (
          <SystemLogLine
            key={index}
            text={line.text}
            isDimmed={isDimmed}
            opacityOverride={opacityOverride}
          />
        );
      })}
    </div>
  );
}
