<script lang="ts">
	import { recentQueries } from '$lib/stores';
	import type { Filter, Query } from '$lib/stores/query';

	const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce((prev, curr) => `${prev}${curr.formatted}`, '');

	const handleDelete = (index: number) => {
		recentQueries.update((currentRecentQueries) => {
			const newRecentQueries = currentRecentQueries.filter((_, i) => i !== index);
			globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
			return newRecentQueries;
		});
	};

	const handleApply = (selectedQuery: Query) => {
		query.update(() => selectedQuery);
	};

	export let query;
</script>

<div class="buttons">
	<button class="apply-button" on:click={() => handleApply(query)}>Apply</button>
	<button class="delete-button" on:click={() => handleDelete(query.id)}>Delete</button>
</div>
<div>
	<span class="label">Search Term: </span>
	<span class="query_search-term">{query.searchTerm}</span>
</div>
<div>
	<span class="label">Search Provider: </span>
	<span class="filters">
		{query.provider.name}
	</span>
</div>
<div>
	<span class="label">Filters: </span>
	<span class="filters">
		{generateFilters(query.filters)}
	</span>
</div>

<style>
	.label {
		color: gray;
	}

	.buttons {
		position: absolute;
		right: 2rem;
		top: 1rem;
		display: flex;
		gap: 1rem;
	}

	button:disabled {
		color: lightgray;
		cursor: auto;
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
