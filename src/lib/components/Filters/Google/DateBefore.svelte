<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.dateBefore = {
				type: 'DateBefore',
				value,
				formatted: `tbs=cdr:1&cd_max=${value.trim()} `
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="DateBefore"
	hasInput
	label="... published before this date"
	textInputPlaceholder="YYYY.MM.DD or YYYY"
/>
