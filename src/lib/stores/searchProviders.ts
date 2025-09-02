import { searchProvidersWithoutAll } from '$lib/app/config';
import type { SearchProvider } from '$lib/app/types/searchProviders';
import { writable } from 'svelte/store';

export const searchProvidersStore = writable<SearchProvider[]>(
	searchProvidersWithoutAll.sort((a: any, b: any) => b.id - a.id)
);
