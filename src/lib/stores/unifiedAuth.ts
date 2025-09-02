import { derived } from 'svelte/store';
import { convexAuthStore } from './convexAuth';

export interface UnifiedUser {
	id: string;
	email?: string;
	name?: string;
	avatar?: string;
}

// Use Convex auth directly
export const unifiedAuthStore = derived(convexAuthStore, ($convexUser) => {
	if (!$convexUser) {
		return {
			isLoggedIn: false,
			user: null
		};
	}

	return {
		isLoggedIn: true,
		user: {
			id: $convexUser._id,
			email: $convexUser.email,
			name: $convexUser.name,
			avatar: $convexUser.image
		} as UnifiedUser
	};
});

export const signOut = async () => {
	await convexAuthStore.signOut();
};
