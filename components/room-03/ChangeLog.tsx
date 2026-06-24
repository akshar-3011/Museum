"use client";

import TextExhibit from "@/components/room-01/TextExhibit";
import MarginNoteTrigger from "@/components/exhibits/MarginNoteTrigger";
import { ROOM_03_CONTENT } from "@/lib/rooms/room-03-content";

export default function ChangeLog() {
  const content = ROOM_03_CONTENT.exhibits.changeLog;

  const exhibitContent = {
    id: content.id,
    title: content.title,
    tag: content.tag,
    copy: "",
  };

  return (
    <TextExhibit
      exhibit={exhibitContent}
      extraChildren={
        <div style={{ padding: "0.2rem" }}>
          <div
            className="font-serif-human"
            style={{
              fontSize: "1rem",
              lineHeight: 1.68,
              color: "#2c2a27",
              margin: 0,
            }}
          >
            There was never a decision. No moment where I consciously made room for you. Yet somehow,{" "}
            <MarginNoteTrigger
              highlightedText="ordinary things"
              marginNote={content.marginNote!}
              isRightSide={true}
            />
            {" "}started carrying your name. A thought. A story. A reaction. And eventually, entire days.
          </div>
        </div>
      }
    />
  );
}
