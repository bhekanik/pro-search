<script lang="ts">
	import { sortByOptions } from '$lib/app/fixtures';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.sortBy = {
				type: 'Sort By',
				value,
				formatted: `tbs=${encodeURIComponent(value)} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Sort By"
	label="Sort by"
	textInputPlaceholder="Sort Option"
	options={sortByOptions}
/>
