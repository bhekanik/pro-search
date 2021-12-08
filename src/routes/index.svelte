<script lang="ts">
	import ExcludeFilter from '$lib/components/Filter/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filter/FileType.svelte';
	import { generateQuery } from '$lib/components/Filter/generateQuery';
	import SiteFilter from '$lib/components/Filter/Site.svelte';
	import TitleFilter from '$lib/components/Filter/Title.svelte';
	import URLFilter from '$lib/components/Filter/URL.svelte';
	import RecentQueriesList from '$lib/components/RecentQueries/RecentQueriesList.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
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

<svelte:head>
	<title>Pro-Search</title>
</svelte:head>

<main class="dark:text-gray-50">
	<h1
		class="text-6xl text-center bg-transparent text-gray-700 dark:text-gray-400 my-8 font-extrabold"
	>
		Pro-Search
	</h1>

	<div class="flex flex-col gap-2 md:flex-row">
		<SearchProvider />
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
	</div>

	<h2 class="filters-heading">Add Filters</h2>
	<div class="filters">
		<SiteFilter />
		<ExcludeFilter />
		<TitleFilter />
		<FileTypeFilter />
		<URLFilter />
	</div>
	<RecentQueriesList />
</main>

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

	.filters-heading {
		margin: 1rem 0;
	}
	.filters {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
	}
</style>
