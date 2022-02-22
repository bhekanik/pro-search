<script lang="ts">
	import Exact from '$lib/components/Filters/Common/Exact.svelte';
	import ExcludeFilter from '$lib/components/Filters/Common/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filters/Common/FileType.svelte';
	import RelatedFilter from '$lib/components/Filters/Common/Related.svelte';
	import SiteFilter from '$lib/components/Filters/Common/Site.svelte';
	import SynonymsFilter from '$lib/components/Filters/Common/Synonyms.svelte';
</script>

<h2 class="text-gray-300">Only return pages...</h2>
<SynonymsFilter />
<Exact />
<ExcludeFilter />
<SiteFilter />
<FileTypeFilter />
<!-- <LinkFilter /> -->
<RelatedFilter />
