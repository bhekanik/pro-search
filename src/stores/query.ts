import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { SearchProvider } from '../app/config/searchProviders';
import { searchProviders } from '../app/config/searchProviders';

export interface Filter {
	formatted: string;
	value: string;
}

export interface Query {
	searchTerm: string;
	filters: Record<string, Filter>;
	provider: SearchProvider;
}

export const query: Writable<Query> = writable({
	searchTerm: '',
	filters: {},
	provider: searchProviders[0]
});
