"use client";

import TextExhibit from "@/components/room-01/TextExhibit";
import HiddenNoteTrigger from "@/components/exhibits/HiddenNoteTrigger";
import { ROOM_03_CONTENT } from "@/lib/rooms/room-03-content";

export default function AtmosphereReport() {
  const content = ROOM_03_CONTENT.exhibits.atmosphereReport;

  // Adapt the Room 03 content to the Room 01 ExhibitContent shape
  const exhibitContent = {
    id: content.id,
    title: content.title,
    tag: content.tag,
    copy: content.copy,
  };

  return (
    <HiddenNoteTrigger hiddenText={content.hiddenText!}>
      <TextExhibit exhibit={exhibitContent} />
    </HiddenNoteTrigger>
  );
}
