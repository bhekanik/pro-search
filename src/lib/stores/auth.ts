import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const user = writable<User | null>(null);
export const error = writable();
export const authReadiness = writable<boolean>(true);

export const popupOpen = writable(false);

export const authStore = writable<{
	isLoggedIn: boolean;
	user?: User;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	firebaseControlled: false
});
