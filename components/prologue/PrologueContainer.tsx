"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SystemLogSequence from "./SystemLogSequence";
import SystemLogLine from "./SystemLogLine";
import ConfessionBlock from "./ConfessionBlock";
import ReframeStatement from "./ReframeStatement";
import ArchiveButton from "./ArchiveButton";
import SkipAffordance from "./SkipAffordance";
import NameReveal from "./NameReveal";
import { usePrologueSequencer, Beat } from "@/hooks/usePrologueSequencer";
import { BEAT_2_LOGS, BEAT_3_LOGS, BEAT_7_ACTIVATION } from "@/lib/prologue/content";

export default function PrologueContainer() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize the sequencer hook with completion transition to Room 01
  const { beat, skipIntro, openArchive, showSkip } = usePrologueSequencer({
    onComplete: () => {
      setIsTransitioning(true);
      setTimeout(() => {
        router.push("/room-01");
      }, 700);
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        padding: "2rem",
        zIndex: 1,
        // Smooth background-color shift between near-black and charcoal
        backgroundColor: beat >= 4 && beat <= 6 ? "var(--color-bg-secondary)" : "var(--color-bg)",
        transition: shouldReduceMotion ? "none" : "background-color 1.5s ease-in-out",
      }}
    >
      {/* Main content viewport */}
      <main
        style={{
          width: "100%",
          maxWidth: "600px", // narrow document feel in a large dark room
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {/* Beat 0: Black Void */}
          {beat === 0 && (
            <motion.div
              key="beat-0"
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              style={{ minHeight: "200px" }}
            />
          )}

          {/* Beat 1 & 2: Opening logs and Inventory scan */}
          {(beat === 1 || beat === 2) && (
            <motion.div
              key="logs-opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%" }}
            >
              <OpeningLogsView activeBeat={beat} />
            </motion.div>
          )}

          {/* Beat 3: Failed attempts and first human voice entry */}
          {beat === 3 && (
            <motion.div
              key="logs-attempts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%" }}
            >
              <Beat3View />
            </motion.div>
          )}

          {/* Beat 4: Poetic confession */}
          {beat === 4 && (
            <motion.div
              key="confession"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%" }}
            >
              <ConfessionBlock />
            </motion.div>
          )}

          {/* Beat 5 & 6: Reframe thesis statement and optional Open button */}
          {(beat === 5 || beat === 6) && (
            <motion.div
              key="reframe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ReframeStatement />
              {beat === 6 && <ArchiveButton onClick={openArchive} />}
            </motion.div>
          )}

          {/* Beat 7: Archive opening activation logs */}
          {beat === 7 && (
            <motion.div
              key="logs-activation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ width: "100%" }}
            >
              <SystemLogSequence lines={BEAT_7_ACTIVATION} />
            </motion.div>
          )}

          {/* Beat 8: final Name placard reveal */}
          {beat === 8 && (
            <motion.div
              key="name-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isTransitioning ? 0.3 : 0.8 }}
              style={{ width: "100%" }}
            >
              <NameReveal />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Skip button for repeat visitors */}
      <AnimatePresence>
        {showSkip && <SkipAffordance onSkip={skipIntro} />}
      </AnimatePresence>
    </div>
  );
}

// Subcomponent: Handles smooth transition between Beat 1 and Beat 2 log states
function OpeningLogsView({ activeBeat }: { activeBeat: Beat }) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (activeBeat === 2) {
      // Stagger remaining status lines
      const timers = BEAT_2_LOGS.slice(1).map((line, idx) => {
        return setTimeout(() => {
          setVisibleCount(idx + 2);
        }, line.delay);
      });
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [activeBeat]);

  return (
    <div
      aria-live="polite"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        minHeight: "120px", // Reserve height to prevent CLS
      }}
    >
      {BEAT_2_LOGS.slice(0, visibleCount).map((line, index) => {
        const isDimmed = index < visibleCount - 1;
        return <SystemLogLine key={index} text={line.text} isDimmed={isDimmed} />;
      })}
    </div>
  );
}

// Subcomponent: Orchestrates attempts log and fades in the humanist "Still incomplete" message
function Beat3View() {
  const [showResult, setShowResult] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => {
      setShowResult(true);
    }, 2400); // Trigger result fade 800ms after the last "Attempt found." line
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
        }}
      >
        <SystemLogSequence lines={BEAT_3_LOGS} />
      </div>
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-human"
          style={{
            fontSize: "1.25rem",
            textAlign: "center",
            marginTop: "1.5rem",
            fontStyle: "italic",
            color: "var(--color-text-primary)",
          }}
        >
          Result: Still incomplete.
        </motion.div>
      )}
    </div>
  );
}
