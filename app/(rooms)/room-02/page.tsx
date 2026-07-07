"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ExitWall from "@/components/shared/ExitWall";
import DrawerThreshold from "@/components/room-02/DrawerThreshold";
import FramedPhotoWithTag from "@/components/room-02/FramedPhotoWithTag";
import FragmentDrawer from "@/components/room-02/FragmentDrawer";
import FoldableDocument from "@/components/room-02/FoldableDocument";
import DiscoveredVideo from "@/components/room-02/DiscoveredVideo";
import RepetitionTimeline from "@/components/room-02/RepetitionTimeline";
import RealizationBlock from "@/components/room-02/RealizationBlock";
import { ROOM_02_CONTENT } from "@/lib/rooms/room-02-content";

export default function Room02Page() {
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        color: "var(--color-text-primary)",
      }}
    >
      <AnimatePresence mode="wait">
        {!isRoomOpen ? (
          /* ── Beat 1: Threshold ── */
          <DrawerThreshold
            key="threshold"
            roomTag={ROOM_02_CONTENT.threshold.roomTag}
            drawerLabel={ROOM_02_CONTENT.threshold.drawerLabel}
            onOpen={() => setIsRoomOpen(true)}
          />
        ) : (
          /* ── Beats 2-11: Room Content ── */
          <motion.main
            key="room-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 1.0, ease: "easeOut" }}
            style={{
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
              padding: "8rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
          >
            {/* ── Beat 2: Thesis Statement ── */}
            <div
              style={{
                marginBottom: "7rem",
                maxWidth: "620px",
                alignSelf: "flex-start",
                paddingLeft: "2rem",
              }}
            >
              <span
                className="font-mono-system"
                style={{
                  color: "var(--color-accent)",
                  fontSize: "0.75rem",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {ROOM_02_CONTENT.threshold.roomTag}
              </span>
              <h1
                className="font-serif-human"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  marginBottom: "1.5rem",
                  letterSpacing: "0.02em",
                  lineHeight: 1.25,
                }}
              >
                The Art of Staying
              </h1>
              <p
                className="font-serif-human"
                style={{
                  fontSize: "1.08rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                }}
              >
                <span style={{ display: "block", marginBottom: "0.5rem" }}>
                  {ROOM_02_CONTENT.thesis.lineOne}
                </span>
                <span style={{ display: "block", marginBottom: "0.5rem" }}>
                  {ROOM_02_CONTENT.thesis.lineTwo}
                </span>
                <span style={{ display: "block", marginBottom: "0.5rem" }}>
                  {ROOM_02_CONTENT.thesis.lineThree}
                </span>
                <span style={{ display: "block" }}>
                  {ROOM_02_CONTENT.thesis.lineFour}
                </span>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14rem",
                width: "100%",
              }}
            >
              {/* ── Beat 2 (cont): Photo 01 with tag-pull ── */}
              <section>
                <FramedPhotoWithTag
                  id="photo-1"
                  imagePath={ROOM_02_CONTENT.photo01.imagePath}
                  alt={ROOM_02_CONTENT.photo01.alt}
                  tagText={ROOM_02_CONTENT.photo01.tagText}
                  description={ROOM_02_CONTENT.photo01.description}
                  priority
                />
              </section>

              {/* ── Beat 4: The Drawer ── */}
              <section>
                <FragmentDrawer
                  label={ROOM_02_CONTENT.drawer.label}
                  fragments={ROOM_02_CONTENT.drawer.fragments}
                />
              </section>

              {/* ── Beat 5: Foldable Document ── */}
              <section style={{ padding: "2rem 0" }}>
                <FoldableDocument
                  id="doc-1"
                  title={ROOM_02_CONTENT.accumulationLog.title}
                  entries={ROOM_02_CONTENT.accumulationLog.entries}
                />
              </section>

              {/* ── Beat 6: Video Fragment One ── */}
              <section>
                <DiscoveredVideo
                  id="video-1"
                  imagePath={ROOM_02_CONTENT.video01.imagePath}
                  label={ROOM_02_CONTENT.video01.label}
                />
              </section>

              {/* ── Beat 7: Photo 02 with tag-pull (learned mechanic) ── */}
              <section>
                <FramedPhotoWithTag
                  id="photo-2"
                  imagePath={ROOM_02_CONTENT.photo02.imagePath}
                  alt={ROOM_02_CONTENT.photo02.alt}
                  tagText={ROOM_02_CONTENT.photo02.tagText}
                  tagPosition="bottom-left"
                />
              </section>

              {/* ── Beat 8: Repetition Timeline with micro-discoveries ── */}
              <section>
                <RepetitionTimeline ticks={ROOM_02_CONTENT.timeline.ticks} />
              </section>

              {/* ── Beat 9: Quiet Video ── */}
              <section style={{ padding: "6rem 0" }}>
                <DiscoveredVideo
                  id="video-2"
                  imagePath={ROOM_02_CONTENT.video02.imagePath}
                  label={ROOM_02_CONTENT.video02.label}
                  quiet
                  recoveredText={`The archive begins here.\n\nThe first time "you" and "I" became "us" in a frame.`}
                />
              </section>

              {/* ── Beat 10: Final Photo (no tag — earns stillness) + Realization ── */}
              <section>
                <FramedPhotoWithTag
                  id="photo-3"
                  imagePath={ROOM_02_CONTENT.photo03.imagePath}
                  alt={ROOM_02_CONTENT.photo03.alt}
                />
                <div style={{ marginTop: "8rem" }}>
                  <RealizationBlock lines={ROOM_02_CONTENT.realization.lines} />
                </div>
              </section>
            </div>

            {/* ── Beat 11: Exit ── */}
            <div style={{ marginTop: "14rem" }}>
              <ExitWall
                tag={ROOM_02_CONTENT.exitWall.tag}
                title={ROOM_02_CONTENT.exitWall.title}
                text={ROOM_02_CONTENT.exitWall.text}
                nextRoomLabel={ROOM_02_CONTENT.exitWall.nextRoomLabel}
                nextRoomUrl={ROOM_02_CONTENT.exitWall.nextRoomUrl}
              />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
