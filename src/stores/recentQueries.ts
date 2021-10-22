import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface Query {
	searchTerm: string;
	filters: Record<string, string>;
}

export const recentQueries: Writable<Query[]> = writable(
	JSON.parse(globalThis.localStorage?.getItem('recentQueries') || '[]')
);
