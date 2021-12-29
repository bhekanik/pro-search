<script lang="ts">
	import { generateQuery } from '$lib/components/Filters/utils/generateQuery';
	import { queryStore, resetQuery } from '$lib/stores';
	import { updateRecentQueries } from '$lib/utils/generateAndGo';

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

	const handleClick = () => {
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
	<button class="btn btn-outline" on:click={saveSearch}>Save</button>
{/if}
