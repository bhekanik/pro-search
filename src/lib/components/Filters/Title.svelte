<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { query } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.title = {
						value,
						formatted: `intitle:${value}`
				  })
				: delete newQuery.filters.title;
			return newQuery;
		});
	};
</script>

<FilterBase on:input={handleInput} type="Title" hasInput label="Search in page title" />
