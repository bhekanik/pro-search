<script lang="ts">
	import { queryStore, recentQueriesStore } from '$lib/stores';
	import type { Filter } from '$lib/stores/query';
	import ShareModal from './ShareModal.svelte';

	export let query;

	const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce(
			(prev, curr) => `${prev ? prev : ''}${prev && curr ? ', ' : ''}${curr.type}: ${curr.value}`,
			''
		);

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

<div class="flex justify-between items-center mb-2">
	<h1 class="font-medium text-xl">{query.name}</h1>
	<div class="flex gap-1 align-middle items-center">
		<ShareModal {query} />
		<button class="btn btn-sm btn-ghost" on:click={() => handleApply()}>Apply</button>
		<button class="btn btn-sm btn-ghost" on:click={() => handleDelete()}>Delete</button>
	</div>
</div>
<div>
	<span class="">Search Term: </span>
	<span class="font-medium">{query.searchTerm}</span>
</div>
<div>
	<span class="">Search Provider: </span>
	<span class="font-medium">
		{query.provider.name}
	</span>
</div>
<div>
	<span class="">Filters: </span>
	<span class="font-medium">
		{generateFilters(query.filters)}
	</span>
</div>
