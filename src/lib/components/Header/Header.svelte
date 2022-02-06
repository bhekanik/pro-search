<script lang="ts">
	import auth from '$lib/app/auth/authService';
	import { splitClient } from '$lib/app/splitClient';
	import SettingsModal from '$lib/components/SettingsModal/SettingsModal.svelte';
	import { authReadiness, isAuthenticated, user } from '$lib/stores';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let isProd = process.env.NODE_ENV === 'production';

	if (isProd) {
		LogRocket.init('uetpov/pro-search');
	}

	let auth0Client;

	onMount(() => {
		themeChange(false);
		(async () => {
			auth0Client = await auth.createClient();

			if (auth0Client) {
				const authState = await auth0Client.isAuthenticated();
				isAuthenticated.set(authState);
				const userState = await auth0Client.getUser();
				user.set(userState);
				if (userState)
					LogRocket.identify(userState.email, {
						name: userState.name,
						email: userState.email
					});
			}

			if ($isAuthenticated) {
				authReadiness.set(true);
				// show the gated content
				return;
			}

			// NEW - check for the code and state parameters
			const windowLocationSearch = window.location.search;
			if (windowLocationSearch.includes('code=') && windowLocationSearch.includes('state=')) {
				// Process the login state
				await auth.handleRedirectCallback(auth0Client);

				if (auth0Client) {
					const authState = await auth0Client.isAuthenticated();
					isAuthenticated.set(authState);
					const userState = await auth0Client.getUser();
					user.set(userState);
					if (userState)
						LogRocket.identify(userState.email, {
							name: userState.name,
							email: userState.email
						});
				}

				// Use replaceState to redirect the user away and remove the querystring parameters
				window.history.replaceState({}, document.title, '/');
			}
			authReadiness.set(true);
		})();
	});

	function login() {
		// auth.loginWithRedirect(auth0Client, {
		// 	redirect_uri: window.location.origin
		// });
		auth.loginWithPopup(auth0Client);
	}

	function logout() {
		auth.logout(auth0Client, {
			returnTo: window.location.origin
		});
	}

	onDestroy(() => splitClient?.destroy());
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
						<img alt="profile" src={$user?.picture} />
					</div>
				</div>

				<ul
					tabindex="0"
					class="menu dropdown-content rounded-box w-52 bordered shadow-lg bg-slate-600"
				>
					{#if $user?.email}
						<li>
							<span>{$user?.email}</span>
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
