<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.related = {
				type: 'Related',
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
	label="... that are similar to this webpage"
	textInputPlaceholder="URL (example: www.cnn.com)"
/>
