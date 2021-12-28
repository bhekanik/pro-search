<script lang="ts">
	import auth from '$lib/app/auth/authService';
	import { splitClient } from '$lib/app/splitClient';
	import { isAuthenticated, queryStore, user } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import '../global.css';

	let auth0Client;
	let newTask;

	onMount(async () => {
		themeChange(false);

		auth0Client = await auth.createClient();

		await auth.checkAuth(auth0Client);

		if (isAuthenticated) {
			// show the gated content
			return;
		}

		// NEW - check for the code and state parameters
		const windowLocationSearch = window.location.search;
		if (windowLocationSearch.includes('code=') && windowLocationSearch.includes('state=')) {
			// Process the login state
			await auth0Client.handleRedirectCallback();

			await auth.checkAuth(auth0Client);

			// Use replaceState to redirect the user away and remove the querystring parameters
			window.history.replaceState({}, document.title, '/');
		}
	});

	function login() {
		console.log('loging in');

		auth.loginWithRedirect(auth0Client, {
			redirect_uri: window.location.origin
		});
	}

	function logout() {
		auth.logout(auth0Client, {
			returnTo: window.location.origin
		});
	}

	onDestroy(splitClient.destroy);
</script>

<div class="relative h-full pt-24 dark:bg-gray-600">
	<button
		on:click={isAuthenticated ? logout : login}
		class="btn btn-outline btn-primary modal-button absolute right-6 top-4"
		>{$isAuthenticated ? `Logout: ${$user?.email}` : 'Login/Sign Up'}</button
	>
	<pre>{JSON.stringify($queryStore, null, 2)}</pre>
	<div class="p-8 max-w-6xl mx-auto h-full">
		<slot />
	</div>
</div>
