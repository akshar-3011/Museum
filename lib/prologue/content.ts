export interface LogLine {
  text: string;
  delay: number; // delay in milliseconds before showing this line
  emphasis?: "normal" | "dim" | "strong"; // for attempt fades or results
}

export const BEAT_2_LOGS: LogLine[] = [
  { text: "Opening Archive...", delay: 0 },
  { text: "Poem found.", delay: 800 },
  { text: "Letter found.", delay: 1600 },
  { text: "Booklet found.", delay: 2400 },
  { text: "Archive found.", delay: 3200 },
];

export const BEAT_3_LOGS: LogLine[] = [
  { text: "Attempt found.", delay: 0, emphasis: "normal" }, // 100% opacity
  { text: "Attempt found.", delay: 800, emphasis: "dim" },     // 70% opacity
  { text: "Attempt found.", delay: 1600, emphasis: "strong" }, // 45% opacity
];

export const BEAT_4_CONFESSIONS = [
  { text: "I tried turning you into poems.", delay: 0 },
  { text: "I tried turning you into letters.", delay: 1000 },
  { text: "I even tried turning you into a book.", delay: 2000 },
  { text: "For a while, I thought that was enough.", delay: 3000 },
  { text: "None of them ever felt finished.", delay: 4000 },
  { text: "Not because there was nothing left to write.", delay: 5000 },
  { text: "Because every time I thought I was done,", delay: 6000 },
  { text: "I noticed something else.", delay: 7400 }, // 1400ms delay as requested
  { text: "The way you stayed.", delay: 8400 },
  { text: "The way you argued about nothing.", delay: 9400 },
  { text: "The way Tuesday afternoons suddenly mattered.", delay: 10400 },
  { text: "The version of you that never made it onto the page.", delay: 11400 },
];

export const BEAT_5_REFRAME = [
  "So this is not a poem.",
  "Not a letter.",
  "Not a booklet.",
  "It's simply an archive.",
  "Built from moments ordinary memory couldn't be trusted to keep.",
  "Mostly about Mango.",
];

export const BEAT_7_ACTIVATION: LogLine[] = [
  { text: "Archive Opened.", delay: 0 },
  { text: "Collection 01 Loaded.", delay: 1000 },
  { text: "Entering...", delay: 2000 },
];
