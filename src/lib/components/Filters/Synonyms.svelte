<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { query } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		query.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.synonyms = {
						value,
						formatted: `~${value} `
				  })
				: delete newQuery.filters.synonyms;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Synonyms"
	hasInput
	label="Include results with this word and its synonyms"
	textInputPlaceholder="Word to include"
/>
