<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.synonyms = {
						value,
						formatted: value.split(' ').reduce((acc, item) => `${acc}~${item.trim()} `, '')
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
	label="Include results with these words and their synonyms"
	textInputPlaceholder="Words to include (example: amazed sailor)"
/>
