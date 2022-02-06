<script lang="ts">
	import Exact from '$lib/components/Filters/Exact.svelte';
	import ExcludeFilter from '$lib/components/Filters/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filters/FileType.svelte';
	import LinkFilter from '$lib/components/Filters/Link.svelte';
	import RelatedFilter from '$lib/components/Filters/Related.svelte';
	import SiteFilter from '$lib/components/Filters/Site.svelte';
	import SynonymsFilter from '$lib/components/Filters/Synonyms.svelte';
	import { queryStore } from '$lib/stores';
	import Area from './Area.svelte';
	import Content from './Content.svelte';
	import Country from './Country.svelte';
	import DateAfter from './DateAfter.svelte';
	import DateBefore from './DateBefore.svelte';
	import Locale from './Locale.svelte';
	import Past from './Past.svelte';
	import Personal from './Personal.svelte';
	import PublishLanguage from './PublishLanguage.svelte';
	import Rights from './Rights.svelte';
	import Safe from './Safe.svelte';
</script>

<div class="collapse my-2 w-full border rounded-box border-base-300 collapse-arrow">
	<input type="checkbox" />
	<div class="collapse-title text-gray-300">Add Filters</div>
	<div class="collapse-content">
		<div class="filters">
			<h2 class="text-gray-300">Only return pages...</h2>
			<SynonymsFilter />
			<Exact />
			<ExcludeFilter />
			{#if $queryStore.provider.name === 'Google'}
				<Past />
				<Rights />
				<PublishLanguage />
				<Content />
			{/if}
			<SiteFilter />
			<DateBefore />
			<DateAfter />
			<Area />
			<FileTypeFilter />
			<LinkFilter />
			<RelatedFilter />
			<h2 class="text-gray-300 mt-4">Additional Settings</h2>
			{#if $queryStore.provider.name === 'Bing' || $queryStore.provider.name === 'Google'}
				<Safe />
				<Personal />
			{/if}
			{#if $queryStore.provider.name === 'Google'}
				<Locale />
				<Country />
			{/if}
		</div>
	</div>
</div>
