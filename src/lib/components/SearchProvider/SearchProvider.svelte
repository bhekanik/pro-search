<script lang="ts">
	import { queryStore, searchProvidersStore } from '$lib/stores';
	import SearchProviderSelect from './SearchProviderSelect.svelte';

	const handleProviderChange = (e: Event) => {
		queryStore.update((currentQuery) => {
			return {
				...currentQuery,
				provider: $searchProvidersStore.find(
					(provider) => provider.id === Number((e.target as HTMLSelectElement).value)
				)
			};
		});
	};

	$: {
		console.log('$queryStore:', $queryStore.provider);
	}
</script>

<SearchProviderSelect
	value={$queryStore.provider?.id}
	searchProviders={$searchProvidersStore}
	on:change={(e) => handleProviderChange(e)}
/>
