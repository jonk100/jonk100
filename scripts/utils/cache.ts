/**
 * Simple JSON file cache
 */

import fs from 'fs/promises';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), '.cache/tmdb.json');

type CacheStore = Record<string, unknown>;

async function readCache(): Promise<CacheStore> {
	try {
		const raw = await fs.readFile(CACHE_PATH, 'utf-8');
		return JSON.parse(raw);
	} catch {
		return {};
	}
}

async function writeCache(cache: CacheStore) {
	await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
	await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2));
}

/**
 * Get cached value
 */
export async function getCached<T>(key: string): Promise<T | null> {
	const cache = await readCache();
	return (cache[key] as T) ?? null;
}

/**
 * Set cached value
 */
export async function setCached(key: string, value: unknown) {
	const cache = await readCache();
	cache[key] = value;
	await writeCache(cache);
}