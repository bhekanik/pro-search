<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.adWords = {
				type: 'AdWords',
				value,
				formatted: `adtest=${value ? 'off' : 'on'}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleCheckboxChange={handleChange}
	type="AdWords"
	label="Turn off AdWords database connection"
/>
