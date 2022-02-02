<script lang="ts">
	import type { Query } from '$lib/stores';
	import { recentQueriesStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';
	import RecentQuery from './RecentQuery.svelte';

	let recentQueries: Query[] = [];

	$: recentQueries = $recentQueriesStore.sort(
		(a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
	);
</script>

<div class="queries px-4 pt-2 overflow-auto relative bg-gray-700 hidden md:block">
	<h3 class="text-2xl mb-4 text-gray-300">Recent Queries</h3>
	<ul class="flex flex-col gap-4 list-none pb-4 mb-4">
		{#each recentQueries as query (query.id)}
			<li
				class="card glass hover:bg-violet-800 bg-violet-900 shadow-md py-2 px-4 relative"
				in:fade
				out:scale|local
				animate:flip={{ duration: 500 }}
			>
				<RecentQuery {query} />
			</li>
		{:else}
			<span>No recent queries</span>
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
