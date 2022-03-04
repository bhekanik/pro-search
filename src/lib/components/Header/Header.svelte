<script lang="ts">
	import type { SearchProvider } from '$lib/app/config';
	import { TableNames } from '$lib/app/model';
	import { splitClient } from '$lib/app/splitClient';
	import { supabase } from '$lib/app/supabaseClient';
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
	import type { RealtimeSubscription, User } from '@supabase/supabase-js';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let isProd = process.env.NODE_ENV === 'production';
	let isProdDeployEnv = process.env.VITE_DEPLOYMENT_ENV === 'production';

	if (isProd) {
		LogRocket.init('uetpov/pro-search');
	}

	let closeModalButton = null;

	let redirectTo = '';
	let savedQueriesSubscription: RealtimeSubscription;
	let settingsSubscription: RealtimeSubscription;

	const handleAuth = async (user: User, event = null) => {
		console.log('event:', event);
		console.log('user:', user);

		authStore.set({
			isLoggedIn: !!user,
			user: user || null
		});

		authReadiness.set(true);

		if (user) {
			LogRocket.identify(user.email || user.id, {
				name: user.id,
				email: user.email
			});

			const { data: savedQueries } = await supabase
				.from<Omit<Query, 'filters'> & { filters: string }>(TableNames.savedQueries)
				.select('filters, created_at, id, name, provider(id, name, url), search_term');
			savedQueriesStore.set(
				savedQueries.map((savedQuery) => ({
					...savedQuery,
					filters: JSON.parse(savedQuery.filters)
				})) || []
			);

			const { data: settings } = await supabase
				.from<Settings>(TableNames.settings)
				.select(`autosave_queries, default_search_provider(id, url, name), query_preview`)
				.single();
			console.log('settings:', settings);
			if (settings) {
				settingsStore.set(settings);
				queryStore.update((currentQuery) => ({
					...currentQuery,
					provider: settings.default_search_provider
				}));
			}
		}
	};

	onMount(async () => {
		redirectTo = window.location.origin;

		const user = supabase.auth.user();

		const { data: searchProviders } = await supabase
			.from<SearchProvider>(TableNames.searchProviders)
			.select('id, name, url');
		searchProvidersStore.set(searchProviders || []);

		savedQueriesSubscription = supabase
			.from(TableNames.savedQueries)
			.on('*', (payload) => {
				console.log('Change received!', payload);
				// savedQueriesStore.set(payload || []);
			})
			.subscribe();

		settingsSubscription = supabase
			.from(TableNames.settings)
			.on('*', (payload) => {
				console.log('Change received!', payload);
				// savedQueriesStore.set(payload || []);
			})
			.subscribe();

		handleAuth(user);
		supabase.auth.onAuthStateChange(async (event, session) => {
			await handleAuth(session?.user, event);
		});

		themeChange(false);
	});

	function logout() {
		supabase.auth.signOut();

		savedQueriesStore.set([]);

		settingsStore.reset();
	}

	onDestroy(() => {
		splitClient?.destroy();
		supabase.removeAllSubscriptions();
		if (savedQueriesSubscription) supabase.removeSubscription(savedQueriesSubscription);
		if (settingsSubscription) supabase.removeSubscription(settingsSubscription);
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
					<div
						tabindex="0"
						class={`avatar ${!$authStore.user?.user_metadata?.photoURL ? 'placeholder' : ''}`}
					>
						<div class="rounded-full w-8 h-8 ring ring-primary">
							{#if $authStore.user?.user_metadata?.picture || $authStore.user?.user_metadata?.avatar_url}
								<img
									alt="profile"
									src={$authStore.user?.user_metadata?.picture ||
										$authStore.user?.user_metadata?.avatar_url}
								/>
							{:else}
								<span class="text-s"
									>{$authStore.user?.user_metadata?.full_name
										.split(' ')
										.map((n) => n.charAt(0))
										.join('')
										.toUpperCase() ||
										$authStore.user.user_metadata?.name
											?.split(' ')
											.map((n) => n.charAt(0))
											.join('')
											.toUpperCase()}</span
								>
							{/if}
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
			{/if}
		{:else}
			<div class="btn btn-sm btn-circle btn-ghost btn-xl loading" />
		{/if}
	</div>
</header>
