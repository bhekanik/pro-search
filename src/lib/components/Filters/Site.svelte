<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { query } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.site = {
						value,
						formatted: `site:${value} `
				  })
				: delete newQuery.filters.site;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Site"
	hasInput
	label="Only return results from this website"
	textInputPlaceholder="Website (example: cnn.com)"
/>
