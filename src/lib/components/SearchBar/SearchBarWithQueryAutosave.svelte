<script lang="ts">
	import SearchBarBase from './SearchBarBase.svelte';

	export let executeQuery: (query: string | string[]) => void;
</script>

<SearchBarBase {executeQuery} saveQuery={true} />
