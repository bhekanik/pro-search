import { writable } from 'svelte/store';

interface Config {
	autosaveQueries: boolean;
}

export type ConfigOption = keyof Config;

export const configStore = writable<Config>({ autosaveQueries: false });
