import { goto } from '$app/navigation';
import { authReadiness, isAuthenticated } from '$lib/stores';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import cookie from 'js-cookie';
import { writable } from 'svelte/store';
import { auth } from '.';
import { createUser } from './firestore';

export interface User {
	uid: string;
	email: string;
	name: string;
	provider: string;
	photoUrl: string;
	token: string;
}

export const authStore = writable({ user: null });
export const authLoading = writable(false);

const formatUser = async (user) => {
	const token = await user.getIdToken();
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
		token
	};
};

export const handleUser = async (rawUser: any): Promise<User | null> => {
	if (rawUser) {
		const user = await formatUser(rawUser);
		const { token, ...userWithoutToken } = user;

		createUser(user.uid, userWithoutToken);

		authStore.set({ user });
		isAuthenticated.set(true);
		authReadiness.set(true);

		cookie.set('pro-search-auth', true, {
			expires: 1
		});

		authLoading.set(false);
		return user;
	} else {
		authStore.set({ user: null });
		cookie.remove('pro-search-auth');

		authLoading.set(false);
		return null;
	}
};

export const signInWithEmail = async (email: string, password: string): Promise<void> => {
	authLoading.set(true);
	const response = await signInWithEmailAndPassword(auth, email, password);
	handleUser(response.user);
	goto('/sites');
};

export const signInWithGitHub = async (redirect: string): Promise<void> => {
	authLoading.set(true);
	const response = await signInWithPopup(auth, new GithubAuthProvider());
	handleUser(response.user);

	if (redirect) {
		goto(redirect);
	}
};

export const signInWithGoogle = async (redirect: string): Promise<void> => {
	authLoading.set(true);
	const response = await signInWithPopup(auth, new GoogleAuthProvider());
	handleUser(response.user);

	if (redirect) {
		goto(redirect);
	}
};

export const signout = async (): Promise<void> => {
	await signOut(auth);
	handleUser(false);
	goto('/');
};
