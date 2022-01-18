<script lang="ts">
	import { queryStore, recentQueriesStore } from '$lib/stores';
	import type { Filter } from '$lib/stores/query';
	import ShareModal from './ShareModal.svelte';

	export let query;

	const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce((prev, curr) => `${prev}${curr.formatted}`, '');

	const handleDelete = () => {
		const recentQueries = JSON.parse(window.localStorage?.getItem('recentQueries') || '[]');
		const newRecentQueries = recentQueries.filter((recentQuery) => recentQuery.id !== query.id);
		window.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
		recentQueriesStore.set(newRecentQueries);
		return newRecentQueries;
	};

	const handleApply = () => {
		queryStore.set({ ...query });
	};
</script>

<div class="buttons">
	<ShareModal {query} />
	<button class="btn btn-ghost" on:click={() => handleApply()}>Apply</button>
	<button class="btn btn-ghost" on:click={() => handleDelete()}>Delete</button>
</div>
<div>
	<span class="">Search Term: </span>
	<span class="query_search-term">{query.searchTerm}</span>
</div>
<div>
	<span class="">Search Provider: </span>
	<span class="filters">
		{query.provider.name}
	</span>
</div>
<div>
	<span class="">Filters: </span>
	<span class="filters">
		{generateFilters(query.filters)}
	</span>
</div>

<style>
	.buttons {
		position: absolute;
		right: 2rem;
		top: 1rem;
		display: flex;
		gap: 1rem;
	}

	.query_search-term {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: bold;
	}

	.filters {
		font-weight: bold;
	}
</style>
