"use client";

import ExhibitFrame from "@/components/room-01/ExhibitFrame";
import SlowLineReveal from "@/components/shared/SlowLineReveal";
import { ROOM_05_CONTENT } from "@/lib/rooms/room-05-content";

export default function RemainTrueStatements() {
  const content = ROOM_05_CONTENT.exhibits.statements;

  // Convert items to the format SlowLineReveal expects
  // Each statement holds for 900ms before the next arrives — this is the slowest
  // reveal in the museum. These sentences deserve to land one at a time.
  const lines = content.items.map((item, idx) => ({
    text: item,
    delay: idx * 900,
  }));

  return (
    <ExhibitFrame id={content.id} tag={content.tag}>
      <div style={{ padding: "1rem" }}>
        <h3
          className="font-serif-human"
          style={{
            fontSize: "1.2rem",
            color: "var(--color-text-primary)",
            marginBottom: "1.5rem",
            fontWeight: 400,
          }}
        >
          {content.title}
        </h3>

        {/* Each statement arrives individually. No list markers — the dash is drawn by SlowLineReveal's
            ambient dimming of prior lines, creating the same stepped focus. */}
        <SlowLineReveal lines={lines} baseDelay={200} />
      </div>
    </ExhibitFrame>
  );
}
