import type { SearchProvider } from '$lib/app/config/searchProviders';
import { searchProvidersWithAll } from '$lib/app/config/searchProviders';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export interface Filter {
	formatted: string;
	value?: string;
}

export interface Query {
	id: string;
	searchTerm: string;
	filters: Record<string, Filter>;
	provider: SearchProvider;
}

export const query: Writable<Query> = writable({
	id: uuidv4(),
	searchTerm: '',
	filters: {},
	provider: searchProvidersWithAll[0]
});
