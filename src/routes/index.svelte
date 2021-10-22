<script lang="ts">
	import ExcludeFilter from '$lib/Filter/Exclude.svelte';
	import FileTypeFilter from '$lib/Filter/FileType.svelte';
	import { generateQuery } from '$lib/Filter/generateQuery';
	import SiteFilter from '$lib/Filter/Site.svelte';
	import TitleFilter from '$lib/Filter/Title.svelte';
	import URLFilter from '$lib/Filter/URL.svelte';
	import PastFilters from '$lib/PastFilters.svelte';
	import { onMount } from 'svelte';
	import { filters } from '../stores/filters';
	import { recentQueries } from '../stores/recentQueries';

	let provider = 'https://google.com/search?q=';
	let searchTerm = '';
	let searchInput;

	const generateQueryAndGo = () => {
		if (!searchTerm) return;
		const query = generateQuery(searchTerm, $filters);

		recentQueries.update((currentRecentQueries) => {
			const newRecentQueries = [...currentRecentQueries, query];
			globalThis.localStorage?.setItem('recentQueries', JSON.stringify(newRecentQueries));

			return newRecentQueries;
		});

		window.open(`${provider}${encodeURI(query)}`);
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
		<select
			class="rounded-md text-lg p-4 border-2 bg-transparent border-gray-400 dark:border-gray-400"
			name="provider"
			id="provider"
			bind:value={provider}
		>
			<option
				class="rounded-md text-lg p-4 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400"
				selected
				value="https://google.com/search?q=">Google</option
			>
			<option
				class="rounded-md text-lg p-4 border-2 dark:bg-gray-600 bg-transparent border-gray-400 dark:border-gray-400"
				value="https://duckduckgo.com/?q=">DuckDuckGo</option
			>
			<option
				class="rounded-md text-lg p-4 border-2 bg-transparent dark:bg-gray-600 border-gray-400 dark:border-gray-400"
				value="https://bing.com/search?q=">Bing</option
			>
			<option
				class="rounded-md text-lg p-4 border-2 bg-transparent dark:bg-gray-600 border-gray-400 dark:border-gray-400"
				value="https://search.yahoo.com/search?q=">Yahoo</option
			>
		</select>
		<input
			class="w-full rounded-md text-lg p-4 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400 bg-transparent"
			placeholder="Search"
			bind:value={searchTerm}
			on:keydown={handleKeydown}
			type="text"
			name=""
			id=""
			bind:this={searchInput}
		/>
		<button
			class="px-8 py-4 rounded-md shadow-md border-0 bg-gray-700 text-gray-50 dark:hover:bg-gray-800 hover:bg-gray-600 text-lg flex items-center justify-center"
			on:click={handleClick}>Search</button
		>
	</div>

	<div class="my-4">
		<h2>Add Filters</h2>

		<SiteFilter go={handleKeydown} />
		<ExcludeFilter go={handleKeydown} />
		<TitleFilter go={handleKeydown} />
		<FileTypeFilter go={handleKeydown} />
		<URLFilter go={handleKeydown} />
	</div>
	<PastFilters />
</main>
