<script lang="ts">
	import ValueSelector from '$lib/components/FeatureSelector/ValueSelector.svelte';
	import Filters from '$lib/components/Filters/Filters.svelte';
	import SavedQueriesList from '$lib/components/SavedQueries/SavedQueriesList.svelte';
	import SearchBar from '$lib/components/SearchBar/SearchBar.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
	import { isAuthenticated, seo } from '$lib/stores';
	import { onMount } from 'svelte';

	let url = '';

	let showInfo = false;

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
			<div
				class={`${
					showInfo === false && 'hidden'
				} relative border-2 border-gray-600 flex justify-between w-full p-2 px-4 bg-pink-50 opacity-80 text-gray-800 my-2`}
			>
				<span>Some stuff here </span>
				<button on:click={() => (showInfo = false)} class="btn btn-xs btn-ghost">Dismiss</button>
			</div>
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
