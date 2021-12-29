<script lang="ts">
	import auth from '$lib/app/auth/authService';
	import { splitClient } from '$lib/app/splitClient';
	import { authReadiness, isAuthenticated, readiness, user } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import '../global.css';

	let auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();

		if (auth0Client) {
			const authState = await auth0Client.isAuthenticated();
			isAuthenticated.set(authState);
			const userState = await auth0Client.getUser();
			user.set(userState);
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

	onDestroy(splitClient.destroy);
</script>

<div class="relative h-full dark:bg-gray-600">
	{#if $readiness}
		<!-- <Navbar handleLogin={login} /> -->
		<div class="absolute right-6 top-4 flex gap-2">
			{#if $isAuthenticated}
				<label for="my-modal-2" class="btn btn-primary modal-button">Config</label>
				<input type="checkbox" id="my-modal-2" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box">
						<p>
							Enim dolorem dolorum omnis atque necessitatibus. Consequatur aut adipisci qui iusto
							illo eaque. Consequatur repudiandae et. Nulla ea quasi eligendi. Saepe velit autem
							minima.
						</p>
						<div class="modal-action">
							<label for="my-modal-2" class="btn btn-primary">Accept</label>
							<label for="my-modal-2" class="btn">Close</label>
						</div>
					</div>
				</div>
			{/if}
			<button on:click={$isAuthenticated ? logout : login} class="btn btn-primary">
				{$isAuthenticated ? `Logout: ${$user?.email}` : 'Login/Sign Up'}</button
			>
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
