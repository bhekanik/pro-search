<script lang="ts">
	import Recipes from '$lib/components/Recipes/Recipes.svelte';
	import SavedQueriesList from '$lib/components/SavedQueries/SavedQueriesList.svelte';
	import { authStore, seo } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		seo.set({
			title: 'Pro-Search | Recipes',
			description: 'Advanced search query builder'
		});
	});
</script>

<div
	class="p-8 pt-6 relative h-full overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-4"
>
	<Recipes />

	{#if $authStore.isLoggedIn}
		<SavedQueriesList />
	{/if}
</div>
