<script lang="ts">
	import { searchProviders } from '$lib/app/config/searchProviders';
	import { query } from '$lib/stores';
	import { featureFlags } from '$lib/stores/featureFlags';

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
	{#each searchProviders.filter((prov) => {
		if ($featureFlags.searchAll !== 'on') {
			return prov.name !== 'All';
		}
		return true;
	}) as provider}
		<option
			class="rounded-md text-lg p-4 border-2 dark:bg-gray-600 border-gray-400 dark:border-gray-400"
			selected
			value={provider.id}>{provider.name}</option
		>
	{/each}
</select>

<style>
</style>
