<script lang="ts">
	import OwnSite from '$lib/components/Recipes/OwnSite.svelte';
	import PublicGoogleSheets from '$lib/components/Recipes/PublicGoogleSheets.svelte';
	import TwitterSearch from '$lib/components/Recipes/TwitterSearch.svelte';
	import SavedQueriesList from '$lib/components/SavedQueries/SavedQueriesList.svelte';
	import { isAuthenticated } from '$lib/stores';
</script>

<svelte:head>
	<title>Pro-Search | Recipes</title>
</svelte:head>

<div
	class="p-8 pt-6 relative h-full overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-4"
>
	<div
		class="px-4 h-full grid gap-2 auto-rows-max grid-cols-[repeat(auto-fill,minmax(190px,1fr))] overflow-auto recipes-list"
	>
		<OwnSite />
		<TwitterSearch />
		<PublicGoogleSheets />
	</div>

	{#if $isAuthenticated}
		<SavedQueriesList />
	{/if}
</div>

<style>
	.recipes-list::-webkit-scrollbar {
		width: 15px;
	}

	.recipes-list::-webkit-scrollbar-track {
		background-color: #555555;
		border-radius: 100px;
	}

	.recipes-list::-webkit-scrollbar-thumb {
		border-radius: 80px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #6174c3;
	}
</style>
