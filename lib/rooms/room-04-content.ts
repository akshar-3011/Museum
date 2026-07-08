export interface ObservationContent {
  id: string;
  title: string;
  tag: string;
  copy: string;
  assetType: "photo" | "video";
  assetPath: string;
  gridSpan: "small" | "medium" | "large";
}

export const ROOM_04_CONTENT = {
  threshold: {
    roomTag: "ROOM 04",
    title: "The Art of Noticing Her",
    subtitle: "An archive of details, habits, expressions, and moments that seemed insignificant until they became impossible to forget.",
  },
  observations: [
    {
      id: "exhibit1",
      title: "The First Thing I Checked",
      tag: "Attention Log // 01",
      copy: "The habit of preemptively closing a tab because I knew you'd complain about the font.",
      assetType: "photo",
      assetPath: "/image/room-04/room-04_photo-01.jpg",
      gridSpan: "small", // 1x1
    },
    {
      id: "exhibit2",
      title: "The Way We Fell Into Routine",
      tag: "Attention Log // 02",
      copy: "The transition from 'sorry for the late reply' to just replying three days later without apologizing.",
      assetType: "video",
      assetPath: "/video/room-04/room-04_video-01.mp4",
      gridSpan: "medium", // 2x1
    },
    {
      id: "exhibit3",
      title: "Moments I Kept Looking At",
      tag: "Attention Log // 03",
      copy: "The exact length of the pause you take before admitting you were wrong.",
      assetType: "photo",
      assetPath: "/image/room-04/room-04_photo-02.jpg",
      gridSpan: "small",
    },
    {
      id: "exhibit4",
      title: "Things Only I Seemed to Notice",
      tag: "Attention Log // 04",
      copy: "The way you type exactly like you speak—complete with the pauses and the sudden chaos.",
      assetType: "video",
      assetPath: "/video/room-04/room-04_video-02.mp4",
      gridSpan: "medium",
    },
    {
      id: "exhibit5",
      title: "Where She Felt Familiar",
      tag: "Attention Log // 05",
      copy: "The realization that I could predict exactly which line in the movie would make you pause the video.",
      assetType: "photo",
      assetPath: "/image/room-04/room-04_photo-03.jpg",
      gridSpan: "small",
    },
    {
      id: "exhibit6",
      title: "The Cumulative Effect",
      tag: "Attention Log // 06 // PRIMARY",
      copy: "The weight of a hundred small observations that eventually outweighed the rest of the world.",
      assetType: "video",
      assetPath: "/video/room-04/room-04_video-03.mp4",
      gridSpan: "medium", // 2x1
    },
  ] as ObservationContent[],
  secretCabinet: {
    label: "UNFILED FRAGMENTS",
    microObservations: [
      "You never actually answered half the questions I asked, you just sent a related meme.",
      "You probably forgot half the things you said. I accidentally archived them.",
      "I know exactly which messages I never deleted.",
      "Every playlist eventually got hijacked by a song you recommended.",
      "I stopped trying to figure out why I was paying attention.",
      "There was never a day I decided to pay attention. Then suddenly it had been years.",
    ],
  },
  exitWall: {
    tag: "END OF ROOM 04",
    title: "The Drawer Closes.",
    text: "Nothing in here was important enough to write down.\nThat's probably why I remembered it all.",
    nextRoomLabel: "Proceed to Room 05",
    nextRoomUrl: "/room-05",
  },
};
