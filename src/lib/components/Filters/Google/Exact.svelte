<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.exact = {
				type: 'Exact',
				value,
				formatted: `as_epq=${encodeURIComponent(value.trim())}`
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
