import { SearchProvider, searchProvidersWithAll } from '$lib/app/config';
import { writable } from 'svelte/store';

interface Config {
	autosaveQueries: boolean;
	defaultSearchProvider: SearchProvider;
	queryPreview: boolean;
}

export type ConfigOption = keyof Config;

const defaultConfig = {
	autosaveQueries: false,
	defaultSearchProvider: searchProvidersWithAll[0],
	queryPreview: false
};

export const { subscribe, update, set } = writable<Config>({ ...defaultConfig });

export const configStore = {
	subscribe,
	update,
	set,
	reset: (): void => set({ ...defaultConfig })
};

// add a listener to the firestore
