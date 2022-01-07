<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.url = {
				value,
				formatted:
					value.split(' ').length > 1 ? `allinurl:${value.trim()} ` : `inurl:${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="URL"
	hasInput
	label="Only return results with this word(s) in the URL"
	textInputPlaceholder="Word(s)"
/>
