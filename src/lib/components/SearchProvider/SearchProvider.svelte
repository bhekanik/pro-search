<script lang="ts">
	import {
		SearchProvider,
		searchProvidersWithAll,
		searchProvidersWithoutAll
	} from '$lib/app/config';
	import { queryStore } from '$lib/stores';
	import ValueSelector from '../FeatureSelector/ValueSelector.svelte';
	import SearchProviderSelect from './SearchProviderSelect.svelte';

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
	<SearchProviderSelect
		{searchProviders}
		on:change={(e) => handleProviderChange(e, searchProviders)}
	/>
</ValueSelector>
