import { describe, it, expect } from "vitest";
import type {
  MuseumManifest,
  Room,
  Artifact,
  FieldNote,
  CuratorNote,
  Photo,
  Video,
  PoemFragment,
  LetterFragment,
  MuseumState,
  Renderable,
  NavigationVerb,
  RoomId,
  ThemeId,
  ArtifactType,
  FrameVariant,
  TransitionStyle,
  ContentLayer,
  Visibility,
} from "@/types";

/**
 * Slice 01 — Foundation smoke tests
 *
 * These tests verify that the domain type system compiles correctly.
 * No runtime behaviour is tested here — that belongs to Slice 02+.
 */
describe("Domain Types — Slice 01", () => {
  it("NavigationVerb union accepts only permitted values", () => {
    const verbs: NavigationVerb[] = ["observe", "open", "continue"];
    expect(verbs).toHaveLength(3);
  });

  it("RoomId union covers all seven rooms", () => {
    const rooms: RoomId[] = [
      "entrance",
      "identity",
      "staying",
      "impact",
      "observation",
      "unfinished",
      "exit",
    ];
    expect(rooms).toHaveLength(7);
  });

  it("ThemeId union covers all themes", () => {
    const themes: ThemeId[] = [
      "paper",
      "archive",
      "observation",
      "memory",
      "silence",
    ];
    expect(themes).toHaveLength(5);
  });

  it("ArtifactType union covers all artifact kinds", () => {
    const types: ArtifactType[] = [
      "photo",
      "video",
      "field-note",
      "curator-note",
      "poem",
      "letter",
      "chat",
      "object",
    ];
    expect(types).toHaveLength(8);
  });

  it("FrameVariant union covers all three variants", () => {
    const variants: FrameVariant[] = ["studied", "working", "open"];
    expect(variants).toHaveLength(3);
  });

  it("TransitionStyle union covers all three styles", () => {
    const styles: TransitionStyle[] = [
      "fade-dark",
      "curtain-reveal",
      "light-shift",
    ];
    expect(styles).toHaveLength(3);
  });

  it("ContentLayer union covers layers 1 through 4", () => {
    const layers: ContentLayer[] = [1, 2, 3, 4];
    expect(layers).toHaveLength(4);
  });

  it("Visibility union covers all visibility levels", () => {
    const visibilities: Visibility[] = ["primary", "secondary", "hidden"];
    expect(visibilities).toHaveLength(3);
  });

  it("MuseumManifest shape is structurally correct", () => {
    const manifest: MuseumManifest = {
      title: "Museum of Mango",
      tagline:
        "An archive where ordinary moments were preserved until they quietly became extraordinary.",
      version: "1.0.0",
      openingDuration: 1400,
      defaultAudio: true,
      defaultTheme: "paper",
      roomOrder: [
        "entrance",
        "identity",
        "staying",
        "impact",
        "observation",
        "unfinished",
        "exit",
      ],
    };
    expect(manifest.roomOrder).toHaveLength(7);
    expect(manifest.defaultTheme).toBe("paper");
  });

  it("Room shape is structurally correct", () => {
    const room: Room = {
      id: "identity",
      title: "The Girl Behind The Name",
      subtitle: "Archive 01",
      theme: "paper",
      archiveNumber: "01",
      artifacts: ["artifact.identity.001"],
      fieldNotes: ["field.identity.001"],
      curatorNotes: ["curator.identity.001"],
      ambientAudioId: "paper",
      transitionStyle: "fade-dark",
      estimatedDuration: 120,
    };
    expect(room.id).toBe("identity");
  });

  it("Artifact shape includes layer and frameVariant", () => {
    const artifact: Artifact = {
      id: "artifact.identity.001",
      title: "Identity Card",
      room: "identity",
      visibility: "primary",
      priority: 1,
      createdAt: "2026-06-01",
      type: "photo",
      caption: "Museum Identity Card",
      asset: "/photos/identity.jpg",
      theme: "paper",
      layer: 1,
      rotation: 0,
      frameVariant: "studied",
    };
    expect(artifact.layer).toBe(1);
    expect(artifact.frameVariant).toBe("studied");
  });

  it("FieldNote shape is structurally correct", () => {
    const note: FieldNote = {
      id: "field.identity.001",
      title: "Observation",
      room: "identity",
      visibility: "primary",
      priority: 1,
      createdAt: "2026-06-01",
      subject: "Mango",
      observation: "Subject continues conversations after goodbye.",
      classification: "behaviour",
    };
    expect(note.subject).toBe("Mango");
  });

  it("CuratorNote shape is structurally correct", () => {
    const note: CuratorNote = {
      id: "curator.identity.001",
      title: "Curator Note",
      room: "identity",
      visibility: "secondary",
      priority: 1,
      createdAt: "2026-06-01",
      text: "Research ongoing.",
    };
    expect(note.text).toBe("Research ongoing.");
  });

  it("Photo shape is structurally correct", () => {
    const photo: Photo = {
      id: "photo.001",
      title: "Portrait",
      room: "identity",
      visibility: "primary",
      priority: 1,
      createdAt: "2026-06-01",
      src: "/photos/photo001.jpg",
      alt: "Museum portrait",
      caption: "Archive photograph",
    };
    expect(photo.alt).toBeDefined();
  });

  it("Video shape requires muted and loop", () => {
    const video: Video = {
      id: "video.001",
      title: "Memory Clip",
      room: "impact",
      visibility: "primary",
      priority: 1,
      createdAt: "2026-06-01",
      src: "/videos/video001.mp4",
      poster: "/videos/video001.jpg",
      loop: true,
      muted: true,
    };
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
  });

  it("PoemFragment shape is structurally correct", () => {
    const poem: PoemFragment = {
      id: "poem.001",
      title: "Fragment",
      room: "impact",
      visibility: "secondary",
      priority: 1,
      createdAt: "2026-06-01",
      text: "Human authored fragment.",
      source: "Booklet Chapter",
    };
    expect(poem.source).toBe("Booklet Chapter");
  });

  it("LetterFragment shape is structurally correct", () => {
    const letter: LetterFragment = {
      id: "letter.001",
      title: "Letter Fragment",
      room: "unfinished",
      visibility: "hidden",
      priority: 1,
      createdAt: "2026-06-01",
      text: "Human authored fragment.",
      source: "Letter Archive",
    };
    expect(letter.source).toBe("Letter Archive");
  });

  it("MuseumState shape is structurally correct", () => {
    const state: MuseumState = {
      currentRoom: "entrance",
      openedDrawer: null,
      audioEnabled: false,
      visitedRooms: [],
      visitedArtifacts: [],
      discoveredLayer3: [],
      theme: "paper",
    };
    expect(state.currentRoom).toBe("entrance");
    expect(state.openedDrawer).toBeNull();
  });

  it("Renderable generic preserves typed data", () => {
    const renderable: Renderable<Photo> = {
      data: {
        id: "photo.001",
        title: "Portrait",
        room: "identity",
        visibility: "primary",
        priority: 1,
        createdAt: "2026-06-01",
        src: "/photos/photo001.jpg",
        alt: "Museum portrait",
        caption: "Archive photograph",
      },
    };
    expect(renderable.data.id).toBe("photo.001");
  });
});
