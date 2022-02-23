<script lang="ts">
	import Announcement from '$lib/components/Announcement/Announcement.svelte';
	import ValueSelector from '$lib/components/FeatureSelector/ValueSelector.svelte';
	import Filters from '$lib/components/Filters/Filters.svelte';
	import QueryUrlPreview from '$lib/components/QueryURLPreview/QueryURLPreview.svelte';
	import SavedQueriesList from '$lib/components/SavedQueries/SavedQueriesList.svelte';
	import SearchBar from '$lib/components/SearchBar/SearchBar.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
	import { configStore, isAuthenticated, seo } from '$lib/stores';
	import { onMount } from 'svelte';

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
						window.open(url, `_blank_${key.toString()}`);
					}, 1500 * key);
				}
			}
		}
	};

	onMount(() => {
		seo.set({
			title: 'Pro-Search',
			description: 'Advanced search query builder'
		});
	});
</script>

<div
	class="p-8 pt-6 relative h-full overflow-y-auto grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-8"
>
	<!-- <StoreMonitor /> -->
	<div class="max-w-6xl h-full">
		<main class="dark:text-gray-50">
			{#if !$isAuthenticated}
				<Announcement text="Sign up to save your queries and other cool features!" />
			{/if}

			{#if $configStore.queryPreview}
				<QueryUrlPreview />
			{/if}

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
				<!-- <Recipes /> -->
			{/if}
		</main>
	</div>

	{#if $isAuthenticated}
		<SavedQueriesList />
	{/if}
</div>
