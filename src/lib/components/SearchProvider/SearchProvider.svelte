<script lang="ts">
	import {
		SearchProvider,
		searchProvidersWithAll,
		searchProvidersWithoutAll
	} from '$lib/app/config/searchProviders';
	import { query } from '$lib/stores';
	import { featureFlags } from '$lib/stores/featureFlags';
	import { onDestroy } from 'svelte';

	let searchProviders: SearchProvider[];

	const unsubscribe = featureFlags.subscribe((value) => {
		searchProviders =
			value['searchAll'] === 'on' ? searchProvidersWithAll : searchProvidersWithoutAll;
	});

	onDestroy(unsubscribe);

	const handleProviderChange = (e: any) => {
		query.update((currentQuery) => {
			return {
				...currentQuery,
				provider: searchProviders.find((provider) => provider.id === e.target.value)
			};
		});
	};
</script>

<svelte:head>
	<title>Pro-Search</title>
</svelte:head>

<select
	class="inputs rounded-md text-lg p-4 border-2 bg-transparent border-gray-400 dark:border-gray-400"
	name="provider"
	id="provider"
	on:change={handleProviderChange}
	value={$query.provider.id}
>
	{#each searchProviders as provider}
		<option
			class="rounded-md text-lg p-4 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400"
			selected
			value={provider.id}>{provider.name}</option
		>
	{/each}
</select>

<style>
</style>
