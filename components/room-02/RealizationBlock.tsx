import SlowLineReveal from "../shared/SlowLineReveal";

export interface RealizationBlockProps {
  lines: { text: string; delay?: number }[];
}

export default function RealizationBlock({ lines }: RealizationBlockProps) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      {/* 
        We use the shared SlowLineReveal component here to maintain the exact same
        emotional pacing as the Prologue and Room 01 endings.
      */}
      <SlowLineReveal lines={lines} baseDelay={500} />
    </div>
  );
}
