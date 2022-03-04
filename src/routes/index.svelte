<script lang="ts">
	import Announcement from '$lib/components/Announcement/Announcement.svelte';
	import ValueSelector from '$lib/components/FeatureSelector/ValueSelector.svelte';
	import Filters from '$lib/components/Filters/Filters.svelte';
	import QueryUrlPreview from '$lib/components/QueryURLPreview/QueryURLPreview.svelte';
	import SavedQueriesList from '$lib/components/SavedQueries/SavedQueriesList.svelte';
	import SearchBar from '$lib/components/SearchBar/SearchBar.svelte';
	import SearchProvider from '$lib/components/SearchProvider/SearchProvider.svelte';
	import { authStore, seo, settingsStore } from '$lib/stores';
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
	class="main-area p-8 pt-6 relative h-full overflow-y-scroll grid grid-cols-[1fr] md:grid-cols-[minmax(600px,1fr)_minmax(290px,400px)] gap-8"
>
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

			{#if $settingsStore.query_preview}
				<QueryUrlPreview />
			{/if}

			{#if !$authStore.isLoggedIn}
				<Announcement>
					<label for="auth-modal" class="underline cursor-pointer font-bold inline">Sign up</label>
					to save your queries and other cool features!
				</Announcement>
			{/if}

			{#if url}
				<iframe title="Results" src={url} class="w-full h-full" frameborder="0" />
			{:else}
				<Filters />
				<!-- <Recipes /> -->
			{/if}
		</main>
	</div>

	{#if $authStore.isLoggedIn}
		<SavedQueriesList />
	{/if}
</div>

<style>
	.main-area::-webkit-scrollbar {
		width: 15px;
	}

	.main-area::-webkit-scrollbar-track {
		background-color: #374151;
		border-radius: 100px;
	}

	.main-area::-webkit-scrollbar-thumb {
		border-radius: 80px;
		border: 5px solid transparent;
		background-clip: content-box;
		background-color: #8070d4;
	}
</style>
