<script lang="ts">
	import { queryStore, searchProvidersStore } from '$lib/stores';
	import SearchProviderSelect from './SearchProviderSelect.svelte';

	const handleProviderChange = (e: Event) => {
		queryStore.update((currentQuery) => {
			return {
				...currentQuery,
				provider: $searchProvidersStore.find(
					(provider) => provider.id === (e.target as HTMLSelectElement).value
				)
			};
		});
	};
</script>

<SearchProviderSelect
	value={$queryStore.provider?.id}
	searchProviders={$searchProvidersStore}
	on:change={(e) => handleProviderChange(e)}
/>
