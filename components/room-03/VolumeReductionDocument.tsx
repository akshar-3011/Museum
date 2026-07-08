"use client";

import PhotoExhibit from "@/components/room-01/PhotoExhibit";
import MarginNoteTrigger from "@/components/exhibits/MarginNoteTrigger";
import { ROOM_03_CONTENT } from "@/lib/rooms/room-03-content";
import { getArtifactToken } from "@/lib/design/artifact-tokens";

export default function VolumeReductionDocument() {
  const content = ROOM_03_CONTENT.exhibits.volumeReduction;

  const exhibitContent = {
    id: content.id,
    title: content.title,
    tag: content.tag,
    copy: "",
    imagePath: content.imagePath,
  };

  return (
    <PhotoExhibit
      exhibit={exhibitContent}
      photoRotation={getArtifactToken(content.id).rotation}
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
            When she speaks, ambient noise seems to drop. It isn&apos;t an acoustic phenomenon, but a focal one. The outside world is{" "}
            <MarginNoteTrigger
              highlightedText="temporarily muted by proximity"
              marginNote={content.marginNote!}
              isRightSide={true}
            />
            .
          </div>
        </div>
      }
    />
  );
}
