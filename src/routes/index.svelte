<script lang="ts">
	import FeatureSelector from '$lib/components/FeatureSelector/FeatureSelector.svelte';
	import Filters from '$lib/components/Filters/Filters.svelte';
	import RecentQueriesList from '$lib/components/RecentQueries/RecentQueriesList.svelte';
	import SearchBarNoSaveQuery from '$lib/components/SearchBar/SearchBarNoSaveQuery.svelte';
	import SearchBarSaveQuery from '$lib/components/SearchBar/SearchBarSaveQuery.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
	import { query } from '$lib/stores';

	let url = '';

	const executeQueryWithIFrame = (queryUrl: string) => {
		url = queryUrl + '&igu=1';
	};

	const executeQueryWithNewTab = (queryUrl: string) => {
		if (typeof $query.provider.url === 'string') {
			window.open(queryUrl);
		} else {
			$query.provider.url.forEach((providerUrl, i) => {
				window.open(providerUrl, i.toString());
			});
		}
	};
</script>

<svelte:head>
	<title>Pro-Search</title>
</svelte:head>

<main class="dark:text-gray-50 h-full">
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
			<FeatureSelector
				featureFlag="Save_Search"
				onFeature={SearchBarNoSaveQuery}
				offFeature={SearchBarSaveQuery}
				let:feature={SearchBar}
			>
				<SearchBar {executeQuery} />
			</FeatureSelector>
		</FeatureSelector>
	</div>

	{#if url}
		<iframe title="Results" src={url} class="w-full h-full" frameborder="0" />
	{:else}
		<Filters />
		<div class="divider" />
		<RecentQueriesList />
	{/if}
</main>
