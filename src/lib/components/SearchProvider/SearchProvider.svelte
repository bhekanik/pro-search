<script lang="ts">
	import {
		SearchProvider,
		searchProvidersWithAll,
		searchProvidersWithoutAll
	} from '$lib/app/config/searchProviders';
	import { query } from '$lib/stores';
	import FeatureSelector from '../FeatureSelector/FeatureSelector.svelte';

	const handleProviderChange = (e: any, searchProviders: SearchProvider[]) => {
		query.update((currentQuery) => {
			return {
				...currentQuery,
				provider: searchProviders.find((provider) => provider.id === e.target.value)
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
		class="inputs rounded-md text-lg p-4 border-2 bg-transparent border-gray-400 dark:border-gray-400"
		name="provider"
		id="provider"
		on:change={(e) => handleProviderChange(e, searchProviders)}
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
</FeatureSelector>
