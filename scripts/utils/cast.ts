/**
 * Fetch cast data from TMDB
 */

import type { TMDBMediaType } from '../../src/utils/tmdb';

const BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDBCastMember {
	id: number;
	name: string;
	character: string;
}

export async function fetchCast(
	id: number,
	type: TMDBMediaType,
	apiKey: string
): Promise<TMDBCastMember[]> {
	const url = `${BASE_URL}/${type}/${id}/credits?api_key=${apiKey}`;

	try {
		const res = await fetch(url);

		if (!res.ok) return [];

		const data = await res.json();

		return (data.cast ?? []).slice(0, 10); // limit
	} catch {
		return [];
	}
}