<script lang="ts">
	import { generateQuery } from '$lib/components/Filters/utils/generateQuery';
	import { queryStore, resetQuery } from '$lib/stores';
	import { updateRecentQueries } from '$lib/utils/generateAndGo';
	import { fade, scale } from 'svelte/transition';

	let searchInput;
	export let executeQuery: (query: string) => void;

	const generateQueryAndGo = () => {
		if (!$queryStore.searchTerm) return;
		const formattedQuery = generateQuery();

		executeQuery(`${$queryStore.provider.url}${encodeURI(formattedQuery)}`);

		searchInput.focus();
	};

	const saveSearch = () => {
		updateRecentQueries();

		resetQuery();
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			generateQueryAndGo();
		}
	};

	const handleSearch = (e) => {
		generateQueryAndGo();
	};

	const handleSearchClear = (e) => {
		// resetQuery()
	};

	const handleSearchClear = (e) => {
		$queryStore.searchTerm = '';
	};

	function focusElement(element) {
		element.focus();
	}
</script>

<div class="relative w-full">
	<input
		class="input input-bordered input-primary w-full"
		placeholder="Search"
		bind:value={$queryStore.searchTerm}
		on:keydown={handleKeydown}
		type="text"
		use:focusElement
		bind:this={searchInput}
	/>
	{#if $queryStore.searchTerm}
		<button
			on:click={handleSearchClear}
			in:fade
			out:scale
			class="absolute top-0 right-0 rounded-l-none btn btn-error">X</button
		>
	{/if}
</div>

<button class="btn btn-primary" on:click={handleSearch}>Search</button>
{#if $queryStore.searchTerm}
	<button class="btn btn-outline" in:fade on:click={saveSearch}>Save</button>
{/if}
