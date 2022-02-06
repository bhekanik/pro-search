<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.personal = {
				type: 'Personal',
				value,
				formatted: `pws=${Number(value)}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	handleCheckboxChange={handleChange}
	type="Personal"
	label="Turn off personalised results"
/>
