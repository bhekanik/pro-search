<script lang="ts">
	import { splitClient } from '$lib/app/splitClient';
	import { queryStore } from '$lib/stores';
	import createAuth0Client from '@auth0/auth0-spa-js';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import '../global.css';

	let auth0;
	let isAuthenticated;
	let user;

	const configureClient = async () => {
		const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
		const client_id = import.meta.env.VITE_AUTH0_CLIENT_ID as string;

		auth0 = await createAuth0Client({
			domain,
			client_id
		});
	};

	async function checkAuth() {
		isAuthenticated = await auth0.isAuthenticated();
		user = await auth0.getUser();
	}

	onMount(() => {
		themeChange(false);
		configureClient().then(async () => {
			await checkAuth();

			const isAuthenticated = await auth0.isAuthenticated();

			if (isAuthenticated) {
				// show the gated content
				return;
			}

			// NEW - check for the code and state parameters
			const windowLocationSearch = window.location.search;
			if (windowLocationSearch.includes('code=') && windowLocationSearch.includes('state=')) {
				// Process the login state
				await auth0.handleRedirectCallback();

				await checkAuth();

				// Use replaceState to redirect the user away and remove the querystring parameters
				window.history.replaceState({}, document.title, '/');
			}
		});
	});

	const login = async () => {
		await auth0.loginWithRedirect({
			redirect_uri: window.location.origin
		});
	};

	function logout() {
		auth0.logout({
			returnTo: window.location.origin
		});
	}

	onDestroy(splitClient.destroy);
</script>

<div class="relative h-full pt-24 dark:bg-gray-600">
	<button
		on:click={isAuthenticated ? logout : login}
		class="btn btn-outline btn-primary modal-button absolute right-6 top-4"
		>{isAuthenticated ? `Logout: ${user?.email}` : 'Login/Sign Up'}</button
	>
	<pre>{JSON.stringify($queryStore, null, 2)}</pre>
	<div class="p-8 max-w-6xl mx-auto h-full">
		<slot />
	</div>
</div>
