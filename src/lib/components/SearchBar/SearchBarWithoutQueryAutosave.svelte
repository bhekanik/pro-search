<script lang="ts">
	import { isAuthenticated, queryStore } from '$lib/stores';
	import { updateRecentQueries } from '$lib/utils/generateAndGo';
	import { fade } from 'svelte/transition';
	import SearchBarBase from './SearchBarBase.svelte';

	export let executeQuery: (query: string | string[]) => void;

	const saveSearch = () => {
		updateRecentQueries();
		queryStore.reset();
	};
</script>

<SearchBarBase {executeQuery} />
{#if $queryStore.searchTerm && $isAuthenticated}
	<button class="btn btn-outline" in:fade on:click={saveSearch}>Save</button>
{/if}
