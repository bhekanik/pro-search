<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.related = {
				value,
				formatted: `related:${value.trim()} `
			};
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
