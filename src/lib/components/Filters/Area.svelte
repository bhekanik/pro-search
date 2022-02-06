<script lang="ts">
	import { searchAreas } from '$lib/app/config/areas';
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.area = {
				type: 'Area',
				value,
				formatted: `as_occt=${encodeURIComponent(value)}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleSelectChange={handleChange}
	type="Area"
	label="... with the search term in the ..."
	textInputPlaceholder="Search Area"
	options={searchAreas}
/>
