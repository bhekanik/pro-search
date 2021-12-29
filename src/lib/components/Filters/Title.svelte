<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.title = {
						value,
						formatted:
							value.split(' ').length > 1
								? `allintitle:${value.trim()} `
								: `intitle:${value.trim()} `
				  })
				: delete newQuery.filters.title;
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Title"
	hasInput
	label="Only return results with this word(s) in the title of the page"
	textInputPlaceholder="Word(s)"
/>
