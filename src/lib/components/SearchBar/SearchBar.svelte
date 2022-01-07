<script lang="ts">
	import SearchBarWithoutQueryAutosave from '$lib/components/SearchBar/SearchBarWithoutQueryAutosave.svelte';
	import SearchBarWithQueryAutosave from '$lib/components/SearchBar/SearchBarWithQueryAutosave.svelte';
	import { configStore } from '$lib/stores';
	import FeatureSelector from '../FeatureSelector/FeatureSelector.svelte';

	export let executeQuery: (query: string | string[]) => void;
</script>

<FeatureSelector
	featureFlag="Save_Search"
	otherCondition={!$configStore.autosaveQueries}
	onFeature={SearchBarWithoutQueryAutosave}
	offFeature={SearchBarWithQueryAutosave}
	let:feature={SearchBar}
>
	<SearchBar {executeQuery} />
</FeatureSelector>
