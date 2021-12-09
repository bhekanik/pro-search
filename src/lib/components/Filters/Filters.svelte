<script lang="ts">
	import ExcludeFilter from '$lib/components/Filters/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filters/FileType.svelte';
	import SiteFilter from '$lib/components/Filters/Site.svelte';
	import TitleFilter from '$lib/components/Filters/Title.svelte';
	import URLFilter from '$lib/components/Filters/URL.svelte';
</script>

<h2 class="filters-heading">Add Filters</h2>
<div class="filters">
	<SiteFilter />
	<ExcludeFilter />
	<TitleFilter />
	<FileTypeFilter />
	<URLFilter />
</div>

<style>
	.filters-heading {
		margin: 1rem 0;
	}
	.filters {
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
	}
</style>
