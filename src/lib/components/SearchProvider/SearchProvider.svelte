<script lang="ts">
	import {
		SearchProvider,
		searchProvidersWithAll,
		searchProvidersWithoutAll
	} from '$lib/app/config';
	import { queryStore } from '$lib/stores';
	import FeatureSelector from '../FeatureSelector/FeatureSelector.svelte';

	const handleProviderChange = (e: Event, searchProviders: SearchProvider[]) => {
		queryStore.update((currentQuery) => {
			return {
				...currentQuery,
				provider: searchProviders.find(
					(provider) => provider.id === (e.target as HTMLSelectElement).value
				)
			};
		});
	};
</script>

<FeatureSelector
	featureFlag="Search_All_Providers"
	onFeature={searchProvidersWithAll}
	offFeature={searchProvidersWithoutAll}
	let:feature={searchProviders}
>
	<select
		class="select select-bordered select-primary"
		name="provider"
		id="provider"
		on:change={(e) => handleProviderChange(e, searchProviders)}
		value={$queryStore.provider.id}
	>
		{#each searchProviders as provider}
			<option
				class="rounded-md text-lg p-4 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400"
				selected
				value={provider.id}>{provider.name}</option
			>
		{/each}
	</select>
</FeatureSelector>
