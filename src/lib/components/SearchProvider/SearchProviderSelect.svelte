<script lang="ts">
	import type { SearchProvider } from '$lib/app/config/searchProviders';
	import { queryStore } from '$lib/stores';

	export let searchProviders: SearchProvider[] = [];
</script>

<select
	class="select select-bordered text-gray-300"
	name="provider"
	id="provider"
	on:change
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
