<script lang="ts">
	import FeatureSelector from '$lib/components/FeatureSelector/FeatureSelector.svelte';
	import Filters from '$lib/components/Filters/Filters.svelte';
	import RecentQueriesList from '$lib/components/RecentQueries/RecentQueriesList.svelte';
	import SearchBar from '$lib/components/SearchBar/SearchBar.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
	import { isAuthenticated } from '$lib/stores';

	let url = '';

	const executeQueryWithIFrame = (queryUrl: string) => {
		url = queryUrl + '&igu=1';
	};

	const executeQueryWithNewTab = (queryUrl: string | string[]) => {
		if (typeof queryUrl === 'string') {
			window.open(queryUrl);
		} else {
			for (let [key, url] of queryUrl.entries()) {
				if (key === 0) {
					window.open(url, `_blank_first_${key.toString()}`);
				} else {
					setTimeout(function () {
						console.log('resolved', key, url);
						window.open(url, `_blank_${key.toString()}`);
					}, 1500 * key);
				}
			}
		}
	};
</script>

<svelte:head>
	<title>Pro-Search</title>
</svelte:head>

<main class="dark:text-gray-50 mt-24 h-full">
	<h1
		class="text-6xl text-primary text-center bg-transparent dark:text-gray-400 my-8 font-extrabold"
	>
		Pro-Search
	</h1>

	<div class="flex flex-col gap-2 md:flex-row">
		<SearchProvider />
		<FeatureSelector
			featureFlag="Results_In_IFrame"
			onFeature={executeQueryWithIFrame}
			offFeature={executeQueryWithNewTab}
			let:feature={executeQuery}
		>
			<SearchBar {executeQuery} />
		</FeatureSelector>
	</div>

	{#if url}
		<iframe title="Results" src={url} class="w-full h-full" frameborder="0" />
	{:else}
		<Filters />
		{#if $isAuthenticated}
			<div class="divider" />
			<RecentQueriesList />
		{/if}
	{/if}
</main>
