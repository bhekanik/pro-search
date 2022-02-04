<script lang="ts">
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
</script>

<div class="queries px-4 overflow-auto relative bg-gray-700 hidden md:block">
	<div class="flex flex-col pt-2 pb-4 bg-gray-700 sticky top-0 z-20">
		<h3 class="text-xl mb-4 text-gray-300 whitespace-nowrap">Saved Queries</h3>
		<input
			bind:value={searchTerm}
			class="input input-sm input-bordered w-full bg-gray-600"
			placeholder="Search"
		/>
	</div>
	<ul class="flex flex-col gap-4 list-none pb-4 mb-4 z-10">
		{#each filteredQueries as query (query.id)}
			<li
				class="card glass hover:bg-violet-800 bg-violet-900 shadow-md py-2 px-4 relative"
				in:fade
				animate:flip={{ duration: 500 }}
			>
				<SavedQuery {query} />
			</li>
		{:else}
			<span>No saved queries</span>
		{/each}
	</ul>
</div>

<style>
	.queries::-webkit-scrollbar {
		width: 15px;
	}

	.queries::-webkit-scrollbar-track {
		background-color: #555555;
		border-radius: 100px;
	}

	.queries::-webkit-scrollbar-thumb {
		border-radius: 80px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #8070d4;
	}
</style>
