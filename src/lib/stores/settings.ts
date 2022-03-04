import type { SearchProvider } from '$lib/app/config';
import { searchProvidersWithAll } from '$lib/app/config';
import { writable } from 'svelte/store';

interface Settings {
	autosave_queries: boolean;
	default_search_provider: SearchProvider;
	query_preview: boolean;
}

export type Setting = keyof Settings;

const defaultSettings: Settings = {
	autosave_queries: false,
	default_search_provider: searchProvidersWithAll[0],
	query_preview: false
};

export const { subscribe, update, set } = writable<Settings>({ ...defaultSettings });

export const settingsStore = {
	subscribe,
	update,
	set,
	reset: (): void => set({ ...defaultSettings })
};
