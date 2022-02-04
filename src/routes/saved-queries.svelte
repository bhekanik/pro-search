<script lang="ts">
	import Protected from '$lib/components/Protected/Protected.svelte';
	import SavedQuery from '$lib/components/SavedQueries/SavedQuery.svelte';
	import type { Query } from '$lib/stores';
	import { savedQueriesStore } from '$lib/stores';
	import { search } from 'fast-fuzzy';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let savedQueries: Query[] = [];
	let filteredQueries: Query[] = [];

	let searchTerm = '';

	$: {
		if (searchTerm) {
			const filtered = search(searchTerm, savedQueries, { keySelector: (obj) => obj.name });
			filteredQueries = [...filtered];
		} else {
			filteredQueries = [...savedQueries];
		}
	}

	$: savedQueries = $savedQueriesStore.sort(
		(a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
	);

	function focusInput(element) {
		element.focus();
	}
</script>

<svelte:head>
	<title>Pro-Search | Recipes</title>
</svelte:head>

<Protected>
	<div
		class="p-8 pt-0 mt-6 relative h-full overflow-y-auto auto-rows-min grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)] grid-rows-[fit-content,1fr] gap-4 saved-queries-list"
	>
		<div class="flex flex-col px-4 pb-4 bg-gray-700 sticky top-0 z-20">
			<h3 class="text-2xl mb-4 text-gray-300 grid-rows-1 whitespace-nowrap">Saved Queries</h3>
			<input
				use:focusInput
				bind:value={searchTerm}
				class="input input-bordered w-full bg-gray-600"
				placeholder="Search"
			/>
		</div>
		<div class="px-4 grid gap-4 auto-rows-max grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
			{#each filteredQueries as query (query.id)}
				<div
					class="card glass hover:bg-violet-800 bg-violet-900 shadow-md py-2 px-4 relative"
					in:fade
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
