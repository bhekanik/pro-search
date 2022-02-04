<script lang="ts">
	import ShareModal from '$lib/components/RecentQueries/ShareModal.svelte';
	import { queryStore, recentQueriesStore } from '$lib/stores';
	import type { Filter } from '$lib/stores/query';

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

<div class="mb-2">
	<h1 class="font-medium text-lg text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
		{query.name}
	</h1>
</div>
<div>
	<span class="text-gray-300">Search Provider: </span>
	<span class="font-medium text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
		{query.provider.name}
	</span>
</div>
<div>
	<span class="text-gray-300">Filters: </span>
	<span class="font-medium text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
		{generateFilters(query.filters)}
	</span>
</div>
<div class="flex gap-1 align-middle items-center justify-end mt-2">
	<ShareModal {query} />
	<button class="btn btn-sm glass text-gray-300" on:click={() => handleApply()}>Apply</button>
	<button class="btn btn-sm glass text-gray-300" on:click={() => handleDelete()}>Delete</button>
</div>
