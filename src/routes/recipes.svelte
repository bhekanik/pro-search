<script lang="ts">
	import Recipes from '$lib/components/Recipes/Recipes.svelte';
	import SavedQueriesList from '$lib/components/SavedQueries/SavedQueriesList.svelte';
	import { isAuthenticated } from '$lib/stores';
</script>

<svelte:head>
	<title>Pro-Search | Recipes</title>
</svelte:head>

<div
	class="p-8 pt-6 relative h-full overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-4"
>
	<Recipes />

	{#if $isAuthenticated}
		<SavedQueriesList />
	{/if}
</div>
