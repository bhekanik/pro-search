<script lang="ts">
	import { queryStore as currentQueryStore, recentQueriesStore } from '$lib/stores';
	import type { Filter, Query } from '$lib/stores/query';

	const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce((prev, curr) => `${prev}${curr.formatted}`, '');

	const handleDelete = (queryId: string) => {
		recentQueriesStore.update((currentRecentQueries) => {
			const newRecentQueries = currentRecentQueries.filter((query) => query.id !== queryId);
			window.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
			return newRecentQueries;
		});
	};

	const handleApply = (selectedQuery: Query) => {
		currentQueryStore.set(selectedQuery);
	};

	export let query;
</script>

<div class="buttons">
	<button class="btn btn-ghost" on:click={() => handleApply(query)}>Apply</button>
	<button class="btn btn-ghost" on:click={() => handleDelete(query.id)}>Delete</button>
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
