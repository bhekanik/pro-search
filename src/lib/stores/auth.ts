import { writable } from 'svelte/store';

interface User {
	email?: string;
	picture?: string;
}

export const isAuthenticated = writable(false);
export const user = writable<User>({});
export const error = writable();
export const authReadiness = writable<boolean>(false);

export const popupOpen = writable(false);
