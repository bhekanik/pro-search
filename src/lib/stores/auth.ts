import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const authReadiness = writable<boolean>(false);

export const authStore = writable<{
	isLoggedIn: boolean;
	user: User | null;
}>({
	isLoggedIn: false,
	user: null
});
