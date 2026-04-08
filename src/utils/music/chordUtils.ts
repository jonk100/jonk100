/**
 * chordUtils.ts
 */

import { CHROMATIC_SCALE_SHARPS, DIATONIC_MAJOR_MAP } from "./musicTheory";

export function extractChordRoot(name: string): string {
  return name.split(" ")[0];
}

export function getChordFunction(root: string, key: string) {
  const keyIndex = CHROMATIC_SCALE_SHARPS.indexOf(key as any);
  const chordIndex = CHROMATIC_SCALE_SHARPS.indexOf(root as any);

  if (keyIndex === -1 || chordIndex === -1) {
    return { degree: "unknown", quality: "major" };
  }

  const interval = (chordIndex - keyIndex + 12) % 12;
  const diatonicIndex = Math.floor(interval / 2);

  return DIATONIC_MAJOR_MAP[diatonicIndex] ?? {
    degree: "unknown",
    quality: "major",
  };
}