<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.site = {
						value,
						formatted: `site:${value.trim()} `
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
