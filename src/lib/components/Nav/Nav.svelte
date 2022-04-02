<script lang="ts">
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores';
</script>

<div class="tabs border-b px-8 border-b-gray-400">
	<a href="/" class:tab-active={$page.url.pathname === '/'} class="tab tab-bordered">Search</a>
	<a href="/recipes" class:tab-active={$page.url.pathname === '/recipes'} class="tab tab-bordered"
		>Recipes</a
	>
	{#if $authStore.isLoggedIn}
		<a
			href="/saved-queries"
			class:tab-active={$page.url.pathname === '/saved-queries'}
			class="tab tab-bordered">Saved Queries</a
		>
	{/if}
</div>
