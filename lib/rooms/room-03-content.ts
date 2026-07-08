export interface Room03ExhibitContent {
  id: string;
  title: string;
  tag?: string;
  copy: string;
  imagePath?: string;
  videoPath?: string;
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
      title: "Document 01 — Atmosphere Report",
      tag: "Environmental Log // Shift Analysis",
      copy: "How did you leave fingerprints on parts of my life you never touched, until entire pieces of my world quietly began carrying evidence of you?",
      hiddenText: "There wasn't a moment. Just a thousand small moments that slowly started carrying your name.\nAnd before I noticed it, your presence had become part of the way I moved through the world.",
    },
    volumeReduction: {
      id: "exhibit2",
      title: "Document 02 — Volume Reduction",
      tag: "Audio Analysis // Background Noise",
      copy: "When she speaks, ambient noise seems to drop. It isn't an acoustic phenomenon, but a focal one. The outside world is temporarily muted by proximity.",
      marginNote: "It isn't just quieter. It's easier. Her presence gives the world an off switch. Conversations feel clearer. Thoughts feel slower. Even overthinking takes a short break. Not a magic trick. Just comfort, measurable in how I stop bracing myself.",
      imagePath: "/image/room-03/room-03_photo-01.jpg", // Embedded in the text exhibit
    },
    comfortStudy: {
      id: "exhibit3",
      title: "Media 01 — Comfort Study",
      tag: "Video Record // Posture Alignment",
      copy: "I don't know what was so special about these moments. Looking at them now, they seem ordinary. Maybe that's exactly why I kept them.",
      videoPath: "/video/room-03/room-03_video-01.mp4",
      secretImagePath: "/image/room-03/room-03_photo-02.jpg", // Tucked behind the video
      hiddenText: "You were looking at the lake. I was looking at you. That's why our memories of that evening are completely different.",
    },
    retentionRecord: {
      id: "exhibit4",
      title: "Document 03 — Retention Record",
      tag: "Memory Log // Detail Preservation",
      copy: "Things said in passing that were not forgotten. Small preferences, offhand remarks, exact phrasing. The archive retains these with higher fidelity than major events.",
      hiddenText: "I don't even remember why we were talking about it.\nYou probably forgot this conversation the same day. I didn't.",
    },
    changeLog: {
      id: "exhibit5",
      title: "Document 04 — Change Log",
      tag: "Behavioral Shift // Habit Modification",
      copy: "There was never a decision. No moment where I consciously made room for you. Yet somehow, ordinary things started carrying your name. A thought. A story. A reaction. And eventually, entire days.",
      marginNote: "That's the part I still can't explain. Nothing about you was attached to these moments. Yet somehow, you stayed attached to all of them.",
    },
    secondaryEvidence: {
      id: "exhibit1",
      title: "Media 02 — Secondary Evidence",
      tag: "Video Record // Involuntary Smiling",
      copy: "Secondary effects captured indirectly. The observer's reaction to the subject, recorded as proof of impact. The baseline state is permanently elevated.",
      videoPath: "/video/room-03/room-03_video-02.mp4",
      secretImagePath: "/image/room-03/room-03_photo-03.png", // Tucked behind the video
      hiddenText: "I didn't even realize I was smiling until someone asked me for it.",
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
