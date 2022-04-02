<script lang="ts">
	import SynonymsFilter from '$lib/components/Filters/Common/Synonyms.svelte';
	import Area from '$lib/components/Filters/Google/Area.svelte';
	import Content from '$lib/components/Filters/Google/Content.svelte';
	import Country from '$lib/components/Filters/Google/Country.svelte';
	import Exact from '$lib/components/Filters/Google/Exact.svelte';
	import ExcludeFilter from '$lib/components/Filters/Google/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filters/Google/FileType.svelte';
	import LinkFilter from '$lib/components/Filters/Google/Link.svelte';
	import Locale from '$lib/components/Filters/Google/Locale.svelte';
	import Past from '$lib/components/Filters/Google/Past.svelte';
	import Personal from '$lib/components/Filters/Google/Personal.svelte';
	import PublishLanguage from '$lib/components/Filters/Google/PublishLanguage.svelte';
	import RelatedFilter from '$lib/components/Filters/Google/Related.svelte';
	import Rights from '$lib/components/Filters/Google/Rights.svelte';
	import Safe from '$lib/components/Filters/Google/Safe.svelte';
	import SiteFilter from '$lib/components/Filters/Google/Site.svelte';
	import ExcludeSite from './Common/ExcludeSite.svelte';
	import NumRange from './Common/NumRange.svelte';
</script>

<h2 class="text-gray-300">Only return pages...</h2>
<SynonymsFilter />
<Exact />
<ExcludeFilter />
<Past />
<Rights />
<PublishLanguage />
<Content />
<SiteFilter />
<ExcludeSite />
<!-- <DateBefore /> -->
<!-- <DateAfter /> -->
<Area />
<NumRange />
<FileTypeFilter />
<LinkFilter />
<RelatedFilter />
<h2 class="text-gray-300 mt-4">Additional Settings</h2>
<Safe />
<Personal />
<!-- <SortBy /> -->
<!-- <AdWords /> -->
<Locale />
<Country />
