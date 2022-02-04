<script lang="ts">
	import RecentQueriesList from '$lib/components/RecentQueries/RecentQueriesList.svelte';
	import RecentQuery from '$lib/components/RecentQueries/RecentQuery.svelte';
	import type { Query } from '$lib/stores';
	import { isAuthenticated, readiness, recentQueriesStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';

	let recentQueries: Query[] = [];

	$: recentQueries = $recentQueriesStore.sort(
		(a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
	);
</script>

<svelte:head>
	<title>Pro-Search | Recipes</title>
</svelte:head>

<div
	class="p-8 pt-2 relative h-full overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-8"
>
	{#if $readiness}
		<div
			class="h-full grid gap-2 auto-rows-min grid-cols-[repeat(auto-fill,minmax(290px,1fr))] overflow-auto recipes-list"
		>
			{#each recentQueries as query (query.id)}
				<div
					class="h-fit card glass hover:bg-blue-800 bg-blue-900 shadow-md py-2 px-4 relative"
					in:fade
					out:scale|local
					animate:flip={{ duration: 500 }}
				>
					<RecentQuery {query} />
				</div>
			{:else}
				<span>No recent queries</span>
			{/each}
		</div>

		{#if $isAuthenticated}
			<RecentQueriesList />
		{/if}
	{:else}
		<div class="h-full w-full grid place-items-center col-span-2">
			<div class="btn btn-circle btn-ghost btn-xl loading" />
		</div>
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
