<script lang="ts">
	import ExcludeFilter from '$lib/components/Filters/Exclude.svelte';
	import FileTypeFilter from '$lib/components/Filters/FileType.svelte';
	import SiteFilter from '$lib/components/Filters/Site.svelte';
	import SynonymsFilter from '$lib/components/Filters/Synonyms.svelte';
	import TitleFilter from '$lib/components/Filters/Title.svelte';
	import URLFilter from '$lib/components/Filters/URL.svelte';
</script>

<div class="collapse my-2 w-full border rounded-box border-base-300 collapse-arrow">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Add Filters</div>
	<div class="collapse-content">
		<div class="filters">
			<SiteFilter />
			<ExcludeFilter />
			<SynonymsFilter />
			<TitleFilter />
			<FileTypeFilter />
			<URLFilter />
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
