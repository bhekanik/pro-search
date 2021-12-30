<script lang="ts">
	import SearchBar from './SearchBar.svelte';

	export let executeQuery: (query: string | string[]) => void;
</script>

<SearchBar {executeQuery} />
