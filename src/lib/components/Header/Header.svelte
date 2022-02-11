<script lang="ts">
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import { splitClient } from '$lib/app/splitClient';
	import SettingsModal from '$lib/components/SettingsModal/SettingsModal.svelte';
	import { authReadiness, firebaseAuth as firebaseAuthStore, isAuthenticated } from '$lib/stores';
	import 'firebase/auth';
	import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let isProd = process.env.NODE_ENV === 'production';

	if (isProd) {
		LogRocket.init('uetpov/pro-search');
	}

	let auth;

	onMount(() => {
		(async () => {
			const firebase = await initFirebase();
			auth = firebase.auth;

			if ($firebaseAuthStore.user) {
				LogRocket.identify($firebaseAuthStore.user.email || $firebaseAuthStore.user.displayName, {
					name: $firebaseAuthStore.user.displayName,
					email: $firebaseAuthStore.user.email
				});
			}

			onAuthStateChanged(auth, (user) => {
				firebaseAuthStore.set({
					isLoggedIn: !!user,
					user,
					firebaseControlled: true
				});

				isAuthenticated.set(!!user);

				authReadiness.set(true);
			});
		})();

		themeChange(false);
	});

	function login() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	}

	function logout() {
		signOut(auth);
	}

	onDestroy(() => splitClient?.destroy());
</script>

<header class="flex justify-between align-center px-8 py-4">
	<div class="flex gap-2 items-center justify-center">
		<img class="w-10 h-10" src="/logo_512.png" alt="logo" />
		<h1 class="text2xl md:text-4xl text-left bg-transparent font-medium">Pro-Search</h1>
	</div>

	<div class="flex gap-2 items-center">
		<SettingsModal />
		<!-- <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">Theme</button> -->
		{#if $firebaseAuthStore.isLoggedIn}
			<div class="dropdown dropdown-end">
				<div tabindex="0" class="avatar">
					<div class="rounded-full w-8 h-8 ring ring-primary">
						<img alt="profile" src={$firebaseAuthStore.user?.photoURL} />
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
					<li>
						<label for="my-modal-2" class="btn btn-sm btn-ghost border modal-button">Config</label>
					</li>
					<li>
						<button class="btn btn-sm btn-ghost" on:click={logout}>Logout</button>
					</li>
				</ul>
			</div>
		{:else}
			<button on:click={login} class="btn btn-sm btn-ghost">
				{'Login/Sign Up'}
			</button>
		{/if}
	</div>
</header>
