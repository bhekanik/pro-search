<script lang="ts">
	import Protected from '$lib/components/Protected/Protected.svelte';
	import SavedQuery from '$lib/components/SavedQueries/SavedQuery.svelte';
	import type { Query } from '$lib/stores';
	import { savedQueriesStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';

	let savedQueries: Query[] = [];

	$: savedQueries = $savedQueriesStore.sort(
		(a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
	);
</script>

<svelte:head>
	<title>Pro-Search | Recipes</title>
</svelte:head>

<Protected>
	<div
		class="p-8 pt-6 relative h-full overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)] grid-rows-[40px,1fr] gap-4"
	>
		<h3 class="text-2xl mb-4 text-gray-300 grid-rows-1">Saved Queries</h3>
		<div
			class="pr-4 h-full grid gap-4 auto-rows-max grid-cols-[repeat(auto-fill,minmax(300px,400px))] md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] overflow-auto saved-queries-list"
		>
			{#each savedQueries as query (query.id)}
				<div
					class="card glass hover:bg-violet-800 bg-violet-900 shadow-md py-2 px-4 relative"
					in:fade
					out:scale|local
					animate:flip={{ duration: 500 }}
				>
					<SavedQuery {query} />
				</div>
			{:else}
				<span>No saved queries</span>
			{/each}
		</div>
	</div>
</Protected>

<style>
	.saved-queries-list::-webkit-scrollbar {
		width: 15px;
	}

	.saved-queries-list::-webkit-scrollbar-track {
		background-color: #555555;
		border-radius: 100px;
	}

	.saved-queries-list::-webkit-scrollbar-thumb {
		border-radius: 80px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #6174c3;
	}
</style>
