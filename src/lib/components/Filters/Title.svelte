<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.title = {
				value,
				formatted:
					value.split(' ').length > 1 ? `allintitle:${value.trim()} ` : `intitle:${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Title"
	hasInput
	label="... with these words in the page title"
	textInputPlaceholder="Word(s)"
/>
