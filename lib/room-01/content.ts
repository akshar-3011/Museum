export interface ExhibitContent {
  id: string;
  title: string;
  tag?: string;
  copy: string;
  imagePath?: string;
  meta?: {
    quote?: string;
  };
}

export const ROOM_01_HEADER = {
  roomTag: "ROOM 01",
  title: "The Girl Behind The Name",
  subtitle: "Before Mango became a name I used, it was a version of you I learned to recognize.",
};

export const EXHIBITS: Record<string, ExhibitContent> = {
  exhibit1: {
    id: "exhibit1",
    title: "Exhibit 001 — Maroon Portrait",
    tag: "Observation 01 // Maroon Portrait",
    copy: "If someone asked me why I kept this photograph, I wouldn't have an intelligent answer. I think some people become important long before you realise they're becoming important.",
    imagePath: "/image/room-01/room-01_photo-01.jpg",
  },
  exhibit2: {
    id: "exhibit2",
    title: "Field Note — The Nickname",
    tag: "Observation 02 // Naming Convention",
    copy: "I didn't plan it. It started as a joke, a temporary label. But somehow, it bypassed every standard rule and simply refused to leave.",
  },
  exhibit3: {
    id: "exhibit3",
    title: "Name Card — Comparative Analysis",
    tag: "Observation 03 // The Contrast",
    copy: "Vidhi is the girl the world knows. Mango is the person I was lucky enough to meet behind her.",
  },
  exhibit4: {
    id: "exhibit4",
    title: "Transcribed Observation — The Voice",
    tag: "OBSERVATION 04 // WHEN THE NAME STOPPED FEELING NEW",
    copy: "I don't remember the exact moment Mango became permanent. There was no announcement. No agreement. No celebration. One day it was a joke. Then it was habit. Then somehow it became her.",
    meta: {
      quote: "The name was always Vidhi. Yet I never felt the need to replace with \"Mango.\" Somehow, without either of us deciding it, that became the name that stayed.",
    },
  },
  exhibit5: {
    id: "exhibit5",
    title: "Familiar Record — Sofa Print",
    tag: "Observation 05",
    copy: "This one carries your Vidhi vibes\nthe authenticity, the simplicity, the calmness hidden inside your smile.\nI always said I cared about Mango, not Vidhi.\nLooking back, I think I was wrong.\nThe parts of you that stayed with me most had always belonged to Vidhi too.",
    imagePath: "/image/room-01/room-01_photo-02.jpg",
  },
  secret: {
    id: "secret",
    title: "Hidden Record — Balcony View",
    tag: "Unfiled Memory",
    copy: "I don't know why this photograph stayed with me more than the others.\nI can't explain it through words, It reminds me of your presence.",
    imagePath: "/image/room-01/room-01_photo-03.jpg",
  },
  final: {
    id: "final",
    title: "The Name That Stayed",
    copy: "I've known you as Vidhi. I've known you as Mango.\nI've called you Bhondu and Babygirl too.\nBut in the end, only one name stayed long enough to feel..",
    imagePath: "/image/room-01/room-01_photo-04.jpg",
  },
};

export const EXIT_WALL = {
  tag: "END OF ROOM 01",
  title: "The Foundation is Set.",
  text: "The name was just the beginning. The actual memories lie ahead in Room 02.",
  nextRoomLabel: "Proceed to Room 02",
  nextRoomUrl: "/room-02",
};
