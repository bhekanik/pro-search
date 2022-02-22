<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.safe = {
				type: 'Safe',
				value,
				formatted: `safe=${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase handleCheckboxChange={handleChange} type="Safe" label="Use safe search" />
