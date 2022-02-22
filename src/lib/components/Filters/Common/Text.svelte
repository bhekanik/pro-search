<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.text = {
				type: 'Text',
				value,
				formatted:
					value.split(' ').length > 1 ? `allintext:${value.trim()} ` : `intext:${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="Text"
	hasInput
	label="... with these words in the page text"
	textInputPlaceholder="Word(s)"
/>
