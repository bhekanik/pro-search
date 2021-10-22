<script lang="ts">
	import { recentQueries } from '../stores/recentQueries';

	export const generateQuery = (filters: Record<string, string>): string =>
		Object.values(filters).reduce((prev, curr) => `${prev}${curr}`);
</script>

<h3 class="heading">Recent Queries</h3>
<div class="query-list">
	{#each $recentQueries as query}
		<div class="query">
			<h3 class="query_search-term">{query.searchTerm}</h3>
			<span class="label">Filters: </span>
			<span class="filters">
				{generateQuery(query.filters)}
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
	}

	.query_search-term {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.filters {
		font-weight: bold;
	}
</style>
