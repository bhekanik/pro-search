import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface Filter {
	formatted: string;
	value: string;
}

export interface Query {
	searchTerm: string;
	filters: Record<string, Filter>;
}

export const query: Writable<Query> = writable({ searchTerm: '', filters: {} });
