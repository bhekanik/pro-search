<script lang="ts">
	import { generateQuery } from '$lib/components/Filters/generateQuery';
	import { query, recentQueries } from '$lib/stores';
	import { onMount } from 'svelte';

	let searchInput;

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

		if (typeof $query.provider.url === 'string') {
			window.open(`${$query.provider.url}${encodeURI(formattedQuery)}`);
		} else {
			$query.provider.url.forEach((url, i) => {
				window.open(`${url}${encodeURI(formattedQuery)}`, i.toString());
			});
		}

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
	class="search-input"
	placeholder="Search"
	bind:value={$query.searchTerm}
	on:keydown={handleKeydown}
	type="text"
	name=""
	id=""
	bind:this={searchInput}
/>
<button class="inputs button" on:click={handleClick}>Search</button>

<style>
	.search-input {
		width: 100%;
		border: 1px solid gray;
		/* margin-bottom: 0.5rem; */
		margin: auto;
		border-radius: 10px;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		background-color: transparent;
	}
</style>
