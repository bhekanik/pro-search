<script lang="ts">
	import { queryStore } from '$lib/stores';
	import Bing from './Bing.svelte';
	import DuckDuckGo from './DuckDuckGo.svelte';
	import Google from './Google.svelte';
	import Yahoo from './Yahoo.svelte';
</script>

<div class="collapse my-2 w-full border rounded-box border-base-300 collapse-arrow">
	<input type="checkbox" />
	<div class="collapse-title text-gray-300">Add Filters</div>
	<div class="collapse-content">
		<div class="filters">
			{#if $queryStore.provider.name === 'Google'}
				<Google />
			{:else if $queryStore.provider.name === 'Bing'}
				<Bing />
			{:else if $queryStore.provider.name === 'Yahoo'}
				<Yahoo />
			{:else if $queryStore.provider.name === 'DuckDuckGo'}
				<DuckDuckGo />
			{/if}
		</div>
	</div>
</div>
