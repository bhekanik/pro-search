import auth from '$lib/app/auth/authService';
import { writable } from 'svelte/store';

interface User {
	email?: string;
}

export const isAuthenticated = writable(false);
export const user = writable<User>({});
export const error = writable();

(async function () {
	try {
		const auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		if (isAuthenticated) {
			user.set(await auth0Client.getUser());
		}
	} catch (err) {
		error.set(err);
	}
})();

export const popupOpen = writable(false);
