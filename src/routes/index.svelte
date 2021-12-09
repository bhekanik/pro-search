<script lang="ts">
	import Filters from '$lib/components/Filters/Filters.svelte';
	import RecentQueriesList from '$lib/components/RecentQueries/RecentQueriesList.svelte';
	import SearchBar from '$lib/components/SearchBar/SearchBar.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
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
		<SearchBar />
	</div>

	<Filters />
	<RecentQueriesList />
</main>
