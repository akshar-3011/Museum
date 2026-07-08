export interface Room03ExhibitContent {
  id: string;
  title: string;
  tag?: string;
  copy: string;
  imagePath?: string;
  hiddenText?: string;
  marginNote?: string;
  secretImagePath?: string;
}

export const ROOM_03_CONTENT = {
  threshold: {
    roomTag: "ROOM 03",
    title: "The Impact of Her",
    subtitle: "Not the story of who she was. The story of who I became around her.",
  },
  exhibits: {
    atmosphereReport: {
      id: "exhibit1",
      title: "Document 01 — Unprompted Recall",
      tag: "Habit Log // Involuntary Indexing",
      copy: "I started saving memes I knew you'd hate. I started noticing when dogs looked like the ones you sent. I didn't plan to build an index of things to show you.",
      hiddenText: "The world didn't change, I just started running it through a filter of what you might find funny.",
    },
    volumeReduction: {
      id: "exhibit2",
      title: "Document 02 — The 2 AM Override",
      tag: "Audio Analysis // Background Noise",
      copy: "The baseline rule was sleep. The exception was a notification that required immediate defense of a bad take on a movie.",
      marginNote: "It wasn't that the conversations were deep. It was that they were effortless. No performance, no bracing for judgment. Just two idiots awake when they shouldn't be.",
      imagePath: "/image/room-03/room-03_photo-01.jpg", // Embedded in the text exhibit
    },
    comfortStudy: {
      id: "exhibit3",
      title: "Media 01 — Baseline Shift",
      tag: "Video Record // Default States",
      copy: "Before, my default state was guarded. Sometime around the fourth month of terrible jokes, the guard dropped.",
      imagePath: "/video/room-03/room-03_video-01.mp4",
      secretImagePath: "/image/room-03/room-03_photo-02.jpg", // Tucked behind the video
      hiddenText: "I didn't consciously decide to trust you. I just got too tired of arguing about spelling to keep my walls up.",
    },
    retentionRecord: {
      id: "exhibit4",
      title: "Document 03 — Retention Record",
      tag: "Memory Log // Detail Preservation",
      copy: "I can't remember my own passwords, but I somehow retained exactly how you take your coffee and your irrational hatred of a specific word.",
      hiddenText: "You probably thought I wasn't listening. I was taking notes.",
    },
    changeLog: {
      id: "exhibit5",
      title: "Document 04 — Change Log",
      tag: "Behavioral Shift // Habit Modification",
      copy: "There was no 'we need to talk' moment. Just a Tuesday where I realized I'd spent three hours on the phone doing absolutely nothing, and didn't want to hang up.",
      marginNote: "The strangest part wasn't how much time it took. It was that it didn't feel like time was passing at all.",
    },
    secondaryEvidence: {
      id: "exhibit1",
      title: "Media 02 — Secondary Evidence",
      tag: "Video Record // Involuntary Reaction",
      copy: "Secondary effects captured indirectly. Someone pointed out I was looking at my phone and smiling at a blank wall.",
      imagePath: "/video/room-03/room-03_video-02.mp4",
      secretImagePath: "/image/room-03/room-03_photo-03.png", // Tucked behind the video
      hiddenText: "I lied and said it was a funny video. It was just you typing.",
    },
  },
  exitWall: {
    tag: "END OF ROOM 03",
    title: "No single moment caused this.",
    text: "That's the problem.\n\nI can't point to where it began.\n\nI can only point to the places it reached.",
    nextRoomLabel: "Proceed to Room 04",
    nextRoomUrl: "/room-04",
  },
};
