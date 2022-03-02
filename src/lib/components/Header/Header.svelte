<script lang="ts">
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import { searchProvidersWithAll } from '$lib/app/config';
	import { splitClient } from '$lib/app/splitClient';
	import SettingsModal from '$lib/components/SettingsModal/SettingsModal.svelte';
	import {
		authReadiness,
		configStore,
		firebaseAuth as firebaseAuthStore,
		isAuthenticated,
		queryStore,
		readiness,
		savedQueriesStore,
		SAVED_QUERIES_KEY
	} from '$lib/stores';
	import 'firebase/auth';
	import {
		EmailAuthProvider,
		GoogleAuthProvider,
		onAuthStateChanged,
		signInWithRedirect,
		signOut,
		TwitterAuthProvider
	} from 'firebase/auth';
	import { doc, getDoc, onSnapshot } from 'firebase/firestore';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import AuthModal from '../AuthModal/AuthModal.svelte';

	let isProd = process.env.NODE_ENV === 'production';
	let isProdDeployEnv = process.env.VITE_DEPLOYMENT_ENV === 'production';

	if (isProd) {
		LogRocket.init('uetpov/pro-search');
	}

	let auth;
	let ui;
	let uiConfig;
	let closeModalButton = null;
	let configUnsub;
	let savedQueriesUnsub;

	onMount(() => {
		(async () => {
			const firebase = await initFirebase();
			auth = firebase.auth;

			onAuthStateChanged(auth, async (user) => {
				firebaseAuthStore.set({
					isLoggedIn: !!user,
					user,
					firebaseControlled: true
				});

				isAuthenticated.set(!!user);

				authReadiness.set(true);

				if (user) {
					LogRocket.identify(user.email || user.displayName, {
						name: user.displayName,
						email: user.email
					});

					const savedQueriesSnapshot = await getDoc(doc(firebase.db, SAVED_QUERIES_KEY, user.uid));

					savedQueriesUnsub = onSnapshot(doc(firebase.db, SAVED_QUERIES_KEY, user.uid), (doc) => {
						savedQueriesStore.set(savedQueriesSnapshot.data().data || []);
					});

					configUnsub = onSnapshot(doc(firebase.db, 'users', user.uid), (doc) => {
						configStore.set({ ...$configStore, ...doc.data().config });
						queryStore.set({
							...$queryStore,
							provider: doc.data().config.defaultSearchProvider || searchProvidersWithAll[0]
						});
					});
				}
			});

			const firebaseui = await import('firebaseui');
			ui = new firebaseui.auth.AuthUI(auth);
			uiConfig = {
				callbacks: {
					signInSuccessWithAuthResult: function (authResult, redirectUrl) {
						if (authResult?.additionalUserInfo?.providerId === 'password') closeModalButton.click();
						// User successfully signed in.
						// Return type determines whether we continue the redirect automatically
						// or whether we leave that to developer to handle.
						return false;
					}
				},
				signInOptions: [
					// List of OAuth providers supported.
					EmailAuthProvider.PROVIDER_ID,
					GoogleAuthProvider.PROVIDER_ID,
					TwitterAuthProvider.PROVIDER_ID
				],
				credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
			};
			// if (ui.isPendingRedirect()) {
			ui.start('#firebaseui-auth-container', uiConfig);
			// }
		})();

		themeChange(false);
	});

	function login() {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	}

	function logout() {
		signOut(auth);

		firebaseAuthStore.set({
			isLoggedIn: false,
			user: null,
			firebaseControlled: false
		});

		isAuthenticated.set(false);

		savedQueriesStore.set([]);

		configStore.reset();

		ui.start('#firebaseui-auth-container', uiConfig);
	}

	onDestroy(() => {
		splitClient?.destroy();
		configUnsub?.();
		savedQueriesUnsub?.();
	});
</script>

<header class="flex justify-between align-center px-8 py-4">
	<div class="flex gap-2 items-center justify-center">
		<img class="w-10 h-10" src="/logo_512.png" alt="logo" />
		<h1 class="text2xl md:text-4xl text-left bg-transparent font-medium">
			{isProdDeployEnv ? 'Pro-Search' : 'Pro-Search - Dev'}
		</h1>
	</div>

	<SettingsModal />
	<AuthModal bind:closeModalButton />
	<div class="flex gap-2 items-center">
		{#if $readiness}
			<!-- <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">Theme</button> -->
			{#if $firebaseAuthStore.isLoggedIn}
				<label for="my-modal-2" class="btn btn-sm btn-ghost border modal-button">Settings</label>
				<div class="dropdown dropdown-end">
					<div
						tabindex="0"
						class={`avatar ${!$firebaseAuthStore.user?.photoURL ? 'placeholder' : ''}`}
					>
						<div class="rounded-full w-8 h-8 ring ring-primary">
							{#if $firebaseAuthStore.user?.photoURL}
								<img alt="profile" src={$firebaseAuthStore.user.photoURL} />
							{:else}
								<span class="text-s"
									>{$firebaseAuthStore.user.displayName?.charAt(0) ||
										$firebaseAuthStore.user.email?.charAt(0).toUpperCase()}</span
								>
							{/if}
						</div>
					</div>

					<ul
						tabindex="0"
						class="menu dropdown-content rounded-box w-52 bordered shadow-lg bg-slate-600"
					>
						{#if $firebaseAuthStore.user.email}
							<li>
								<span>{$firebaseAuthStore.user?.email}</span>
							</li>
						{/if}
						<!-- <li>
						<label for="my-modal-2" class="btn btn-sm btn-ghost border modal-button">Settings</label
						>
					</li> -->
						<li>
							<span on:click={logout}>Logout</span>
						</li>
					</ul>
				</div>
			{:else}
				<label for="auth-modal" class="btn btn-sm btn-ghost">Login / Sign Up</label>
				<!-- <button on:click={login} class="btn btn-sm btn-ghost">
				{'Login/Sign Up'}
			</button> -->
			{/if}
		{:else}
			<div class="btn btn-sm btn-circle btn-ghost btn-xl loading" />
		{/if}
	</div>
</header>
