<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: any) => {
		const value = e.target.value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.exclude = {
						value,
						formatted: value.split(' ').reduce((acc, item) => `${acc}-${item.trim()} `, '')
				  })
				: delete newQuery.filters.exclude;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Exclude"
	hasInput
	label="Exclude results with these words"
	textInputPlaceholder="Words to exclude (example: detect plagiarism)"
/>
