import { SearchProvider, searchProvidersWithAll } from '$lib/app/config';
import { writable } from 'svelte/store';

interface Config {
	autosaveQueries: boolean;
	defaultSearchProvider: SearchProvider;
	queryPreview: boolean;
}

export type ConfigOption = keyof Config;

export const configStore = writable<Config>({
	autosaveQueries: false,
	defaultSearchProvider: searchProvidersWithAll[0],
	queryPreview: false
});

// add a listener to the firestore
