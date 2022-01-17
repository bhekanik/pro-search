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

<h3 class="heading">Recent Queries</h3>
<ul class="query-list pb-4 mb-4 overflow-y-auto">
	{#each recentQueries as query (query.id)}
		<li
			class="card card-bordered shadow-md py-4 px-8 relative"
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

<style>
	.heading {
		font-size: 1.5rem;
		padding: 1rem 0 0.5rem;
	}

	.query-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		list-style: none;
	}
</style>
