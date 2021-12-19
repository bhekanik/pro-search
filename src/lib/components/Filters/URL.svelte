<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { query } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.url = {
						value,
						formatted: `inurl:${value}`
				  })
				: delete newQuery.filters.url;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="URL"
	hasInput
	label="Only return results with this word in the URL"
	textInputPlaceholder="Word"
/>
