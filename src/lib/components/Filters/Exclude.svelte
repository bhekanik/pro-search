<script lang="ts">
	import FilterBase from '$lib/components/Filters/Base/Base.svelte';
	import { queryStore } from '$lib/stores';
	import { listApplyOperator, Operator } from './utils/listApplyOperator';

	const handleInput = (e: any) => {
		const value = e.target.value;
		queryStore.update((currentQuery) => {
			const newQuery = { ...currentQuery };
			value
				? (newQuery.filters.exclude = {
						value,
						formatted: listApplyOperator(value, Operator.Exclude)
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
