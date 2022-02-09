<script lang="ts">
	import { auth } from '$lib/app/firebase';
	import { authStore, handleUser, signInWithGitHub, signout } from '$lib/app/firebase/auth';
	import { splitClient } from '$lib/app/splitClient';
	import SettingsModal from '$lib/components/SettingsModal/SettingsModal.svelte';
	import { isAuthenticated } from '$lib/stores';
	import { onIdTokenChanged } from 'firebase/auth';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let isProd = process.env.NODE_ENV === 'production';

	if (isProd) {
		LogRocket.init('uetpov/pro-search');
	}

	let unsubscribe;

	onMount(() => {
		unsubscribe = onIdTokenChanged(auth, handleUser);

		themeChange(false);

		if ($authStore.user) {
			LogRocket.identify($authStore.user.email, {
				name: $authStore.user.name,
				email: $authStore.user.email,
				uid: $authStore.user.uid
			});
		}
	});

	function login() {
		signInWithGitHub('/');
	}

	function logout() {
		signout();
	}

	onDestroy(() => {
		splitClient?.destroy();
		unsubscribe?.();
	});
</script>

<header class="flex justify-between align-center px-8 py-4">
	<h1 class="text-2xl md:text-4xl text-left bg-transparent font-medium">Pro-Search</h1>

	<div class="flex gap-2 items-center">
		<SettingsModal />
		<!-- <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">Theme</button> -->
		{#if $isAuthenticated}
			<div class="dropdown dropdown-end">
				<div tabindex="0" class="avatar">
					<div class="rounded-full w-8 h-8 ring ring-primary">
						<img alt="profile" src={$authStore.user?.photoUrl} />
					</div>
				</div>

				<ul
					tabindex="0"
					class="menu dropdown-content rounded-box w-52 bordered shadow-lg bg-slate-600"
				>
					{#if $authStore.user?.email}
						<li>
							<span>{$authStore.user?.email}</span>
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
