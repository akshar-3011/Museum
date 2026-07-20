// ROOM 02 — "THE DRAWER OF REPEATED THINGS"
// All content in personal-observation voice, never report-language.

export const ROOM_02_CONTENT = {
  // ── Beat 1: Threshold ──
  threshold: {
    roomTag: "ROOM 02",
    drawerLabel: "The Art of Staying",
  },

  // ── Beat 2-3: Thesis + Photo + Tag-Pull ──
  thesis: {
    lineOne: "You didn't remain because I held on.",
    lineTwo: "You remained because you belonged.",
    lineThree: "Like sunlight in a familiar room",
    lineFour: "unnoticed most days, missing the moment it's gone.",
  },
  photo01: {
    imagePath: "/image/room-02/room-02_photo-01.jpg",
    alt: "First evidence of return",
    tagText: "A photograph taken without permission.\nA memory kept without regret.",
    description: "No one told us this picture was clicked. That's what makes it perfect.\nA moment that wasn't posed, a memory that wasn't planned, and somehow everything we were, in one frame.",
  },

  // ── Beat 4: The Drawer ──
  drawer: {
    label: "Accumulated observations",
    fragments: [
      "Mango became normal.",
      "The fight ended. The nickname didn't.",
      "Another ordinary conversation.",
      "Sent a reel. No explanation.",
      "\"Jao.\"",
      "Came back anyway.",
      "Read it. Replied tomorrow.",
      "Asked if I ate.",
      "Still correcting me.",
      "Made fun of me.",
      "Another random update.",
      "Remembered something I forgot.",
      "Sent a photo without context.",
      "One more complaint.",
      "One more story.",
      "Expected me to understand.",
      "Bhondu.",
      "Babygirl.",
      "Same chaos.",
      "Same person.",
      "The routine formed.",
      "The nickname survived.",
      "The conversation continued.",
      "Another Tuesday.",
      "Shared a song she liked.",
      "Told me she was bored.",
      "Called at 2 AM.",
      "Sent a screenshot of a dog.",
      "Complained about her day.",
      "Sent a random selfie.",
      "Another 'good morning' text.",
      "Argued about spelling.",
      "Shared the Spotify blend.",
      "Sent a cat video.",
    ],
  },

  // ── Beat 5: Foldable Document ──
  accumulationLog: {
    title: "Accumulation Log — Day 1 to Day 300",
    entries: [
      { day: "Day 1", note: "Noticed." },
      { day: "Day 40", note: "Still noticing." },
      { day: "Day 120", note: "Stopped counting." },
      { day: "Day 300", note: "Stopped needing to count." },
    ],
  },

  // ── Beat 6: Video Fragment One ──
  video01: {
    imagePath: "/video/room-02/room-02_video-01.mp4",
    label: "Footage recovered.",
  },

  // ── Beat 7: Photo + Tag-Pull (learned mechanic) ──
  photo02: {
    imagePath: "/image/room-02/room-02_photo-02.jpg",
    alt: "Unremarkable Tuesday, documented",
    tagText: "You called them random photos.\nI saved every one of them.",
  },

  // ── Beat 8: Timeline with micro-discoveries ──
  timeline: {
    ticks: [
      { label: "noticed", fragment: null },
      { label: "noticed again", fragment: null },
      { label: "still here", fragment: "Same laugh, different month." },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: "Tuesday again. Still." },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: "Stopped being surprised." },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: "This is just how it is now." },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "still here", fragment: null },
      { label: "always here", fragment: null },
      { label: "always here", fragment: "Always." },
    ],
  },

  // ── Beat 9: Video Fragment Two (quiet) ──
  video02: {
    imagePath: "/video/room-02/room-02_video-02.mp4",
    label: "Footage recovered.",
  },

  // ── Beat 10: Final photo + Realization ──
  photo03: {
    imagePath: "/image/room-02/room-02_photo-03.jpg",
    alt: "The realization",
  },
  realization: {
    lines: [
      { text: "The extraordinary is rarely loud.", delay: 0 },
      { text: "It is simply what remains", delay: 2200 },
      { text: "after everything else fades.", delay: 4200 },
    ],
  },

  // ── Beat 11: Exit ──
  exitWall: {
    tag: "END OF ROOM 02",
    title: "No grand moment was ever found.",
    text: "There wasn't a single day where everything changed.\nIt was just a hundred ordinary Tuesdays,\nand then one day I realized the baseline had permanently shifted.",
    nextRoomLabel: "Proceed to Room 03",
    nextRoomUrl: "/room-03",
  },
};
