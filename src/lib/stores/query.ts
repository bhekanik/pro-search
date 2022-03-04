import type { FilterType } from '$lib/app/types/filters';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { SearchProvider } from '../app/config/searchProviders';
import { searchProvidersWithAll } from '../app/config/searchProviders';

export interface Filter {
	formatted: string;
	value?: string;
	type: FilterType;
}

export interface Query {
	id: string;
	search_term: string;
	filters: Record<string, Filter>;
	provider: SearchProvider;
	name: string;
}

export const defaultQuery: Query = {
	id: '',
	name: '',
	search_term: '',
	filters: {},
	provider: searchProvidersWithAll[0]
};

const { subscribe, set, update }: Writable<Query> = writable({ ...defaultQuery });

export const queryStore = {
	subscribe,
	update,
	set,
	reset: (): void => set({ ...defaultQuery, filters: {} })
};
