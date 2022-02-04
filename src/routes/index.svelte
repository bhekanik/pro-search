<script lang="ts">
	import ValueSelector from '$lib/components/FeatureSelector/ValueSelector.svelte';
	import Filters from '$lib/components/Filters/Filters.svelte';
	import RecentQueriesList from '$lib/components/RecentQueries/RecentQueriesList.svelte';
	import SearchBar from '$lib/components/SearchBar/SearchBar.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
	import { isAuthenticated, readiness } from '$lib/stores';

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

<div
	class="p-8 pt-2 relative h-full max-w-7xl overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-8"
>
	{#if $readiness}
		<!-- <StoreMonitor /> -->
		<div class="max-w-6xl h-full">
			<main class="dark:text-gray-50">
				<div class="flex flex-col gap-2 md:flex-row">
					<SearchProvider />
					<ValueSelector
						featureFlag="Results_In_IFrame"
						onValue={executeQueryWithIFrame}
						offValue={executeQueryWithNewTab}
						let:feature={executeQuery}
					>
						<SearchBar {executeQuery} />
					</ValueSelector>
				</div>

				{#if url}
					<iframe title="Results" src={url} class="w-full h-full" frameborder="0" />
				{:else}
					<Filters />
				{/if}
			</main>
		</div>

		{#if $isAuthenticated}
			<RecentQueriesList />
		{/if}
	{:else}
		<div class="h-full w-full grid place-items-center col-span-2">
			<div class="btn btn-circle btn-ghost btn-xl loading" />
		</div>
	{/if}
</div>
