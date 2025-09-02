<script lang="ts">
	import { splitClient } from '$lib/app/splitClient';
	import type { SearchProvider } from '$lib/app/types';
	import AuthModal from '$lib/components/AuthModal/AuthModal.svelte';
	import SettingsModal from '$lib/components/SettingsModal/SettingsModal.svelte';
	import {
		authReadiness,
		authStore,
		queryStore,
		readiness,
		savedQueriesStore,
		searchProvidersStore,
		settingsStore,
		type Query,
		type Settings
	} from '$lib/stores';
	import { convexAuthStore } from '$lib/stores/convexAuth';
	import { convexSettingsStore } from '$lib/stores/convexSettings';
	import { convexClient } from '$lib/app/convexClient';
	import { api } from '../../../../convex/_generated/api';
	import type { ConvexUser } from '$lib/app/types/convex';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	// @ts-ignore - theme-change module has type issues
	import { themeChange } from 'theme-change';

	let isProd = import.meta.env.MODE === 'production';
	let isProdDeployEnv = import.meta.env.VITE_DEPLOYMENT_ENV === 'production';

	if (isProd) {
		LogRocket.init('uetpov/pro-search');
	}

	let closeModalButton: any = null;

	let redirectTo = '';

	const handleAuth = async (user: ConvexUser) => {
		authStore.set({
			isLoggedIn: !!user,
			user: user || null
		});

		authReadiness.set(true);

		if (user) {
			LogRocket.identify(user.email || user._id, {
				name: user._id,
				email: user.email || ''
			});
		}
	};

	$: initial =
		$authStore.user?.name
			?.split(' ')
			.map((n: string) => n.charAt(0))
			.join('')
			.toUpperCase() || 'U';

	onMount(async () => {
		redirectTo = window.location.origin;

		// Load search providers from Convex
		const searchProviders = await convexClient.query(api.searchProviders.list);
		searchProvidersStore.set(searchProviders || []);

		// Subscribe to auth changes
		const unsubscribe = convexAuthStore.subscribe((user) => {
			if (user) {
				handleAuth(user);
			}
		});

		themeChange(false);

		return () => {
			unsubscribe();
		};
	});

	async function logout() {
		// Sign out from Convex auth
		await convexAuthStore.signOut();

		savedQueriesStore.set([]);

		settingsStore.reset();
	}

	onDestroy(() => {
		splitClient?.destroy();
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
	<AuthModal {redirectTo} bind:closeModalButton />
	<div class="flex gap-2 items-center">
		{#if $readiness}
			<!-- <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">Theme</button> -->
			{#if $authStore.isLoggedIn}
				<label for="my-modal-2" class="btn btn-sm btn-ghost border modal-button">Settings</label>
				<div class="dropdown dropdown-end">
					<button
						tabindex="0"
						class:placeholder={!$authStore.user?.image}
						class="avatar btn btn-ghost btn-circle"
						aria-label="User menu"
						type="button"
					>
						<div class="rounded-full w-8 h-8 ring ring-primary">
							{#if $authStore.user?.image}
								<img alt="profile" src={$authStore.user.image} />
							{:else}
								<span class="text-s">{initial}</span>
							{/if}
						</div>
					</button>

					<ul
						tabindex="-1"
						class="menu dropdown-content rounded-box w-52 bordered shadow-lg bg-slate-600"
					>
						{#if $authStore.user?.email}
							<li>
								<span>{$authStore.user?.email}</span>
							</li>
						{/if}
						<!-- <li>
						<label for="my-modal-2" class="btn btn-sm btn-ghost border modal-button">Settings</label
						>
					</li> -->
						<li>
							<button on:click={logout} type="button">Logout</button>
						</li>
					</ul>
				</div>
			{:else}
				<label for="auth-modal" class="btn btn-sm btn-ghost">Login / Sign Up</label>
			{/if}
		{:else}
			<div class="btn btn-sm btn-circle btn-ghost btn-xl loading"></div>
		{/if}
	</div>
</header>
