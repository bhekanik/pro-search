<script lang="ts">
	import {
		SearchProvider,
		searchProvidersWithAll,
		searchProvidersWithoutAll
	} from '$lib/app/config';
	import { queryStore } from '$lib/stores';
	import ValueSelector from '../FeatureSelector/ValueSelector.svelte';

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

<ValueSelector
	featureFlag="Search_All_Providers"
	onValue={searchProvidersWithAll}
	offValue={searchProvidersWithoutAll}
	let:feature={searchProviders}
>
	<select
		class="select select-bordered text-gray-300"
		name="provider"
		id="provider"
		on:change={(e) => handleProviderChange(e, searchProviders)}
		value={$queryStore.provider.id}
	>
		{#each searchProviders as provider}
			<option
				class="rounded-md text-lg p-4 text-gray-300 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400"
				selected
				value={provider.id}>{provider.name}</option
			>
		{/each}
	</select>
</ValueSelector>
