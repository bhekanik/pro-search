import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Query } from './query';

export const recentQueries: Writable<Query[]> = writable(
	JSON.parse(globalThis.localStorage?.getItem('recentQueries') || '[]')
);
