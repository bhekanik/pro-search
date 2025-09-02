import { writable, derived } from 'svelte/store';
import { convexClient } from '$lib/app/convexClient';
import { api } from '../../../convex/_generated/api';

export interface ConvexUser {
	_id: string;
	_creationTime: number;
	email?: string;
	name?: string;
	image?: string;
}

const createAuthStore = () => {
	const { subscribe, set, update } = writable<ConvexUser | null>(null);

	return {
		subscribe,
		set,
		update,
		init: async () => {
			try {
				const user = await convexClient.query(api.auth.currentUser);
				set(user);
			} catch (error) {
				console.error('Failed to get current user:', error);
				set(null);
			}
		},
		signOut: async () => {
			try {
				await convexClient.mutation(api.auth.signOut);
				set(null);
			} catch (error) {
				console.error('Failed to sign out:', error);
			}
		}
	};
};

export const convexAuthStore = createAuthStore();
export const isAuthenticated = derived(convexAuthStore, ($user) => !!$user);
