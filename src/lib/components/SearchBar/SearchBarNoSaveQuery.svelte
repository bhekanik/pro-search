<script lang="ts">
	import { generateQuery } from '$lib/components/Filters/generateQuery';
	import { queryStore, recentQueriesStore, resetQuery } from '$lib/stores';

	let searchInput;
	export let executeQuery: (query: string) => void;

	const generateQueryAndGo = () => {
		if (!$queryStore.searchTerm) return;
		const formattedQuery = generateQuery();

		executeQuery(`${$queryStore.provider.url}${encodeURI(formattedQuery)}`);

		searchInput.focus();
	};

	const saveSearch = () => {
		recentQueriesStore.update((currentRecentQueries) => {
			const newRecentQueries = currentRecentQueries.find((item) => item.id === $queryStore.id)
				? [...currentRecentQueries]
				: [...currentRecentQueries, { ...$queryStore }];
			globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));

			return newRecentQueries;
		});

		resetQuery();
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			generateQueryAndGo();
		}
	};

	const handleClick = (e) => {
		generateQueryAndGo();
	};

	function focusElement(element) {
		element.focus();
	}
</script>

<input
	class="input input-bordered input-primary w-full"
	placeholder="Search"
	bind:value={$queryStore.searchTerm}
	on:keydown={handleKeydown}
	type="text"
	use:focusElement
	bind:this={searchInput}
/>
<button class="btn btn-primary" on:click={handleClick}>Search</button>
{#if $queryStore.searchTerm}
	<button class="btn btn-outline btn-primary" on:click={saveSearch}>Save</button>
{/if}
