<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { query } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.related = {
						value,
						formatted: `related:${value} `
				  })
				: delete newQuery.filters.related;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Related"
	hasInput
	label="Only return results that are similar to the specified webpage"
	textInputPlaceholder="URL (example: www.cnn.com)"
/>
