<script lang="ts">
	import auth from '$lib/app/auth/authService';
	import { splitClient } from '$lib/app/splitClient';
	import ConfigModal from '$lib/components/ConfigModal/ConfigModal.svelte';
	import { authReadiness, isAuthenticated, readiness, user } from '$lib/stores';
	import * as Sentry from '@sentry/browser';
	import { Integrations } from '@sentry/tracing';
	import LogRocket from 'logrocket';
	import { onDestroy, onMount } from 'svelte';
	import '../global.css';

	Sentry.init({
		dsn: 'https://02775679838d495d91eacec805880d2a@o1115887.ingest.sentry.io/6148918',
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
	});

	LogRocket.init('uetpov/pro-search');

	let auth0Client;

	onMount(async () => {
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

	onDestroy(splitClient?.destroy);
</script>

<svelte:head>
	{#if process.env.NODE_ENV === 'production'}
		<script>
			(function (h, o, t, j, a, r) {
				h.hj =
					h.hj ||
					function () {
						(h.hj.q = h.hj.q || []).push(arguments);
					};
				h._hjSettings = { hjid: 2801982, hjsv: 6 };
				a = o.getElementsByTagName('head')[0];
				r = o.createElement('script');
				r.async = 1;
				r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
				a.appendChild(r);
			})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
		</script>
	{:else}
		<!-- Hotjar Tracking Code for https://pro-search-bhekanik.vercel.app/ -->
		<script>
			(function (h, o, t, j, a, r) {
				h.hj =
					h.hj ||
					function () {
						(h.hj.q = h.hj.q || []).push(arguments);
					};
				h._hjSettings = { hjid: 2632849, hjsv: 6 };
				a = o.getElementsByTagName('head')[0];
				r = o.createElement('script');
				r.async = 1;
				r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
				a.appendChild(r);
			})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
		</script>
	{/if}
</svelte:head>

<div class="relative h-full w-full overflow-y-auto dark:bg-gray-600">
	{#if $readiness}
		<!-- <Navbar handleLogin={login} /> -->
		<div class="absolute right-6 top-4 flex gap-2">
			<ConfigModal />
			{#if $isAuthenticated}
				<div class="dropdown dropdown-end">
					<div tabindex="0" class={`avatar`}>
						<div
							class="mb-8 rounded-full w-10 h-10 ring ring-primary ring-offset-base-100 ring-offset-2"
						>
							<img alt="profile" src={$user?.picture} />
						</div>
					</div>

					<ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						{#if $user?.email}
							<li>
								<span>{$user?.email}</span>
							</li>
						{/if}
						<li>
							<button on:click={logout}>Logout</button>
						</li>
					</ul>
				</div>
			{:else}
				<button on:click={login} class="btn btn-ghost">
					{'Login/Sign Up'}
				</button>
			{/if}
		</div>
		<!-- <StoreMonitor /> -->
		<div class="p-8 max-w-6xl mx-auto h-full">
			<slot />
		</div>
	{:else}
		<div class="h-full w-full grid place-items-center">
			<div class="btn btn-circle btn-ghost btn-xl loading" />
		</div>
	{/if}
</div>
