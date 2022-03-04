<script lang="ts">
	import SearchBarWithoutQueryAutosave from '$lib/components/SearchBar/SearchBarWithoutQueryAutosave.svelte';
	import SearchBarWithQueryAutosave from '$lib/components/SearchBar/SearchBarWithQueryAutosave.svelte';
	import { settingsStore } from '$lib/stores';
	import ComponentSelector from '../FeatureSelector/ComponentSelector.svelte';

	export let executeQuery: (query: string | string[]) => void;
</script>

<ComponentSelector
	condition={!$settingsStore.autosave_queries}
	onFeature={SearchBarWithoutQueryAutosave}
	offFeature={SearchBarWithQueryAutosave}
	let:feature={SearchBar}
	props={{ executeQuery }}
/>
