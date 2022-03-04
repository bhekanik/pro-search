import { SearchProvider, searchProvidersWithoutAll } from '$lib/app/config';
import { writable } from 'svelte/store';

export const searchProvidersStore = writable<SearchProvider[]>(searchProvidersWithoutAll);
