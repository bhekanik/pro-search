import { searchProvidersWithoutAll } from '$lib/app/config';
import type { SearchProvider } from '$lib/app/types';
import { writable } from 'svelte/store';

export const searchProvidersStore = writable<SearchProvider[]>(
	searchProvidersWithoutAll.sort((a, b) => b.id - a.id)
);
