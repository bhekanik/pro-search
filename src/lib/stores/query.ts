import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { SearchProvider } from '../app/config/searchProviders';
import { searchProvidersWithAll } from '../app/config/searchProviders';

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

const defaultQuery: Query = {
	id: '',
	searchTerm: '',
	filters: {},
	provider: searchProvidersWithAll[0]
};

export const query: Writable<Query> = writable(defaultQuery);

export const resetQuery = (): void => {
	query.update(() => defaultQuery);
};
