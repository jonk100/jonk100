import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

/**
 * GET /api/chords/search?q=am
 *
 * Returns chord entries whose id, displayName, or voicingLabel
 * match the query string. Returns all chords if no query is given.
 */
export const GET: APIRoute = async ({ url }) => {
  const q = url.searchParams.get("q")?.toLowerCase().trim() ?? "";

  const allChords = await getCollection("chords");

  // If no query, return all chords (current behavior)
  if (!q) {
    const all = allChords.map(entry => ({
      slug: entry.id,
      displayName: entry.data.displayName,
      voicingLabel: entry.data.voicingLabel,
    }));
    return new Response(JSON.stringify({ chords: all }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const matched = allChords
    .filter((entry) => {
      const id = entry.id.toLowerCase();
      const displayName = (entry.data.displayName ?? "").toLowerCase();
      const voicingLabel = (entry.data.voicingLabel ?? "").toLowerCase();
      
      /**
       * To prevent "C" from returning "A#", "G", etc. just because they 
       * might contain "c" in a voicing label or slug, we prioritize 
       * matches that start with the query.
       */
      return (
        id.startsWith(q) || 
        displayName.startsWith(q) ||
        // Standardize: if query is 1 char, be strict. If > 1, allow includes.
        (q.length > 1 && (id.includes(q) || displayName.includes(q) || voicingLabel.includes(q)))
      );
    })
    .map((entry) => ({
      slug: entry.id,
      displayName: entry.data.displayName,
      voicingLabel: entry.data.voicingLabel,
    }))
    // Sort results so exact matches or starts-with matches appear first
    .sort((a, b) => {
      const aName = a.displayName.toLowerCase();
      const bName = b.displayName.toLowerCase();
      if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
      if (!aName.startsWith(q) && bName.startsWith(q)) return 1;
      return aName.localeCompare(bName);
    });

  return new Response(JSON.stringify({ chords: matched }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};