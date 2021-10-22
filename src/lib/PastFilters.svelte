<script lang="ts">
	import type { Filter } from '../stores/query';
	import { recentQueries } from '../stores/recentQueries';

	export const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce((prev, curr) => `${prev}${curr.formatted}`, '');

	const handleDelete = (index: number) => {
		recentQueries.update((currentRecentQueries) => {
			const newRecentQueries = currentRecentQueries.filter((_, i) => i !== index);
			globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));
			return newRecentQueries;
		});
	};

	const handleApply = () => {};
</script>

<h3 class="heading">Recent Queries</h3>
<div class="query-list">
	{#each $recentQueries as query, i}
		<div class="query">
			<div class="buttons">
				<button class="apply-button" disabled={true} on:click={handleApply}>Apply</button>
				<button class="delete-button" on:click={() => handleDelete(i)}>Delete</button>
			</div>
			<h3 class="query_search-term">{query.searchTerm}</h3>
			<span class="label">Filters: </span>
			<span class="filters">
				{generateFilters(query.filters)}
			</span>
		</div>
	{/each}
</div>

<style lang="scss">
	.heading {
		font-size: 1.5rem;
		padding: 1rem 0 0.5rem;
		border-top: 1px solid gray;
	}

	.query-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.label {
			color: gray;
		}
	}

	.query {
		border: 1px solid gray;
		border-radius: 5px;
		padding: 1rem 2rem;
		position: relative;
	}

	.buttons {
		position: absolute;
		right: 2rem;
		top: 1rem;
		display: flex;
		gap: 1rem;

		button:disabled {
			color: lightgray;
			cursor: auto;
		}
	}

	.query_search-term {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.filters {
		font-weight: bold;
	}
</style>
