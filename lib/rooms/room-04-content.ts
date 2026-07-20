export interface ObservationContent {
  id: string;
  title: string;
  tag: string;
  copy: string;
  assetType: "photo" | "video";
  imagePath: string;
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
      copy: "The habit of looking for her name, message, or presence without realizing it.",
      assetType: "photo",
      imagePath: "/image/room-04/room-04_photo-01.jpg",
      gridSpan: "small", // 1x1
    },
    {
      id: "exhibit2",
      title: "The Way We Fell Into Routine",
      tag: "Attention Log // 02",
       copy: "The unspoken rhythm of daily conversations and familiar check-ins.",
      assetType: "video",
      imagePath: "/video/room-04/room-04_video-01.mp4",
      gridSpan: "medium", // 2x1
    },
    {
      id: "exhibit3",
      title: "Moments I Kept Looking At",
      tag: "Attention Log // 03",
      copy: "Small moments that somehow held my attention longer than they should have.",
      assetType: "photo",
      imagePath: "/image/room-04/room-04_photo-02.jpg",
      gridSpan: "small",
    },
    {
      id: "exhibit4",
      title: "Things Only I Seemed to Notice",
      tag: "Attention Log // 04",
      copy: "A specific shade of brown that permanently recalibrated my visual baseline.",
      assetType: "video",
      imagePath: "/video/room-04/room-04_video-02.mp4",
      gridSpan: "medium",
    },
    {
      id: "exhibit5",
      title: "Where She Felt Familiar",
      tag: "Attention Log // 05",
      copy: "The comfort of her presence without needing a reason for it.",
      assetType: "photo",
      imagePath: "/image/room-04/room-04_photo-03.jpg",
      gridSpan: "small",
    },
    {
      id: "exhibit6",
      title: "The Cumulative Effect",
      tag: "Attention Log // 06 // PRIMARY",
      copy: "The weight of a hundred small observations that eventually outweighed the rest of the world.",
      assetType: "video",
      imagePath: "/video/room-04/room-04_video-03.mp4",
      gridSpan: "medium", // 2x1
    },
  ] as ObservationContent[],
  secretCabinet: {
    label: "UNFILED FRAGMENTS",
    microObservations: [
      "You never actually answered half the questions I asked, you just sent a related meme.",
      "You probably forgot half the things you said. I accidentally archived them.",
      "I know exactly which messages I never deleted.",
      "Every playlist eventually developed an anomalous track tied to one subject.",
      "I kept noticing things because she kept mattering.",
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
