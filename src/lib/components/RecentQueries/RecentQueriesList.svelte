<script lang="ts">
	import { recentQueriesStore } from '$lib/stores';
	import { flip } from 'svelte/animate';
	import { fade, scale } from 'svelte/transition';
	import RecentQuery from './RecentQuery.svelte';
</script>

<h3 class="heading">Recent Queries</h3>
<ul class="query-list">
	{#each $recentQueriesStore as query (query.id)}
		<li class="query" in:fade out:scale|local animate:flip={{ duration: 500 }}>
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

	.query {
		border: 1px solid gray;
		border-radius: 5px;
		padding: 1rem 2rem;
		position: relative;
	}
</style>
