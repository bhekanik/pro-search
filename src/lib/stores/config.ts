import { writable } from 'svelte/store';

interface Config {
	autosaveQueries: boolean;
}

export type ConfigOption = keyof Config;

export const configStore = writable<Config>(
	JSON.parse(globalThis.localStorage?.getItem('config') || '{"autosaveQueries":false}')
);
