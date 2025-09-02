<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { sanitizeFilterValue } from '$lib/utils/sanitization';

	const handleInput = (e: Event) => {
		const rawValue = (e.target as HTMLInputElement).value;
		// Sanitize the exact match value to prevent injection
		const value = sanitizeFilterValue(rawValue, 'exact');
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.exact = {
				type: 'Exact',
				value,
				formatted: `"${value.trim()}" `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Exact"
	hasInput
	label="... that have this exact word or phrase"
	textInputPlaceholder="Word/Phrase (example: we live in a society)"
/>
