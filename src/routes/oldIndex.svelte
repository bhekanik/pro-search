<script lang="ts">
	import Filter from '$lib/OldFilter.svelte';
	import { onMount } from 'svelte';

	let provider = 'https://google.com/search?q=';
	let query = '';
	let searchTerm = '';
	let site = {
		enabled: false,
		value: ''
	};
	let title = {
		enabled: false
	};
	let fileType = {
		enabled: false,
		value: ''
	};
	let searchInput;

	const generateQueryAndGo = () => {
		if (!searchTerm) return;
		query = searchTerm;
		if (title.enabled) {
			query = `intitle:"${query}"`;
		}
		if (site.enabled && site.value) {
			query = `site:${site.value} ${query}`;
		}
		if (fileType.enabled && fileType.value) {
			query = `filetype:${fileType.value} ${query}`;
		}
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

<main>
	<h1 class="text-4xl text-center my-8">Pro-Search</h1>
	<div class="flex flex-col gap-2 md:flex-row">
		<select
			class="rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-800"
			name="provider"
			id="provider"
			bind:value={provider}
		>
			<option selected value="https://google.com/search?q=">Google</option>
			<option value="https://duckduckgo.com/?q=">DuckDuckGo</option>
			<option value="https://bing.com/search?q=">Bing</option>
			<option value="https://search.yahoo.com/search?q=">Yahoo</option>
		</select>
		<input
			class="w-full rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-800"
			placeholder="Search"
			bind:value={searchTerm}
			on:keydown={handleKeydown}
			type="text"
			name=""
			id=""
			bind:this={searchInput}
		/>
		<button
			class="px-8 py-4 rounded-md border-2 border-gray-400 dark:border-gray-800 bg-gray-800 text-gray-100 text-lg flex items-center justify-center"
			on:click={handleClick}>Search</button
		>
	</div>

	<div class="my-4">
		<h2>Add Filters</h2>

		<Filter name="Site" filter={site} go={handleKeydown} />
		<Filter name="Title" filter={title} noInput />
		<Filter name="File Type" filter={fileType} go={handleKeydown} />
	</div>
</main>
