/**
 * chordApi.ts
 */

export async function searchChords(query: string) {
  const res = await fetch(`/api/chords/search?q=${encodeURIComponent(query)}`);
  const json = await res.json();
  return json.chords;
}