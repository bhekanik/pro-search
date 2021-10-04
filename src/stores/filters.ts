import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const filters: Writable<Record<string, string>> = writable({});
