/**
 * Upgraded TMDB enrichment with Slug-based filenames
 */
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

import {
	searchTMDB,
	pickBestMatch,
	getPosterUrl,
	getTMDBItem,
} from '../src/utils/tmdb.ts';

import { getCached, setCached } from './utils/cache';
import { downloadImage } from './utils/download';
import { createSlug } from './utils/slug';
import { fetchCast } from './utils/cast';

const REVIEWS_DIR = path.join(process.cwd(), 'src/content/reviews');
const API_KEY = process.env.TMDB_API_KEY;

/**
 * Normalize channel names for consistent display
 */
function normalizeChannel(channel: string): string {
  if (!channel) return channel;
  
  // Map of channel name variations to normalized names
  const channelMap: Record<string, string> = {
    'Amazon Prime Video': 'Amazon',
    'Amazon Prime': 'Amazon',
    'HBO Max': 'Max',
    'Disney Plus': 'Disney+',
    'Apple TV Plus': 'Apple TV+',
  };
  
  return channelMap[channel] || channel;
}

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

async function run() {
	const files = await getFiles(REVIEWS_DIR);

	for (const file of files) {
		const raw = await fs.readFile(file, 'utf-8');
		const parsed = matter(raw);
		const data = parsed.data;

		// Skip if already fully enriched
		if (data.tmdbId && data.poster) continue;
		if (!['movie', 'tv'].includes(data.category)) continue;

		const cacheKey = `${data.category}:${data.title}`;
		let match = await getCached<any>(cacheKey);

		if (!match) {
			if (data.tmdbId) {
				match = await getTMDBItem(data.tmdbId, data.category);
			} else {
				const results = await searchTMDB(data.title, data.category);
				match = pickBestMatch(data.title, results);
			}
			if (!match) continue;
			await setCached(cacheKey, match);
		}

		console.log('[MATCH]', match.title || match.name);

		// ✅ SLUG GENERATION
		const slug = createSlug(match.title || match.name || '');

		// ✅ POSTER DOWNLOAD (Slug + ID)
		const posterUrl = getPosterUrl(match.poster_path);
		let localPoster = data.poster || null;

		console.log('[POSTER] Poster path:', match.poster_path);
		console.log('[POSTER] Poster URL:', posterUrl);

		if (posterUrl && !localPoster) {
			const filename = `${slug}-${match.id}.jpg`;
			console.log('[POSTER] Downloading:', filename);
			localPoster = await downloadImage(posterUrl, filename);
			if (localPoster) {
				console.log('[POSTER] Success:', localPoster);
			} else {
				console.log('[POSTER] Failed to download poster');
			}
		} else if (localPoster) {
			console.log('[POSTER] Using existing poster:', localPoster);
		} else {
			console.log('[POSTER] No poster available');
		}

		// ✅ CAST FETCHING
		const cast = API_KEY
			? await fetchCast(match.id, data.category, API_KEY)
			: [];

		const updated = {
			...data,
			tmdbId: match.id,
			tmdbType: data.category,
			tmdbSlug: slug,
			poster: localPoster,
			year: data.year ?? (match.release_date || match.first_air_date || '').slice(0, 4),
			overview: data.overview ?? match.overview?.slice(0, 450) + '...',
			channel: normalizeChannel(data.channel),
			castDetailed: cast.map(c => ({
				id: c.id,
				name: c.name,
				character: c.character
			}))
		};

		await fs.writeFile(file, matter.stringify(parsed.content, updated));
	}
}

run();