import type { UserInfo } from 'firebase/auth';
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

export const firebaseAuth = writable<{
	isLoggedIn: boolean;
	user?: UserInfo;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	firebaseControlled: false
});
