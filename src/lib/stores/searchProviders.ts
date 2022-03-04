import type { SearchProvider } from '$lib/app/config';
import { searchProvidersWithoutAll } from '$lib/app/config';
import { writable } from 'svelte/store';

export const searchProvidersStore = writable<SearchProvider[]>(
	searchProvidersWithoutAll.sort((a, b) => b.id - a.id)
);
