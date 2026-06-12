/**
 * Demo data for portfolio showcase components
 * Fake but realistic content to demonstrate Writty features
 */

export const demoSong = {
  title: "Northern Lights",
  keyRoot: "D",
  keyMode: "Major",
  tempo: 128,
  timeSignature: "4/4",
  structure: [
    { section: "intro", bars: 4 },
    { section: "verse", bars: 8 },
    { section: "chorus", bars: 8 },
    { section: "verse", bars: 8 },
    { section: "chorus", bars: 8 },
    { section: "bridge", bars: 4 },
    { section: "chorus", bars: 8 },
    { section: "outro", bars: 4 }
  ],
  sections: {
    verse: {
      lyrics: [
        "Driving north through empty highways",
        "Radio static fills the air",
        "Chasing something I can't name yet",
        "But I know I'll find it there"
      ],
      chords: ["D", "A", "Bm", "G"]
    },
    chorus: {
      lyrics: [
        "Under northern lights we're dancing",
        "Colors bleeding through the sky",
        "Everything we left behind us",
        "Fading like a lullaby"
      ],
      chords: ["G", "D", "A", "Bm"]
    }
  }
};

export const demoChords = [
  {
    id: "d-major-open",
    displayName: "D",
    voicingLabel: "Open position",
    frets: [null, null, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2]
  },
  {
    id: "a-major-open",
    displayName: "A",
    voicingLabel: "Open position",
    frets: [null, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0]
  },
  {
    id: "bm-barre",
    displayName: "Bm",
    voicingLabel: "Barre chord",
    frets: [null, 2, 4, 4, 3, 2],
    fingers: [0, 1, 3, 4, 2, 1]
  },
  {
    id: "g-major-open",
    displayName: "G",
    voicingLabel: "Open position",
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3]
  }
];

export const demoReview = {
  title: "The Conversation",
  subtitle: "Francis Ford Coppola, 1974",
  category: "Film",
  year: 1974,
  score: 95,
  poster: "/images/demo-poster.jpg",
  cast: [
    { name: "Gene Hackman", role: "Harry Caul" },
    { name: "John Cazale", role: "Stan" },
    { name: "Allen Garfield", role: "Bernie Moran" }
  ],
  review: `A masterclass in paranoia and surveillance. Coppola's film predates the digital age but captures its anxieties with eerie precision. Gene Hackman's performance as Harry Caul—a surveillance expert consumed by his own tools—is restrained and devastating. The sound design is the real star: every crackle, hiss, and ambient noise becomes a character. This is a film about listening, about the violence of observation, and about the impossibility of privacy in a world built on secrets.`
};

export const demoSceneBeats = [
  {
    beatNumber: 1,
    summary: "Harry sets up surveillance equipment in Union Square",
    beatType: "setup",
    tension: 3
  },
  {
    beatNumber: 2,
    summary: "The couple's conversation is captured, but fragments are unclear",
    beatType: "complication",
    tension: 5
  },
  {
    beatNumber: 3,
    summary: "Harry obsessively replays the tape, trying to isolate a phrase",
    beatType: "escalation",
    tension: 7
  },
  {
    beatNumber: 4,
    summary: "He realizes the couple may be in danger",
    beatType: "revelation",
    tension: 9
  }
];

// Made with Bob
