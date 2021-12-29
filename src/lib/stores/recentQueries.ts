import { writable } from 'svelte/store';
import type { Query } from './query';

export const recentQueriesStore = writable<Query[]>(
	JSON.parse(globalThis.localStorage?.getItem('recentQueries') || '[]')
);
