import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { defaultQuery, Query } from './query';

const { subscribe, set, update }: Writable<Query> = writable({ ...defaultQuery });

export const queryToShareStore = {
	subscribe,
	update,
	set,
	reset: (): void => set({ ...defaultQuery, filters: {} })
};
