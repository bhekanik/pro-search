<script lang="ts">
	import { queryStore } from '$lib/stores';
	import { generateQueryUrl } from '$lib/utils/generateAndGo';
	import { fade, scale } from 'svelte/transition';

	let searchInput;

	export let executeQuery: (query: string | string[]) => void;
	export let saveQuery = false;

	const handleSearch = (refocusSearchBar: () => void) => {
		if (!$queryStore.searchTerm) return;
		const queryUrl = generateQueryUrl({
			saveQuery
		});
		executeQuery(queryUrl);
		refocusSearchBar();
	};

	const handleInput = (e) => {
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.searchTerm = e.target.value.trim();
			return newQuery;
		});
	};

	const onSearch = () => {
		handleSearch(searchInput.focus);
	};

	const handleSearchClear = () => {
		queryStore.reset();
	};

	const onKeydown = (e) => {
		if (e.keyCode === 13) {
			handleSearch(searchInput.focus);
		}
	};

	function focusElement(element) {
		element.focus();
	}
</script>

<div class="relative w-full">
	<input
		class="input input-bordered input-primary w-full"
		placeholder="Search"
		on:keydown={onKeydown}
		on:input={handleInput}
		type="text"
		use:focusElement
		bind:this={searchInput}
		value={$queryStore.searchTerm}
	/>

	{#if $queryStore.searchTerm}
		<button
			on:click={handleSearchClear}
			in:fade
			out:scale
			class="absolute top-2 right-2 btn-sm btn-ghost btn btn-circle">✕</button
		>
	{/if}
</div>

<button class="btn btn-primary" on:click={onSearch}>Search</button>
