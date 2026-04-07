/**
 * Instrument data and utilities for the music workbench
 */

export interface FretboardString {
  string_name: string;
  string_number: number;
  open_pitch: string;
  notes: string[];
}

export const GUITAR_FRETBOARD: FretboardString[] = [
  {
    string_name: "Low E",
    string_number: 6,
    open_pitch: "E2",
    notes: ["E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4"]
  },
  {
    string_name: "A",
    string_number: 5,
    open_pitch: "A2",
    notes: ["A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4"]
  },
  {
    string_name: "D",
    string_number: 4,
    open_pitch: "D3",
    notes: ["D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5"]
  },
  {
    string_name: "G",
    string_number: 3,
    open_pitch: "G3",
    notes: ["G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5"]
  },
  {
    string_name: "B",
    string_number: 2,
    open_pitch: "B3",
    notes: ["B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"]
  },
  {
    string_name: "High E",
    string_number: 1,
    open_pitch: "E4",
    notes: ["E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6"]
  }
];
