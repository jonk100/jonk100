/**
 * Actor enrichment script.
 *
 * Reads `castDetailed` from enriched review files, creates actor MDX files
 * in src/content/actors/, then writes the actor slugs back to the review's
 * `cast` field and removes the temporary `castDetailed` field.
 *
 * Run after enrich-tmdb.ts:
 *   pnpm run enrich:actors
 */

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import { getCached, setCached } from './utils/cache';
import { downloadImage } from './utils/download';
import { createSlug } from './utils/slug';

const ACTORS_DIR = path.join(process.cwd(), 'src/content/actors');
const REVIEWS_DIR = path.join(process.cwd(), 'src/content/reviews');

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

/**
 * Recursively find all .md and .mdx files under a directory.
 * @param dir - Absolute path to the directory to search
 * @returns Array of absolute file paths
 */
async function getFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? getFiles(full) : full;
    })
  );
  return files.flat().filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
}

// ---------------------------------------------------------------------------
// Actor data extraction
// ---------------------------------------------------------------------------

/**
 * A cast member as stored in the temporary `castDetailed` field.
 */
interface CastDetailed {
  id: number;
  name: string;
  character: string;
}

/**
 * Scan all review files and collect unique actors from their `castDetailed`
 * fields. Returns a Map keyed by TMDB person ID.
 *
 * @param reviewFiles - Array of absolute paths to review MDX files
 * @returns Map of tmdbId → CastDetailed for all unique actors found
 */
async function collectActorsFromReviews(
  reviewFiles: string[]
): Promise<Map<number, CastDetailed>> {
  const actorMap = new Map<number, CastDetailed>();

  for (const filePath of reviewFiles) {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(raw);

    if (!Array.isArray(data.castDetailed)) continue;

    for (const actor of data.castDetailed as CastDetailed[]) {
      if (!actor?.id) continue;
      actorMap.set(actor.id, actor);
    }
  }

  return actorMap;
}

// ---------------------------------------------------------------------------
// Actor file creation
// ---------------------------------------------------------------------------

/**
 * Download a TMDB profile image for an actor and save it locally.
 *
 * @param actorName  - Actor's full name (used to build the filename)
 * @param tmdbId     - TMDB person ID (appended to filename for uniqueness)
 * @param profilePath - TMDB profile path e.g. "/abc123.jpg"
 * @returns Local public path e.g. "/images/tmdb/elliott-gould-12345.jpg", or null on failure
 */
async function downloadActorProfile(
  actorName: string,
  tmdbId: number,
  profilePath: string
): Promise<string | null> {
  if (!profilePath) return null;

  const slug = createSlug(actorName);
  const filename = `${slug}-${tmdbId}.jpg`;
  const url = `https://image.tmdb.org/t/p/w500${profilePath}`;

  return await downloadImage(url, filename);
}

/**
 * Create an actor MDX file if one doesn't already exist, then return
 * the file path and slug. If the file exists, it is left untouched so
 * that any manual edits are preserved.
 *
 * @param actor    - Basic cast member data from the review
 * @param tmdbInfo - Full TMDB person record (may be null if API unavailable)
 * @returns Object with the absolute filePath and the actor's slug
 */
async function createActorFile(
  actor: CastDetailed,
  tmdbInfo: Record<string, any> | null
): Promise<{ filePath: string; slug: string }> {
  await fs.mkdir(ACTORS_DIR, { recursive: true });

  const slug = createSlug(actor.name);
  const filePath = path.join(ACTORS_DIR, `${slug}.mdx`);
  const exists = await fs.access(filePath).then(() => true).catch(() => false);

  if (!exists) {
    const frontmatter = {
      name: actor.name,
      tmdbId: actor.id,
      born: tmdbInfo?.birthday ?? null,
      from: tmdbInfo?.place_of_birth ?? null,
      heroImage: null,
    };
    await fs.writeFile(filePath, matter.stringify('', frontmatter));
    console.log('[ACTOR] Created:', slug);
  }

  return { filePath, slug };
}

// ---------------------------------------------------------------------------
// Review update
// ---------------------------------------------------------------------------

/**
 * For a single review file: build the final `cast` slug array from
 * `castDetailed`, write it to the `cast` field, and remove `castDetailed`.
 *
 * Only updates the file if `castDetailed` is present — fully-enriched
 * reviews (castDetailed already removed) are skipped.
 *
 * @param filePath    - Absolute path to the review MDX file
 * @param actorSlugs  - Map of tmdbId → actor slug built during this run
 */
async function finaliseReviewCast(
  filePath: string,
  actorSlugs: Map<number, string>
): Promise<void> {
  const raw = await fs.readFile(filePath, 'utf-8');
  const parsed = matter(raw);

  if (!Array.isArray(parsed.data.castDetailed)) return;

  const castSlugs = (parsed.data.castDetailed as CastDetailed[])
    .map((c) => actorSlugs.get(c.id))
    .filter((slug): slug is string => slug !== undefined);

  // Write cast slugs, remove the temporary castDetailed field
  const { castDetailed, ...restData } = parsed.data;
  const updated = { ...restData, cast: castSlugs };

  await fs.writeFile(filePath, matter.stringify(parsed.content, updated));
  console.log('[REVIEW] Updated cast →', path.basename(filePath));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function run(): Promise<void> {
  const apiKey = process.env.TMDB_API_KEY;
  const reviewFiles = await getFiles(REVIEWS_DIR);

  // Step 1: Collect all unique actors from castDetailed fields
  const actors = await collectActorsFromReviews(reviewFiles);
  console.log(`[INFO] Found ${actors.size} unique actors across all reviews`);

  // Step 2: For each actor — fetch TMDB info, create file, download profile image
  // Track slug assignments so we can write them back to reviews in step 3
  const actorSlugs = new Map<number, string>();

  for (const actor of actors.values()) {
    const cacheKey = `actor:${actor.id}`;
    let tmdbInfo = await getCached<Record<string, any>>(cacheKey);

    if (!tmdbInfo && apiKey) {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${actor.id}?api_key=${apiKey}`
      );
      tmdbInfo = res.ok ? await res.json() : null;
      if (tmdbInfo) await setCached(cacheKey, tmdbInfo);
    }

    const { filePath, slug } = await createActorFile(actor, tmdbInfo ?? null);
    actorSlugs.set(actor.id, slug);

    // Download profile image if not yet present
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(raw);

    if (!parsed.data.heroImage && tmdbInfo?.profile_path) {
      const img = await downloadActorProfile(actor.name, actor.id, tmdbInfo.profile_path);
      if (img) {
        parsed.data.heroImage = img;
        await fs.writeFile(filePath, matter.stringify(parsed.content, parsed.data));
        console.log('[ACTOR] Profile image saved:', slug);
      }
    }
  }

  // Step 3: Write cast slugs back to reviews, remove castDetailed
  for (const filePath of reviewFiles) {
    await finaliseReviewCast(filePath, actorSlugs);
  }

  console.log('[DONE] Actor enrichment complete');
}

run();