import { writable } from 'svelte/store';
import type { Query } from './query';

export const savedQueriesStore = writable<Query[]>([]);
