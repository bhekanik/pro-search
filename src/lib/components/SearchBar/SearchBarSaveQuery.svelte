<script lang="ts">
	import { generateQuery } from '$lib/components/Filters/generateQuery';
	import { query, recentQueries } from '$lib/stores';
	import { onMount } from 'svelte';

	let searchInput;
	export let executeQuery: (query: string) => void;

	const generateQueryAndGo = () => {
		if (!$query.searchTerm) return;
		const formattedQuery = generateQuery($query);
		recentQueries.update((currentRecentQueries) => {
			const newRecentQueries = currentRecentQueries.find((item) => item.id === $query.id)
				? [...currentRecentQueries]
				: [...currentRecentQueries, { ...$query }];
			globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));

			return newRecentQueries;
		});

		executeQuery(`${$query.provider.url}${encodeURI(formattedQuery)}`);

		searchInput.focus();
	};

	const handleKeydown = (e) => {
		if (e.keyCode === 13) {
			generateQueryAndGo();
		}
	};

	const handleClick = (e) => {
		generateQueryAndGo();
	};

	onMount(() => {
		searchInput.focus();
	});
</script>

<input
	class="input input-bordered input-primary w-full"
	placeholder="Search"
	bind:value={$query.searchTerm}
	on:keydown={handleKeydown}
	type="text"
	name=""
	id=""
	bind:this={searchInput}
/>
<button class="btn btn-primary" on:click={handleClick}>Search</button>
