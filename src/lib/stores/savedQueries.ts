import { writable } from 'svelte/store';
import type { Query } from './query';

export const SAVED_QUERIES_KEY = 'savedQueries';

export const savedQueriesStore = writable<Query[]>([]);
