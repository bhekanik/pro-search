<script lang="ts">
	import { queryStore } from '$lib/stores';
	import { generateQueryUrl } from '$lib/utils';
	import { fade, scale } from 'svelte/transition';

	let searchInput: HTMLInputElement;

	export let executeQuery: (query: string | string[]) => void;
	export let saveQuery = false;

	function focusElement(element: HTMLElement) {
		element.focus();
	}

	const handleSearch = () => {
		if (!$queryStore.search_term) return;
		const generatedQueryUrl = generateQueryUrl({
			saveQuery,
			skipSearchTermCheck: true
		});
		executeQuery(generatedQueryUrl);
		focusElement(searchInput);
	};

	const handleInput = (e: Event) => {
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.search_term = (e.target as HTMLInputElement).value.trim();
			return newQuery;
		});
	};

	const onSearch = () => {
		handleSearch();
	};

	const handleSearchClear = () => {
		queryStore.reset();
	};

	const onKeydown = (e: any) => {
		if (e.key === 'Enter' || e.code === 'Enter') {
			handleSearch();
		}
	};
</script>

<div class="relative w-full">
	<input
		class="input input-bordered input-primary w-full bg-gray-600"
		placeholder="Search"
		on:keydown={onKeydown}
		on:input={handleInput}
		type="text"
		use:focusElement
		bind:this={searchInput}
		value={$queryStore.search_term}
	/>

	{#if $queryStore.search_term}
		<button
			on:click={handleSearchClear}
			in:fade
			out:scale
			class="absolute top-2 right-2 btn-sm btn-ghost btn btn-circle">✕</button
		>
	{/if}
</div>

<button class="btn btn-primary" on:click={onSearch}>Search</button>
