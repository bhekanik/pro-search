<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/app/supabaseClient';
	import { queryStore, savedQueriesStore } from '$lib/stores';
	import type { Filter } from '$lib/stores/query';

	export let query;
	export let handleShare: (id: string) => void;

	const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce(
			(prev, curr) => `${prev ? prev : ''}${prev && curr ? ', ' : ''}${curr.type}: ${curr.value}`,
			''
		);

	const handleDelete = async () => {
		const { error } = await supabase.from('saved_queries').delete().eq('id', query.id);

		const { data: newSavedQueries } = await supabase.from('saved_queries').select();

		savedQueriesStore.set(newSavedQueries);
		return newSavedQueries;
	};

	const handleApply = () => {
		queryStore.set({ ...query });
		goto('/');
	};
</script>

<div class="mb-2">
	<h1 class="font-medium text-lg text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
		{query.name}
	</h1>
</div>
<div>
	<span class="text-gray-300">Query Term: </span>
	<span class="font-medium text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
		{query.search_term}
	</span>
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
	<label
		on:click={() => handleShare(query.id)}
		for={`share-modal-btn-${query.id}`}
		class="btn btn-sm btn-ghost glass modal-button text-gray-300">Share</label
	>
	<button class="btn btn-sm glass text-gray-300" on:click={() => handleApply()}>Apply</button>
	<button class="btn btn-sm glass text-gray-300" on:click={() => handleDelete()}>Delete</button>
</div>
