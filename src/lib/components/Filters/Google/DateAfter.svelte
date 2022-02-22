<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			newQuery.filters.dateAfter = {
				type: 'DateAfter',
				value,
				formatted: `tbs=cdr:1,cd_min=${value.trim()},cd_max=${new Date().toLocaleDateString()}`
			};
			return newQuery;
		});
	};
</script>

<FilterBase
	on:input={handleInput}
	type="DateAfter"
	hasInput
	label="... published after this date"
	textInputPlaceholder="YYYY.MM.DD or YYYY"
/>
