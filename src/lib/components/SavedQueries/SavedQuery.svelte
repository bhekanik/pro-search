<script lang="ts">
	import { goto } from '$app/navigation';
	import { initFirebase } from '$lib/app/auth/initFirebase';
	import { firebaseAuth, queryStore, savedQueriesStore, SAVED_QUERIES_KEY } from '$lib/stores';
	import type { Filter } from '$lib/stores/query';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { get } from 'svelte/store';

	export let query;
	export let handleShare: (id: string) => void;

	const generateFilters = (filters: Record<string, Filter>): string =>
		Object.values(filters).reduce(
			(prev, curr) => `${prev ? prev : ''}${prev && curr ? ', ' : ''}${curr.type}: ${curr.value}`,
			''
		);

	const handleDelete = async () => {
		const { db } = await initFirebase();

		const savedQueries =
			(await getDoc(doc(db, SAVED_QUERIES_KEY, get(firebaseAuth).user.uid))).data()?.data ?? [];

		const newSavedQueries = savedQueries.filter((savedQuery) => savedQuery.id !== query.id);

		await setDoc(
			doc(db, SAVED_QUERIES_KEY, $firebaseAuth.user.uid),
			{ data: newSavedQueries },
			{ merge: true }
		);

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
		{query.searchTerm}
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
