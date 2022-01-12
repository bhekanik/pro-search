<script lang="ts">
	import Exact from '$lib/components/Filters/Exact.svelte';
	import ExcludeFilter from '$lib/components/Filters/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filters/FileType.svelte';
	import LinkFilter from '$lib/components/Filters/Link.svelte';
	import RelatedFilter from '$lib/components/Filters/Related.svelte';
	import SiteFilter from '$lib/components/Filters/Site.svelte';
	import SynonymsFilter from '$lib/components/Filters/Synonyms.svelte';
	import TitleFilter from '$lib/components/Filters/Title.svelte';
	import URLFilter from '$lib/components/Filters/URL.svelte';
	import { queryStore } from '$lib/stores';
	import DateAfter from './DateAfter.svelte';
	import DateBefore from './DateBefore.svelte';
	import Past from './Past.svelte';
	import Rights from './Rights.svelte';
	import Safe from './Safe.svelte';
</script>

<div class="collapse my-2 w-full border rounded-box border-base-300 collapse-arrow">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Add Filters</div>
	<div class="collapse-content">
		<div class="filters">
			{#if $queryStore.provider.name === 'Google'}
				<Safe />
			{/if}
			<h2 class="mt-4">Only return pages...</h2>
			<SynonymsFilter />
			<Exact />
			<ExcludeFilter />
			<TitleFilter />
			<URLFilter />
			{#if $queryStore.provider.name === 'Google'}
				<Past />
				<Rights />
			{/if}
			<SiteFilter />
			<DateBefore />
			<DateAfter />
			<FileTypeFilter />
			<LinkFilter />
			<RelatedFilter />
		</div>
	</div>
</div>

<style>
	.filters {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
	}
</style>
